import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import Navbar from '../../components/Navbar';
import LoadingSpinner from '../../components/LoadingSpinner';
import StatusBadge from '../../components/StatusBadge';

const AdminBookings = () => {
    const [loading, setLoading] = useState(true);
    const [bookings, setBookings] = useState([]);
    const [filter, setFilter] = useState('all');
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [updateData, setUpdateData] = useState({
        status: '',
        final_cost: '',
        admin_notes: ''
    });

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await api.get('/admin/bookings');
            setBookings(response.data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateBooking = async (e) => {
        e.preventDefault();
        try {
            await api.patch(`/bookings/${selectedBooking.id}/status`, updateData);
            alert('Booking updated successfully');
            setShowModal(false);
            setSelectedBooking(null);
            fetchBookings();
        } catch (error) {
            alert('Failed to update booking');
        }
    };

    const openUpdateModal = (booking) => {
        setSelectedBooking(booking);
        setUpdateData({
            status: booking.status,
            final_cost: booking.final_cost || '',
            admin_notes: booking.admin_notes || ''
        });
        setShowModal(true);
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
                    <h1 className="text-4xl font-bold text-gray-800">Booking Management</h1>
                    <p className="text-gray-600 mt-2">Manage all customer bookings</p>
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
                        <p className="text-gray-500 text-lg">No bookings found</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredBookings.map((booking) => (
                            <div
                                key={booking.id}
                                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
                            >
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                                    <div className="flex-1 mb-4 md:mb-0">
                                        <div className="flex items-center space-x-3 mb-3">
                                            <h3 className="text-xl font-bold text-gray-800">
                                                {booking.user?.name}
                                            </h3>
                                            <StatusBadge status={booking.status} />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                                            <p>
                                                <span className="font-semibold">Vehicle:</span> {booking.vehicle?.brand} {booking.vehicle?.model}
                                            </p>
                                            <p>
                                                <span className="font-semibold">Registration:</span> {booking.vehicle?.registration_number}
                                            </p>
                                            <p>
                                                <span className="font-semibold">Service:</span> {booking.service_type?.name}
                                            </p>
                                            <p>
                                                <span className="font-semibold">Date:</span> {new Date(booking.booking_date).toLocaleDateString()}
                                            </p>
                                            <p>
                                                <span className="font-semibold">Time:</span> {booking.booking_time}
                                            </p>
                                            <p>
                                                <span className="font-semibold">Customer Phone:</span> {booking.user?.phone}
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
                                                    <span className="font-semibold">Customer Notes:</span> {booking.notes}
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
                                        <button
                                            onClick={() => openUpdateModal(booking)}
                                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold transition"
                                        >
                                            Update Booking
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}


                {showModal && selectedBooking && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Update Booking</h2>

                            <form onSubmit={handleUpdateBooking} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Status
                                    </label>
                                    <select
                                        value={updateData.status}
                                        onChange={(e) => setUpdateData({ ...updateData, status: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="confirmed">Confirmed</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Final Cost ($)
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={updateData.final_cost}
                                        onChange={(e) => setUpdateData({ ...updateData, final_cost: e.target.value })}
                                        placeholder="Enter final cost"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Admin Notes
                                    </label>
                                    <textarea
                                        value={updateData.admin_notes}
                                        onChange={(e) => setUpdateData({ ...updateData, admin_notes: e.target.value })}
                                        rows="4"
                                        placeholder="Add notes about the service..."
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
                                    />
                                </div>

                                <div className="flex space-x-4">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold"
                                    >
                                        Update Booking
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowModal(false);
                                            setSelectedBooking(null);
                                        }}
                                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold"
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

export default AdminBookings;
