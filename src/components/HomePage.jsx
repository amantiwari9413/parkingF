import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Custom SVG Icons
const IconCar = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 16H9m10-6-2-4H7L5 6m0 0H3m2 0v6m0 0h14v-3m0 3v4m0 0v3H3v-3m14 0h4v-3m0 0h-4m0 0V9" />
  </svg>
);

const IconSearch = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const IconMap = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon>
    <line x1="9" y1="3" x2="9" y2="18"></line>
    <line x1="15" y1="6" x2="15" y2="21"></line>
  </svg>
);

const IconPin = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const IconChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"></path>
  </svg>
);

const HomePage = () => {
  const [city, setCity] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      navigate(`/parking-areas/${city}`);
    }
  };

  const popularCities = [
    { name: "jodhpur", spaces: 158 },
    { name: "jaipur", spaces: 127 },
    { name: "udaipur", spaces: 95 },
    { name: "delhi", spaces: 82 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
      {/* Hero Section */}
      <div className={`transition-all duration-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-6xl mx-auto px-4 pt-8 sm:pt-16 pb-8">
          {/* Header with Logo */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 rounded-lg p-2 text-white">
                <IconCar />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">ParkFinder</h2>
            </div>
            <div className="flex space-x-4">
              <button 
                onClick={() => navigate('/admin')}
                className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Admin Login
              </button>
              
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left Column - Text and Search */}
            <div className="w-full lg:w-1/2">
              <div className={`transition-all delay-300 duration-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <h1 className="text-5xl sm:text-6xl font-bold text-gray-800 mb-6 leading-tight">
                  Find Perfect <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Parking</span> Near You
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Discover thousands of available parking spaces in your city in just a few clicks.
                </p>
              </div>
              
              {/* Search Box */}
              <div className={`transition-all delay-500 duration-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="bg-white shadow-xl rounded-2xl p-6 backdrop-blur-lg">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                        Where do you need parking?
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                          <IconPin />
                        </div>
                        <input
                          type="text"
                          id="city"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full pl-12 pr-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-300 placeholder-gray-400 bg-white outline-none"
                          placeholder="Enter city name"
                          required
                          autoComplete="off"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl text-lg font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
                    >
                      <div className="mr-2">
                        <IconSearch />
                      </div>
                      Find Parking Spaces
                    </button>
                  </form>
                </div>
                
                {/* Popular Cities */}
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-700 mb-4">Popular cities:</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {popularCities.map((city, index) => (
                      <button 
                        key={index}
                        onClick={() => { setCity(city.name); }}
                        className="bg-white/80 backdrop-blur-sm p-3 rounded-lg hover:bg-blue-50 transition-colors flex flex-col items-center shadow-sm hover:shadow-md"
                      >
                        <span className="font-medium text-gray-800">{city.name}</span>
                        <span className="text-sm text-blue-600">{city.spaces} spaces</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - SVG Illustration */}
            <div className={`w-full lg:w-1/2 transition-all delay-700 duration-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <ParkingIllustration />
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className={`bg-white py-16 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose ParkFinder?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Our platform offers a seamless experience to find and reserve parking spaces across the country.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <IconMap />,
                title: "Easy Navigation",
                description: "Find the most convenient parking spots with our interactive maps."
              },
              {
                icon: <IconCar />,
                title: "Guaranteed Spaces",
                description: "Reserve your parking spot in advance and never worry about finding space."
              },
              {
                icon: <IconSearch />,
                title: "Real-time Updates",
                description: "Get live updates on parking availability and pricing."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="mb-4 inline-block bg-blue-100 p-3 rounded-lg text-blue-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
                <button className="mt-4 text-blue-600 font-medium flex items-center">
                  Learn more <span className="ml-1"><IconChevronRight /></span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Testimonials Section */}
      <div className={`bg-gray-50 py-16 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Users Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Thousands of drivers use ParkFinder every day to find convenient parking.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "I used to waste so much time finding parking. Now I just use ParkFinder and it's all taken care of!",
                name: "Sarah J.",
                location: "New York"
              },
              {
                quote: "The app is incredibly easy to use and has saved me from being late to meetings many times.",
                name: "Michael T.",
                location: "Chicago"
              },
              {
                quote: "I love how I can reserve my spot ahead of time. No more driving around in circles!",
                name: "Lisa R.",
                location: "Los Angeles"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
                <div className="font-medium text-blue-600">{testimonial.name}</div>
                <div className="text-sm text-gray-500">{testimonial.location}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// SVG Parking Illustration Component
const ParkingIllustration = () => {
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    setAnimate(true);
  }, []);
  
  return (
    <svg 
      viewBox="0 0 600 400" 
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto drop-shadow-xl"
    >
      {/* Building/Parking Garage */}
      <rect x="100" y="50" width="400" height="300" rx="8" fill="#f0f9ff" stroke="#dbeafe" strokeWidth="2" />
      
      {/* Floors */}
      {[100, 150, 200, 250, 300].map((y, i) => (
        <line 
          key={i}
          x1="100" 
          y1={y} 
          x2="500" 
          y2={y} 
          stroke="#dbeafe" 
          strokeWidth="2" 
          strokeDasharray={i === 0 ? "0" : "4 4"} 
        />
      ))}
      
      {/* Parking Lot Lines */}
      <g>
        {[130, 200, 270, 340, 410].map((x, i) => (
          <g key={i}>
            <rect 
              x={x} 
              y="100" 
              width="60" 
              height="50" 
              fill={i % 2 === 0 ? "#e0e7ff" : "#dbeafe"} 
              stroke="#d1d5db" 
              strokeWidth="1"
              className={animate ? "animate-pulse" : ""}
              style={{ animationDelay: `${i * 0.1}s`, animationDuration: '3s' }}
            />
            <rect 
              x={x} 
              y="200" 
              width="60" 
              height="50" 
              fill={i % 2 === 0 ? "#e0e7ff" : "#dbeafe"} 
              stroke="#d1d5db" 
              strokeWidth="1"
              className={animate ? "animate-pulse" : ""}
              style={{ animationDelay: `${i * 0.1 + 0.2}s`, animationDuration: '3s' }}
            />
            <rect 
              x={x} 
              y="250" 
              width="60" 
              height="50" 
              fill={i % 2 === 0 ? "#e0e7ff" : "#dbeafe"} 
              stroke="#d1d5db" 
              strokeWidth="1"
              className={animate ? "animate-pulse" : ""}
              style={{ animationDelay: `${i * 0.1 + 0.4}s`, animationDuration: '3s' }}
            />
          </g>
        ))}
      </g>
      
      {/* Cars */}
      <g>
        {/* Car 1 - Top Floor */}
        <g transform="translate(142, 115)" className={animate ? "opacity-100" : "opacity-0"} style={{ transition: "opacity 0.5s", transitionDelay: "0.6s" }}>
          <rect x="0" y="0" width="36" height="20" rx="5" fill="#3b82f6" />
          <rect x="5" y="3" width="26" height="8" rx="2" fill="#93c5fd" />
          <circle cx="8" cy="18" r="3" fill="#1e3a8a" />
          <circle cx="28" cy="18" r="3" fill="#1e3a8a" />
        </g>
        
        {/* Car 2 - Middle Floor */}
        <g transform="translate(212, 215)" className={animate ? "opacity-100" : "opacity-0"} style={{ transition: "opacity 0.5s", transitionDelay: "0.8s" }}>
          <rect x="0" y="0" width="36" height="20" rx="5" fill="#ef4444" />
          <rect x="5" y="3" width="26" height="8" rx="2" fill="#fecaca" />
          <circle cx="8" cy="18" r="3" fill="#7f1d1d" />
          <circle cx="28" cy="18" r="3" fill="#7f1d1d" />
        </g>
        
        {/* Car 3 - Bottom Floor */}
        <g transform="translate(282, 265)" className={animate ? "opacity-100" : "opacity-0"} style={{ transition: "opacity 0.5s", transitionDelay: "1s" }}>
          <rect x="0" y="0" width="36" height="20" rx="5" fill="#10b981" />
          <rect x="5" y="3" width="26" height="8" rx="2" fill="#a7f3d0" />
          <circle cx="8" cy="18" r="3" fill="#064e3b" />
          <circle cx="28" cy="18" r="3" fill="#064e3b" />
        </g>
        
        {/* Car 4 - Top Floor */}
        <g transform="translate(352, 115)" className={animate ? "opacity-100" : "opacity-0"} style={{ transition: "opacity 0.5s", transitionDelay: "1.2s" }}>
          <rect x="0" y="0" width="36" height="20" rx="5" fill="#f59e0b" />
          <rect x="5" y="3" width="26" height="8" rx="2" fill="#fcd34d" />
          <circle cx="8" cy="18" r="3" fill="#92400e" />
          <circle cx="28" cy="18" r="3" fill="#92400e" />
        </g>
        
        {/* Car 5 - Bottom Floor */}
        <g transform="translate(422, 265)" className={animate ? "opacity-100" : "opacity-0"} style={{ transition: "opacity 0.5s", transitionDelay: "1.4s" }}>
          <rect x="0" y="0" width="36" height="20" rx="5" fill="#8b5cf6" />
          <rect x="5" y="3" width="26" height="8" rx="2" fill="#c4b5fd" />
          <circle cx="8" cy="18" r="3" fill="#4c1d95" />
          <circle cx="28" cy="18" r="3" fill="#4c1d95" />
        </g>
      </g>
      
      {/* Animated Car (Entering) */}
      <g 
        transform={`translate(${animate ? '200' : '30'}, 320)`} 
        style={{ transition: "transform 2s ease-in-out", transitionDelay: "1.6s" }}
      >
        <rect x="0" y="0" width="40" height="22" rx="6" fill="#2563eb" />
        <rect x="6" y="4" width="28" height="8" rx="2" fill="#bfdbfe" />
        <circle cx="10" cy="20" r="3.5" fill="#1e3a8a" />
        <circle cx="30" cy="20" r="3.5" fill="#1e3a8a" />
        <rect x="3" y="0" width="2" height="1" fill="#bfdbfe" />
        <rect x="35" y="0" width="2" height="1" fill="#bfdbfe" />
      </g>
      
      {/* P Sign */}
      <g transform="translate(75, 60)" className={animate ? 'scale-100' : 'scale-0'} style={{ transition: 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)', transitionDelay: '0.8s', transformOrigin: 'center' }}>
        <circle cx="20" cy="20" r="20" fill="#6366f1" />
        <text x="20" y="28" fontSize="25" fontWeight="bold" fill="white" textAnchor="middle">P</text>
      </g>
      
      {/* Entry/Exit Signs */}
      <g className={animate ? 'opacity-100' : 'opacity-0'} style={{ transition: 'opacity 1s', transitionDelay: '1.2s' }}>
        <rect x="250" y="350" width="100" height="25" rx="4" fill="#3b82f6" />
        <text x="300" y="368" fontSize="16" fontWeight="bold" fill="white" textAnchor="middle">ENTRANCE</text>
        
        <rect x="390" y="350" width="100" height="25" rx="4" fill="#ef4444" />
        <text x="440" y="368" fontSize="16" fontWeight="bold" fill="white" textAnchor="middle">EXIT</text>
      </g>
      
      {/* Mobile Device with Location Pin */}
      <g transform="translate(520, 70)" className={animate ? 'translate-y-0' : 'translate-y-10'} style={{ transition: 'transform 0.8s ease-out', transitionDelay: '1.6s' }}>
        <rect x="0" y="0" width="30" height="50" rx="5" fill="#4b5563" />
        <rect x="2" y="2" width="26" height="40" rx="3" fill="#f3f4f6" />
        <circle cx="15" cy="46" r="2" fill="#f3f4f6" />
        
        {/* Map on screen */}
        <rect x="4" y="4" width="22" height="36" rx="2" fill="#e5e7eb" />
        <rect x="6" y="8" width="18" height="2" fill="#d1d5db" />
        <rect x="6" y="12" width="18" height="2" fill="#d1d5db" />
        <rect x="6" y="16" width="18" height="2" fill="#d1d5db" />
        
        {/* Location pin */}
        <circle cx="15" cy="22" r="4" fill="#6366f1" />
        <circle cx="15" cy="22" r="2" fill="#e0e7ff" />
      </g>
      
      {/* Clouds */}
      <g className={animate ? 'opacity-100' : 'opacity-0'} style={{ transition: 'opacity 1.5s' }}>
        <g transform="translate(30, 30)">
          <ellipse cx="15" cy="15" rx="15" ry="10" fill="white" opacity="0.7" />
          <ellipse cx="25" cy="15" rx="15" ry="12" fill="white" opacity="0.7" />
          <ellipse cx="15" cy="18" rx="10" ry="7" fill="white" opacity="0.7" />
        </g>
        
        <g transform="translate(480, 40)">
          <ellipse cx="15" cy="15" rx="15" ry="10" fill="white" opacity="0.7" />
          <ellipse cx="25" cy="15" rx="15" ry="12" fill="white" opacity="0.7" />
          <ellipse cx="15" cy="18" rx="10" ry="7" fill="white" opacity="0.7" />
        </g>
      </g>
    </svg>
  );
};

export default HomePage;