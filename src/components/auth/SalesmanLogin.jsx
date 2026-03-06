import { useState } from "react";
import authBg from "../../assets/authBg/authPageBg.png";
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../useContext/AuthContext"; 

export default function SalesmanSignin() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { login } = useAuth(); // Connect to Context
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const user = await login(email, password);
            
            // Redirect based on role or to a general dashboard
            if (user.role === "salesman") {
                navigate("/salesman-dashboard");
            } else {
                navigate("/dashboard");
            }
        } catch (err) {
            // Catches "Invalid email or password" or "An internal server error occurred"
            setError(err.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="relative h-screen w-screen overflow-hidden bg-white font-jakarta">
            {/* Background Decorations */}
            <img className="absolute top-[-50%] left-[-30%] animate-slide-tl" src={authBg} alt="Decor Top" />
            <img className="absolute bottom-[-50%] right-[-30%] animate-slide-br" src={authBg} alt="Decor Bottom" />

            <div className="relative z-10 flex items-center justify-center h-full px-4">
                <div className="w-[525px] flex flex-col gap-10 animate-fade-in-up">
                    <div className="text-center">
                        <h2 className="text-[53px] font-bold text-black leading-tight">Welcome Back!</h2>
                        <p className="text-[#666666] text-lg">Please enter your salesman details to sign in.</p>
                    </div>

                    {/* Error Alert */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-[13px] text-center font-medium">
                            {error}
                        </div>
                    )}

                    <form className="flex flex-col gap-6" onSubmit={handleLogin}>
                        {/* Email Field */}
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-4 border-2 py-4 px-6 rounded-[13px] border-[#EEEEEE] bg-[#FAFAFA] focus-within:border-black transition-colors">
                                <Mail width={24} className="text-[#CCCCCC]" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full bg-transparent outline-none text-black placeholder:text-[#CCCCCC]"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-4 border-2 py-4 px-6 rounded-[13px] border-[#EEEEEE] bg-[#FAFAFA] focus-within:border-black transition-colors">
                                <Lock width={24} className="text-[#CCCCCC]" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-transparent outline-none text-black placeholder:text-[#CCCCCC]"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="text-[#CCCCCC] hover:text-black transition-colors focus:outline-none"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Helpers */}
                        <div className="flex justify-between items-center px-1">
                            <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
                                <input type="checkbox" className="w-4 h-4 accent-black" />
                                Remember me
                            </label>
                            <a href="#" className="text-sm font-bold hover:underline">Forgot password?</a>
                        </div>

                        {/* Submit Button */}
                        <div className="shadow-wrapper w-full mt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`relative z-20 w-full cursor-pointer bg-black text-white py-4 rounded-[13px] font-bold text-lg hover:bg-gray-900 transition-all active:scale-[0.98] ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                            >
                                {loading ? "Signing In..." : "Sign In"}
                            </button>
                        </div>
                    </form>

                    <p className="text-center text-[#666666]">
                        Wants to change role?
                        <Link to="/auth" className="text-black font-bold mx-2 hover:underline">Go Back</Link>
                        or
                        <Link to="/auth/register" className="text-black font-bold ml-2 hover:underline">Create Account</Link>
                    </p>
                </div>
            </div>
        </section>
    );
}