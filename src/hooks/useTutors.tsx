
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Teacher } from '../types';
import { useToast } from '@/hooks/use-toast';

export const useTutors = () => {
  const [tutors, setTutors] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const transformSupabaseTutor = (tutor: any): Teacher => ({
    id: tutor.id,
    name: tutor.name,
    email: tutor.email,
    phone: tutor.phone,
    photo: tutor.photo || undefined,
    qualifications: tutor.qualifications || [],
    subjects: tutor.subjects || [],
    experience: tutor.experience || 0,
    location: {
      address: tutor.address,
      city: tutor.city,
      state: tutor.state,
      coordinates: tutor.coordinates_lat && tutor.coordinates_lng ? {
        lat: Number(tutor.coordinates_lat),
        lng: Number(tutor.coordinates_lng)
      } : undefined
    },
    availability: {
      days: tutor.availability_days || [],
      timeSlots: tutor.time_slots || []
    },
    fees: {
      grade1to4: tutor.fees_grade1to4 || 1000,
      grade5to9: tutor.fees_grade5to9 || 2000,
      grade10: tutor.fees_grade10 || 2500,
      grade11to12: tutor.fees_grade11to12 || 4000,
      graduation: tutor.fees_graduation || 5000
    },
    teachingMode: tutor.teaching_mode as 'home-tuition' | 'center-based' | 'both',
    rating: Number(tutor.rating) || 0,
    totalReviews: tutor.total_reviews || 0,
    isVerified: tutor.is_verified || false,
    joinedDate: tutor.created_at || new Date().toISOString()
  });

  const loadTutors = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Loading tutors from Supabase...');
      const { data, error } = await supabase
        .from('tutors')
        .select('*')
        .order('rating', { ascending: false });

      if (error) {
        console.error('Error loading tutors:', error);
        setError(error.message);
        toast({
          title: "Error Loading Tutors",
          description: "Failed to load tutors from database.",
          variant: "destructive",
        });
        return;
      }

      console.log('Raw tutor data from Supabase:', data);
      const transformedTutors = (data || []).map(transformSupabaseTutor);
      console.log('Transformed tutors:', transformedTutors.length);
      
      setTutors(transformedTutors);
    } catch (error: any) {
      console.error('Unexpected error loading tutors:', error);
      setError(error.message || 'An unexpected error occurred');
      toast({
        title: "Error Loading Tutors",
        description: "An unexpected error occurred while loading tutors.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTutors();
  }, []);

  const refetch = () => {
    loadTutors();
  };

  return {
    tutors,
    loading,
    error,
    refetch
  };
};
