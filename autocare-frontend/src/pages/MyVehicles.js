import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';

const MyVehicles = () => {
    const [loading, setLoading] = useState(true);
    const [vehicles, setVehicles] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingVehicle, setEditingVehicle] = useState(null);
    const [formData, setFormData] = useState({
        vehicle_type: 'car',
        brand: '',
        model: '',
        year: new Date().getFullYear(),
        registration_number: '',
        color: ''
    });

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        try {
            const response = await api.get('/vehicles');
            setVehicles(response.data.data || response.data.vehicles || []);
        } catch (error) {
            console.error('Error fetching vehicles:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingVehicle) {
                await api.put(`/vehicles/${editingVehicle.id}`, formData);
                alert('Vehicle updated successfully');
            } else {
                await api.post('/vehicles', formData);
                alert('Vehicle added successfully');
            }
            resetForm();
            fetchVehicles();
        } catch (error) {
            alert('Failed to save vehicle');
        }
    };

    const handleEdit = (vehicle) => {
        setEditingVehicle(vehicle);
        setFormData({
            vehicle_type: vehicle.vehicle_type,
            brand: vehicle.brand,
            model: vehicle.model,
            year: vehicle.year,
            registration_number: vehicle.registration_number,
            color: vehicle.color || ''
        });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this vehicle?')) {
            return;
        }
        try {
            await api.delete(`/vehicles/${id}`);
            alert('Vehicle deleted successfully');
            fetchVehicles();
        } catch (error) {
            alert('Failed to delete vehicle');
        }
    };

    const resetForm = () => {
        setFormData({
            vehicle_type: 'car',
            brand: '',
            model: '',
            year: new Date().getFullYear(),
            registration_number: '',
            color: ''
        });
        setEditingVehicle(null);
        setShowForm(false);
    };

    if (loading) {
        return <LoadingSpinner message="Loading vehicles..." />;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-800">My Vehicles</h1>
                        <p className="text-gray-600 mt-2">Manage your vehicles</p>
                    </div>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition"
                    >
                        {showForm ? 'Cancel' : '+ Add Vehicle'}
                    </button>
                </div>


                {showForm && (
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            {editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Vehicle Type
                                    </label>
                                    <select
                                        value={formData.vehicle_type}
                                        onChange={(e) => setFormData({ ...formData, vehicle_type: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
                                    >
                                        <option value="car">Car</option>
                                        <option value="bike">Bike</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                                    <input
                                        type="text"
                                        value={formData.brand}
                                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                                    <input
                                        type="text"
                                        value={formData.model}
                                        onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                                    <input
                                        type="number"
                                        value={formData.year}
                                        onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                                        required
                                        min="1900"
                                        max={new Date().getFullYear() + 1}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Registration Number
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.registration_number}
                                        onChange={(e) => setFormData({ ...formData, registration_number: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                                    <input
                                        type="text"
                                        value={formData.color}
                                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
                                    />
                                </div>
                            </div>

                            <div className="flex space-x-4">
                                <button
                                    type="submit"
                                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold"
                                >
                                    {editingVehicle ? 'Update Vehicle' : 'Add Vehicle'}
                                </button>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}


                {vehicles.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                        <div className="text-6xl mb-4">🚗</div>
                        <p className="text-gray-500 text-lg mb-4">No vehicles added yet</p>
                        <button
                            onClick={() => setShowForm(true)}
                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold"
                        >
                            Add Your First Vehicle
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {vehicles.map((vehicle) => (
                            <div
                                key={vehicle.id}
                                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-4xl">{vehicle.vehicle_type === 'car' ? '🚗' : '🏍️'}</span>
                                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                                        {vehicle.vehicle_type.toUpperCase()}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-gray-800 mb-2">
                                    {vehicle.brand} {vehicle.model}
                                </h3>

                                <div className="space-y-2 text-sm text-gray-600 mb-4">
                                    <p><span className="font-semibold">Year:</span> {vehicle.year}</p>
                                    <p><span className="font-semibold">Registration:</span> {vehicle.registration_number}</p>
                                    {vehicle.color && (
                                        <p><span className="font-semibold">Color:</span> {vehicle.color}</p>
                                    )}
                                </div>

                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleEdit(vehicle)}
                                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(vehicle.id)}
                                        className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyVehicles;
