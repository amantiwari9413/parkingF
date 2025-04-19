import React, { useState, useEffect, useRef } from 'react';
import jsQR from 'jsqr';

const QRCodeScanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [isScanning, setIsScanning] = useState(true);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const requestRef = useRef(null);

  // Initialize camera
  useEffect(() => {
    let stream = null;

    async function setupCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" }
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        setError("Error accessing camera: " + err.message);
      }
    }

    if (isScanning && !scanResult) {
      setupCamera();
    }

    // Cleanup function
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isScanning, scanResult]);

  // Process frames for QR detection
  useEffect(() => {
    const processFrame = () => {
      if (!videoRef.current || !canvasRef.current || !isScanning || scanResult) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d', { willReadFrequently: true });

      // Wait for video to be ready
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        // Set canvas dimensions to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Draw video frame to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Get image data for QR processing
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        
        // Process with jsQR
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        });
        
        if (code) {
          handleQRDetection(code.data);
          return;
        }
      }
      
      // Continue scanning
      requestRef.current = requestAnimationFrame(processFrame);
    };

    if (isScanning && !scanResult) {
      requestRef.current = requestAnimationFrame(processFrame);
    }

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isScanning, scanResult]);

  const handleQRDetection = async (data) => {
    if (data) {
      // Stop scanning
      setIsScanning(false);
      setScanResult(data);
      setIsLoading(true);
      setError(null);

      try {
        // Process the URL from QR code
        const response = await fetch(data, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('accessToken'),
          }
        });

        const result = await response.json();

        if (result.success) {
          // Extract only the required fields
          const { parkingDuration, totalAmount } = result.data;
          setBookingDetails({ parkingDuration, totalAmount });
        } else {
          setError(result.message || 'Failed to process booking');
        }
      } catch (err) {
        setError('Error processing the QR code: ' + err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Function to restart scanning
  const restartScan = () => {
    setScanResult(null);
    setBookingDetails(null);
    setError(null);
    setIsScanning(true);
  };

  return (
    <div className="flex flex-col items-center p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Parking QR Scanner</h1>
      
      {isScanning && !scanResult && (
        <div className="w-full relative overflow-hidden rounded-lg">
          <video 
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full"
          />
          <canvas 
            ref={canvasRef} 
            className="absolute top-0 left-0 w-full h-full" 
            style={{ display: 'none' }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 border-2 border-blue-500 rounded-lg opacity-70">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-500 rounded-tl"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-500 rounded-tr"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-500 rounded-bl"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500 rounded-br"></div>
            </div>
          </div>
          <p className="text-center mt-4 text-gray-600">Please align the QR code within the frame</p>
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center items-center mt-6">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="ml-3">Processing...</p>
        </div>
      )}

      {error && (
        <div className="mt-6 w-full p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
          <p>{error}</p>
          <button 
            onClick={restartScan}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {bookingDetails && (
        <div className="mt-6 w-full">
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-center text-gray-800 mb-6">
              Booking Details
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <span className="text-gray-700">Parking Duration:</span>
                <span className="text-lg font-semibold">{bookingDetails.parkingDuration} hours</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <span className="text-gray-700">Total Amount:</span>
                <span className="text-lg font-semibold">₹{bookingDetails.totalAmount}</span>
              </div>
            </div>
            
            <button 
              onClick={restartScan}
              className="mt-8 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-colors"
            >
              Scan Another Code
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRCodeScanner;