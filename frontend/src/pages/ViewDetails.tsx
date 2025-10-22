import { Button } from '@/components/ui/button'
import { Check, DollarSign, TicketX, Users } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';


const ViewDetails = () => {

  //truyen tu Upcoming... vao day
  const { _id,title, date, expectedAttendees, location, description, price, source } = useLocation().state || {};

  const navigate = useNavigate();
  const eventDate = new Date(date);
  const now = new Date();
  const diffTime = eventDate.getTime() - now.getTime(); // miliseconds
  const remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // quy đổi ra ngày


  //Truyen tu day vao BuyTicket
  const buyTicket = (_id:string)=>{
    navigate(`/BuyTicket/${_id}`,{state:{title,_id}});
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
            <h2 className="text-center font-bold text-lg">Countdown to {title}</h2>
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
            <p className="text-sm opacity-80">📅 {date}</p>
            <p className="text-sm opacity-80">📍 {location}</p>
            <p className="text-sm opacity-80">
              <Users size={14} className="inline-block mr-1" /> {expectedAttendees} Attending
            </p>
            <p className="text-sm opacity-80">
              <DollarSign size={14} className="inline-block mr-1" /> {price} $ / 1 ticket
            </p>
            <p className="text-sm mt-2">
              {description}
            </p>

            {source === "explore" || source === "homepage" ? (<>
              <Button className="mt-4 w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 rounded-xl transition cursor-pointer" onClick={()=>buyTicket(_id)}>
                Buy Ticket
              </Button>
            </>) : source === "myEvents" ? (
              <>
                <Button className="mt-4 w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 rounded-xl transition cursor-pointer">
                  Register for Event
                </Button>
              </>
            ) : source === "admin" ? (
              <>
                <div className="flex justify-center gap-6">
                  <Button
                    className="flex items-center gap-2 px-5 py-3 bg-green-500 backdrop-blur-md border border-white/20 text-slate-800 font-medium rounded-xl shadow-sm hover:bg-green-600 transition cursor-pointer"

                  >
                    <span role="img" aria-label="explore">
                      <Check />
                    </span>
                    <p className='text-amber-50'>Accept</p>
                  </Button>

                  <Button
                    className="flex items-center gap-2 px-5 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl shadow-sm transition cursor-pointer "

                  >
                    <span role="img" aria-label="create">
                      <TicketX />
                    </span>
                    <p className='text-amber-50'>Reject</p>
                  </Button>
                </div>

              </>
            ) : source}
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