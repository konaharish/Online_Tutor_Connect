
import { Teacher, Student, Review } from '../types';

export const mockTeachers: Teacher[] = [
  {
    id: '1',
    name: 'Dr. Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 98765 43210',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
    qualifications: ['M.Sc Mathematics', 'B.Ed', 'PhD Mathematics'],
    subjects: ['Mathematics', 'Physics', 'Chemistry'],
    experience: 8,
    location: {
      address: '123 MG Road, Bangalore',
      city: 'Bangalore',
      state: 'Karnataka',
      coordinates: { lat: 12.9716, lng: 77.5946 }
    },
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      timeSlots: ['9:00 AM - 11:00 AM', '4:00 PM - 6:00 PM', '7:00 PM - 9:00 PM']
    },
    fees: {
      grade1to4: 1000,
      grade5to9: 2000,
      grade10: 2500,
      grade11to12: 4000,
      graduation: 5000
    },
    teachingMode: 'both',
    rating: 4.8,
    totalReviews: 45,
    isVerified: true,
    joinedDate: '2023-01-15'
  },
  {
    id: '2',
    name: 'Prof. Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '+91 87654 32109',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    qualifications: ['M.A English Literature', 'B.Ed'],
    subjects: ['English', 'Literature', 'Creative Writing'],
    experience: 12,
    location: {
      address: '456 Park Street, Delhi',
      city: 'Delhi',
      state: 'Delhi',
      coordinates: { lat: 28.7041, lng: 77.1025 }
    },
    availability: {
      days: ['Monday', 'Wednesday', 'Friday', 'Saturday', 'Sunday'],
      timeSlots: ['10:00 AM - 12:00 PM', '2:00 PM - 4:00 PM', '6:00 PM - 8:00 PM']
    },
    fees: {
      grade1to4: 800,
      grade5to9: 1800,
      grade10: 2200,
      grade11to12: 3500,
      graduation: 4500
    },
    teachingMode: 'home-tuition',
    rating: 4.6,
    totalReviews: 32,
    isVerified: true,
    joinedDate: '2022-08-20'
  },
  {
    id: '3',
    name: 'Ms. Anita Patel',
    email: 'anita.patel@email.com',
    phone: '+91 76543 21098',
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    qualifications: ['M.Sc Physics', 'B.Tech', 'B.Ed'],
    subjects: ['Physics', 'Mathematics', 'Chemistry'],
    experience: 6,
    location: {
      address: '789 FC Road, Pune',
      city: 'Pune',
      state: 'Maharashtra',
      coordinates: { lat: 18.5204, lng: 73.8567 }
    },
    availability: {
      days: ['Tuesday', 'Thursday', 'Friday', 'Saturday'],
      timeSlots: ['8:00 AM - 10:00 AM', '3:00 PM - 5:00 PM', '7:00 PM - 9:00 PM']
    },
    fees: {
      grade1to4: 900,
      grade5to9: 1900,
      grade10: 2400,
      grade11to12: 3800,
      graduation: 4800
    },
    teachingMode: 'center-based',
    rating: 4.7,
    totalReviews: 28,
    isVerified: true,
    joinedDate: '2023-03-10'
  }
];

export const mockReviews: Review[] = [
  {
    id: '1',
    studentId: 'student1',
    teacherId: '1',
    studentName: 'Arjun Verma',
    rating: 5,
    comment: 'Excellent teacher! Very patient and explains concepts clearly. My math scores improved significantly.',
    date: '2024-01-15',
    subject: 'Mathematics'
  },
  {
    id: '2',
    studentId: 'student2',
    teacherId: '1',
    studentName: 'Sneha Gupta',
    rating: 4,
    comment: 'Good teaching methods. Helped me understand difficult physics concepts.',
    date: '2024-01-10',
    subject: 'Physics'
  },
  {
    id: '3',
    studentId: 'student3',
    teacherId: '2',
    studentName: 'Rohan Singh',
    rating: 5,
    comment: 'Amazing English teacher! Improved my writing skills tremendously.',
    date: '2024-01-12',
    subject: 'English'
  }
];

export const subjects = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Hindi',
  'History', 'Geography', 'Economics', 'Political Science', 'Computer Science',
  'Accountancy', 'Business Studies', 'Literature', 'Creative Writing'
];

export const grades = [
  '1st Grade', '2nd Grade', '3rd Grade', '4th Grade', '5th Grade',
  '6th Grade', '7th Grade', '8th Grade', '9th Grade', '10th Grade',
  '11th Grade', '12th Grade', 'Graduation'
];

export const cities = [
  'Bangalore', 'Delhi', 'Mumbai', 'Pune', 'Chennai', 'Hyderabad',
  'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur'
];
