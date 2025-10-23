import { Calendar, MapPin, Users } from 'lucide-react';
import React from 'react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router';
import type { EventCardProps } from './Event_Interface';


const UpcomingEventCard: React.FC<EventCardProps> = ({
  _id,
  title,
  date,
  location,
  expectedAttendees,
  attendees,
  price,
  description,
  status,
  source
}) => {
  const navigate = useNavigate();

  const handleViewDetails = (eventId: number, source: string) => {
    if (source === "admin") {
      navigate(`/admin/ViewDetails/${eventId}`, {
        state: { _id,title, date, location, expectedAttendees,attendees, description, price,status, source, },
      });
    }
    else navigate(`/ViewDetails/${eventId}`, {
      state: { _id,title, date, location, expectedAttendees,attendees, description, price,status, source, },
    });
  };

  return (
    <div className="rounded-2xl overflow-hidden shadow-xl backdrop-blur-lg border border-blue-200 bg-blue-400/50 hover:bg-blue-400/70 transition duration-300 slide-in-right">
      <div className="p-5 text-white">
        <h3 className="text-lg font-semibold drop-shadow-sm">{title}</h3>
        <p className="flex items-center gap-2 text-sm mt-1 opacity-90">
          <Calendar size={16} /> {new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>

      <div className="bg-black/30 p-5 text-white space-y-2">
        <p className="flex items-center gap-2 text-sm">
          <MapPin size={16} /> {location}
        </p>
        <p className="flex items-center gap-2 text-sm">
          <Users size={16} /> {expectedAttendees} Attending
        </p>

        <Button
          className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg py-2 shadow-sm transition cursor-pointer"
          onClick={() => handleViewDetails(_id, source)}
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default UpcomingEventCard;
