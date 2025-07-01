
import React, { useState, useMemo, useEffect } from 'react';
import SearchFilters from '../components/SearchFilters';
import TeacherCard from '../components/TeacherCard';
import { SearchFilters as SearchFiltersType, Teacher } from '../types';
import { mockTeachers } from '../data/mockData';
import { getAIRecommendations } from '../utils/aiRecommendations';
import { Brain, Filter } from 'lucide-react';

const Search = () => {
  const [filters, setFilters] = useState<SearchFiltersType>({});
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [showAIRecommendations, setShowAIRecommendations] = useState(false);

  // Show 4 default tutors when the page loads
  useEffect(() => {
    setSearchTriggered(true);
  }, []);

  const filteredTeachers = useMemo(() => {
    console.log('Filtering teachers with filters:', filters);
    console.log('Available teachers:', mockTeachers);
    
    if (!searchTriggered) return [];

    // If no filters are applied, show first 4 tutors as default
    if (!filters.subjects && !filters.subject && !filters.location && !filters.maxBudget && 
        !filters.teachingMode && !filters.rating && !filters.grade) {
      console.log('No filters applied, showing default tutors');
      return mockTeachers.slice(0, 4);
    }

    return mockTeachers.filter(teacher => {
      console.log('Checking teacher:', teacher.name, 'with subjects:', teacher.subjects);
      
      // Check multiple subjects (new feature)
      if (filters.subjects && filters.subjects.length > 0) {
        const hasMatchingSubject = filters.subjects.some(subject => 
          teacher.subjects.includes(subject)
        );
        console.log('Subject match check:', hasMatchingSubject, 'for subjects:', filters.subjects);
        if (!hasMatchingSubject) {
          return false;
        }
      }
      
      // Check single subject (backward compatibility)
      if (filters.subject && !teacher.subjects.includes(filters.subject)) {
        console.log('Single subject filter failed for:', filters.subject);
        return false;
      }
      
      if (filters.location && !teacher.location.city.toLowerCase().includes(filters.location.toLowerCase())) {
        console.log('Location filter failed for:', filters.location);
        return false;
      }
      
      if (filters.maxBudget) {
        const gradeGroup = getGradeGroup(filters.grade);
        const teacherFee = teacher.fees[gradeGroup];
        if (teacherFee > filters.maxBudget) {
          console.log('Budget filter failed. Teacher fee:', teacherFee, 'Max budget:', filters.maxBudget);
          return false;
        }
      }
      
      if (filters.teachingMode && teacher.teachingMode !== 'both' && teacher.teachingMode !== filters.teachingMode) {
        console.log('Teaching mode filter failed for:', filters.teachingMode);
        return false;
      }
      
      if (filters.rating && teacher.rating < filters.rating) {
        console.log('Rating filter failed. Teacher rating:', teacher.rating, 'Min rating:', filters.rating);
        return false;
      }
      
      console.log('Teacher passed all filters:', teacher.name);
      return true;
    });
  }, [filters, searchTriggered]);

  const aiRecommendations = useMemo(() => {
    if (!showAIRecommendations || !searchTriggered) return [];
    
    const studentProfile = {
      subjects: filters.subjects || (filters.subject ? [filters.subject] : undefined),
      grade: filters.grade,
      budget: filters.maxBudget ? { min: 0, max: filters.maxBudget } : undefined,
      preferredMode: filters.teachingMode,
      location: filters.location ? {
        address: filters.location,
        city: filters.location,
        state: '',
        coordinates: { lat: 12.9716, lng: 77.5946 } // Mock coordinates
      } : undefined
    };
    
    return getAIRecommendations(filteredTeachers, studentProfile, filters);
  }, [filteredTeachers, filters, showAIRecommendations, searchTriggered]);

  const getGradeGroup = (grade?: string): keyof Teacher['fees'] => {
    if (!grade) return 'grade5to9';
    
    if (['1st Grade', '2nd Grade', '3rd Grade', '4th Grade'].includes(grade)) {
      return 'grade1to4';
    } else if (['5th Grade', '6th Grade', '7th Grade', '8th Grade', '9th Grade'].includes(grade)) {
      return 'grade5to9';
    } else if (grade === '10th Grade') {
      return 'grade10';
    } else if (['11th Grade', '12th Grade'].includes(grade)) {
      return 'grade11to12';
    }
    return 'graduation';
  };

  const handleSearch = () => {
    console.log('Search triggered with filters:', filters);
    setSearchTriggered(true);
    setShowAIRecommendations(false);
  };

  const handleViewProfile = (teacher: Teacher) => {
    console.log('View profile for:', teacher.name);
    // TODO: Implement profile modal or navigation
  };

  const handleBookSession = (teacher: Teacher) => {
    console.log('Book session with:', teacher.name);
    // TODO: Implement booking modal or navigation
  };

  const displayTeachers = showAIRecommendations ? aiRecommendations.map(rec => rec.teacher) : filteredTeachers;
  const displayDistances = showAIRecommendations ? aiRecommendations.map(rec => rec.distance) : [];

  console.log('Final display teachers:', displayTeachers.length);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SearchFilters
          filters={filters}
          onFiltersChange={setFilters}
          onSearch={handleSearch}
        />

        {searchTriggered && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {displayTeachers.length} Tutors Found
                </h2>
                <button
                  onClick={() => setShowAIRecommendations(!showAIRecommendations)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    showAIRecommendations
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Brain className="w-4 h-4" />
                  <span>AI Recommendations</span>
                </button>
              </div>
            </div>

            {showAIRecommendations && aiRecommendations.length > 0 && (
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  <Brain className="w-5 h-5 text-indigo-600" />
                  <span className="font-semibold text-indigo-900">AI-Powered Recommendations</span>
                </div>
                <p className="text-sm text-indigo-700">
                  These tutors are specially recommended for you based on your requirements, location, and learning preferences.
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {displayTeachers.map((teacher, index) => (
                <TeacherCard
                  key={teacher.id}
                  teacher={teacher}
                  distance={displayDistances[index]}
                  onViewProfile={handleViewProfile}
                  onBookSession={handleBookSession}
                  grade={filters.grade}
                />
              ))}
            </div>

            {displayTeachers.length === 0 && (
              <div className="text-center py-12">
                <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No tutors found</h3>
                <p className="text-gray-600">Try adjusting your search filters to find more tutors.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
