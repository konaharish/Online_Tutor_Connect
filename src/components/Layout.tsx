
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, BookOpen, Star, User, MapPin, Calendar } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">TutorConnect AI</span>
            </Link>
            
            <nav className="hidden md:flex space-x-8">
              <Link 
                to="/" 
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:text-indigo-600'
                }`}
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              <Link 
                to="/search" 
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/search') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:text-indigo-600'
                }`}
              >
                <Users className="h-4 w-4" />
                <span>Find Tutors</span>
              </Link>
              <Link 
                to="/bookings" 
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/bookings') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:text-indigo-600'
                }`}
              >
                <Calendar className="h-4 w-4" />
                <span>My Bookings</span>
              </Link>
              <Link 
                to="/dashboard" 
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/dashboard') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:text-indigo-600'
                }`}
              >
                <User className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
              <Link 
                to="/become-tutor" 
                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
              >
                Become a Tutor
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-400">&copy; 2024 TutorConnect AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
