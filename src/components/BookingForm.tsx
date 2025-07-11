
import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, BookOpen, DollarSign, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Teacher } from '../types';

interface BookingFormProps {
  teacher: Teacher;
  onBookingSubmit: (bookingData: any) => void;
  onCancel: () => void;
  currentUserGrade?: string;
}

const BookingForm = ({ teacher, onBookingSubmit, onCancel, currentUserGrade }: BookingFormProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [teachingMode, setTeachingMode] = useState<'home-tuition' | 'center-based'>('home-tuition');
  const [location, setLocation] = useState('');
  const [specialRequirements, setSpecialRequirements] = useState('');
  const [grade, setGrade] = useState(currentUserGrade || '');

  const getGradeGroup = (selectedGrade: string): keyof Teacher['fees'] => {
    if (['1st Grade', '2nd Grade', '3rd Grade', '4th Grade'].includes(selectedGrade)) {
      return 'grade1to4';
    } else if (['5th Grade', '6th Grade', '7th Grade', '8th Grade', '9th Grade'].includes(selectedGrade)) {
      return 'grade5to9';
    } else if (selectedGrade === '10th Grade') {
      return 'grade10';
    } else if (['11th Grade', '12th Grade'].includes(selectedGrade)) {
      return 'grade11to12';
    }
    return 'graduation';
  };

  const sessionFee = grade ? teacher.fees[getGradeGroup(grade)] : teacher.fees.grade5to9;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTimeSlot || !selectedSubject || !location || !grade) {
      return;
    }

    const bookingData = {
      tutorId: teacher.id,
      subject: selectedSubject,
      grade,
      scheduledDate: format(selectedDate, 'yyyy-MM-dd'),
      timeSlot: selectedTimeSlot,
      teachingMode,
      location,
      fees: sessionFee,
      specialRequirements: specialRequirements || null,
    };

    onBookingSubmit(bookingData);
  };

  const grades = [
    '1st Grade', '2nd Grade', '3rd Grade', '4th Grade', '5th Grade',
    '6th Grade', '7th Grade', '8th Grade', '9th Grade', '10th Grade',
    '11th Grade', '12th Grade', 'Graduation'
  ];

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={teacher.photo || `https://ui-avatars.com/api/?name=${teacher.name}&size=64&background=6366f1&color=ffffff`}
          alt={teacher.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Book Session with {teacher.name}</h2>
          <p className="text-gray-600">Rate: ₹{sessionFee}/session</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="grade">Grade *</Label>
            <Select value={grade} onValueChange={setGrade}>
              <SelectTrigger>
                <SelectValue placeholder="Select grade" />
              </SelectTrigger>
              <SelectContent>
                {grades.map((gradeOption) => (
                  <SelectItem key={gradeOption} value={gradeOption}>
                    {gradeOption}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="subject">Subject *</Label>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                {teacher.subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Preferred Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label htmlFor="timeSlot">Time Slot *</Label>
            <Select value={selectedTimeSlot} onValueChange={setSelectedTimeSlot}>
              <SelectTrigger>
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {teacher.availability.timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="teachingMode">Teaching Mode *</Label>
          <Select value={teachingMode} onValueChange={(value: 'home-tuition' | 'center-based') => setTeachingMode(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {(teacher.teachingMode === 'both' || teacher.teachingMode === 'home-tuition') && (
                <SelectItem value="home-tuition">Home Tuition</SelectItem>
              )}
              {(teacher.teachingMode === 'both' || teacher.teachingMode === 'center-based') && (
                <SelectItem value="center-based">Center Based</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="location">
            {teachingMode === 'home-tuition' ? 'Your Address' : 'Preferred Location'} *
          </Label>
          <Input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder={teachingMode === 'home-tuition' ? 'Enter your full address' : 'Enter preferred meeting location'}
            required
          />
        </div>

        <div>
          <Label htmlFor="requirements">Special Requirements</Label>
          <Textarea
            id="requirements"
            value={specialRequirements}
            onChange={(e) => setSpecialRequirements(e.target.value)}
            placeholder="Any specific requirements or notes for the tutor..."
            rows={3}
          />
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Session Fee:</span>
            <span className="text-2xl font-bold text-indigo-600">₹{sessionFee}</span>
          </div>
        </div>

        <div className="flex space-x-4">
          <Button type="button" onClick={onCancel} variant="outline" className="flex-1">
            Cancel
          </Button>
          <Button type="submit" className="flex-1">
            Book Session
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default BookingForm;
