import {Route, Routes, useLocation} from "react-router"
import {Header} from "./components/header"
import HomePage from "./pages/HomePage"
import Explore from "./pages/Explore"
import Dashboard from "./pages/Dashboard"
import Analytics from "./pages/Analytics"
import Create from "./pages/Create"
import Settings from "./pages/Settings"
import ViewDetails from "./pages/ViewDetails"
import Networking from "./pages/Networking"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import ResetPassword from "./pages/ResetPassword"
import MyEvent from "./pages/MyEvent"
import BuyTicket from "./pages/BuyTicket"
import AdminDashboard from "./pages/AdminDashboard"






function App() {
  const isAdminPage = useLocation().pathname.startsWith("/admin")

  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/Explore" element={<Explore />}></Route>
        {isAdminPage && <Route path="/admin/ViewDetails/:id" element={<ViewDetails/>}></Route>}
        {!isAdminPage && <Route path="/ViewDetails/:id" element={<ViewDetails/>}></Route>}
        <Route path="/MyEvent" element={<MyEvent/>}></Route>
        <Route path="/Create" element={<Create />}></Route>
        <Route path="/Dashboard" element={<Dashboard />}></Route>
        <Route path="/Analytics" element={<Analytics />}></Route>
        <Route path="/Settings" element={<Settings />}></Route>
        <Route path="/Networking" element={<Networking />}></Route>
        <Route path="/BuyTicket/:id" element={<BuyTicket />}></Route>
        <Route path="/SignUp" element={<SignUp />}></Route>
        <Route path="/SignIn" element={<SignIn />}></Route>
        <Route path="/reset-password/:token" element={<ResetPassword/>}></Route>
        <Route path="/admin" element={<AdminDashboard/>}></Route>
      </Routes>
      <footer className="p-4 text-gray-400 opacity-70 text-center text-sm">
        © 2025 EventFlow..
      </footer>

    </>
  )
}

export default App
