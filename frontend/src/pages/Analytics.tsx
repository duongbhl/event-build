import { DollarSign, Star, Users } from 'lucide-react'
import React, { useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const sample = {
  Revenue: [
    { month: 'Jan', value: 400 },
    { month: 'Feb', value: 300 },
    { month: 'Mar', value: 200 },
    { month: 'Apr', value: 280 },
    { month: 'May', value: 190 },
    { month: 'Jun', value: 240 },
    { month: 'Jun', value: 240 },
  ],
  Attendees: [
    { month: 'Jan', value: 1200 },
    { month: 'Feb', value: 900 },
    { month: 'Mar', value: 850 },
    { month: 'Apr', value: 950 },
    { month: 'May', value: 780 },
    { month: 'Jun', value: 1000 },
  ],
  Satisfaction: [
    { month: 'Jan', value: 4.6 },
    { month: 'Feb', value: 4.4 },
    { month: 'Mar', value: 4.7 },
    { month: 'Apr', value: 4.5 },
    { month: 'May', value: 4.3 },
    { month: 'Jun', value: 4.8 },
  ],
}

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null
  const value = payload[0].value
  return (
    <div
      style={{
        background: 'white',
        color: '#0f172a',
        padding: 10,
        borderRadius: 8,
        boxShadow: '0 6px 18px rgba(0,0,0,0.25)',
        minWidth: 100,
        fontSize: 13,
      }}
    >
      <div style={{ color: '#6b7280', marginBottom: 6 }}>{label}</div>
      <div style={{ fontWeight: 600 }}>value: {value}</div>
    </div>
  )
}

const Analytics: React.FC = () => {
  const [metric, setMetric] = useState<'Revenue' | 'Attendees' | 'Satisfaction'>('Revenue')
  const data = sample[metric]

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
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Event Analytics</h1>

          <div className="w-full max-w-4xl px-4">
            <div className="bg-black/85 rounded-xl p-6 shadow-xl border border-black/40">
              <h2 className="text-xl font-semibold text-white mb-1">Event Performance</h2>
              <p className="text-sm text-slate-300 mb-4">Analyze your event metrics over time</p>

              <div className="mb-4 flex items-center gap-3">
                <select
                  value={metric}
                  onChange={(e) => setMetric(e.target.value as any)}
                  className="bg-black/70 text-white rounded-md px-4 py-2 focus:outline-none cursor-pointer"
                >
                  <option>Revenue</option>
                  <option>Attendees</option>
                  <option>Satisfaction</option>
                </select>
              </div>
              
              {/* char */}
              <div className="w-full rounded-md p-4 bg-black/90">
                <div style={{ width: '100%', height: 320 }}>
                  <ResponsiveContainer>
                    <BarChart data={data} margin={{ top: 20, right: 20, left: 12, bottom: 40 }}>
                      <CartesianGrid stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
                      <XAxis
                        dataKey="month"
                        stroke="#94a3b8"
                        tick={{ fill: '#94a3b8' }}
                        axisLine={false}
                        tickLine={false}
                        padding={{ left: 10, right: 10 }}
                      />
                      <YAxis
                        stroke="#94a3b8"
                        tick={{ fill: '#94a3b8' }}
                        axisLine={false}
                        tickLine={false}
                        allowDecimals={false}
                      // let recharts pick domain; for Satisfaction small values it's fine
                      />
                      <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                      <Bar dataKey="value" fill="#93C5FD" radius={[6, 6, 0, 0]} barSize={44} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-black/85 rounded-lg p-6 shadow-lg border border-black/40">
                <div className="text-sm text-slate-300">Total Attendees</div>
                <div className="text-3xl font-bold text-white mt-2 flex items-center gap-2">
                  <Users size={20} /> 1,234
                </div>
              </div>

              <div className="bg-black/85 rounded-lg p-6 shadow-lg border border-black/40">
                <div className="text-sm text-slate-300">Total Revenue</div>
                <div className="text-3xl font-bold text-white mt-2 flex items-center gap-2">
                  <DollarSign size={20} /> $45,678
                </div>
              </div>

              <div className="bg-black/85 rounded-lg p-6 shadow-lg border border-black/40">
                <div className="text-sm text-slate-300">Avg. Satisfaction</div>
                <div className="text-3xl font-bold text-white mt-2 flex items-center gap-2">
                  <Star size={20} /> 4.7/5
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Analytics