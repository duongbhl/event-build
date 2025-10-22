import type { EventCardProps } from '@/components/Event_Interface';
import UpcomingEventCard from '@/components/UpcomingEventCard';
import axios from 'axios';
import { useEffect, useState } from 'react';





const Explore = () => {

  const [eventList, setEvents] = useState<EventCardProps[]>([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token")||sessionStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/user/allEvents/approved",{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      setEvents(res.data.data)
    } catch (error) {
      console.log('ERROR');
    }
  }

  return (
    <div className="min-h-screen w-full relative bg-white">
      {/* Teal Glow Right */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#ffffff",
          backgroundImage: `
        radial-gradient(
          circle at top right,
          rgba(56, 193, 182, 0.5),
          transparent 70%
        )
      `,
          filter: "blur(80px)",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className='container relative z-10'>
        <section className="min-h-screen bg-gradient-to-b flex flex-col items-center pt-24 pb-20 px-4">
          <h2 className="text-4xl font-bold text-black mb-10 drop-shadow-md slide-in-right">
            Upcoming Events
          </h2>

          {/* Search box */}
          <div className="flex justify-center mb-10">
            <input
              type="text"
              placeholder="Search events..."
              className="w-96 px-4 py-3 rounded-xl bg-white/40 backdrop-blur-md border border-white/20 text-slate-900 placeholder-slate-500 focus:outline-none shadow-md slide-in-right"
              style={{ animationDelay: '160ms' }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
            {eventList.map((event) => (
              <UpcomingEventCard
                key={event._id}
                _id={event._id}
                title={event.title}
                date={event.date}
                location={event.location}
                expectedAttendees={event.expectedAttendees}
                price={event.price}
                description={event.description}
                source="explore"
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Explore