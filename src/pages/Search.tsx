
import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchFilters from '../components/SearchFilters';
import TeacherCard from '../components/TeacherCard';
import TutorProfile from '../components/TutorProfile';
import BookingForm from '../components/BookingForm';
import { SearchFilters as SearchFiltersType, Teacher } from '../types';
import { getAIRecommendations } from '../utils/aiRecommendations';
import { useTutors } from '../hooks/useTutors';
import { useBookings } from '../hooks/useBookings';
import { Brain, Filter, Loader } from 'lucide-react';

const Search = () => {
  const [filters, setFilters] = useState<SearchFiltersType>({});
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [showAIRecommendations, setShowAIRecommendations] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  
  const { tutors, loading, error } = useTutors();
  const { createBooking, loading: bookingLoading } = useBookings();
  const navigate = useNavigate();

  // Show tutors when the page loads
  useEffect(() => {
    setSearchTriggered(true);
  }, []);

  const filteredTeachers = useMemo(() => {
    console.log('Filtering teachers with filters:', filters);
    console.log('Available teachers:', tutors.length);
    
    if (!searchTriggered || loading) return [];

    // If no filters are applied, show first 8 tutors as default
    if (!filters.subjects && !filters.subject && !filters.location && !filters.maxBudget && 
        !filters.teachingMode && !filters.rating && !filters.grade) {
      console.log('No filters applied, showing default tutors');
      return tutors.slice(0, 8);
    }

    return tutors.filter(teacher => {
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
  }, [filters, searchTriggered, tutors, loading]);

  const aiRecommendations = useMemo(() => {
    if (!showAIRecommendations || !searchTriggered || loading) return [];
    
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
  }, [filteredTeachers, filters, showAIRecommendations, searchTriggered, loading]);

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
    setSelectedTeacher(teacher);
    setShowProfile(true);
  };

  const handleBookSession = (teacher: Teacher) => {
    console.log('Book session with:', teacher.name);
    setSelectedTeacher(teacher);
    setShowBookingForm(true);
  };

  const handleBookingSubmit = async (bookingData: any) => {
    if (!selectedTeacher) return;

    const result = await createBooking(bookingData);
    if (result.data) {
      setShowBookingForm(false);
      setSelectedTeacher(null);
    }
  };

  const handleCloseProfile = () => {
    setShowProfile(false);
    setSelectedTeacher(null);
  };

  const handleCloseBookingForm = () => {
    setShowBookingForm(false);
    setSelectedTeacher(null);
  };

  const handleBookFromProfile = () => {
    setShowProfile(false);
    setShowBookingForm(true);
  };

  const displayTeachers = showAIRecommendations ? aiRecommendations.map(rec => rec.teacher) : filteredTeachers;
  const displayDistances = showAIRecommendations ? aiRecommendations.map(rec => rec.distance) : [];

  console.log('Final display teachers:', displayTeachers.length);

  // Check if filters are applied and no teachers found
  const hasFiltersApplied = filters.subjects || filters.subject || filters.location || filters.maxBudget || 
                          filters.teachingMode || filters.rating || filters.grade;
  
  // Navigate to teacher not found page if search was triggered with filters but no results
  useEffect(() => {
    if (searchTriggered && !loading && hasFiltersApplied && displayTeachers.length === 0) {
      navigate('/teacher-not-found');
    }
  }, [searchTriggered, loading, hasFiltersApplied, displayTeachers.length, navigate]);

  if (error) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="text-red-500 mb-4">
              <Filter className="w-16 h-16 mx-auto mb-2" />
              <h3 className="text-xl font-semibold">Error Loading Tutors</h3>
              <p className="text-gray-600 mt-2">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <Loader className="w-6 h-6 animate-spin" />
                      <span>Loading Tutors...</span>
                    </div>
                  ) : (
                    `${displayTeachers.length} Tutors Found`
                  )}
                </h2>
                {!loading && displayTeachers.length > 0 && (
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
                )}
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

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader className="w-8 h-8 animate-spin text-indigo-600" />
              </div>
            ) : (
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
            )}
          </div>
        )}
      </div>

      {/* Tutor Profile Modal */}
      {showProfile && selectedTeacher && (
        <TutorProfile
          teacher={selectedTeacher}
          onClose={handleCloseProfile}
          onBookSession={handleBookFromProfile}
        />
      )}

      {/* Booking Form Modal */}
      {showBookingForm && selectedTeacher && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          {bookingLoading ? (
            <div className="bg-white p-8 rounded-lg">
              <div className="flex items-center space-x-4">
                <Loader className="w-6 h-6 animate-spin" />
                <span>Creating booking...</span>
              </div>
            </div>
          ) : (
            <BookingForm
              teacher={selectedTeacher}
              onBookingSubmit={handleBookingSubmit}
              onCancel={handleCloseBookingForm}
              currentUserGrade={filters.grade}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
