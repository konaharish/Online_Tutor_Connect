
export interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  photo?: string;
  qualifications: string[];
  subjects: string[];
  experience: number;
  location: {
    address: string;
    city: string;
    state: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  availability: {
    days: string[];
    timeSlots: string[];
  };
  fees: {
    grade1to4: number;
    grade5to9: number;
    grade10: number;
    grade11to12: number;
    graduation: number;
  };
  teachingMode: 'home-tuition' | 'center-based' | 'both';
  rating: number;
  totalReviews: number;
  isVerified: boolean;
  joinedDate: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  grade: string;
  subjects: string[];
  location: {
    address: string;
    city: string;
    state: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  budget: {
    min: number;
    max: number;
  };
  preferredMode: 'home-tuition' | 'center-based' | 'both';
}

export interface Review {
  id: string;
  studentId: string;
  teacherId: string;
  studentName: string;
  rating: number;
  comment: string;
  date: string;
  subject: string;
}

export interface SearchFilters {
  subject?: string;
  subjects?: string[];
  grade?: string;
  location?: string;
  maxBudget?: number;
  teachingMode?: 'home-tuition' | 'center-based' | 'both';
  availability?: string;
  rating?: number;
}

export interface Booking {
  id: string;
  studentId: string;
  teacherId: string;
  subject: string;
  grade: string;
  scheduledDate: string;
  timeSlot: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  teachingMode: 'home-tuition' | 'center-based';
  location: string;
  fees: number;
  createdAt: string;
}
