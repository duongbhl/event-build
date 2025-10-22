import { Button } from '@/components/ui/button'
import { Bell, Eye, EyeOff, IterationCw, Key} from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios'


const Settings: React.FC = () => {
  const [currentPassword, setPassword] = useState("")
  const [newPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [notifications, setNotifications] = useState(true)

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)
    if(!currentPassword || !newPassword){
      setError("Please fill in all fields.")
      setLoading(false)
      return
    }
    try {
      const token = localStorage.getItem("token")||sessionStorage.getItem("token");
      setLoading(true)
      const res = await axios.put(`http://localhost:5000/api/auth/change-password`,{currentPassword, newPassword},{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if(res.status === 200){
        setMessage(res.data.message || "Password changed successfully!")
      }else{
        setError(res.data.message || "Failed to change password.")
      }
      //setMessage(res.data.message)

    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred. Please try again.")
    } finally {
      setLoading(false)
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
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Account Settings</h1>
          <form
            onSubmit={handleChangePassword}
            className="w-full max-w-3xl bg-black/85 rounded-xl p-8 shadow-xl border border-black/40"
          >
            <h2 className="text-2xl font-semibold text-white mb-1">Personal Information</h2>
            <p className="text-sm text-slate-300 mb-6">Update your account settings and preferences.</p>

            <div className="space-y-6">
              

              <label className="block text-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <Key size={16} /> <span className="font-medium">Current Password</span>
                </div>
                <div className="relative">
                  <input
                    value={currentPassword}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your current password"
                    className="w-full bg-black/80 text-white rounded-md px-3 py-2 placeholder-white/60 focus:outline-none pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300"
                  >
                    {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                </div>
              </label>

              {/*Confirm Password */}
              <label className="block text-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <Key size={16} /> <span className="font-medium">New Password</span>
                </div>
                <div className="relative">
                  <input
                    value={newPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Enter new password "
                    className="w-full bg-black/80 text-white rounded-md px-3 py-2 placeholder-white/60 focus:outline-none pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300"
                  >
                    {showConfirmPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                </div>
              </label>

              {/* Messages */}
              {error && <p className="text-red-400 text-sm text-center">{error}</p>}
              {message && <p className="text-green-400 text-sm text-center">{message}</p>}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setNotifications((s) => !s)}
                    className={`w-12 h-7 rounded-full p-1 transition-colors ${notifications ? 'bg-cyan-400' : 'bg-white/40'}`}
                    aria-pressed={notifications}
                  >
                    <div
                      className={`bg-white w-5 h-5 rounded-full shadow transform transition-transform ${notifications ? 'translate-x-5' : 'translate-x-0'}`}
                    />
                  </button>
                  <div className="flex items-center gap-2">
                    <Bell size={16} className="text-white/90" />
                    <span className="text-white font-medium">Enable notifications</span>
                  </div>
                </div>

                <span className="text-sm text-slate-400">You will receive important updates</span>
              </div>

              <div className="pt-2 flex justify-center">
                <Button
                  className="flex items-center gap-2 px-5 py-3 bg-sky-400/90 hover:bg-sky-500 text-white font-medium rounded-xl shadow-sm transition cursor-pointer"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="animate-pulse">Save Change...</span>
                  ) : (
                    <>
                      <IterationCw />Save Change
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

export default Settings