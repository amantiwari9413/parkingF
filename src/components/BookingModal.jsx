import { useState } from 'react';

const BookingModal = ({ isOpen, onClose, selectedSlot, parkingId }) => {
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    phoneNumber: '',
    vehicleNumber: '',
  });

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      const bookingData = {
        slotId: selectedSlot.id,
        customerName: bookingDetails.name,
        phoneNumber: bookingDetails.phoneNumber,
        vehicleNumber: bookingDetails.vehicleNumber,
        parkingAreaId: parkingId
      };

      const response = await fetch('http://localhost:3000/booking/createBooking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(bookingData).toString()
      });

      // For image response, we first need to check the content type
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('image')) {
        // If the response is an image, get it as a blob
        const imageBlob = await response.blob();
        // Create a URL for the blob
        const imageUrl = URL.createObjectURL(imageBlob);
        // Create an anchor element for downloading
        const downloadLink = document.createElement('a');
        downloadLink.href = imageUrl;
        downloadLink.download = `booking-confirmation-${new Date().getTime()}.png`;
        
        // Append to the body, click it, and remove it
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        // Clean up the blob URL
        URL.revokeObjectURL(imageUrl);
        
        // Reset form and close modal
        onClose();
        setBookingDetails({
          name: '',
          phoneNumber: '',
          vehicleNumber: '',
          hours: 1
        });
      } else {
        // If not an image, handle as JSON response as before
        const result = await response.json();
        if (result.success) {
          alert('Booking successful! Your booking ID: ' + result.data._id);
          onClose();
          setBookingDetails({
            name: '',
            phoneNumber: '',
            vehicleNumber: '',
            hours: 1
          });
        } else {
          alert('Booking failed: ' + result.message);
        }
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Failed to create booking. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg transform transition-all duration-300 animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Book Slot {selectedSlot?.number}
          </h2>
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-xl font-bold text-blue-600">{selectedSlot?.number}</span>
          </div>
        </div>

        <form onSubmit={handleBookingSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={bookingDetails.name}
                onChange={(e) => setBookingDetails({ ...bookingDetails, name: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-gray-400"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={bookingDetails.phoneNumber}
                onChange={(e) => setBookingDetails({ ...bookingDetails, phoneNumber: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-gray-400"
                placeholder="Enter phone number"
                required
                pattern="[0-9]{10}"
                title="Please enter a valid 10-digit phone number"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehicle Number
              </label>
              <input
                type="text"
                value={bookingDetails.vehicleNumber}
                onChange={(e) => setBookingDetails({ ...bookingDetails, vehicleNumber: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-gray-400"
                placeholder="Enter vehicle number"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl text-lg font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;