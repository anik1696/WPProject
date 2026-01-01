import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import Navbar from '../../components/Navbar';
import LoadingSpinner from '../../components/LoadingSpinner';
import StatusBadge from '../../components/StatusBadge';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState(null);
    const [recentBookings, setRecentBookings] = useState([]);
    const [todayBookings, setTodayBookings] = useState([]);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const response = await api.get('/dashboard/admin');
            setStats(response.data.stats);
            setRecentBookings(response.data.recent_bookings);
            setTodayBookings(response.data.today_bookings);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <LoadingSpinner message="Loading admin dashboard..." />;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard 📊</h1>
                    <p className="text-gray-600 mt-2">Overview of all bookings and statistics</p>
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

                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-purple-100 text-sm font-medium">In Progress</p>
                                <p className="text-3xl font-bold mt-2">{stats?.in_progress_bookings || 0}</p>
                            </div>
                            <div className="text-5xl opacity-20">🔧</div>
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

                    <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-indigo-100 text-sm font-medium">Total Customers</p>
                                <p className="text-3xl font-bold mt-2">{stats?.total_customers || 0}</p>
                            </div>
                            <div className="text-5xl opacity-20">👥</div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl shadow-lg p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-cyan-100 text-sm font-medium">Total Vehicles</p>
                                <p className="text-3xl font-bold mt-2">{stats?.total_vehicles || 0}</p>
                            </div>
                            <div className="text-5xl opacity-20">🚗</div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-emerald-100 text-sm font-medium">Total Revenue</p>
                                <p className="text-3xl font-bold mt-2">${stats?.total_revenue || 0}</p>
                            </div>
                            <div className="text-5xl opacity-20">💰</div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-red-100 text-sm font-medium">Cancelled</p>
                                <p className="text-3xl font-bold mt-2">{stats?.cancelled_bookings || 0}</p>
                            </div>
                            <div className="text-5xl opacity-20">❌</div>
                        </div>
                    </div>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <button
                        onClick={() => navigate('/admin/bookings')}
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-6 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
                    >
                        <div className="text-4xl mb-2">📋</div>
                        <div className="text-xl">Manage Bookings</div>
                    </button>

                    <button
                        onClick={() => navigate('/admin/customers')}
                        className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-6 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
                    >
                        <div className="text-4xl mb-2">👥</div>
                        <div className="text-xl">View Customers</div>
                    </button>
                </div>


                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Today's Bookings</h2>
                    {todayBookings.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">No bookings scheduled for today</p>
                    ) : (
                        <div className="space-y-4">
                            {todayBookings.map((booking) => (
                                <div
                                    key={booking.id}
                                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <h3 className="font-semibold text-gray-800">
                                                    {booking.user?.name} - {booking.vehicle?.brand} {booking.vehicle?.model}
                                                </h3>
                                                <StatusBadge status={booking.status} />
                                            </div>
                                            <p className="text-sm text-gray-600">
                                                Service: {booking.service_type?.name} at {booking.booking_time}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>


                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Recent Bookings</h2>
                        <button
                            onClick={() => navigate('/admin/bookings')}
                            className="text-purple-600 hover:text-purple-700 font-semibold"
                        >
                            View All →
                        </button>
                    </div>

                    <div className="space-y-4">
                        {recentBookings.slice(0, 5).map((booking) => (
                            <div
                                key={booking.id}
                                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <h3 className="font-semibold text-gray-800">
                                                {booking.user?.name}
                                            </h3>
                                            <StatusBadge status={booking.status} />
                                        </div>
                                        <p className="text-sm text-gray-600">
                                            {booking.vehicle?.brand} {booking.vehicle?.model} - {booking.service_type?.name}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {new Date(booking.booking_date).toLocaleDateString()} at {booking.booking_time}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
