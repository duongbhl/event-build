// ...existing code...
import FeaturedEventCard from "@/components/FeaturedEventCard"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";



export default function HomePage() {

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      fetch("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.ok && res.json())
        .then((data) => {
          if (data?.username) {
            setIsLogin(true);
          }
        })
        .catch(() => setIsLogin(false));
    } else {
      setIsLogin(false);
    }
  }, [location]);

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
      <div className="container z-10 relative mx-auto">
        <div className="min-h-screen bg-gradient-to-b pt-24 pb-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            {/* title */}
            <h1
              className="text-4xl font-extrabold text-slate-900 drop-shadow-sm slide-in-right mb-10"
              style={{ animationDelay: '0ms' }}
            >
              Welcome to EventFlow
            </h1>

          

            {/* Search box */}
            <div className="flex justify-center mb-10">
              <input
                type="text"
                placeholder="Search events..."
                className="w-96 px-4 py-3 rounded-xl bg-white/40 backdrop-blur-md border border-white/20 text-slate-900 placeholder-slate-500 focus:outline-none shadow-md slide-in-right"
                style={{ animationDelay: '160ms' }}
              />
            </div>

            {/* Featured Event */}
            <div className="mb-8 slide-in-right" style={{ animationDelay: '240ms' }}>
              <FeaturedEventCard
                _id={1}
                title="Eco-Innovation Summit"
                date={
                  new Date().getMonth().toString() +
                  "-" +
                  new Date().getDate().toString() +
                  "-" +
                  new Date().getFullYear().toString()
                }
                location="Ha Noi"
                expectedAttendees={1500}
                price={500}
                description="test"
                source="homepage"
              />
            </div>

            {/* Bottom action buttons */}
            {isLogin && <div className="flex justify-center gap-6">
              <Button
                className="flex items-center gap-2 px-5 py-3 bg-white/30 backdrop-blur-md border border-white/20 text-slate-800 font-medium rounded-xl shadow-sm hover:bg-white transition cursor-pointer slide-in-right"
                style={{ animationDelay: '640ms' }}
              >
                <span role="img" aria-label="explore">
                  🌎
                </span>
                <a href="/Explore">Explore Events</a>
              </Button>

              <Button
                className="flex items-center gap-2 px-5 py-3 bg-sky-400/90 hover:bg-sky-500 text-white font-medium rounded-xl shadow-sm transition cursor-pointer slide-in-right"
                style={{ animationDelay: '720ms' }}
              >
                <span role="img" aria-label="create">
                  ✨
                </span>
                <a href="/Create">Create Event</a>
              </Button>
            </div>}

          </div>
        </div>
      </div>
    </div>
  )
}
// ...existing code...