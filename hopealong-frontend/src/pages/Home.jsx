import React from "react";
import {
  FaCarSide,
  FaSignOutAlt,
  FaLeaf,
  FaUsers,
  FaWallet,
  FaShieldAlt,
  FaArrowRight
} from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { MdEmojiPeople } from "react-icons/md";
import { useAuth } from "../context/AuthContext.jsx";
import heroBg from "../assets/herobg.jpg";


const Home = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-white overflow-hidden font-sans antialiased">

      {/* Hero Section */}
   <section
  className="relative text-white min-h-[640px] flex items-center overflow-hidden"
  style={{
    background: `linear-gradient(rgba(67, 56, 202, 0.85), rgba(67, 56, 202, 0.85)), url(${heroBg})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  }}
>
  <div className="absolute inset-0 bg-indigo-900/30 z-0"></div>

  <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-16">
    <div className="flex flex-col lg:flex-row items-center gap-12">
      {/* Left Text Content */}
      <div className="lg:w-1/2 space-y-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
          Smarter rides, <br className="hidden sm:block" /> happier journeys
        </h1>
        <p className="text-xl text-indigo-100 max-w-lg leading-relaxed">
          Join thousands of travelers sharing rides across the country. Save money, reduce emissions, and make new connections.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <a
            href={user ? "/rides" : "/register"}
            className="bg-white text-indigo-600 hover:bg-indigo-50 px-8 py-4 rounded-xl font-semibold shadow-lg transition-all duration-300 hover:scale-[1.02] text-center flex items-center justify-center gap-2"
          >
            {user ? "Find Rides" : "Get Started"} <FaArrowRight />
          </a>
          <a
            href="#how-it-works"
            className="border-2 border-white text-white hover:bg-white hover:text-indigo-600 px-8 py-4 rounded-xl font-semibold text-center transition-all duration-300 flex items-center justify-center"
          >
            How it works
          </a>
        </div>
      </div>

      {/* Right Routes Box */}
      <div className="lg:w-1/2 flex justify-center">
        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 max-w-md w-full">
          <h3 className="text-xl font-semibold mb-4">Popular routes right now</h3>
          <div className="space-y-4">
            {['New York → Boston', 'Los Angeles → San Francisco', 'Chicago → Detroit', 'Seattle → Portland'].map((route, i) => (
              <div key={i} className="flex justify-between items-center p-3 hover:bg-white/10 rounded-lg transition-colors">
                <span>{route}</span>
                <span className="text-sm bg-indigo-500 px-2 py-1 rounded-full">5+ rides</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Smooth Wave Divider Below Hero Section */}
  <div className="absolute bottom-0 left-0 right-0 w-full translate-y-6 z-10">
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-24 md:h-32">
      <path
        fill="#FFFFFF"
        d="M0,96L48,84C96,72,192,48,288,36C384,24,480,24,576,36C672,48,768,72,864,84C960,96,1056,96,1152,84C1248,72,1344,48,1392,36L1440,24L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
      />
    </svg>
  </div>
</section>


      {/* Stats Section */}
      <section className="bg-white py-16 px-6 -mt-1">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Daily rides", value: "10K+", color: "bg-indigo-100 text-indigo-600" },
              { label: "Happy users", value: "500K+", color: "bg-green-100 text-green-600" },
              { label: "Miles shared", value: "1M+", color: "bg-blue-100 text-blue-600" },
              { label: "Tons CO₂ saved", value: "50K+", color: "bg-emerald-100 text-emerald-600" }
            ].map((stat, index) => (
              <div 
                key={index} 
                className={`p-6 ${stat.color} rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center`}
              >
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-gray-700 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="text-indigo-600 font-semibold mb-2 inline-block">HOW IT WORKS</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get where you need to go in 3 simple steps</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            HopeAlong makes ride sharing simple, safe, and rewarding for everyone
          </p>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Find or offer a ride",
              desc: "Search for rides going your way or publish your own trip and set your price.",
              icon: <FaCarSide className="text-3xl text-indigo-600" />
            },
            {
              title: "Book & connect",
              desc: "Confirm your booking and chat with your driver or passengers to arrange details.",
              icon: <FaUsers className="text-3xl text-indigo-600" />
            },
            {
              title: "Enjoy the ride",
              desc: "Meet up and enjoy the journey while saving money and the planet.",
              icon: <MdEmojiPeople className="text-3xl text-indigo-600" />
            }
          ].map((step, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative mb-6">
                <div className="absolute -top-12 left-0 w-24 h-24 bg-indigo-100 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative z-10 w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center mb-6 mx-auto group-hover:bg-indigo-100 transition-colors duration-300">
                  {step.icon}
                </div>
                <div className="absolute -bottom-2 right-0 text-8xl font-bold text-gray-100 opacity-50 -z-10">0{index + 1}</div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-indigo-600 font-semibold mb-2 inline-block">WHY CHOOSE US</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">The smarter way to travel</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Designed for comfort, convenience, and community
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <FaWallet className="text-3xl" />, title: "Save money", desc: "Share travel costs with others going the same way. Pay only for your seat, not the whole car." },
              { icon: <FaLeaf className="text-3xl" />, title: "Travel green", desc: "Reduce CO₂ emissions by sharing rides. Every shared trip helps fight climate change." },
              { icon: <FaUsers className="text-3xl" />, title: "Meet people", desc: "Connect with like-minded travelers and make your journey more enjoyable." },
              { icon: <IoMdTime className="text-3xl" />, title: "Flexible options", desc: "Choose from thousands of daily rides with flexible departure times." },
              { icon: <FaShieldAlt className="text-3xl" />, title: "Safe & reliable", desc: "Verified profiles and reviews ensure you travel with trusted community members." },
              { icon: <MdEmojiPeople className="text-3xl" />, title: "Comfortable", desc: "Specify your preferences and travel in comfort with like-minded people." }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="p-8 rounded-xl border border-gray-100 hover:border-indigo-300 shadow-sm hover:shadow-md transition-all duration-300 group hover:bg-indigo-50/30"
              >
                <div className="text-indigo-600 mb-4 group-hover:text-indigo-700 transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-indigo-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-indigo-100 opacity-20"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-indigo-100 opacity-20"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-indigo-600 font-semibold mb-2 inline-block">TESTIMONIALS</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Community Says</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from people who travel with HopeAlong
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "I've cut my commuting costs by 70% while meeting amazing people along the way.",
                name: "Sarah K.",
                role: "Daily commuter",
                rating: 5
              },
              {
                quote: "As a student, HopeAlong has been a lifesaver for traveling between cities affordably.",
                name: "Michael T.",
                role: "University student",
                rating: 4
              },
              {
                quote: "I love reducing my carbon footprint while getting to know interesting fellow travelers.",
                name: "Priya M.",
                role: "Environmental activist",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <div className="text-gray-700 text-lg mb-6 leading-relaxed">"{testimonial.quote}"</div>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-500 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to start your journey?</h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of travelers sharing rides across the country. Save money, reduce emissions, and make new connections.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={user ? "/dashboard" : "/register"}
              className="bg-white text-indigo-600 hover:bg-indigo-50 px-8 py-4 rounded-xl font-semibold shadow-lg transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              {user ? "Find Rides" : "Sign Up Free"} <FaArrowRight />
            </a>
            <a
              href="/about"
              className="border-2 border-white text-white hover:bg-white hover:text-indigo-600 px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      
      

    </div>
  );
};

export default Home;