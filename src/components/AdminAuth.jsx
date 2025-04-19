import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminAuth = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    pricePerHour: '',
    location: '',
    city: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!isSignIn && formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const endpoint = isSignIn 
        ? 'http://localhost:3000/parkingArea/login'
        : 'http://localhost:3000/parkingArea/create';

      const formDataToSend = new URLSearchParams();
      if (isSignIn) {
        formDataToSend.append('contactNumber', formData.contactNumber);
        formDataToSend.append('password', formData.password);
      } else {
        formDataToSend.append('name', formData.name);
        formDataToSend.append('contactNumber', formData.contactNumber);
        formDataToSend.append('pricePerHour', formData.pricePerHour);
        formDataToSend.append('location', formData.location);
        formDataToSend.append('city', formData.city);
        formDataToSend.append('password', formData.password);
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formDataToSend.toString(),
      });

      const data = await response.json();

      if (data.success) {
        if (isSignIn) {
          // Store tokens and parking area data
          localStorage.setItem('accessToken', data.data.accessToken);
          localStorage.setItem('refreshToken', data.data.refreshToken);
          localStorage.setItem('parkingAreaId', data.data.ParkingAreaData.parkingArea_id);
          localStorage.setItem('parkingAreaName', data.data.ParkingAreaData.ParkingAreaName);
          
          setSuccess('Login successful!');
          setTimeout(() => {
            navigate('/admin/dashboard');
          }, 2000);
        } else {
          setSuccess('Parking area created successfully!');
          // Reset form
          setFormData({
            name: '',
            contactNumber: '',
            pricePerHour: '',
            location: '',
            city: '',
            password: '',
            confirmPassword: ''
          });
          // Switch to sign in mode
          setIsSignIn(true);
        }
      } else {
        setError(data.message || (isSignIn ? 'Login failed' : 'Failed to create parking area'));
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
      console.error('Error:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isSignIn ? 'Parking Area Login' : 'Create Parking Area'}
          </h2>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
            {success}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            {!isSignIn && (
              <>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Parking Area Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required={!isSignIn}
                    value={formData.name}
                    onChange={handleInputChange}
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Enter parking area name"
                  />
                </div>

                <div>
                  <label htmlFor="pricePerHour" className="block text-sm font-medium text-gray-700">
                    Price Per Hour (₹)
                  </label>
                  <input
                    id="pricePerHour"
                    name="pricePerHour"
                    type="number"
                    required={!isSignIn}
                    min="0"
                    step="0.01"
                    value={formData.pricePerHour}
                    onChange={handleInputChange}
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Enter price per hour"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    required={!isSignIn}
                    value={formData.location}
                    onChange={handleInputChange}
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Enter location"
                  />
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    required={!isSignIn}
                    value={formData.city}
                    onChange={handleInputChange}
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Enter city"
                  />
                </div>
              </>
            )}

            <div>
              <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
                Contact Number
              </label>
              <input
                id="contactNumber"
                name="contactNumber"
                type="tel"
                required
                value={formData.contactNumber}
                onChange={handleInputChange}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Enter contact number"
                pattern="[0-9]{10}"
                title="Please enter a valid 10-digit phone number"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Enter password"
              />
            </div>

            {!isSignIn && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required={!isSignIn}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm password"
                />
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isSignIn ? 'Login' : 'Create Parking Area'}
            </button>
          </div>
        </form>

        <div className="text-center">
          <button
            onClick={() => {
              setIsSignIn(!isSignIn);
              setFormData({
                name: '',
                contactNumber: '',
                pricePerHour: '',
                location: '',
                city: '',
                password: '',
                confirmPassword: ''
              });
            }}
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            {isSignIn 
              ? "Don't have a parking area? Create one" 
              : "Already have a parking area? Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAuth; 