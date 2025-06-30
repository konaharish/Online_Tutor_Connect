
import React, { useState } from 'react';
import { User, BookOpen, Star, Calendar, MapPin, Phone } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'bookings', label: 'My Bookings', icon: Calendar },
    { id: 'reviews', label: 'My Reviews', icon: Star },
    { id: 'favorites', label: 'Favorite Tutors', icon: BookOpen }
  ];

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-8">
            <h1 className="text-3xl font-bold text-white mb-2">Student Dashboard</h1>
            <p className="text-indigo-100">Manage your learning journey</p>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'profile' && (
              <div className="max-w-4xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        defaultValue="Arjun Sharma"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue="arjun.sharma@email.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        defaultValue="+91 98765 43210"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Current Grade</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                        <option>10th Grade</option>
                        <option>11th Grade</option>
                        <option>12th Grade</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subjects of Interest</label>
                      <div className="flex flex-wrap gap-2">
                        {['Mathematics', 'Physics', 'Chemistry'].map((subject) => (
                          <span key={subject} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                      <textarea
                        rows={3}
                        defaultValue="123 Brigade Road, Bangalore, Karnataka"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range (₹)</label>
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="number"
                          placeholder="Min"
                          defaultValue="2000"
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <input
                          type="number"
                          placeholder="Max"
                          defaultValue="3000"
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                    Update Profile
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h2>
                
                <div className="space-y-4">
                  {[1, 2, 3].map((booking) => (
                    <div key={booking} className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Mathematics Session with Dr. Priya Sharma
                          </h3>
                          <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-2" />
                              <span>January 25, 2024 at 4:00 PM - 6:00 PM</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-2" />
                              <span>Home Tuition</span>
                            </div>
                            <div className="flex items-center">
                              <Phone className="w-4 h-4 mr-2" />
                              <span>+91 98765 43210</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-2">
                            Confirmed
                          </span>
                          <div className="text-lg font-bold text-gray-900">₹2,500</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">My Reviews</h2>
                
                <div className="space-y-6">
                  {[1, 2].map((review) => (
                    <div key={review} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-start space-x-4">
                        <img
                          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&h=60&fit=crop&crop=face"
                          alt="Dr. Priya Sharma"
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">Dr. Priya Sharma</h4>
                          <div className="flex items-center mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                            <span className="ml-2 text-sm text-gray-600">Mathematics • Jan 15, 2024</span>
                          </div>
                          <p className="text-gray-700">
                            Excellent teacher! Very patient and explains concepts clearly. 
                            My math scores improved significantly after taking sessions with her.
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'favorites' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Favorite Tutors</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((tutor) => (
                    <div key={tutor} className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="text-center">
                        <img
                          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face"
                          alt="Dr. Priya Sharma"
                          className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                        />
                        <h3 className="font-semibold text-gray-900 mb-1">Dr. Priya Sharma</h3>
                        <p className="text-sm text-gray-600 mb-2">Mathematics, Physics</p>
                        <div className="flex items-center justify-center mb-4">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          <span className="text-sm font-medium">4.8 (45 reviews)</span>
                        </div>
                        <button className="w-full bg-indigo-600 text-white py-2 rounded-lg text-sm hover:bg-indigo-700 transition-colors">
                          Book Session
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
