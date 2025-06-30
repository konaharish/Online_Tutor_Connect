
-- Create tutors table to store all tutor information
CREATE TABLE public.tutors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  photo TEXT,
  qualifications TEXT[],
  subjects TEXT[],
  experience INTEGER DEFAULT 0,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  coordinates_lat DECIMAL,
  coordinates_lng DECIMAL,
  availability_days TEXT[],
  time_slots TEXT[],
  fees_grade1to4 INTEGER DEFAULT 1000,
  fees_grade5to9 INTEGER DEFAULT 2000,
  fees_grade10 INTEGER DEFAULT 2500,
  fees_grade11to12 INTEGER DEFAULT 4000,
  fees_graduation INTEGER DEFAULT 5000,
  teaching_mode TEXT CHECK (teaching_mode IN ('home-tuition', 'center-based', 'both')) DEFAULT 'both',
  rating DECIMAL DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create students table to store student information
CREATE TABLE public.students (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  grade TEXT NOT NULL,
  subjects TEXT[],
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  coordinates_lat DECIMAL,
  coordinates_lng DECIMAL,
  budget_min INTEGER DEFAULT 0,
  budget_max INTEGER DEFAULT 10000,
  preferred_mode TEXT CHECK (preferred_mode IN ('home-tuition', 'center-based', 'both')) DEFAULT 'both',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create bookings table to track tutor bookings
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
  tutor_id UUID REFERENCES public.tutors(id) ON DELETE CASCADE NOT NULL,
  subject TEXT NOT NULL,
  grade TEXT NOT NULL,
  scheduled_date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  status TEXT CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')) DEFAULT 'pending',
  teaching_mode TEXT CHECK (teaching_mode IN ('home-tuition', 'center-based')) NOT NULL,
  location TEXT NOT NULL,
  fees INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create reviews table for student reviews of tutors
CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
  tutor_id UUID REFERENCES public.tutors(id) ON DELETE CASCADE NOT NULL,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  student_name TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  comment TEXT,
  subject TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create favorites table for student favorite tutors
CREATE TABLE public.favorites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
  tutor_id UUID REFERENCES public.tutors(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(student_id, tutor_id)
);

-- Enable Row Level Security
ALTER TABLE public.tutors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- RLS Policies for tutors
CREATE POLICY "Anyone can view tutors" ON public.tutors FOR SELECT USING (true);
CREATE POLICY "Users can insert their own tutor profile" ON public.tutors FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own tutor profile" ON public.tutors FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for students
CREATE POLICY "Users can view their own student profile" ON public.students FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own student profile" ON public.students FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own student profile" ON public.students FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for bookings
CREATE POLICY "Students can view their own bookings" ON public.bookings FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.students WHERE students.id = bookings.student_id AND students.user_id = auth.uid())
);
CREATE POLICY "Tutors can view their bookings" ON public.bookings FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.tutors WHERE tutors.id = bookings.tutor_id AND tutors.user_id = auth.uid())
);
CREATE POLICY "Students can create bookings" ON public.bookings FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.students WHERE students.id = bookings.student_id AND students.user_id = auth.uid())
);
CREATE POLICY "Students and tutors can update relevant bookings" ON public.bookings FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.students WHERE students.id = bookings.student_id AND students.user_id = auth.uid()) OR
  EXISTS (SELECT 1 FROM public.tutors WHERE tutors.id = bookings.tutor_id AND tutors.user_id = auth.uid())
);

-- RLS Policies for reviews
CREATE POLICY "Anyone can view reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Students can create reviews for their bookings" ON public.reviews FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.students WHERE students.id = reviews.student_id AND students.user_id = auth.uid())
);
CREATE POLICY "Students can update their own reviews" ON public.reviews FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.students WHERE students.id = reviews.student_id AND students.user_id = auth.uid())
);

-- RLS Policies for favorites
CREATE POLICY "Students can view their own favorites" ON public.favorites FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.students WHERE students.id = favorites.student_id AND students.user_id = auth.uid())
);
CREATE POLICY "Students can manage their own favorites" ON public.favorites FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.students WHERE students.id = favorites.student_id AND students.user_id = auth.uid())
);
CREATE POLICY "Students can delete their own favorites" ON public.favorites FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.students WHERE students.id = favorites.student_id AND students.user_id = auth.uid())
);

-- Insert sample tutors for default display
INSERT INTO public.tutors (name, email, phone, qualifications, subjects, experience, address, city, state, coordinates_lat, coordinates_lng, availability_days, time_slots, fees_grade1to4, fees_grade5to9, fees_grade10, fees_grade11to12, fees_graduation, teaching_mode, rating, total_reviews, is_verified) VALUES
-- Mathematics tutors
('Dr. Priya Sharma', 'priya.sharma@email.com', '+91 98765 43210', ARRAY['M.Sc Mathematics', 'B.Ed'], ARRAY['Mathematics', 'Statistics'], 8, '123 Brigade Road', 'Bangalore', 'Karnataka', 12.9716, 77.5946, ARRAY['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], ARRAY['4:00 PM - 6:00 PM', '6:00 PM - 8:00 PM'], 1200, 2200, 2800, 4200, 5200, 'both', 4.8, 45, true),
('Prof. Rajesh Kumar', 'rajesh.kumar@email.com', '+91 87654 32109', ARRAY['PhD Mathematics', 'M.Sc'], ARRAY['Mathematics', 'Physics'], 12, '456 MG Road', 'Bangalore', 'Karnataka', 12.9716, 77.5946, ARRAY['Monday', 'Wednesday', 'Friday', 'Saturday'], ARRAY['2:00 PM - 4:00 PM', '4:00 PM - 6:00 PM'], 1500, 2500, 3000, 4500, 5500, 'home-tuition', 4.9, 67, true),
('Ms. Kavitha Reddy', 'kavitha.reddy@email.com', '+91 76543 21098', ARRAY['M.Sc Mathematics', 'B.Tech'], ARRAY['Mathematics', 'Computer Science'], 6, '789 Residency Road', 'Bangalore', 'Karnataka', 12.9716, 77.5946, ARRAY['Tuesday', 'Thursday', 'Saturday', 'Sunday'], ARRAY['10:00 AM - 12:00 PM', '2:00 PM - 4:00 PM'], 1000, 2000, 2500, 4000, 5000, 'center-based', 4.7, 32, true),
('Dr. Suresh Babu', 'suresh.babu@email.com', '+91 65432 10987', ARRAY['PhD Applied Mathematics', 'M.Sc'], ARRAY['Mathematics', 'Engineering Mathematics'], 15, '321 Electronic City', 'Bangalore', 'Karnataka', 12.9716, 77.5946, ARRAY['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], ARRAY['8:00 AM - 10:00 AM', '6:00 PM - 8:00 PM'], 1800, 2800, 3500, 5000, 6000, 'both', 4.9, 89, true),

-- Hyderabad Mathematics tutors
('Dr. Anitha Rao', 'anitha.rao@email.com', '+91 54321 09876', ARRAY['M.Sc Mathematics', 'B.Ed'], ARRAY['Mathematics', 'Statistics'], 9, '123 Banjara Hills', 'Hyderabad', 'Telangana', 17.3850, 78.4867, ARRAY['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], ARRAY['4:00 PM - 6:00 PM', '6:00 PM - 8:00 PM'], 1100, 2100, 2700, 4100, 5100, 'both', 4.8, 52, true),
('Prof. Ramesh Chandra', 'ramesh.chandra@email.com', '+91 43210 98765', ARRAY['PhD Mathematics', 'M.Phil'], ARRAY['Mathematics', 'Physics'], 11, '456 Jubilee Hills', 'Hyderabad', 'Telangana', 17.3850, 78.4867, ARRAY['Monday', 'Wednesday', 'Friday', 'Saturday'], ARRAY['2:00 PM - 4:00 PM', '4:00 PM - 6:00 PM'], 1400, 2400, 2900, 4400, 5400, 'home-tuition', 4.9, 78, true),
('Ms. Lakshmi Devi', 'lakshmi.devi@email.com', '+91 32109 87654', ARRAY['M.Sc Mathematics', 'B.Sc'], ARRAY['Mathematics', 'Chemistry'], 7, '789 Madhapur', 'Hyderabad', 'Telangana', 17.3850, 78.4867, ARRAY['Tuesday', 'Thursday', 'Saturday', 'Sunday'], ARRAY['10:00 AM - 12:00 PM', '2:00 PM - 4:00 PM'], 1000, 2000, 2500, 4000, 5000, 'center-based', 4.6, 41, true),
('Dr. Venkat Reddy', 'venkat.reddy@email.com', '+91 21098 76543', ARRAY['PhD Pure Mathematics', 'M.Sc'], ARRAY['Mathematics', 'Statistics'], 13, '321 Gachibowli', 'Hyderabad', 'Telangana', 17.3850, 78.4867, ARRAY['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], ARRAY['8:00 AM - 10:00 AM', '6:00 PM - 8:00 PM'], 1600, 2600, 3200, 4800, 5800, 'both', 4.8, 64, true),

-- Physics tutors in Bangalore
('Dr. Arun Prakash', 'arun.prakash@email.com', '+91 10987 65432', ARRAY['PhD Physics', 'M.Sc'], ARRAY['Physics', 'Mathematics'], 10, '567 Koramangala', 'Bangalore', 'Karnataka', 12.9716, 77.5946, ARRAY['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], ARRAY['4:00 PM - 6:00 PM', '6:00 PM - 8:00 PM'], 1300, 2300, 2900, 4300, 5300, 'both', 4.7, 58, true),
('Prof. Meera Iyer', 'meera.iyer@email.com', '+91 09876 54321', ARRAY['M.Sc Physics', 'B.Ed'], ARRAY['Physics', 'Chemistry'], 8, '890 Indiranagar', 'Bangalore', 'Karnataka', 12.9716, 77.5946, ARRAY['Monday', 'Wednesday', 'Friday', 'Saturday'], ARRAY['2:00 PM - 4:00 PM', '4:00 PM - 6:00 PM'], 1200, 2200, 2800, 4200, 5200, 'home-tuition', 4.8, 43, true),
('Dr. Sanjay Gupta', 'sanjay.gupta@email.com', '+91 98765 43210', ARRAY['PhD Applied Physics', 'M.Tech'], ARRAY['Physics', 'Engineering Physics'], 14, '234 Whitefield', 'Bangalore', 'Karnataka', 12.9716, 77.5946, ARRAY['Tuesday', 'Thursday', 'Saturday', 'Sunday'], ARRAY['10:00 AM - 12:00 PM', '2:00 PM - 4:00 PM'], 1500, 2500, 3000, 4500, 5500, 'center-based', 4.9, 72, true),
('Ms. Pooja Nair', 'pooja.nair@email.com', '+91 87654 32109', ARRAY['M.Sc Physics', 'B.Sc'], ARRAY['Physics', 'Mathematics'], 6, '345 HSR Layout', 'Bangalore', 'Karnataka', 12.9716, 77.5946, ARRAY['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], ARRAY['8:00 AM - 10:00 AM', '6:00 PM - 8:00 PM'], 1100, 2100, 2700, 4100, 5100, 'both', 4.6, 29, true);

-- Update updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_tutors_updated_at BEFORE UPDATE ON public.tutors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON public.students FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
