
-- Create a table for storing booking sessions
CREATE TABLE IF NOT EXISTS public.booking_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL,
  tutor_id UUID NOT NULL,
  subject TEXT NOT NULL,
  grade TEXT NOT NULL,
  scheduled_date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  teaching_mode TEXT NOT NULL CHECK (teaching_mode IN ('home-tuition', 'center-based', 'online')),
  location TEXT NOT NULL,
  fees INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  special_requirements TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE CASCADE,
  FOREIGN KEY (tutor_id) REFERENCES public.tutors(id) ON DELETE CASCADE
);

-- Enable Row Level Security
ALTER TABLE public.booking_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies for booking_sessions
CREATE POLICY "Students can view their own bookings" 
  ON public.booking_sessions 
  FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM students 
    WHERE students.id = booking_sessions.student_id 
    AND students.user_id = auth.uid()
  ));

CREATE POLICY "Tutors can view their bookings" 
  ON public.booking_sessions 
  FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM tutors 
    WHERE tutors.id = booking_sessions.tutor_id 
    AND tutors.user_id = auth.uid()
  ));

CREATE POLICY "Students can create bookings" 
  ON public.booking_sessions 
  FOR INSERT 
  WITH CHECK (EXISTS (
    SELECT 1 FROM students 
    WHERE students.id = booking_sessions.student_id 
    AND students.user_id = auth.uid()
  ));

CREATE POLICY "Students and tutors can update relevant bookings" 
  ON public.booking_sessions 
  FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM students 
      WHERE students.id = booking_sessions.student_id 
      AND students.user_id = auth.uid()
    ) OR 
    EXISTS (
      SELECT 1 FROM tutors 
      WHERE tutors.id = booking_sessions.tutor_id 
      AND tutors.user_id = auth.uid()
    )
  );

-- Create trigger for updating updated_at timestamp
CREATE OR REPLACE TRIGGER update_booking_sessions_updated_at
  BEFORE UPDATE ON public.booking_sessions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
