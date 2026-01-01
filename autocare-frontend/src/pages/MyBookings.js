import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';
import StatusBadge from '../components/StatusBadge';

const MyBookings = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [bookings, setBookings] = useState([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await api.get('/bookings');
            setBookings(response.data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelBooking = async (bookingId) => {
        if (!window.confirm('Are you sure you want to cancel this booking?')) {
            return;
        }

        try {
            await api.patch(`/bookings/${bookingId}/cancel`);
            alert('Booking cancelled successfully');
            fetchBookings();
        } catch (error) {
            alert('Failed to cancel booking');
        }
    };

    const filteredBookings = bookings.filter((booking) => {
        if (filter === 'all') return true;
        return booking.status === filter;
    });

    if (loading) {
        return <LoadingSpinner message="Loading bookings..." />;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">My Bookings</h1>
                    <p className="text-gray-600 mt-2">View and manage your service bookings</p>
                </div>


                <div className="bg-white rounded-xl shadow-md p-4 mb-6">
                    <div className="flex flex-wrap gap-2">
                        {['all', 'pending', 'confirmed', 'in_progress', 'completed', 'cancelled'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`px-4 py-2 rounded-lg font-semibold transition-all ${filter === status
                                    ? 'bg-yellow-400 text-white shadow-md'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {status === 'all' ? 'All' : status.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                            </button>
                        ))}
                    </div>
                </div>


                {filteredBookings.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                        <div className="text-6xl mb-4">📭</div>
                        <p className="text-gray-500 text-lg mb-4">No bookings found</p>
                        <button
                            onClick={() => navigate('/booking')}
                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold"
                        >
                            Create New Booking
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredBookings.map((booking) => (
                            <div
                                key={booking.id}
                                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                    <div className="flex-1 mb-4 md:mb-0">
                                        <div className="flex items-center space-x-3 mb-3">
                                            <h3 className="text-xl font-bold text-gray-800">
                                                {booking.vehicle?.brand} {booking.vehicle?.model}
                                            </h3>
                                            <StatusBadge status={booking.status} />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                                            <p>
                                                <span className="font-semibold">Service:</span> {booking.service_type?.name}
                                            </p>
                                            <p>
                                                <span className="font-semibold">Registration:</span> {booking.vehicle?.registration_number}
                                            </p>
                                            <p>
                                                <span className="font-semibold">Date:</span> {new Date(booking.booking_date).toLocaleDateString()}
                                            </p>
                                            <p>
                                                <span className="font-semibold">Time:</span> {booking.booking_time}
                                            </p>
                                            {booking.final_cost && (
                                                <p>
                                                    <span className="font-semibold">Cost:</span>{' '}
                                                    <span className="text-green-600 font-bold">${booking.final_cost}</span>
                                                </p>
                                            )}
                                        </div>

                                        {booking.notes && (
                                            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                                                <p className="text-sm text-gray-600">
                                                    <span className="font-semibold">Notes:</span> {booking.notes}
                                                </p>
                                            </div>
                                        )}

                                        {booking.admin_notes && (
                                            <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                                                <p className="text-sm text-blue-800">
                                                    <span className="font-semibold">Admin Notes:</span> {booking.admin_notes}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col space-y-2">
                                        {booking.status === 'pending' && (
                                            <button
                                                onClick={() => handleCancelBooking(booking.id)}
                                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition"
                                            >
                                                Cancel Booking
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookings;
