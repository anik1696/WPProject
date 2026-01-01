import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';
import StatusBadge from '../components/StatusBadge';

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [recentBookings, setRecentBookings] = useState([]);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/dashboard/customer');
      setStats(response.data.stats);
      setRecentBookings(response.data.recent_bookings);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading dashboard..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Welcome back, {user?.name}! 👋</h1>
          <p className="text-gray-600 mt-2">Here's your service overview</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Bookings</p>
                <p className="text-3xl font-bold mt-2">{stats?.total_bookings || 0}</p>
              </div>
              <div className="text-5xl opacity-20">📅</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm font-medium">Pending</p>
                <p className="text-3xl font-bold mt-2">{stats?.pending_bookings || 0}</p>
              </div>
              <div className="text-5xl opacity-20">⏳</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Completed</p>
                <p className="text-3xl font-bold mt-2">{stats?.completed_bookings || 0}</p>
              </div>
              <div className="text-5xl opacity-20">✅</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">My Vehicles</p>
                <p className="text-3xl font-bold mt-2">{stats?.total_vehicles || 0}</p>
              </div>
              <div className="text-5xl opacity-20">🚗</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={() => navigate('/booking')}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-6 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <div className="text-4xl mb-2">📝</div>
            <div className="text-xl">Book New Service</div>
          </button>

          <button
            onClick={() => navigate('/my-vehicles')}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-6 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <div className="text-4xl mb-2">🚙</div>
            <div className="text-xl">Manage Vehicles</div>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Recent Bookings</h2>
            <button
              onClick={() => navigate('/my-bookings')}
              className="text-purple-600 hover:text-purple-700 font-semibold"
            >
              View All →
            </button>
          </div>

          {recentBookings.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-gray-500 text-lg">No bookings yet</p>
              <button
                onClick={() => navigate('/booking')}
                className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold"
              >
                Create Your First Booking
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-800">
                          {booking.vehicle?.brand} {booking.vehicle?.model}
                        </h3>
                        <StatusBadge status={booking.status} />
                      </div>
                      <p className="text-sm text-gray-600">
                        Service: <span className="font-medium">{booking.service_type?.name}</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Date: {new Date(booking.booking_date).toLocaleDateString()} at {booking.booking_time}
                      </p>
                      {booking.final_cost && (
                        <p className="text-sm text-gray-600">
                          Cost: <span className="font-semibold text-green-600">${booking.final_cost}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;