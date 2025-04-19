import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [slotData, setSlotData] = useState({
    slotNumber: '',
    isAvailable: true,
    parkingAreaId: localStorage.getItem('parkingAreaId')
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [slots, setSlots] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('slots'); // 'slots' or 'bookings'
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in and has parkingAreaId
    const accessToken = localStorage.getItem('accessToken');
    const parkingAreaId = localStorage.getItem('parkingAreaId');
    
    if (!accessToken || !parkingAreaId) {
      navigate('/admin');
      return;
    }

    // Fetch initial data
    fetchSlots();
    fetchBookings();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const formData = new URLSearchParams();
      formData.append('slotNumber', slotData.slotNumber);
      formData.append('isAvailable', slotData.isAvailable);
      formData.append('parkingAreaId', slotData.parkingAreaId);

      const response = await fetch('http://localhost:3000/parkingSlot/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': localStorage.getItem('accessToken')
        },
        body: formData.toString(),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Parking slot created successfully!');
        setSlotData({
          ...slotData,
          slotNumber: ''
        });
        fetchSlots();
      } else {
        setError(data.message || 'Failed to create parking slot');
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
      console.error('Error:', error);
    }
  };

  const handleDeleteSlot = async (slotId) => {
    if (!window.confirm('Are you sure you want to delete this parking slot?')) {
      return;
    }

    try {
      const formData = new URLSearchParams();
      formData.append('parkingAreaId', slotData.parkingAreaId);
      formData.append('id', slotId);

      const response = await fetch('http://localhost:3000/parkingSlot/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': localStorage.getItem('accessToken')
        },
        body: formData.toString(),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Parking slot deleted successfully!');
        fetchSlots();
      } else {
        setError(data.message || 'Failed to delete parking slot');
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
      console.error('Error:', error);
    }
  };

  const fetchSlots = async () => {
    try {
      const response = await fetch(`http://localhost:3000/parkingSlot/getAllByParkingAreaId?parkingAreaId=${slotData.parkingAreaId}`, {
        headers: {
          'Authorization': localStorage.getItem('accessToken')
        }
      });
      const data = await response.json();
      if (data.success) {
        setSlots(data.data);
      }
    } catch (error) {
      console.error('Error fetching slots:', error);
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await fetch(`http://localhost:3000/booking/getAllBooking?parkingAreaId=${slotData.parkingAreaId}`, {
        headers: {
          'Authorization': localStorage.getItem('accessToken')
        }
      });
      const data = await response.json();
      if (data.success) {
        setBookings(data.data);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSlotData({
      ...slotData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('parkingAreaId');
    localStorage.removeItem('parkingAreaName');
    navigate('/admin');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            {localStorage.getItem('parkingAreaName')} Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/admin/scanner')}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              QR Scanner
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="mb-4 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('slots')}
              className={`${
                activeTab === 'slots'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Parking Slots
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`${
                activeTab === 'bookings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Bookings
            </button>
          </nav>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            {success}
          </div>
        )}

        {activeTab === 'slots' && (
          <>
            {/* Add Slot Form */}
            <div className="bg-white shadow rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Add New Parking Slot</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="slotNumber" className="block text-sm font-medium text-gray-700">
                    Slot Number
                  </label>
                  <input
                    type="text"
                    id="slotNumber"
                    name="slotNumber"
                    value={slotData.slotNumber}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    required
                    placeholder="Enter slot number"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isAvailable"
                    name="isAvailable"
                    checked={slotData.isAvailable}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isAvailable" className="ml-2 block text-sm text-gray-900">
                    Available
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add Slot
                </button>
              </form>
            </div>

            {/* Slots List */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Parking Slots</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {slots.map((slot) => (
                  <div
                    key={slot._id}
                    className={`p-4 rounded-lg border ${
                      slot.isAvailable ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium">Slot {slot.slotNumber}</span>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            slot.isAvailable
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {slot.isAvailable ? 'Available' : 'Occupied'}
                        </span>
                        <button
                          onClick={() => handleDeleteSlot(slot._id)}
                          className="p-1 text-red-600 hover:text-red-800"
                          title="Delete Slot"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'bookings' && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">All Bookings</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vehicle Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Booking Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookings.map((booking) => (
                    <tr key={booking._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {booking.customerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {booking.phoneNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {booking.vehicleNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(booking.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            booking.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard; 