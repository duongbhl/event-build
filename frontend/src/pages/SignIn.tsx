import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Eye, EyeOff, Key, Mail, PlusCircle } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  // Tự động điền lại email nếu đã nhớ trước đó
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      if (res.status === 200) {
        const token = res.data?.data?.token;
        setMessage(res.data.message || "Login successful!");

        const userRole = res.data?.data?.user?.role;

        // Lưu thông tin nếu tick Remember me
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
          localStorage.setItem("token", token);
        } else {
          sessionStorage.setItem("token", token);
          localStorage.removeItem("rememberedEmail");
        }
        
        localStorage.setItem("role", userRole);
        sessionStorage.setItem("role",userRole);
        if (userRole == "admin") navigate("/admin");
        else navigate("/");

        // Reset input
        setPassword("");
      }
    } catch (err: any) {
      console.error("Login failed:", err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred during login.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
      const data = res.data;
      setMessage(data.message);
    } catch (error) {
      console.error("Forgot password request failed:", error);
      setError("An error occurred while requesting password reset.");
      return;

    }

  }

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
        <div className="min-h-screen w-full flex flex-col items-center pt-24 pb-20 px-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold">SIGN IN</h1>
          </div>

          <form
            onSubmit={handleLogin}
            className="w-full max-w-xl mt-8 bg-slate-800/90 rounded-2xl p-6 md:p-8 shadow-xl backdrop-blur-sm border border-slate-700"
          >
            <div className="space-y-5">
              {/* Email */}
              <label className="block text-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <Mail size={16} /> <span className="font-medium">Email</span>
                </div>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-black/80 text-white rounded-md px-3 py-2 placeholder-white/60 focus:outline-none"
                />
              </label>

              {/* Password */}
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

              {/* ✅ Remember Me */}
              <div className="flex items-center gap-2 text-slate-300">
                <input
                  id="rememberMe"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 accent-sky-500 cursor-pointer"
                />
                <label htmlFor="rememberMe" className="cursor-pointer select-none">
                  Remember me
                </label>
                <span className="text-sm text-slate-400 ml-65 cursor-pointer" onClick={handleForgotPassword}>Change Password </span>
              </div>

              {/* Messages */}
              {error && <p className="text-red-400 text-sm text-center">{error}</p>}
              {message && <p className="text-green-400 text-sm text-center">{message}</p>}

              {/* Button */}
              <div className="pt-2 flex justify-center">
                <Button
                  className="flex items-center gap-2 px-5 py-3 bg-sky-400/90 hover:bg-sky-500 text-white font-medium rounded-xl shadow-sm transition cursor-pointer"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="animate-pulse">Login...</span>
                  ) : (
                    <>
                      <PlusCircle size={16} /> Login
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

export default SignIn;
