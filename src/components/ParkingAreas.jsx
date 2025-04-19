import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ParkingAreas = () => {
  const { city } = useParams();
  const navigate = useNavigate();
  const [parkingAreas, setParkingAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParkingAreas = async () => {
      try {
        const response = await fetch('http://localhost:3000/parkingArea/getAll');
        const data = await response.json();
        
        if (data.success) {
          // Filter parking areas by city if city parameter exists
          const filteredAreas = city 
            ? data.data.filter(area => area.city.toLowerCase() === city.toLowerCase())
            : data.data;
          
          setParkingAreas(filteredAreas);
        } else {
          setError(data.message || 'Failed to fetch parking areas');
        }
      } catch (err) {
        setError('Error fetching parking areas');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchParkingAreas();
  }, [city]);

  const handleParkingAreaClick = (parkingId) => {
    navigate(`/parking-slots/${parkingId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (parkingAreas.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Parking Areas Found</h2>
          <p className="text-gray-600">There are no parking areas available in {city}.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 transform transition-all duration-500 hover:scale-105">
          <h1 className="text-5xl font-bold text-gray-800 mb-4 animate-fade-in">
            Parking Areas in {city}
          </h1>
          <p className="text-xl text-gray-600 animate-fade-in-delayed">
            Choose your preferred parking spot
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {parkingAreas.map((area, index) => (
            <div
              key={area._id}
              onClick={() => handleParkingAreaClick(area._id)}
              className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-fade-in cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold text-gray-800">{area.name}</h2>
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                    {area.pricePerHour}₹/hour
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{area.location}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>{area.contactNumber}</span>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-xl font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  View Slots
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParkingAreas; 