
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface TutorFormData {
  name: string;
  email: string;
  phone: string;
  qualifications: string;
  subjects: string[];
  experience: string;
  address: string;
  city: string;
  state: string;
  teachingMode: 'home-tuition' | 'center-based' | 'both';
  availability: string[];
  timeSlots: string[];
  fees: {
    grade1to4: number;
    grade5to9: number;
    grade10: number;
    grade11to12: number;
    graduation: number;
  };
}

export const useTutorRegistration = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const registerTutor = async (formData: TutorFormData) => {
    setIsSubmitting(true);
    
    try {
      // Get the current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        toast({
          title: "Authentication Error",
          description: "You must be logged in to register as a tutor.",
          variant: "destructive",
        });
        return { success: false };
      }

      // Check if tutor profile already exists
      const { data: existingTutor, error: checkError } = await supabase
        .from('tutors')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('Error checking existing tutor:', checkError);
        throw checkError;
      }

      if (existingTutor) {
        toast({
          title: "Profile Already Exists",
          description: "You already have a tutor profile. Please update your existing profile instead.",
          variant: "destructive",
        });
        return { success: false };
      }

      // Parse qualifications into array
      const qualificationsArray = formData.qualifications
        .split(',')
        .map(q => q.trim())
        .filter(q => q.length > 0);

      // Insert tutor data
      const { data, error } = await supabase
        .from('tutors')
        .insert([
          {
            user_id: user.id,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            qualifications: qualificationsArray,
            subjects: formData.subjects,
            experience: parseInt(formData.experience) || 0,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            availability_days: formData.availability,
            time_slots: formData.timeSlots,
            fees_grade1to4: formData.fees.grade1to4,
            fees_grade5to9: formData.fees.grade5to9,
            fees_grade10: formData.fees.grade10,
            fees_grade11to12: formData.fees.grade11to12,
            fees_graduation: formData.fees.graduation,
            teaching_mode: formData.teachingMode,
          }
        ])
        .select();

      if (error) {
        console.error('Error registering tutor:', error);
        throw error;
      }

      toast({
        title: "Registration Successful!",
        description: "Your tutor profile has been created successfully. You can now receive bookings from students.",
      });

      return { success: true, data };
    } catch (error: any) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: error.message || "An error occurred while registering. Please try again.",
        variant: "destructive",
      });
      return { success: false };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    registerTutor,
    isSubmitting,
  };
};
