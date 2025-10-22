import axios from "axios";
import { Button } from "@/components/ui/button";
import { Key, Mail, PlusCircle, User, CheckCircle, XCircle, Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

const SignUp: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  // 🧠 Gọi backend controller /register
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    // 🧩 Validate trước khi gửi
    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Invalid email format.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      // ⚙️ Gửi request đến controller register trong backend
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
        confirmPassword,
      });

      if (res.status === 201) {
        setMessage(res.data.message || "User registered successfully!");
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (err: any) {
      console.error("Register failed:", err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to register. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative bg-white">
      {/* Background effect */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#ffffff",
          backgroundImage: `
            radial-gradient(circle at top right, rgba(56, 193, 182, 0.5), transparent 70%)
          `,
          filter: "blur(80px)",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="container relative z-10">
        <div className="min-h-screen w-full relative flex flex-col items-center pt-24 pb-20 px-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold">SIGN UP</h1>
          </div>

          <form
            onSubmit={handleRegister}
            className="w-full max-w-xl mt-8 bg-slate-800/90 rounded-2xl p-6 md:p-8 shadow-xl backdrop-blur-sm border border-slate-700"
          >
            <div className="space-y-5">
              <label className="block text-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <User size={16} /> <span className="font-medium">Username</span>
                </div>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  placeholder="Enter your username"
                  className="w-full bg-black/80 text-white rounded-md px-3 py-2 placeholder-white/60 focus:outline-none"
                />
              </label>

              <label className="block text-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <Mail size={16} /> <span className="font-medium">Email</span>
                </div>
                <div className="relative">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Enter your email"
                    className="w-full bg-black/80 text-white rounded-md px-3 py-2 placeholder-white/60 focus:outline-none"
                    aria-invalid={email ? !isValidEmail(email) : undefined}
                  />
                  {email.length > 0 && !isValidEmail(email) && (
                    <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400" size={18} />
                  )}
                  {email.length > 0 && isValidEmail(email) && (
                    <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400" size={18} />
                  )}
                </div>
              </label>

              <label className="block text-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <Key size={16} /> <span className="font-medium">Password</span>
                </div>
                <div className="relative">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
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

              <label className="block text-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <Key size={16} /> <span className="font-medium">Confirm Password</span>
                </div>
                <div className="relative">
                  <input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type={showConfirm ? "text" : "password"}
                    placeholder="Enter your password again"
                    className="w-full bg-black/80 text-white rounded-md px-3 py-2 placeholder-white/60 focus:outline-none pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300"
                  >
                    {showConfirm ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                </div>
              </label>

              {/* Hiển thị thông báo */}
              {error && <p className="text-red-400 text-sm text-center">{error}</p>}
              {message && <p className="text-green-400 text-sm text-center">{message}</p>}

              <div className="pt-2 flex justify-center">
                <Button
                  className="flex items-center gap-2 px-5 py-3 bg-sky-400/90 hover:bg-sky-500 text-white font-medium rounded-xl shadow-sm transition cursor-pointer"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="animate-pulse">Creating...</span>
                  ) : (
                    <>
                      <PlusCircle size={16} /> Create Account
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
