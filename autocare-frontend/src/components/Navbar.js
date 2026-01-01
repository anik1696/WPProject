import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const isAdmin = user?.role === 'admin';

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    const navLinkClass = (path) =>
        `px-4 py-2 rounded-lg transition-all duration-200 font-medium ${isActive(path)
            ? 'bg-yellow-400 text-gray-900'
            : 'text-gray-700 hover:bg-gray-100'
        }`;

    return (
        <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    <div className="flex items-center space-x-3">
                        <Link to={isAdmin ? '/admin/dashboard' : '/dashboard'} className="flex items-center space-x-2">
                            <span className="text-3xl">🚗</span>
                            <span className="text-2xl font-bold text-gray-900">AutoCare Hub</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-2">
                        {isAdmin ? (
                            <>
                                <Link to="/admin/dashboard" className={navLinkClass('/admin/dashboard')}>
                                    Dashboard
                                </Link>
                                <Link to="/admin/bookings" className={navLinkClass('/admin/bookings')}>
                                    Bookings
                                </Link>
                                <Link to="/admin/customers" className={navLinkClass('/admin/customers')}>
                                    Customers
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/dashboard" className={navLinkClass('/dashboard')}>
                                    Dashboard
                                </Link>
                                <Link to="/booking" className={navLinkClass('/booking')}>
                                    Book Service
                                </Link>
                                <Link to="/my-bookings" className={navLinkClass('/my-bookings')}>
                                    My Bookings
                                </Link>
                                <Link to="/my-vehicles" className={navLinkClass('/my-vehicles')}>
                                    My Vehicles
                                </Link>
                                <Link to="/profile" className={navLinkClass('/profile')}>
                                    Profile
                                </Link>
                            </>
                        )}
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="hidden md:flex items-center space-x-2">
                            <span className="text-gray-700 font-medium">{user?.name}</span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                                {isAdmin ? 'Admin' : 'Customer'}
                            </span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition shadow-md"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
