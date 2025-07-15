import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, DirectionsRenderer, useJsApiLoader } from "@react-google-maps/api";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../config/api.js";

const socket = io(API_BASE_URL, { withCredentials: true });

const containerStyle = {
  width: "100%",
  height: "80vh",
};

const LiveTracking = () => {
  const { rideId } = useParams();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const [location, setLocation] = useState(null);
  const [directions, setDirections] = useState(null);
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);
  const [ride, setRide] = useState(null);
  const [user, setUser] = useState(null);

  // Fetch ride info
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/rides/${rideId}`)
      .then((res) => res.json())
      .then((data) => {
        const ride = data.ride || data; // handle both {ride: {...}} and {...}
        setSource(ride.source);
        setDestination(ride.destination);
        setLocation(ride.source);
        setRide(ride);
      });
  }, [rideId]);

  // DRIVER: Send location every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const coords = {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            };
            setLocation(coords);
            socket.emit("locationUpdate", coords);
          },
          (err) => console.error("Geolocation error:", err),
          { enableHighAccuracy: true }
        );
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // LISTENER: Listen for location updates from backend (for user view)
  useEffect(() => {
    socket.on("locationUpdate", (coords) => setLocation(coords));
    return () => socket.off("locationUpdate");
  }, []);

  // Get directions from source to destination
  useEffect(() => {
    if (!isLoaded || !source || !destination) return;
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: source,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result);
        } else {
          console.error("Directions request failed:", status);
        }
      }
    );
  }, [isLoaded, source, destination]);

  // Fetch user info
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/auth/me`, { credentials: "include" })
      .then(res => res.json())
      .then(data => setUser(data.user));
  }, []);

  if (!isLoaded || !source || !destination) return <div>Loading Map...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <GoogleMap mapContainerStyle={containerStyle} center={location || source} zoom={14}>
        {directions && <DirectionsRenderer directions={directions} />}
        <Marker position={source} label="S" />
        <Marker position={destination} label="D" />
        {location && <Marker position={location} label="🚗" />}
      </GoogleMap>
      {ride?.status === "started" && user?.role === "captain" && (
        <button
          className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          onClick={async () => {
            await fetch(`${API_BASE_URL}/api/rides/${ride._id}/complete`, {
              method: "POST",
              credentials: "include",
            });
            window.location.href = `/payment/${ride._id}`;
          }}
        >
          Complete Ride
        </button>
      )}
    </div>
  );
};

export default LiveTracking;