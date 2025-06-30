
import React from 'react';
import { MapPin, Star, Clock, Phone, BookOpen, Award } from 'lucide-react';
import { Teacher } from '../types';

interface TeacherCardProps {
  teacher: Teacher;
  distance?: number;
  onViewProfile: (teacher: Teacher) => void;
  onBookSession: (teacher: Teacher) => void;
  grade?: string;
}

const TeacherCard = ({ teacher, distance, onViewProfile, onBookSession, grade }: TeacherCardProps) => {
  const getGradeGroup = (selectedGrade?: string): keyof Teacher['fees'] => {
    if (!selectedGrade) return 'grade5to9';
    
    if (['1st Grade', '2nd Grade', '3rd Grade', '4th Grade'].includes(selectedGrade)) {
      return 'grade1to4';
    } else if (['5th Grade', '6th Grade', '7th Grade', '8th Grade', '9th Grade'].includes(selectedGrade)) {
      return 'grade5to9';
    } else if (selectedGrade === '10th Grade') {
      return 'grade10';
    } else if (['11th Grade', '12th Grade'].includes(selectedGrade)) {
      return 'grade11to12';
    }
    return 'graduation';
  };

  const relevantFee = teacher.fees[getGradeGroup(grade)];

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <img
            src={teacher.photo || `https://ui-avatars.com/api/?name=${teacher.name}&size=80&background=6366f1&color=ffffff`}
            alt={teacher.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-indigo-100"
          />
          {teacher.isVerified && (
            <div className="flex items-center justify-center w-6 h-6 bg-green-500 rounded-full -mt-2 ml-16">
              <Award className="w-3 h-3 text-white" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{teacher.name}</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
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
            
            <div className="text-right">
              <div className="text-2xl font-bold text-indigo-600">₹{relevantFee}</div>
              <div className="text-sm text-gray-500">per session</div>
            </div>
          </div>
          
          <div className="mb-3">
            <div className="flex flex-wrap gap-2 mb-2">
              {teacher.subjects.slice(0, 3).map((subject) => (
                <span
                  key={subject}
                  className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full"
                >
                  {subject}
                </span>
              ))}
              {teacher.subjects.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{teacher.subjects.length - 3} more
                </span>
              )}
            </div>
            
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{teacher.location.city}, {teacher.location.state}</span>
              {distance && (
                <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                  {distance} km away
                </span>
              )}
            </div>
            
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <Clock className="w-4 h-4 mr-1" />
              <span>Available: {teacher.availability.days.slice(0, 3).join(', ')}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="w-4 h-4 mr-1" />
              <span className="capitalize">
                {teacher.teachingMode === 'both' 
                  ? 'Home tuition & Center-based' 
                  : teacher.teachingMode.replace('-', ' ')}
              </span>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={() => onViewProfile(teacher)}
              className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              View Profile
            </button>
            <button
              onClick={() => onBookSession(teacher)}
              className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              Book Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherCard;
