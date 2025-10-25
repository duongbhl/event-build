import { Button } from '@/components/ui/button'
import axios from 'axios'
import { Calendar, DollarSign, FileText, MapPin, PlusCircle, Users } from 'lucide-react'
import React, { useState } from 'react'

const Create = () => {

  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [expectedAttendees, setAttendees] = useState<number | ''>('')
  const [price, setPrice] = useState<number | ''>('');
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);


  function isValidDateDMY(dateStr: string) {
    const [day, month, year] = dateStr.split('/').map(Number);
    const date = new Date(year, month - 1, day);

    return (
      date.getFullYear() === year &&
      date.getMonth() + 1 === month &&
      date.getDate() === day
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null);
    setError(null);
    if (!title || !date || !location || !expectedAttendees || !price) {
      setError("All fields must be typed");
    }
    const eventDate = new Date(date);
    const now = new Date()
    
    if (eventDate.getDay() <= now.getDay() && eventDate.getMonth() <= now.getMonth() && eventDate.getFullYear() <= now.getFullYear()) {
      setError("Choose another Day");

    } else {
      try {
        setLoading(true);
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        const res = await axios.post("http://localhost:5000/api/user/event/", {
          title, date, location, expectedAttendees, price, description
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })

        if (res.status === 201) {
          setMessage(res.data.message)
        }
        else setError(res.data.message)

      } catch (error) {
        console.log("ERROR");
        setError("ERROR")
      } finally {
        setLoading(false)
      }
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
        <div className="min-h-screen w-full relative bg-gradient-to-b flex flex-col items-center pt-24 pb-20 px-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold">Create New Event</h1>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full max-w-xl mt-8 bg-slate-800/90 rounded-2xl p-6 md:p-8 shadow-xl backdrop-blur-sm border border-slate-700"
          >
            <div className="space-y-5">
              <label className="block text-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <FileText size={16} /> <span className="font-medium">Event Title</span>
                </div>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter event title"
                  className="w-full bg-black/80 text-white rounded-md px-3 py-2 placeholder-white/60 focus:outline-none"
                />
              </label>

              <label className="block text-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar size={16} /> <span className="font-medium">Date</span>
                </div>
                <input
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  type="date"
                  className="w-full bg-black/80 text-white rounded-md px-3 py-2 placeholder-white/60 focus:outline-none"
                />
              </label>

              <label className="block text-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={16} /> <span className="font-medium">Location</span>
                </div>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Event location"
                  className="w-full bg-black/80 text-white rounded-md px-3 py-2 placeholder-white/60 focus:outline-none"
                />
              </label>

              <label className="block text-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <Users size={16} /> <span className="font-medium">Expected Attendees</span>
                </div>
                <input
                  value={expectedAttendees}
                  onChange={(e) => setAttendees(e.target.value === '' ? '' : Number(e.target.value))}
                  type="number"
                  min={0}
                  placeholder="e.g. 120"
                  className="w-full bg-black/80 text-white rounded-md px-3 py-2 placeholder-white/60 focus:outline-none"
                />
              </label>

              <label className="block text-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign size={16} /> <span className="font-medium">Price</span>
                </div>
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                  type="number"
                  min={0}
                  placeholder="e.g. 120"
                  className="w-full bg-black/80 text-white rounded-md px-3 py-2 placeholder-white/60 focus:outline-none"
                />
              </label>

              <label className="block text-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <FileText size={16} /> <span className="font-medium">Description</span>
                </div>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                  placeholder="Write a short description..."
                  className="w-full bg-black/80 text-white rounded-md px-3 py-2 placeholder-white/60 focus:outline-none resize-none"
                />
              </label>

              {/* Messages */}
              {error && <p className="text-red-400 text-sm text-center">{error}</p>}
              {message && <p className="text-green-400 text-sm text-center">{message}</p>}

              <div className="pt-2 items-center justify-center flex">
                <Button className="flex items-center gap-2 px-5 py-3 bg-sky-400/90 hover:bg-sky-500 text-white font-medium rounded-xl shadow-sm transition cursor-pointer">
                  {loading ? (
                    <span className="animate-pulse">Create...</span>
                  ) : (
                    <>
                      <PlusCircle size={16} /> Create
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

  )
}

export default Create