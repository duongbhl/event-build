import type { EventCardProps } from "@/components/Event_Interface";
import FeaturedEventCard from "@/components/FeaturedEventCard";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ChevronLeft, ChevronRight } from "lucide-react"; // dùng icon đẹp hơn


export default function HomePage() {
  const [isLogin, setIsLogin] = useState(false);
  const [eventList, setEvents] = useState<EventCardProps[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const carouselRef = useRef<any>(null); // ref điều khiển Carousel

  // Kiểm tra đăng nhập
  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      fetch("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.ok && res.json())
        .then((data) => {
          if (data?.username) setIsLogin(true);
        })
        .catch(() => setIsLogin(false));
    } else setIsLogin(false);
  }, [location]);

  // Lấy danh sách event từ backend
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/user/allEvents/approved", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(res.data.data);
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  // Lọc theo search
  const filteredEvents = eventList.filter((event) =>
    (event.title || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Cấu hình Carousel
  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

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
          <div className="max-w-6xl mx-auto text-center relative">
            {/* Title */}
            <h1
              className="text-4xl font-extrabold text-slate-900 drop-shadow-sm slide-in-right mb-10"
              style={{ animationDelay: "0ms" }}
            >
              Welcome to EventFlow
            </h1>

            {/* Search box */}
            <div className="flex justify-center">
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-96 px-4 py-3 rounded-xl bg-white/40 backdrop-blur-md border border-white/20 text-slate-900 placeholder-slate-500 focus:outline-none shadow-md slide-in-right"
                style={{ animationDelay: "160ms" }}
              />
            </div>

            {/* Carousel Event */}
            {filteredEvents.length > 0 ? (
              <div className="relative flex items-center justify-center">
                {/* Nút trái */}
                <button
                  onClick={() => carouselRef.current?.previous()}
                  className="absolute left-0 bg-gray-800/70 hover:bg-gray-800 text-white p-2 rounded-full z-10 cursor-pointer ml-30"
                >
                  <ChevronLeft size={24} />
                </button>

                <Carousel
                  ref={carouselRef}
                  responsive={responsive}
                  infinite
                  autoPlay
                  autoPlaySpeed={5000}
                  arrows={false} // ẩn mũi tên mặc định
                  showDots
                  draggable
                  swipeable
                  pauseOnHover
                  containerClass="carousel-container mb-8"
                  itemClass="w-full flex justify-center"
                >
                  {filteredEvents.map((event) => (
                    <div key={event._id} className="flex justify-center w-full mt-10">
                      <FeaturedEventCard
                        _id={event._id}
                        title={event.title}
                        date={event.date}
                        location={event.location}
                        expectedAttendees={event.expectedAttendees}
                        attendees={event.attendees}
                        price={event.price}
                        description={event.description}
                        status={event.status}
                        source="homepage"
                      />
                    </div>
                  ))}
                </Carousel>

                {/* Nút phải */}
                <button
                  onClick={() => carouselRef.current?.next()}
                  className="absolute right-0 bg-gray-800/70 hover:bg-gray-800 text-white p-2 rounded-full z-10 cursor-pointer mr-30"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            ) : (
              <p className="text-gray-500 italic">No events found.</p>
            )}


            {/* Nút hành động */}
            {isLogin && (
              <div className="flex justify-center gap-6 mt-10">
                <Button
                  className="flex items-center gap-2 px-5 py-3 bg-white/30 backdrop-blur-md border border-white/20 text-slate-800 font-medium rounded-xl shadow-sm hover:bg-white transition cursor-pointer slide-in-right"
                  style={{ animationDelay: "640ms" }}
                >
                  🌎 <a href="/Explore">Explore Events</a>
                </Button>

                <Button
                  className="flex items-center gap-2 px-5 py-3 bg-sky-400/90 hover:bg-sky-500 text-white font-medium rounded-xl shadow-sm transition cursor-pointer slide-in-right"
                  style={{ animationDelay: "720ms" }}
                >
                  ✨ <a href="/Create">Create Event</a>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
