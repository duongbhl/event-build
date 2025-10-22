import { Button } from "@/components/ui/button"
import axios from "axios"
import { Eye, EyeOff, IterationCw, Key } from "lucide-react"
import { useState } from "react"
import { useNavigate, useParams } from "react-router"

const ResetPassword = () => {
    const { token } = useParams();

    const [newPassword, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    const navigate = useNavigate();

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setMessage(null);
        if (!newPassword || !confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        try {
            setLoading(true);
            const res = await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, {
                newPassword,
            });
            const data = res.data;

            if (res.status === 200) {
                setMessage(data.message || "Password reset successful!");
                // Redirect to sign-in page after a short delay
                setTimeout(() => {
                    navigate(`/SignIn`);
                }, 2000);
            } else {
                setError(data.message || "Failed to reset password.");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
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
                        <h1 className="text-3xl md:text-4xl font-bold">CHANGE PASSWORD</h1>
                    </div>

                    <form
                        onSubmit={handleResetPassword}
                        className="w-full max-w-xl mt-8 bg-slate-800/90 rounded-2xl p-6 md:p-8 shadow-xl backdrop-blur-sm border border-slate-700"
                    >
                        <div className="space-y-5">


                            {/* Password */}
                            <label className="block text-slate-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <Key size={16} /> <span className="font-medium">Password</span>
                                </div>
                                <div className="relative">
                                    <input
                                        value={newPassword}
                                        onChange={(e) => setPassword(e.target.value)}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your new password"
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

                            {/*Confirm Password */}
                            <label className="block text-slate-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <Key size={16} /> <span className="font-medium">Confirm Password</span>
                                </div>
                                <div className="relative">
                                    <input
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Enter password again"
                                        className="w-full bg-black/80 text-white rounded-md px-3 py-2 placeholder-white/60 focus:outline-none pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword((s) => !s)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300"
                                    >
                                        {showConfirmPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                                    </button>
                                </div>
                            </label>



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
                                        <span className="animate-pulse">Change...</span>
                                    ) : (
                                        <>
                                            <IterationCw /> Change
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword