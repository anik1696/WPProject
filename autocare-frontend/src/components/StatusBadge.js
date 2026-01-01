import React from 'react';

const StatusBadge = ({ status }) => {
    const getStatusStyles = () => {
        switch (status?.toLowerCase()) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            case 'confirmed':
                return 'bg-blue-100 text-blue-800 border-blue-300';
            case 'in_progress':
                return 'bg-purple-100 text-purple-800 border-purple-300';
            case 'completed':
                return 'bg-green-100 text-green-800 border-green-300';
            case 'cancelled':
                return 'bg-red-100 text-red-800 border-red-300';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    const formatStatus = (status) => {
        if (!status) return 'Unknown';
        return status.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase());
    };

    return (
        <span
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusStyles()}`}
        >
            {formatStatus(status)}
        </span>
    );
};

export default StatusBadge;
