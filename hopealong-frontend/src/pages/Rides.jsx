import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config/api.js";
import {
  FaSearch,
  FaUser,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaCar,
  FaMoneyBillWave,
  FaUsers,
  FaStar,
  FaRegStar,
  FaChevronRight
} from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import { motion } from "framer-motion";
import axios from "axios";

const GEO_API_KEY = "df8a98a451mshcf053dbb1d0a300p1316b6jsnc5fc3d394c49";
const GEO_API_HOST = "wft-geo-db.p.rapidapi.com";

// Only one fetchCitySuggestions function, using axios
const fetchCitySuggestions = async (query) => {
  if (!query) return [];
  try {
    const res = await axios.get(
      `https://${GEO_API_HOST}/v1/geo/cities?namePrefix=${encodeURIComponent(query)}&limit=5&types=CITY`,
      {
        headers: {
          "X-RapidAPI-Key": GEO_API_KEY,
          "X-RapidAPI-Host": GEO_API_HOST,
        },
      }
    );
    return res.data.data.map((city) => city.city); // Only city name
  } catch (error) {
    console.error("GeoDB error:", error.message);
    return [];
  }
};

const Rides = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState({ from: "", to: "", date: "" });
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("departure");
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  // Filters state for right sidebar
  const [filters, setFilters] = useState({
    vehicleType: "",
    price: 2000,
    arrivalTime: "",
    seats: 1,
  });
  const [filteredRides, setFilteredRides] = useState([]);
  const fromInputRef = useRef();
  const toInputRef = useRef();

  const fetchRides = async (params = {}) => {
    setLoading(true);
    let query = Object.entries(params)
      .filter(([_, v]) => v)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join("&");
    const url = query
      ? `${API_BASE_URL}/api/rides/search?${query}`
      : `${API_BASE_URL}/api/rides`;
    const res = await fetch(url);
    const data = await res.json();
    setRides(data.rides || data);
    setLoading(false);
  };

  useEffect(() => {
    fetchRides(); // Fetch all rides on first load
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.from && !search.to && !search.date) {
      fetchRides(); // Fetch all if search is empty
    } else {
      fetchRides(search); // Fetch filtered
    }
    setSearch({ from: "", to: "", date: "" }); // Clear search fields
  };

  const handleRequest = async (rideId) => {
    const seatsRequested = window.prompt("How many seats do you want to book?");
    if (!seatsRequested) return;
    const res = await fetch(`${API_BASE_URL}/api/riderequests/request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ rideId, seatsRequested }),
    });
    const data = await res.json();
    alert(data.msg);
  };

  const formatTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(":");
    const date = new Date();
    date.setHours(+hours);
    date.setMinutes(+minutes);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const getRandomRating = () => (Math.random() * 2 + 3).toFixed(1);

  const sortRides = (ridesToSort) => {
    const sorted = [...ridesToSort];
    switch (sortBy) {
      case "departure":
        sorted.sort((a, b) => new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`));
        break;
      case "price-low":
        sorted.sort((a, b) => a.costPerSeat - b.costPerSeat);
        break;
      case "price-high":
        sorted.sort((a, b) => b.costPerSeat - a.costPerSeat);
        break;
      case "rating":
        sorted.sort((a, b) => parseFloat(getRandomRating()) - parseFloat(getRandomRating()));
        break;
      default:
        break;
    }
    return sorted;
  };

  useEffect(() => {
    if (rides.length > 0) {
      setRides(sortRides([...rides]));
    }
  }, [sortBy]);

  // Handlers for input changes and suggestion selection
  const handleFromChange = async (e) => {
    const value = e.target.value;
    setSearch((prev) => ({ ...prev, from: value }));
    if (value.length > 1) {
      const suggestions = await fetchCitySuggestions(value);
      setFromSuggestions(suggestions);
      setShowFromSuggestions(true);
    } else {
      setFromSuggestions([]);
      setShowFromSuggestions(false);
    }
  };

  const handleToChange = async (e) => {
    const value = e.target.value;
    setSearch((prev) => ({ ...prev, to: value }));
    if (value.length > 1) {
      const suggestions = await fetchCitySuggestions(value);
      setToSuggestions(suggestions);
      setShowToSuggestions(true);
    } else {
      setToSuggestions([]);
      setShowToSuggestions(false);
    }
  };

  const handleFromSuggestionClick = (suggestion) => {
    setSearch((prev) => ({ ...prev, from: suggestion }));
    setFromSuggestions([]);
    setShowFromSuggestions(false);
  };

  const handleToSuggestionClick = (suggestion) => {
    setSearch((prev) => ({ ...prev, to: suggestion }));
    setToSuggestions([]);
    setShowToSuggestions(false);
  };

  // Hide suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        fromInputRef.current &&
        !fromInputRef.current.contains(event.target)
      ) {
        setShowFromSuggestions(false);
      }
      if (
        toInputRef.current &&
        !toInputRef.current.contains(event.target)
      ) {
        setShowToSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Update filter logic to always show filteredRides after Apply Filters, and add Clear Filters button if no results
  const applyFilters = (e) => {
    if (e) e.preventDefault();
    let filtered = rides.filter((ride) => {
      let match = true;
      // Normalize both filter and ride vehicleType to lowercase for comparison
      if (filters.vehicleType && ride.vehicleType?.toLowerCase() !== filters.vehicleType.toLowerCase()) match = false;
      if (filters.price && ride.costPerSeat > Number(filters.price)) match = false;
      if (filters.arrivalTime && ride.time < filters.arrivalTime) match = false;
      if (filters.seats && ride.seatsAvailable < Number(filters.seats)) match = false;
      return match;
    });
    setFilteredRides(filtered);
  };

  // Always show filteredRides, not rides, in results
  useEffect(() => {
    setFilteredRides(rides);
  }, [rides]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-100 py-12 px-0 sm:px-0 lg:px-0">
      <div className="max-w-7xl mx-auto">
        {/* Search Card (full width, always on top, now sticky) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/95 rounded-2xl p-6 mb-10 border border-blue-100 mx-4 md:mx-0 sticky top-0 z-30 backdrop-blur-md border-b-2 border-blue-100"
        >
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative col-span-2" ref={fromInputRef}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <div className="flex flex-col items-center">
                  <FaMapMarkerAlt className="text-blue-600 mb-1" />
                  <div className="w-0.5 h-4 bg-blue-200"></div>
                </div>
              </div>
              <input
                type="text"
                placeholder="Leaving from..."
                value={search.from}
                onChange={handleFromChange}
                className="pl-10 py-3 w-full rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 hover:border-blue-300 transition bg-blue-50"
                autoComplete="off"
              />
              {showFromSuggestions && fromSuggestions.length > 0 && (
                <ul className="absolute z-10 left-0 right-0 bg-white border border-blue-200 rounded-xl mt-1 shadow-lg max-h-56 overflow-y-auto">
                  {fromSuggestions.map((suggestion, idx) => (
                    <li
                      key={idx}
                      className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                      onClick={() => handleFromSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="relative col-span-2" ref={toInputRef}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaMapMarkerAlt className="text-green-600" />
              </div>
              <input
                type="text"
                placeholder="Going to..."
                value={search.to}
                onChange={handleToChange}
                className="pl-10 py-3 w-full rounded-xl border border-green-200 focus:ring-2 focus:ring-green-400 focus:border-green-400 hover:border-green-300 transition bg-green-50"
                autoComplete="off"
              />
              {showToSuggestions && toSuggestions.length > 0 && (
                <ul className="absolute z-10 left-0 right-0 bg-white border border-green-200 rounded-xl mt-1 shadow-lg max-h-56 overflow-y-auto">
                  {toSuggestions.map((suggestion, idx) => (
                    <li
                      key={idx}
                      className="px-4 py-2 hover:bg-green-50 cursor-pointer"
                      onClick={() => handleToSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaCalendarAlt className="text-blue-400" />
              </div>
              <input
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={search.date}
                onChange={e => setSearch({ ...search, date: e.target.value })}
                className="pl-10 py-3 w-full rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 hover:border-blue-300 transition bg-blue-50"
              />
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white font-semibold rounded-xl py-3 px-6 flex items-center justify-center shadow-md hover:shadow-lg transition-all"
            >
              <FaSearch className="mr-2" /> Search Rides
            </button>
          </form>
        </motion.div>
        {/* Main Content: Filters (left) + Rides (right) in a row */}
        <div className="flex flex-row gap-8 w-full">
          {/* Left Sidebar: Filters (static, starts after search) */}
          <aside className="hidden md:block min-w-[340px] max-w-sm w-full bg-white/90 rounded-2xl p-10 border border-blue-100 h-fit sticky top-44 self-start mt-6">
            <h3 className="text-lg font-bold mb-4 text-blue-900">Filters</h3>
            {/* Vehicle Type Filter */}
            <div className="mb-6">
              <label className="block font-medium text-gray-700 mb-2">Vehicle Type</label>
              <select
                className="w-full rounded-lg border border-gray-200 px-3 py-2"
                value={filters.vehicleType}
                onChange={e => setFilters(f => ({ ...f, vehicleType: e.target.value }))}
              >
                <option value="">All</option>
                <option value="car">Car</option>
                <option value="bike">Bike</option>
                <option value="van">Van</option>
                <option value="auto">Auto</option>
              </select>
            </div>
            {/* Price Range Filter */}
            <div className="mb-6">
              <label className="block font-medium text-gray-700 mb-2">Price Range (₹)</label>
              <input
                type="range"
                min="100"
                max="2000"
                step="50"
                value={filters.price}
                onChange={e => setFilters(f => ({ ...f, price: e.target.value }))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>₹100</span><span>₹{filters.price}</span>
              </div>
            </div>
            {/* Arrival Time Filter */}
            <div className="mb-6">
              <label className="block font-medium text-gray-700 mb-2">Arrival Time (after)</label>
              <input
                type="time"
                value={filters.arrivalTime}
                onChange={e => setFilters(f => ({ ...f, arrivalTime: e.target.value }))}
                className="w-full rounded-lg border border-gray-200 px-3 py-2"
              />
            </div>
            {/* Seats Available Filter */}
            <div className="mb-6">
              <label className="block font-medium text-gray-700 mb-2">Min. Seats Available</label>
              <input
                type="number"
                min="1"
                value={filters.seats}
                onChange={e => setFilters(f => ({ ...f, seats: e.target.value }))}
                className="w-full rounded-lg border border-gray-200 px-3 py-2"
              />
            </div>
            <button
              className="w-full bg-blue-600 text-white rounded-lg py-2 font-semibold mt-4 hover:bg-blue-700 transition"
              onClick={applyFilters}
            >
              Apply Filters
            </button>
          </aside>

          {/* Mobile Filters: horizontal bar below search, above rides */}
          <div className="block md:hidden w-full mb-6 mt-6">
            <div className="bg-white/90 rounded-2xl p-6 border border-blue-100 flex flex-col gap-6">
              <div className="flex flex-wrap gap-4">
                {/* Vehicle Type */}
                <div className="flex-1 min-w-[120px]">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Vehicle</label>
                  <select
                    className="w-full rounded-lg border border-gray-200 px-2 py-1 text-sm"
                    value={filters.vehicleType}
                    onChange={e => setFilters(f => ({ ...f, vehicleType: e.target.value }))}
                  >
                    <option value="">All</option>
                    <option value="car">Car</option>
                    <option value="bike">Bike</option>
                    <option value="van">Van</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>
                {/* Price Range */}
                <div className="flex-1 min-w-[120px]">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Max Price</label>
                  <input
                    type="range"
                    min="100"
                    max="2000"
                    step="50"
                    value={filters.price}
                    onChange={e => setFilters(f => ({ ...f, price: e.target.value }))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-[10px] text-gray-500 mt-0.5">
                    <span>₹100</span><span>₹{filters.price}</span>
                  </div>
                </div>
                {/* Arrival Time */}
                <div className="flex-1 min-w-[120px]">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Arrival After</label>
                  <input
                    type="time"
                    value={filters.arrivalTime}
                    onChange={e => setFilters(f => ({ ...f, arrivalTime: e.target.value }))}
                    className="w-full rounded-lg border border-gray-200 px-2 py-1 text-sm"
                  />
                </div>
                {/* Seats */}
                <div className="flex-1 min-w-[120px]">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Min Seats</label>
                  <input
                    type="number"
                    min="1"
                    value={filters.seats}
                    onChange={e => setFilters(f => ({ ...f, seats: e.target.value }))}
                    className="w-full rounded-lg border border-gray-200 px-2 py-1 text-sm"
                  />
                </div>
              </div>
              <button
                className="w-full bg-blue-600 text-white rounded-lg py-2 font-semibold hover:bg-blue-700 transition"
                onClick={applyFilters}
              >
                Apply Filters
              </button>
            </div>
          </div>

          {/* Right Content Area: Rides and Results */}
          <div className="flex-1 min-h-[70vh]">
            {/* Results Count & Sorting */}
            {!loading && rides.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-row items-center justify-between mb-6 gap-4"
              >
                <h2 className="text-xl font-semibold text-gray-800">
                  {rides.length} {rides.length === 1 ? "Ride" : "Rides"} Available
                </h2>
                <div className="flex items-center text-sm text-gray-500 ml-auto">
                  <span className="mr-2">Sort by:</span>
                  <select
                    className="bg-white border border-gray-200 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="price-low">Price (Low to High)</option>
                    <option value="price-high">Price (High to Low)</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>
              </motion.div>
            )}

            {/* Loading */}
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center items-center h-64"
              >
                <div className="flex flex-col items-center">
                  <div className="animate-spin h-12 w-12 border-4 border-indigo-500 border-t-transparent rounded-full mb-4"></div>
                  <p className="text-gray-600">Finding the best rides for you...</p>
                </div>
              </motion.div>
            )}

            {/* Ride List */}
            {!loading && filteredRides.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-6"
              >
                {sortRides(filteredRides)
                  .filter((ride) => ride.seatsAvailable > 0)
                  .map((ride, index) => (
                    <motion.div
                      key={ride._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="bg-white rounded-2xl shadow-md overflow-hidden border border-blue-100 transition-all w-full max-w-3xl mx-auto min-h-[180px] p-8 sm:p-10"
                    >
                      {/* Strictly 2-row card layout */}
                      <div className="flex flex-col gap-6">
                        {/* Row 1: User, Route, Price */}
                        <div className="flex flex-row items-center justify-between gap-4 py-4">
                          {/* User Details (left) */}
                          <div className="flex items-center gap-3 min-w-[120px]">
                            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                              <FaUser className="text-indigo-600 text-lg" />
                            </div>
                            <div className="flex flex-col">
                              <span className="font-bold text-gray-800 text-sm truncate max-w-[80px]">{ride.captain?.name}</span>
                              <div className="flex items-center mt-0.5">
                                {[...Array(5)].map((_, i) =>
                                  i < Math.floor(getRandomRating()) ? (
                                    <FaStar key={i} className="text-yellow-400 text-xs" />
                                  ) : (
                                    <FaRegStar key={i} className="text-yellow-400 text-xs" />
                                  )
                                )}
                                <span className="ml-1 text-gray-500 text-xs">{getRandomRating()}</span>
                              </div>
                            </div>
                          </div>
                          {/* Source to Destination (center) */}
                          <div className="flex-1 flex flex-col items-center min-w-0">
                            <div className="flex items-center gap-2 text-lg font-bold text-gray-900 truncate">
                              <span className="truncate max-w-[100px]">{ride.from}</span>
                              <FaChevronRight className="mx-1 text-gray-300 text-xl" />
                              <span className="truncate max-w-[100px]">{ride.to}</span>
                            </div>
                            {/* Optionally, add vehicle type below route */}
                            
                          </div>
                          {/* Price (right, where Book Now was) */}
                          <div className="flex items-center text-base">
                            <span className="text-green-600 font-extrabold text-2x">
                              ₹{ride.costPerSeat}
                            </span>
                            <span className="text-xs text-black font-medium ml-0">/seat</span>
                          </div>
                        </div>
                        {/* Row 2: Ride Details + Book Now at bottom right */}
                        <div className="flex flex-row flex-wrap items-center justify-between gap-3 border-t border-blue-50 pt-5 pb-2 relative">
                          {/* Date & Time */}
                          <div className="flex items-center text-gray-500 gap-2 text-base">
                            <FaCalendarAlt className="text-indigo-400 mr-1" />
                            <span>{ride.date ? new Date(ride.date).toISOString().split('T')[0] : ''}</span>
                            <span className="mx-2">•</span>
                            <IoTime className="text-indigo-400 mr-1" />
                            <span>{formatTime(ride.time)}</span>
                          </div>
                          {/* Seats Left */}
                          <div className="flex items-center text-gray-500 gap-2 text-base">
                            <FaUsers className="text-indigo-400 mr-1" />
                            <span className="bg-indigo-50 text-indigo-700 px-4 py-1 rounded-full text-base font-semibold">
                              {ride.seatsAvailable} seats left
                            </span>
                          </div>
                          {/* Vehicle Type (optional) */}
                          {ride.vehicleType && (
                            <div className="flex items-center text-gray-500 gap-2 text-base">
                              <FaCar className="text-indigo-400 mr-1" />
                              <span className="bg-blue-50 text-blue-700 px-4 py-1 rounded-full text-base font-semibold">
                                {ride.vehicleType}
                              </span>
                            </div>
                          )}
                          {/* Book Now Button at bottom right */}
                          <div className="flex-1 flex justify-end items-end">
                            <button
                              onClick={() => handleRequest(ride._id)}
                              className="bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white font-bold py-2 px-6 rounded-xl transition-all shadow-md hover:shadow-lg whitespace-nowrap text-base min-w-[100px]"
                            >
                              Book Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </motion.div>
            )}
            {/* No results after filtering */}
            {!loading && filteredRides.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-4 py-12">
                <span className="text-gray-500 text-lg">No rides match your filters.</span>
                <button
                  className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-full font-semibold"
                  onClick={() => { setFilters({ vehicleType: '', price: 2000, arrivalTime: '', seats: 1 }); setFilteredRides(rides); }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rides;
