import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';

const ServiceHistory = () => {
    const [loading, setLoading] = useState(true);
    const [serviceHistory, setServiceHistory] = useState([]);

    useEffect(() => {
        fetchServiceHistory();
    }, []);

    const fetchServiceHistory = async () => {
        try {
            const response = await api.get('/service-history');
            setServiceHistory(response.data.service_history || []);
        } catch (error) {
            console.error('Error fetching service history:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePrint = (booking) => {
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>Service Invoice</title>');
        printWindow.document.write('<style>body{font-family:Arial,sans-serif;padding:20px;}h1{color:#6b46c1;}.details{margin:20px 0;}.row{display:flex;justify-content:space-between;margin:10px 0;}</style>');
        printWindow.document.write('</head><body>');
        printWindow.document.write('<h1>AutoCare Hub - Service Invoice</h1>');
        printWindow.document.write(`<div class="details">`);
        printWindow.document.write(`<div class="row"><strong>Service:</strong> ${booking.service_type?.name}</div>`);
        printWindow.document.write(`<div class="row"><strong>Vehicle:</strong> ${booking.vehicle?.brand} ${booking.vehicle?.model} (${booking.vehicle?.registration_number})</div>`);
        printWindow.document.write(`<div class="row"><strong>Date:</strong> ${new Date(booking.completed_at).toLocaleDateString()}</div>`);
        printWindow.document.write(`<div class="row"><strong>Cost:</strong> $${booking.final_cost}</div>`);
        if (booking.admin_notes) {
            printWindow.document.write(`<div class="row"><strong>Notes:</strong> ${booking.admin_notes}</div>`);
        }
        printWindow.document.write(`</div>`);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    };

    if (loading) {
        return <LoadingSpinner message="Loading service history..." />;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">Service History</h1>
                    <p className="text-gray-600 mt-2">View your completed services</p>
                </div>

                {serviceHistory.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                        <div className="text-6xl mb-4">📋</div>
                        <p className="text-gray-500 text-lg">No service history yet</p>
                        <p className="text-gray-400 mt-2">Your completed services will appear here</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {serviceHistory.map((service) => (
                            <div
                                key={service.id}
                                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                    <div className="flex-1 mb-4 md:mb-0">
                                        <div className="flex items-center space-x-3 mb-3">
                                            <h3 className="text-xl font-bold text-gray-800">
                                                {service.vehicle?.brand} {service.vehicle?.model}
                                            </h3>
                                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                                                COMPLETED
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                                            <p>
                                                <span className="font-semibold">Service:</span> {service.service_type?.name}
                                            </p>
                                            <p>
                                                <span className="font-semibold">Registration:</span> {service.vehicle?.registration_number}
                                            </p>
                                            <p>
                                                <span className="font-semibold">Completed:</span>{' '}
                                                {new Date(service.completed_at).toLocaleDateString()}
                                            </p>
                                            <p>
                                                <span className="font-semibold">Cost:</span>{' '}
                                                <span className="text-green-600 font-bold">${service.final_cost}</span>
                                            </p>
                                        </div>

                                        {service.admin_notes && (
                                            <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                                                <p className="text-sm text-blue-800">
                                                    <span className="font-semibold">Service Notes:</span> {service.admin_notes}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col space-y-2">
                                        <button
                                            onClick={() => handlePrint(service)}
                                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold transition"
                                        >
                                            🖨️ Print Invoice
                                        </button>
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

export default ServiceHistory;
