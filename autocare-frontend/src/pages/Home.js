import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">🚗</span>
              <span className="text-2xl font-bold text-gray-900">AutoCare Hub</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-900 font-medium hover:text-gray-600 transition">Home</a>
              <a href="#services" className="text-gray-600 hover:text-gray-900 transition">Services</a>
              <a href="#about" className="text-gray-600 hover:text-gray-900 transition">About</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 transition">Contact</a>
            </div>

            <button
              onClick={() => navigate('/login')}
              className="px-6 py-2 border-2 border-gray-900 text-gray-900 rounded-lg font-medium hover:bg-gray-900 hover:text-white transition duration-200"
            >
              Sign In
            </button>
          </div>
        </div>
      </nav>

      <div className="relative bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Professional Vehicle<br />Service & Maintenance
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Book your car or bike service online. Expert technicians, quality parts, and hassle-free experience.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => navigate('/register')}
                className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-lg transition duration-200 shadow-md"
              >
                Book Service Now
              </button>
              <button
                onClick={() => navigate('/login')}
                className="px-8 py-3 bg-white border-2 border-gray-900 text-gray-900 font-bold rounded-lg hover:bg-gray-50 transition duration-200"
              >
                Sign In
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-6xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Quick Booking</h3>
              <p className="text-gray-600">Book your service in just a few clicks</p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">🔧</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Service</h3>
              <p className="text-gray-600">Certified technicians for all brands</p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Best Prices</h3>
              <p className="text-gray-600">Transparent pricing with no hidden costs</p>
            </div>
          </div>
        </div>
      </div>

      <div id="services" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">Our Services</h2>
            <p className="text-lg text-gray-600">Professional maintenance for your vehicle</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Oil Change', price: '$50', icon: '🛢️', desc: 'Premium quality oil change service' },
              { name: 'Car Washing', price: '$30', icon: '💧', desc: 'Complete exterior and interior cleaning' },
              { name: 'Full Checkup', price: '$150', icon: '🔍', desc: 'Comprehensive vehicle inspection' },
              { name: 'Brake Service', price: '$120', icon: '🛑', desc: 'Professional brake system maintenance' },
              { name: 'Tire Rotation', price: '$40', icon: '⚙️', desc: 'Extend tire life with rotation service' },
              { name: 'AC Service', price: '$80', icon: '❄️', desc: 'Air conditioning repair and maintenance' }
            ].map((service, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition duration-200">
                <div className="text-5xl mb-4">{service.icon}</div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {service.price}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{service.desc}</p>
                <button
                  onClick={() => navigate('/register')}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 rounded-lg transition duration-200"
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">How It Works</h2>
            <p className="text-lg text-gray-600">Simple steps to get your vehicle serviced</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-3xl font-bold text-gray-900">1</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Choose Service</h3>
              <p className="text-gray-600">Select the service you need from our comprehensive list</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-3xl font-bold text-gray-900">2</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Book Appointment</h3>
              <p className="text-gray-600">Pick your preferred date and time slot</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-3xl font-bold text-gray-900">3</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Get Service</h3>
              <p className="text-gray-600">Visit our center and get professional service</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">What Our Customers Say</h2>
            <p className="text-lg text-gray-600">Trusted by thousands of vehicle owners</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Rohan S.', text: 'Excellent service! Very professional and timely. Highly recommended for vehicle maintenance.' },
              { name: 'Priya M.', text: 'Great experience! The booking process was smooth and the service quality was top-notch.' },
              { name: 'Ankit J.', text: 'Best service center in town! Professional staff and affordable prices. Will definitely come back.' }
            ].map((review, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition duration-200">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0 flex items-center justify-center">
                    <span className="text-xl">👤</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{review.name}</h4>
                    <div className="flex text-yellow-400 text-sm mb-2">
                      ⭐⭐⭐⭐⭐
                    </div>
                    <p className="text-sm text-gray-600">{review.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">🚗</span>
                <span className="text-xl font-bold">AutoCare Hub</span>
              </div>
              <p className="text-gray-400 text-sm">
                Professional vehicle service booking system for all your automotive needs.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#home" className="hover:text-white transition">Home</a></li>
                <li><a href="#services" className="hover:text-white transition">Services</a></li>
                <li><a href="#about" className="hover:text-white transition">About</a></li>
                <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Services</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Oil Change</li>
                <li>Car Washing</li>
                <li>Full Checkup</li>
                <li>Brake Service</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>📧 info@autocarehub.com</li>
                <li>📞 +880 1700-000000</li>
                <li>📍 Dhaka, Bangladesh</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 AutoCare Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;