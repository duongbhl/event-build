import UpcomingEventCard from "@/components/UpcomingEventCard";


const AdminDashboard = () => {

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
            {/* Title */}
            <h1
              className="text-4xl font-extrabold text-slate-900 drop-shadow-sm mb-2 slide-in-right"
              style={{ animationDelay: '0ms' }}
            >
              Pending Events
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


            {/* Event list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[1, 2, 3, 4].map((n, idx) => (
                <div
                  key={n}
                  className="slide-in-right"
                  style={{ animationDelay: `${320 + idx * 80}ms` }}
                >
                  <UpcomingEventCard
                    _id={n}
                    title="Test"
                    date={
                      new Date().getMonth().toString() +
                      "-" +
                      new Date().getDate().toString() +
                      "-" +
                      new Date().getFullYear().toString()
                    }
                    location="Ha Noi"
                    expectedAttendees={1600}
                    price={500}
                    description="test1"
                    source="admin"
                  />
                </div>
              ))}
            </div>

            {/* Bottom action buttons */}
            <div className="flex justify-center gap-6">
              
              {/* <Button
                className="flex items-center gap-2 px-5 py-3 bg-sky-400/90 hover:bg-sky-500 text-white font-medium rounded-xl shadow-sm transition cursor-pointer slide-in-right"
                style={{ animationDelay: '720ms' }}
              >
                <span role="img" aria-label="create">
                  ✨
                </span>
                <a href="/Create">Approved Event List</a>
              </Button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard