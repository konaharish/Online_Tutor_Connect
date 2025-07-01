
import React from 'react';
import { SearchFilters as SearchFiltersType } from '../types';
import { subjects, grades, cities } from '../data/mockData';
import { Checkbox } from '@/components/ui/checkbox';

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFiltersChange: (filters: SearchFiltersType) => void;
  onSearch: () => void;
}

const SearchFilters = ({ filters, onFiltersChange, onSearch }: SearchFiltersProps) => {
  const handleFilterChange = (key: keyof SearchFiltersType, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const handleSubjectChange = (subject: string, checked: boolean) => {
    const currentSubjects = filters.subjects || [];
    let newSubjects: string[];
    
    if (checked) {
      newSubjects = [...currentSubjects, subject];
    } else {
      newSubjects = currentSubjects.filter(s => s !== subject);
    }
    
    handleFilterChange('subjects', newSubjects.length > 0 ? newSubjects : undefined);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Find Your Perfect Tutor</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Subjects - Multiple Selection */}
        <div className="md:col-span-2 lg:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-3">Subjects (Select multiple)</label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {subjects.map((subject) => (
              <div key={subject} className="flex items-center space-x-2">
                <Checkbox
                  id={`subject-${subject}`}
                  checked={filters.subjects?.includes(subject) || false}
                  onCheckedChange={(checked) => handleSubjectChange(subject, checked as boolean)}
                />
                <label
                  htmlFor={`subject-${subject}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {subject}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Grade */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Grade/Class</label>
          <select
            value={filters.grade || ''}
            onChange={(e) => handleFilterChange('grade', e.target.value || undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Grades</option>
            {grades.map((grade) => (
              <option key={grade} value={grade}>{grade}</option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <select
            value={filters.location || ''}
            onChange={(e) => handleFilterChange('location', e.target.value || undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Cities</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        {/* Budget */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Max Budget (₹)</label>
          <input
            type="number"
            placeholder="Enter max budget"
            value={filters.maxBudget || ''}
            onChange={(e) => handleFilterChange('maxBudget', e.target.value ? Number(e.target.value) : undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Teaching Mode */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Teaching Mode</label>
          <select
            value={filters.teachingMode || ''}
            onChange={(e) => handleFilterChange('teachingMode', e.target.value || undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Modes</option>
            <option value="home-tuition">Home Tuition</option>
            <option value="center-based">Center-based Classes</option>
            <option value="both">Both</option>
          </select>
        </div>

        {/* Minimum Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
          <select
            value={filters.rating || ''}
            onChange={(e) => handleFilterChange('rating', e.target.value ? Number(e.target.value) : undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Any Rating</option>
            <option value="4">4+ Stars</option>
            <option value="4.5">4.5+ Stars</option>
          </select>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={onSearch}
          className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
        >
          Search Tutors
        </button>
      </div>
    </div>
  );
};

export default SearchFilters;
