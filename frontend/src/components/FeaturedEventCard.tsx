import React from 'react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router';
import type { EventCardProps } from './Event_Interface';



const FeaturedEventCard: React.FC<EventCardProps> = ({ _id, title, date, location, expectedAttendees, price, description, source }) => {
    const navigate = useNavigate();

    const handleViewDetails = (eventId: number, source: string) => {
        navigate(`/ViewDetails/${eventId}`, {
            state: { title, date, location, expectedAttendees, price, description, source },
        });
    };
    return (
        <div className="bg-white/40 backdrop-blur-md border border-white/20 shadow-md rounded-2xl p-8 mb-10 mx-auto w-3xl text-left ">
            <h2 className="text-2xl font-bold text-slate-800 mb-1">
                Featured Event
            </h2>
            <p className="text-slate-600 text-sm mb-3">
                Check out our spotlight event
            </p>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
                {title}
            </h3>
            <p className="text-slate-700 text-sm mb-1">{new Date(date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            })}</p>
            <p className="text-slate-700 text-sm mb-1">{location}</p>
            <p className="text-slate-700 text-sm mb-3">{expectedAttendees} attendees</p>
            <Button className="px-4 py-2 rounded-lg bg-sky-400/90 hover:bg-sky-500 text-white shadow-sm transition cursor-pointer" onClick={() => handleViewDetails(_id, source)}>
                Learn More
            </Button>
        </div>
    )
}

export default FeaturedEventCard