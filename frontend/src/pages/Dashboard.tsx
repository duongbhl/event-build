import axios from 'axios'
import { Calendar, Clock, TrendingUp, Users } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const StatCard: React.FC<{
  title: string
  value: React.ReactNode
  hint?: string
  className?: string
  icon?: React.ReactNode
}> = ({ title, value, hint, className = '', icon }) => (
  <div className={`rounded-lg p-5 shadow-lg text-white ${className}`}>
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm opacity-90">{title}</p>
        <p className="text-2xl font-bold mt-2">{value}</p>
        {hint && <p className="text-xs opacity-80 mt-1">{hint}</p>}
      </div>
      <div className="opacity-90">{icon}</div>
    </div>
  </div>
)

const Dashboard = () => {
  const [totalEvents, setTotalEvents] = useState(0)
  const [upcomingEvents, setUpcomingEvents] = useState(0)
  const [attendees, setAttendees] = useState(0)
  const [revenue, setRevenue] = useState(0)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token')
      const headers = { Authorization: `Bearer ${token}` }

      const [
        resTotal,
        resUpcoming,
        resAttendees,
        resRevenue
      ] = await Promise.all([
        axios.get('http://localhost:5000/api/user/stats/approved-last-5-months', { headers }),
        axios.get('http://localhost:5000/api/user/stats/approved-next-3-months', { headers }),
        axios.get('http://localhost:5000/api/user/stats/attendees-last-month', { headers }),
        axios.get('http://localhost:5000/api/user/stats/revenue-last-month', { headers })
      ])

      if (resTotal.status === 200) setTotalEvents(resTotal.data.total || 0)
      if (resUpcoming.status === 200) setUpcomingEvents(resUpcoming.data.total || 0)
      if (resAttendees.status === 200) setAttendees(resAttendees.data.totalAttendees || 0)
      if (resRevenue.status === 200) setRevenue(resRevenue.data.totalRevenue || 0)

      console.log("✅ Dashboard data fetched successfully")
    } catch (error) {
      console.error("❌ Error fetching dashboard stats:", error)
    }
  }

  return (
    <div className="min-h-screen w-full relative bg-white">
      {/* Background gradient */}
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

      <div className="container relative z-10">
        <div className="min-h-screen w-full flex flex-col items-center pt-24 pb-20 px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Event Dashboard</h1>

          <div className="w-full max-w-6xl px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Events"
                value={<span className="text-2xl font-extrabold">{totalEvents}</span>}
                hint="in last 5 months"
                className="bg-gradient-to-r from-indigo-500 to-violet-500"
                icon={<Calendar size={28} />}
              />

              <StatCard
                title="Upcoming Events"
                value={<span className="text-2xl font-extrabold">{upcomingEvents}</span>}
                hint="next 3 months"
                className="bg-gradient-to-r from-rose-400 to-rose-500"
                icon={<Clock size={28} />}
              />

              <StatCard
                title="Total Attendees"
                value={<span className="text-2xl font-extrabold">{attendees}</span>}
                hint="from last month"
                className="bg-gradient-to-r from-yellow-400 to-orange-500"
                icon={<Users size={28} />}
              />

              <StatCard
                title="Revenue"
                value={<span className="text-2xl font-extrabold">${revenue.toLocaleString()}</span>}
                hint="from last month"
                className="bg-gradient-to-r from-emerald-400 to-green-500"
                icon={<TrendingUp size={28} />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
