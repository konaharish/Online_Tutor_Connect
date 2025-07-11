
import React from 'react';
import { X, Star, MapPin, Clock, Phone, Mail, Award, BookOpen, Calendar, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Teacher } from '../types';

interface TutorProfileProps {
  teacher: Teacher;
  onClose: () => void;
  onBookSession: () => void;
}

const TutorProfile = ({ teacher, onClose, onBookSession }: TutorProfileProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-white">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-4">
              <img
                src={teacher.photo || `https://ui-avatars.com/api/?name=${teacher.name}&size=80&background=6366f1&color=ffffff`}
                alt={teacher.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-indigo-100"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-2xl font-bold text-gray-900">{teacher.name}</h2>
                  {teacher.isVerified && (
                    <Award className="w-5 h-5 text-green-500" />
                  )}
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="font-medium">{teacher.rating}</span>
                    <span className="ml-1">({teacher.totalReviews} reviews)</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-1" />
                    <span>{teacher.experience} years exp.</span>
                  </div>
                </div>
              </div>
            </div>
            <Button onClick={onClose} variant="ghost" size="icon">
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* About */}
              <div>
                <h3 className="text-lg font-semibold mb-3">About</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    Experienced educator with {teacher.experience} years of teaching experience. 
                    Specialized in {teacher.subjects.slice(0, 3).join(', ')} and committed to helping students achieve their academic goals.
                  </p>
                </div>
              </div>

              {/* Subjects */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Subjects Taught</h3>
                <div className="flex flex-wrap gap-2">
                  {teacher.subjects.map((subject) => (
                    <Badge key={subject} variant="secondary" className="bg-indigo-100 text-indigo-700">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Qualifications */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Qualifications</h3>
                <div className="space-y-2">
                  {teacher.qualifications.map((qualification, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-indigo-600" />
                      <span className="text-gray-700">{qualification}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Availability</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="mb-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="w-4 h-4 text-indigo-600" />
                      <span className="font-medium">Available Days:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {teacher.availability.days.map((day) => (
                        <Badge key={day} variant="outline">
                          {day}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="w-4 h-4 text-indigo-600" />
                      <span className="font-medium">Time Slots:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {teacher.availability.timeSlots.map((slot) => (
                        <Badge key={slot} variant="outline">
                          {slot}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Info */}
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-700">{teacher.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-700">{teacher.email}</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-4 h-4 text-gray-600 mt-0.5" />
                    <div className="text-sm text-gray-700">
                      <div>{teacher.location.address}</div>
                      <div>{teacher.location.city}, {teacher.location.state}</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Fees */}
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-3">Session Fees</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Grades 1-4:</span>
                    <span className="font-medium">₹{teacher.fees.grade1to4}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Grades 5-9:</span>
                    <span className="font-medium">₹{teacher.fees.grade5to9}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Grade 10:</span>
                    <span className="font-medium">₹{teacher.fees.grade10}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Grades 11-12:</span>
                    <span className="font-medium">₹{teacher.fees.grade11to12}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Graduation:</span>
                    <span className="font-medium">₹{teacher.fees.graduation}</span>
                  </div>
                </div>
              </Card>

              {/* Teaching Mode */}
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-3">Teaching Mode</h3>
                <div className="text-sm text-gray-700 capitalize">
                  {teacher.teachingMode === 'both' 
                    ? 'Home tuition & Center-based' 
                    : teacher.teachingMode.replace('-', ' ')}
                </div>
              </Card>

              {/* Book Session Button */}
              <Button onClick={onBookSession} className="w-full" size="lg">
                Book Session
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TutorProfile;
