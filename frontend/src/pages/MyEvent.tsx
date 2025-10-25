import type { EventCardProps } from "@/components/Event_Interface";
import UpcomingEventCard from "@/components/UpcomingEventCard";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";

const MyEvent = () => {
  const [events, setEvents] = useState<EventCardProps[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState<"ALL" | "PENDING" | "APPROVED">("ALL");
  const eventsPerPage = 6;

  useEffect(() => {
    if (filter === "ALL") fetchData();
    else if (filter === "PENDING") fetchPending();
    else if (filter === "APPROVED") fetchApproved();
  }, [filter]);

  // --- Fetch tất cả ---
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/user/events", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(res.data.data);
    } catch (error) {
      console.log("ERROR fetching events:", error);
    }
  };

  // --- Fetch pending ---
  const fetchPending = async () => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/user/events/pending", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(res.data.data);
    } catch (error) {
      console.log("ERROR fetching pending:", error);
    }
  };

  
  // --- Fetch approved ---
  const fetchApproved = async () => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/user/events/approved", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(res.data.data);
    } catch (error) {
      console.log("ERROR fetching approved:", error);
    }
  };

  // --- Lọc theo từ khóa tìm kiếm ---
  const filteredEvents = useMemo(() => {
    return events.filter((event) =>
      (event.title || "").toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [events, searchQuery]);

  // --- Phân trang ---
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // --- Định dạng ngày ---
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen w-full relative bg-white">
      {/* Hiệu ứng nền */}
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
        <section className="min-h-screen bg-gradient-to-b flex flex-col items-center pt-24 pb-20 px-4">
          {/* Tiêu đề */}
          <h2 className="text-4xl font-bold text-black mb-10 drop-shadow-md slide-in-right">
            My Event List
          </h2>

          {/* Bộ lọc trạng thái */}
          <div className="flex justify-center gap-4 mb-8">
            {["ALL", "PENDING", "APPROVED"].map((type) => (
              <button
                key={type}
                onClick={() => {
                  setFilter(type as "ALL" | "PENDING" | "APPROVED");
                  setCurrentPage(1);
                }}
                className={`px-6 py-2 rounded-lg font-semibold border ${filter === type
                    ? "bg-blue-400 text-white border-blue-400"
                    : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                  }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Ô tìm kiếm */}
          <div className="flex justify-center mb-10">
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-96 px-4 py-3 rounded-xl bg-white/40 backdrop-blur-md border border-white/20 text-slate-900 placeholder-slate-500 focus:outline-none shadow-md slide-in-right"
              style={{ animationDelay: "160ms" }}
            />
          </div>

          {/* Danh sách sự kiện */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
            {currentEvents.length > 0 ? (
              currentEvents.map((event) => (
                <UpcomingEventCard
                  key={event._id}
                  _id={event._id}
                  title={event.title}
                  date={formatDate(event.date)}
                  location={event.location}
                  expectedAttendees={event.expectedAttendees}
                  attendees={event.attendees}
                  price={event.price}
                  description={event.description}
                  status={event.status}
                  source="myEvents"
                />
              ))
            ) : (
              <p className="text-gray-500 italic">No events available.</p>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-3 mt-10">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg ${currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-blue-400 text-white hover:bg-blue-500"
                  }`}
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-4 py-2 rounded-lg ${currentPage === i + 1
                      ? "bg-blue-400 text-white font-bold"
                      : "bg-gray-100 hover:bg-gray-200"
                    }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg ${currentPage === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-blue-400 text-white hover:bg-blue-500"
                  }`}
              >
                Next
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default MyEvent;
