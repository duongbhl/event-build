import { Calendar, Clock, TrendingUp, Users } from 'lucide-react'
import React from 'react'


const StatCard: React.FC<{
  title: string
  value: React.ReactNode
  hint?: string
  className?: string
  icon?: React.ReactNode
}> = ({ title, value, hint, className = '', icon }) => {
  return (
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
}

const Dashboard = () => {
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
          <h1 className="text-3xl md:text-4xl font-bold mb-8 slide-in-right">Event Dashboard</h1>

          <div className="w-full max-w-6xl px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Events"
                value={<span className="text-2xl font-extrabold">25</span>}
                hint="+5 from last month"
                className="bg-gradient-to-r from-indigo-500 to-violet-500 slide-in-right"
                icon={<Calendar size={28} />}
              />

              <StatCard
                title="Upcoming Events"
                value={<span className="text-2xl font-extrabold">8</span>}
                hint="Next event in 3 days"
                className="bg-gradient-to-r from-rose-400 to-rose-500 slide-in-right"
                icon={<Clock size={28} />}
              />

              <StatCard
                title="Total Attendees"
                value={<span className="text-2xl font-extrabold">1,234</span>}
                hint="+20% from last month"
                className="bg-gradient-to-r from-yellow-400 to-orange-500 slide-in-right"
                icon={<Users size={28} />}
              />

              <StatCard
                title="Revenue"
                value={<span className="text-2xl font-extrabold">$45,678</span>}
                hint="+15% from last month"
                className="bg-gradient-to-r from-emerald-400 to-green-500 slide-in-right"
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