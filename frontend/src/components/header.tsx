// ...existing code...

import { Button } from "@/components/ui/button"
import {
  PlusCircle,
  LayoutDashboard,
  Menu,
  CalendarDays,
  CircleUser,
  LogOut,
  CalendarCheck,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router"

const navItems = [
  { label: "Explore", icon: CalendarDays },
  { label: "MyEvent", icon: CalendarCheck },
  { label: "Create", icon: PlusCircle },
  { label: "Dashboard", icon: LayoutDashboard },
]

export const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminPage = useLocation().pathname.startsWith("/admin")

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      fetch("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.ok && res.json())
        .then((data) => {
          if (data?.username) {
            setUsername(data.username);
            setIsLogin(true);
          }
        })
        .catch(() => {
          setIsLogin(false)
        });
    } else {
      setIsLogin(false);
    }
  }, [location]);

  // Khi bấm logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setIsLogin(false);
    navigate("/SignIn");
  };

  // Lấy đường dẫn hiện tại
  const currentPath = location.pathname;

  return (
    <header className="w-full bg-[#1e2633] text-white border-b overflow-hidden">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div
          className="text-xl font-bold text-blue-300 slide-in-right"
          style={{ animationDelay: `0ms` }}
        >
          {isAdminPage&&<a href="/admin">EventFlow</a>}
          {!isAdminPage&&<a href="/">EventFlow</a>}
        </div>

        {/* Navigation */}
        {!isAdminPage && isLogin&& <nav className="flex items-center space-x-8 text-sm font-medium absolute middle left-1/2 transform -translate-x-1/2">
          {navItems.map((item, idx) => {
            const Icon = item.icon
            return (
              <a
                key={item.label}
                href={`/${item.label}`}
                className="flex items-center gap-2 hover:text-blue-200 transition-colors slide-in-right"
                style={{ animationDelay: `${80 + idx * 80}ms` }}
              >
                <Icon size={16} /> {item.label}
              </a>
            )
          })}

          {/* Menu “More” */}
          <div className="slide-in-right" style={{ animationDelay: `${80 + navItems.length * 80}ms` }}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 hover:text-blue-200 transition-colors focus:outline-none cursor-pointer">
                  <Menu size={16} /> More
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="bg-[#1e2633] text-white border border-gray-700">
                <DropdownMenuItem className="hover:bg-blue-200 focus:bg-blue-400 focus:text-white cursor-pointer">
                  <a href="/Analytics">Analytics</a>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-blue-200 focus:bg-blue-400 focus:text-white cursor-pointer">
                  <a href="/Networking">Networking</a>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-blue-200 focus:bg-blue-400 focus:text-white cursor-pointer">
                  <a href="/Settings">Settings</a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>}


        {/* Right buttons */}
        <div className="flex items-center gap-4">
          {(() => {
            if (!isLogin) {
              if (currentPath === "/SignIn") {
                return (
                  <Button
                    className="bg-black hover:bg-blue-200 hover:text-black text-white cursor-pointer slide-in-right w-20"
                    style={{ animationDelay: `400ms` }}
                    onClick={() => navigate("/SignUp")}
                  >
                    Sign Up
                  </Button>
                );
              } else if (currentPath === "/SignUp") {
                return (
                  <Button
                    className="bg-black hover:bg-blue-200 hover:text-black text-white cursor-pointer slide-in-right w-20"
                    style={{ animationDelay: `400ms` }}
                    onClick={() => navigate("/SignIn")}
                  >
                    Sign In
                  </Button>
                );
              } else {
                return (
                  <>
                    <Button
                      className="bg-black hover:bg-blue-200 hover:text-black text-white cursor-pointer slide-in-right"
                      style={{ animationDelay: `400ms` }}
                      onClick={() => navigate("/SignUp")}
                    >
                      Sign Up
                    </Button>
                    <Button
                      className="bg-black hover:bg-blue-200 hover:text-black text-white cursor-pointer slide-in-right"
                      style={{ animationDelay: `400ms` }}
                      onClick={() => navigate("/SignIn")}
                    >
                      Sign In
                    </Button>
                  </>
                );
              }
            } else if (isLogin) {
              // Khi đã đăng nhập
              return (
                <>
                  <div className="flex items-center gap-2">
                    <p>{username}</p>
                    <CircleUser />
                    <Button
                      className="bg-black hover:bg-blue-200 hover:text-black text-white cursor-pointer slide-in-right"
                      style={{ animationDelay: `440ms` }}
                      onClick={handleLogout}
                    >
                      <LogOut /> Log Out
                    </Button>
                  </div>
                </>
              );
            } else {
              return null;
            }
          })()}
        </div>

      </div>
    </header>
  )
}
// ...existing code...
