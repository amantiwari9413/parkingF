import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [city, setCity] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      navigate(`/parking-areas/${city}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full mx-auto">
        <div className="text-center mb-12 transform transition-all duration-500 hover:scale-105">
          <h1 className="text-6xl font-bold text-gray-800 mb-4 animate-fade-in">
            Find Parking Spaces
          </h1>
          <p className="text-xl text-gray-600 animate-fade-in-delayed">
            Enter your city to discover available parking areas
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 transform transition-all duration-300 hover:shadow-3xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative group">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                City Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-gray-400 bg-white cursor-text outline-none"
                  placeholder="Enter your city"
                  required
                  autoComplete="off"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl text-lg font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Find Parking Areas
            </button>
          </form>
        </div>

        <div className="mt-16 transform transition-all duration-500 hover:scale-105">
          <svg
            className="w-full h-64"
            viewBox="0 0 500 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="50" y="50" width="400" height="100" fill="#E5E7EB" className="animate-pulse" />
            <rect x="70" y="70" width="60" height="60" fill="#3B82F6" className="animate-bounce" style={{ animationDelay: '0.1s' }} />
            <rect x="150" y="70" width="60" height="60" fill="#3B82F6" className="animate-bounce" style={{ animationDelay: '0.2s' }} />
            <rect x="230" y="70" width="60" height="60" fill="#3B82F6" className="animate-bounce" style={{ animationDelay: '0.3s' }} />
            <rect x="310" y="70" width="60" height="60" fill="#3B82F6" className="animate-bounce" style={{ animationDelay: '0.4s' }} />
            <rect x="390" y="70" width="60" height="60" fill="#3B82F6" className="animate-bounce" style={{ animationDelay: '0.5s' }} />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 

