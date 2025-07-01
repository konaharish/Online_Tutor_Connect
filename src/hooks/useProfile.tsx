
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { User } from '@supabase/supabase-js';

export interface Profile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  created_at: string;
  updated_at: string;
}

export const useProfile = (user: User | null) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const loadProfile = async () => {
    if (!user) {
      setProfile(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log('Loading profile for user:', user.id);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error loading profile:', error);
        setError(error.message);
        return;
      }

      console.log('Profile loaded:', data);
      setProfile(data);
    } catch (error: any) {
      console.error('Unexpected error loading profile:', error);
      setError(error.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<Pick<Profile, 'name' | 'phone'>>) => {
    if (!user || !profile) return { error: new Error('No user or profile found') };

    setLoading(true);
    setError(null);

    try {
      console.log('Updating profile:', updates);
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating profile:', error);
        setError(error.message);
        toast({
          title: "Update Failed",
          description: "Failed to update profile. Please try again.",
          variant: "destructive",
        });
        return { error };
      }

      console.log('Profile updated:', data);
      setProfile(data);
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
      return { data };
    } catch (error: any) {
      console.error('Unexpected error updating profile:', error);
      const errorMessage = error.message || 'An unexpected error occurred';
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
    loadProfile();
  }, [user]);

  return {
    profile,
    loading,
    error,
    updateProfile,
    refetch: loadProfile
  };
};
