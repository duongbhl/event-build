import React from 'react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router';
import type { EventCardProps } from './Event_Interface';


const EventCard: React.FC<EventCardProps> = ({ _id, title, date, location, expectedAttendees,price,description,source }) => {
    const navigate = useNavigate();

    const handleViewDetails = (eventId: number,source:string) => {
        navigate(`/ViewDetails/${eventId}`, {
            state: { title, date, location, expectedAttendees, description,price,source },
        });
    };
    return (
        <div
            className="bg-white/40 backdrop-blur-md border border-white/20 shadow-md rounded-xl p-6 text-left hover:bg-white/50 transition"
        >
            <h4 className="text-lg font-semibold text-slate-900 mb-2">
                {title}
            </h4>
            <p className="text-slate-700 text-sm mb-3">
                {date} <br /> <br />{location} <br /> {expectedAttendees} attendees
            </p>
            <Button className="px-3 py-2 rounded-md bg-sky-400/90 hover:bg-sky-500 text-white text-sm shadow-sm cursor-pointer transition" onClick={() => handleViewDetails(_id,source)}>
                View Details
            </Button>
        </div>
    )
}

export default EventCard