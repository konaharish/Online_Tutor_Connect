
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Home, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TeacherNotFound = () => {
  return (
    <div className="min-h-screen py-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="mb-8">
            <Search className="w-24 h-24 text-gray-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">No Teachers Found</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We couldn't find any teachers matching your search criteria. Try adjusting your filters or exploring different options.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <Filter className="w-12 h-12 text-indigo-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Adjust Filters</h3>
              <p className="text-sm text-gray-600">Try expanding your search criteria like location, budget, or subjects</p>
            </div>
            
            <div className="text-center">
              <Search className="w-12 h-12 text-indigo-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Browse All Tutors</h3>
              <p className="text-sm text-gray-600">Explore our complete list of available tutors without any filters</p>
            </div>
            
            <div className="text-center">
              <Home className="w-12 h-12 text-indigo-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Start Over</h3>
              <p className="text-sm text-gray-600">Return to the homepage and begin a new search</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/search">
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700">
                Adjust Search Filters
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" className="px-6 py-3 rounded-lg font-semibold">
                Back to Homepage
              </Button>
            </Link>
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Need Help Finding a Tutor?</h4>
            <p className="text-sm text-blue-700">
              Our tutors are constantly joining the platform. Consider broadening your search criteria or check back later for new tutors in your area.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherNotFound;
