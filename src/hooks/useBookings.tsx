
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface BookingSession {
  id: string;
  student_id: string;
  tutor_id: string;
  subject: string;
  grade: string;
  scheduled_date: string;
  time_slot: string;
  teaching_mode: 'home-tuition' | 'center-based' | 'online';
  location: string;
  fees: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  special_requirements?: string;
  created_at: string;
  updated_at: string;
}

export const useBookings = () => {
  const [bookings, setBookings] = useState<BookingSession[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const createBooking = async (bookingData: {
    tutorId: string;
    subject: string;
    grade: string;
    scheduledDate: string;
    timeSlot: string;
    teachingMode: 'home-tuition' | 'center-based';
    location: string;
    fees: number;
    specialRequirements?: string;
  }) => {
    setLoading(true);
    setError(null);

    try {
      // First, get the current user's student profile
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Get student ID from students table
      const { data: studentData, error: studentError } = await supabase
        .from('students')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (studentError || !studentData) {
        throw new Error('Student profile not found. Please complete your profile first.');
      }

      const { data, error } = await supabase
        .from('booking_sessions')
        .insert({
          student_id: studentData.id,
          tutor_id: bookingData.tutorId,
          subject: bookingData.subject,
          grade: bookingData.grade,
          scheduled_date: bookingData.scheduledDate,
          time_slot: bookingData.timeSlot,
          teaching_mode: bookingData.teachingMode,
          location: bookingData.location,
          fees: bookingData.fees,
          special_requirements: bookingData.specialRequirements || null,
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating booking:', error);
        throw error;
      }

      console.log('Booking created successfully:', data);
      toast({
        title: "Booking Created",
        description: "Your session has been booked successfully!",
      });

      await loadBookings(); // Refresh bookings
      return { data };
    } catch (error: any) {
      console.error('Unexpected error creating booking:', error);
      const errorMessage = error.message || 'Failed to create booking';
      setError(errorMessage);
      toast({
        title: "Booking Failed",
        description: errorMessage,
        variant: "destructive",
      });
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const loadBookings = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('booking_sessions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading bookings:', error);
        throw error;
      }

      console.log('Bookings loaded:', data);
      
      // Type cast the data to match our BookingSession interface
      const typedBookings: BookingSession[] = (data || []).map(booking => ({
        ...booking,
        teaching_mode: booking.teaching_mode as 'home-tuition' | 'center-based' | 'online',
        status: booking.status as 'pending' | 'confirmed' | 'completed' | 'cancelled'
      }));
      
      setBookings(typedBookings);
    } catch (error: any) {
      console.error('Unexpected error loading bookings:', error);
      const errorMessage = error.message || 'Failed to load bookings';
      setError(errorMessage);
      toast({
        title: "Error Loading Bookings",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, status: BookingSession['status']) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('booking_sessions')
        .update({ status })
        .eq('id', bookingId)
        .select()
        .single();

      if (error) {
        console.error('Error updating booking status:', error);
        throw error;
      }

      console.log('Booking status updated:', data);
      toast({
        title: "Booking Updated",
        description: `Booking status changed to ${status}`,
      });

      await loadBookings(); // Refresh bookings
      return { data };
    } catch (error: any) {
      console.error('Unexpected error updating booking:', error);
      const errorMessage = error.message || 'Failed to update booking';
      setError(errorMessage);
      toast({
        title: "Update Failed",
        description: errorMessage,
        variant: "destructive",
      });
      return { error };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  return {
    bookings,
    loading,
    error,
    createBooking,
    loadBookings,
    updateBookingStatus,
  };
};
