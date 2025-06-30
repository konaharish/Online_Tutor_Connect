
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Star, MapPin, Clock, Award } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Find Your Perfect
              <span className="block text-yellow-300">Home Tutor</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-indigo-100 max-w-3xl mx-auto">
              Connect with qualified, verified tutors for personalized learning at home or center-based classes. AI-powered matching for the best learning experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/search"
                className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-yellow-300 transition-colors"
              >
                Find Tutors Now
              </Link>
              <Link
                to="/become-tutor"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors"
              >
                Become a Tutor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose TutorConnect AI?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform uses advanced AI to match students with the perfect tutors based on location, subjects, and learning preferences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Verified Tutors</h3>
              <p className="text-gray-600">All our tutors are thoroughly verified with background checks and qualification verification.</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Location-Based Matching</h3>
              <p className="text-gray-600">Find tutors near you with precise distance calculations and location-based recommendations.</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">AI-Powered Recommendations</h3>
              <p className="text-gray-600">Our AI analyzes your requirements to suggest the best tutors for your learning needs.</p>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-orange-100 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-yellow-600 rounded-xl flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Flexible Scheduling</h3>
              <p className="text-gray-600">Book sessions at your convenience with flexible timing options and easy rescheduling.</p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-pink-100 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Rating & Reviews</h3>
              <p className="text-gray-600">Transparent rating system with genuine reviews from students and parents.</p>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-cyan-100 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality Assurance</h3>
              <p className="text-gray-600">Regular quality checks and performance monitoring to ensure the best learning experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Transparent Pricing</h2>
            <p className="text-xl text-gray-600">
              Fair and transparent pricing based on class levels. No hidden fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Primary Classes</h3>
              <div className="text-3xl font-bold text-indigo-600 mb-4">₹1,000</div>
              <p className="text-gray-600 mb-6">Per session for grades 1-4</p>
              <ul className="space-y-2 text-gray-600">
                <li>• All subjects covered</li>
                <li>• Fun learning methods</li>
                <li>• Regular assessments</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-indigo-600 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-indigo-600 text-white px-4 py-1 rounded-full text-sm">Most Popular</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Middle School</h3>
              <div className="text-3xl font-bold text-indigo-600 mb-4">₹2,000</div>
              <p className="text-gray-600 mb-6">Per session for grades 5-9</p>
              <ul className="space-y-2 text-gray-600">
                <li>• Subject specialization</li>
                <li>• Concept clarity</li>
                <li>• Exam preparation</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Senior Classes</h3>
              <div className="text-3xl font-bold text-indigo-600 mb-4">₹4,000</div>
              <p className="text-gray-600 mb-6">Per session for grades 11-12</p>
              <ul className="space-y-2 text-gray-600">
                <li>• Board exam focus</li>
                <li>• Competitive prep</li>
                <li>• Career guidance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of students who have found their perfect tutors through our platform.
          </p>
          <Link
            to="/search"
            className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-yellow-300 transition-colors"
          >
            Find Your Tutor Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
