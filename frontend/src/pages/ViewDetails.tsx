import { Button } from '@/components/ui/button'
import axios from 'axios';
import { BookOpen, Calendar, Check, CheckCircle, MapPin, TicketX, User, X } from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';


const ViewDetails = () => {

  //truyen tu Upcoming... vao day
  const { _id, title, date, expectedAttendees, attendees, location, description, price, status, source } = useLocation().state || {};
  const { id } = useParams();

  const navigate = useNavigate();
  const eventDate = new Date(date);
  const now = new Date();
  const diffTime = eventDate.getTime() - now.getTime(); // miliseconds
  const remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // quy đổi ra ngày

  //const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [actionDone, setActionDone] = useState(false);


  const acceptEvent = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setMessage(null)
    try {
      //setLoading(true);
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const res = await axios.put(`http://localhost:5000/api/admin/approve-event/${_id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })

      if (res.status === 200) {
        setMessage(res.data.message);
        setActionDone(true);
      }
      else setError(res.data.message)
    } catch (error) {
      console.log(error);
      setError("Failed Accept");
    } finally {
      //setLoading(false);
    }
  }

  const rejectEvent = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setMessage(null)
    try {
      //setLoading(true);
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const res = await axios.put(`http://localhost:5000/api/admin/reject-event/${_id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })

      if (res.status === 200) {
        setMessage(res.data.message);
        setActionDone(true);
      }
      else setError(res.data.message)
    } catch (error) {
      console.log(error);
      setError("Failed Reject");
    } finally {
      //setLoading(false);
    }
  }


  //Truyen tu day vao BuyTicket
  const buyTicket = () => {
    navigate(`/BuyTicket/${id}`, { state: { title, id } });
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
        <div className="min-h-screen bg-gradient-to-br flex flex-col items-center justify-center space-y-6 ">
          <p className='text-5xl font-bold'>{title}</p>

          {/* Countdown */}
          <div className="bg-gradient-to-r from-sky-500 to-cyan-400 text-white rounded-2xl p-6 w-[500px] shadow-xl">
            <h2 className="text-center font-bold text-lg">Countdown to {title}  </h2>
            <div className="flex justify-around mt-4">
              <div className="text-center">
                <p className="text-3xl font-bold">{remainingDays}</p>
                <p className="text-sm">Days</p>
              </div>
            </div>
          </div>

          {/* Event Info */}
          <div className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-2xl p-6 w-[600px] shadow-xl">
            {/* <h3 className="font-bold text-xl mb-2">{title}</h3> */}
            <p className="text-lg opacity-80 font-bold"><Calendar size={20} className="inline-block mr-1" /> {new Date(date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}</p>
            <p className="text-lg opacity-80 font-bold"><MapPin size={20} className="inline-block mr-1" /> {location}</p>
            <p className="text-lg opacity-80 font-bold">
              <TicketX size={20} className="inline-block mr-1" /> {expectedAttendees} Tickets
            </p>
            <p className="text-lg opacity-80 font-bold">
              <User size={20} className="inline-block mr-1" /> {price} $ / 1 ticket
            </p>
            <p className="text-lg opacity-80 font-bold">
              <BookOpen size={20} className="inline-block mr-2" />{description}
            </p>

            {source === "explore" || source === "homepage" ? (
              <Button className="mt-4 w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 rounded-xl transition cursor-pointer" onClick={() => buyTicket()}>
                Buy Ticket
              </Button>
            ) : source === "myEvents" ? (
              <>

                {status === "approved" ? (
                  <>

                    <p className="text-lg opacity-80 font-bold">
                      <TicketX size={20} className="inline-block mr-1" /> {attendees} Attending
                    </p>
                    <p className="text-lg opacity-80 font-bold">
                      <User size={20} className="inline-block mr-1" /> {price * attendees} Revenue
                    </p>
                    <span className="text-lg opacity-80 font-bold flex items-center align-middle text-green-300 mt-5 justify-center">
                      <CheckCircle /> Status: {String(status)}
                    </span>
                  </>
                ) : status === "rejected" ? (
                  <>
                    <span className="text-lg opacity-80 font-bold flex text-red-500 items-center gap-4">
                      <X /> Status: {String(status)}
                    </span>
                  </>
                ) : (
                  <p className="text-sm opacity-80">Status: {String(status)}</p>
                )}

              </>
            ) : source === "admin" ? (
              status === "pending" ? (
                <div className="flex flex-col items-center gap-4">
                  {error && <p className="text-red-400 text-sm text-center font-bold">{error}</p>}
                  {message && <p className="text-green-400 text-sm text-center font-bold">{message}</p>}

                  {!actionDone && ( // 🟢 chỉ hiển thị khi chưa hành động
                    <div className="flex justify-center gap-6">
                      <Button
                        className="flex items-center gap-2 px-5 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-xl shadow-sm transition cursor-pointer"
                        onClick={acceptEvent}
                      >
                        <Check /> Accept
                      </Button>

                      <Button
                        className="flex items-center gap-2 px-5 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl shadow-sm transition cursor-pointer"
                        onClick={rejectEvent}
                      >
                        <X /> Reject
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-sm opacity-80">Status: {String(status)}</p>
              )
            ) : (
              <p className="text-sm opacity-80">{source}</p>

            )}
          </div>

          {/* Chat Box */}
          {/* <div className="bg-gradient-to-r from-teal-500 to-sky-400 text-white rounded-2xl p-6 w-[600px] shadow-xl">
            <h3 className="font-bold mb-4">💬 Event Chat</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Alice:</strong> Can't wait for this event! The lineup looks amazing!</p>
              <p><strong>Bob:</strong> Does anyone know if there's a VIP package available?</p>
              <p><strong>Charlie:</strong> I'm flying in from New York for this. So excited!</p>
            </div>
            <div className="flex mt-4 space-x-2">
              <input type="text" placeholder="Type your message..." className="flex-1 bg-white/10 text-white rounded-lg px-3 py-2 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-300" />
              <Button className="bg-cyan-500 hover:bg-cyan-600 p-2 rounded-lg cursor-pointer">
                🚀
              </Button>
            </div>
          </div> */}
        </div>

      </div>
    </div >
  )
}

export default ViewDetails