import { Button } from '@/components/ui/button'
import axios from 'axios'
import { PlusCircle, Ticket } from 'lucide-react'
import { useState } from 'react'
import { useLocation, useParams } from 'react-router'

const BuyTicket = () => {
  const { _id,title } = useLocation().state || {}
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const {id} =useParams()

  const buyTicket = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null);
    setError(null);
    if (!quantity||quantity<=0) {
      setError("Please enter a valid quantity");
      return;
    }
    try {
      setLoading(true);
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const res = await axios.post("http://localhost:5000/api/user/tickets", {
        eventId:id, quantity
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })

      if (res.status === 200) {
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
            <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
          </div>

          <form
            onSubmit={buyTicket}
            className="w-full max-w-xl mt-8 bg-slate-800/90 rounded-2xl p-6 md:p-8 shadow-xl backdrop-blur-sm border border-slate-700"
          >
            <div className="space-y-5">


              <label className="block text-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <Ticket size={16} /> <span className="font-medium">Quantity</span>
                </div>
                <input
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  type="number"
                  className="w-full bg-black/80 text-white rounded-md px-3 py-2 placeholder-white/60 focus:outline-none"
                />
              </label>

              {error && <p className="text-red-400 text-sm text-center">{error}</p>}
              {message && <p className="text-green-400 text-sm text-center">{message}</p>}

              <div className="pt-2 items-center justify-center flex">
                <Button disabled={loading} className="flex items-center gap-2 px-5 py-3 bg-sky-400/90 hover:bg-sky-500 text-white font-medium rounded-xl shadow-sm transition cursor-pointer">
                  {loading ? (
                    <span className="animate-pulse">Buying...</span>
                  ) : (
                    <>
                      <PlusCircle size={16} /> Buy Ticket
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

export default BuyTicket