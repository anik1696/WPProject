import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';

const Booking = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [vehicles, setVehicles] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  const [vehicleId, setVehicleId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [showVehicleForm, setShowVehicleForm] = useState(false);
  const [vehicleFormData, setVehicleFormData] = useState({
    vehicle_type: 'car',
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    registration_number: '',
    color: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [vehiclesRes, servicesRes] = await Promise.all([
        api.get('/vehicles'),
        api.get('/service-types')
      ]);

      setVehicles(vehiclesRes.data.data || vehiclesRes.data.vehicles || []);
      setServices(servicesRes.data.service_types || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setMessage('');
  };

  const handleAddVehicle = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/vehicles', vehicleFormData);
      const newVehicle = response.data.vehicle || response.data;
      setVehicles([...vehicles, newVehicle]);
      setVehicleId(newVehicle.id.toString());
      setShowVehicleForm(false);
      setVehicleFormData({
        vehicle_type: 'car',
        brand: '',
        model: '',
        year: new Date().getFullYear(),
        registration_number: '',
        color: ''
      });
      setMessage('Vehicle added successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to add vehicle');
    }
  };

  const submitBooking = async (e) => {
    e.preventDefault();
    setMessage('');
    setSubmitting(true);

    try {
      await api.post('/bookings', {
        vehicle_id: vehicleId,
        service_type_id: selectedService.id,
        booking_date: date,
        booking_time: time,
        notes: notes
      });

      setMessage('Booking created successfully!');
      setTimeout(() => navigate('/my-bookings'), 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to create booking');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading services..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Book a Service</h1>
          <p className="text-gray-600 mt-2">
            {selectedService ? `Booking ${selectedService.name}` : 'Choose a service to get started'}
          </p>
        </div>

        {!selectedService ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const icons = {
                'Oil Change': '🛢️',
                'Car Washing': '💧',
                'Full Checkup': '🔍',
                'Brake Service': '🛑',
                'Tire Rotation': '⚙️',
                'AC Service': '❄️'
              };
              const icon = icons[service.name] || '🔧';

              return (
                <div
                  key={service.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-200 overflow-hidden border border-gray-100"
                >
                  <div className="p-6">
                    <div className="flex justify-center mb-4">
                      <div className="text-6xl">{icon}</div>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
                      {service.name}
                    </h3>

                    <div className="flex justify-center mb-3">
                      <span className="bg-yellow-100 text-yellow-800 px-4 py-1 rounded-full text-lg font-bold">
                        ${service.price}
                      </span>
                    </div>

                    <p className="text-gray-600 text-center text-sm mb-6">
                      {service.description || 'Professional service for your vehicle'}
                    </p>

                    <button
                      onClick={() => handleServiceSelect(service)}
                      className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 rounded-lg transition shadow-md"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Booking Details</h2>
                <button
                  onClick={() => setSelectedService(null)}
                  className="text-gray-600 hover:text-gray-800 font-medium"
                >
                  ← Change Service
                </button>
              </div>

              {message && (
                <div className={`mb-6 p-4 rounded-lg ${message.includes('success')
                  ? 'bg-green-50 border border-green-200 text-green-700'
                  : 'bg-red-50 border border-red-200 text-red-700'
                  }`}>
                  {message}
                </div>
              )}

              <form onSubmit={submitBooking} className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Select Vehicle *
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowVehicleForm(!showVehicleForm)}
                      className="text-sm text-yellow-600 hover:text-yellow-700 font-semibold"
                    >
                      {showVehicleForm ? '− Cancel' : '+ Add New Vehicle'}
                    </button>
                  </div>

                  {showVehicleForm ? (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Vehicle</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
                          <select
                            value={vehicleFormData.vehicle_type}
                            onChange={(e) => setVehicleFormData({ ...vehicleFormData, vehicle_type: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
                          >
                            <option value="car">Car</option>
                            <option value="bike">Bike</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                          <input
                            type="text"
                            value={vehicleFormData.brand}
                            onChange={(e) => setVehicleFormData({ ...vehicleFormData, brand: e.target.value })}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
                            placeholder="e.g., Toyota"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                          <input
                            type="text"
                            value={vehicleFormData.model}
                            onChange={(e) => setVehicleFormData({ ...vehicleFormData, model: e.target.value })}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
                            placeholder="e.g., Camry"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                          <input
                            type="number"
                            value={vehicleFormData.year}
                            onChange={(e) => setVehicleFormData({ ...vehicleFormData, year: parseInt(e.target.value) })}
                            required
                            min="1900"
                            max={new Date().getFullYear() + 1}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Registration Number</label>
                          <input
                            type="text"
                            value={vehicleFormData.registration_number}
                            onChange={(e) => setVehicleFormData({ ...vehicleFormData, registration_number: e.target.value })}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
                            placeholder="e.g., ABC-1234"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Color (Optional)</label>
                          <input
                            type="text"
                            value={vehicleFormData.color}
                            onChange={(e) => setVehicleFormData({ ...vehicleFormData, color: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
                            placeholder="e.g., Black"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleAddVehicle}
                        className="mt-4 w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 rounded-lg transition"
                      >
                        Add Vehicle
                      </button>
                    </div>
                  ) : (
                    <select
                      value={vehicleId}
                      onChange={(e) => setVehicleId(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    >
                      <option value="">Choose a vehicle...</option>
                      {vehicles.map((vehicle) => (
                        <option key={vehicle.id} value={vehicle.id}>
                          {vehicle.brand} {vehicle.model} ({vehicle.registration_number})
                        </option>
                      ))}
                    </select>
                  )}

                  {vehicles.length === 0 && !showVehicleForm && (
                    <p className="mt-2 text-sm text-gray-500">
                      No vehicles found.{' '}
                      <button
                        type="button"
                        onClick={() => navigate('/my-vehicles')}
                        className="text-yellow-600 hover:text-yellow-700 font-semibold"
                      >
                        Add a vehicle first
                      </button>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Service *
                  </label>
                  <input
                    type="text"
                    value={selectedService.name}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date *
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time *
                    </label>
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows="4"
                    placeholder="Any specific requirements or issues..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none"
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={submitting || vehicles.length === 0}
                    className="flex-1 bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 text-gray-900 font-bold py-3 rounded-lg transition shadow-md"
                  >
                    {submitting ? 'Creating Booking...' : 'Confirm Booking'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedService(null)}
                    className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
