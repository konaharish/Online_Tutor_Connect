
import React from 'react';
import { Calendar, Clock, MapPin, User, Phone, Mail, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useBookings, BookingSession } from '../hooks/useBookings';

const Bookings = () => {
  const { bookings, loading, updateBookingStatus } = useBookings();

  const getStatusColor = (status: BookingSession['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
          <p className="text-gray-600 mt-2">Manage your tutor sessions and bookings</p>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings yet</h3>
            <p className="text-gray-600 mb-4">Start by booking a session with one of our tutors.</p>
            <Button onClick={() => window.location.href = '/search'}>
              Find Tutors
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <Card key={booking.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-indigo-100 p-3 rounded-full">
                      <User className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {booking.subject} - {booking.grade}
                      </h3>
                      <p className="text-gray-600">Tutor ID: {booking.tutor_id}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Date</p>
                      <p className="font-medium">{formatDate(booking.scheduled_date)}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Time</p>
                      <p className="font-medium">{booking.time_slot}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Mode</p>
                      <p className="font-medium capitalize">
                        {booking.teaching_mode.replace('-', ' ')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <div>
                      <p className="text-sm text-gray-600">Fee</p>
                      <p className="font-medium">₹{booking.fees}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-1">Location:</p>
                  <p className="text-gray-900">{booking.location}</p>
                </div>

                {booking.special_requirements && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-1">Special Requirements:</p>
                    <p className="text-gray-900">{booking.special_requirements}</p>
                  </div>
                )}

                <div className="flex space-x-2">
                  {booking.status === 'pending' && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                  {booking.status === 'confirmed' && (
                    <Button
                      size="sm"
                      onClick={() => updateBookingStatus(booking.id, 'completed')}
                    >
                      Mark as Completed
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;
