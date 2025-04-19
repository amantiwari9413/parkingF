import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookingModal from './BookingModal';

const ParkingSlots = () => {
  const { parkingId } = useParams();
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await fetch(`http://localhost:3000/parkingSlot/getAllByParkingAreaId?parkingAreaId=${parkingId}`);
        const data = await response.json();
        
        if (data.success) {
          const transformedSlots = data.data.map(slot => ({
            id: slot._id,
            number: slot.slotNumber,
            status: slot.isAvailable ? 'available' : 'booked'
          }));
          
          setSlots(transformedSlots);
        } else {
          setError(data.message || 'Failed to fetch parking slots');
        }
      } catch (err) {
        setError('Error fetching parking slots');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [parkingId]);

  const handleSlotSelect = (slot) => {
    if (slot.status === 'available') {
      setSelectedSlot(slot);
      setShowBookingModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowBookingModal(false);
    setSelectedSlot(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-600"></div>
          <p className="text-lg text-gray-600 animate-pulse">Loading parking slots...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 text-center transform transition-all duration-300 hover:scale-105">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 transform transition-all duration-500 hover:scale-105">
          <h1 className="text-5xl font-bold text-gray-800 mb-4 animate-fade-in bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Available Parking Slots
          </h1>
          <p className="text-xl text-gray-600 animate-fade-in-delayed">
            Select a slot to book your parking space
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {slots.map((slot, index) => (
            <div
              key={slot.id}
              onClick={() => handleSlotSelect(slot)}
              className={`group p-6 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 cursor-pointer ${
                slot.status === 'available'
                  ? 'bg-white hover:shadow-2xl hover:ring-2 hover:ring-blue-500'
                  : 'bg-gray-100 cursor-not-allowed'
              } ${
                selectedSlot?.id === slot.id
                  ? 'ring-4 ring-blue-500 scale-105 shadow-2xl'
                  : ''
              } animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100 group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-300">
                  <span className="text-2xl font-bold text-gray-800">
                    {slot.number}
                  </span>
                </div>
                <div className="mt-2">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                    slot.status === 'available'
                      ? 'bg-green-100 text-green-800 group-hover:bg-green-200'
                      : 'bg-red-100 text-red-800'
                  } transition-all duration-300`}>
                    {slot.status === 'available' ? 'Available' : 'Booked'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <BookingModal
          isOpen={showBookingModal}
          onClose={handleCloseModal}
          selectedSlot={selectedSlot}
          parkingId={parkingId}
        />
      </div>
    </div>
  );
};

export default ParkingSlots; 