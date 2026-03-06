import { useState } from "react"; 
import authBg from "../../assets/authBg/authPageBg.png";
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'; 
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../useContext/AuthContext"; // Import your context

export default function Signin() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await login(email, password);
            navigate("/admin"); 
        } catch (err) {
            setError(err.response?.data?.message || "Invalid credentials");
        }
    };

    return (
        <section className="relative h-screen w-screen overflow-hidden bg-white font-jakarta">
            <img className="absolute top-[-50%] left-[-30%] animate-slide-tl" src={authBg} alt="bg" />
            <img className="absolute bottom-[-50%] right-[-30%] animate-slide-br" src={authBg} alt="bg" />

            <div className="relative z-10 flex items-center justify-center h-full px-4">
                <div className="w-[525px] flex flex-col gap-10 animate-fade-in-up">
                    <div className="text-center">
                        <h2 className="text-[53px] font-bold text-black leading-tight">Welcome Back!</h2>
                        <p className="text-[#666666] text-lg">Please enter your admin details to sign in.</p>
                    </div>

                    {error && <p className="text-red-500 text-center font-medium bg-red-50 py-2 rounded-lg border border-red-100">{error}</p>}

                    <form className="flex flex-col gap-6" onSubmit={handleLogin}>
                        <div className="flex gap-4 border-2 py-4 px-6 rounded-[13px] border-[#EEEEEE] bg-[#FAFAFA] focus-within:border-black transition-colors">
                            <Mail width={24} className="text-[#CCCCCC]" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full bg-transparent outline-none text-black placeholder:text-[#CCCCCC]"
                                required
                            />
                        </div>

                        <div className="flex items-center gap-4 border-2 py-4 px-6 rounded-[13px] border-[#EEEEEE] bg-[#FAFAFA] focus-within:border-black transition-colors">
                            <Lock width={24} className="text-[#CCCCCC]" />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-transparent outline-none text-black placeholder:text-[#CCCCCC]"
                                required
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        <div className="shadow-wrapper w-full mt-2">
                            <button type="submit" className="relative z-20 w-full cursor-pointer bg-black text-white py-4 rounded-[13px] font-bold text-lg hover:bg-gray-900 transition-all">
                                Sign In
                            </button>
                        </div>
                    </form>
                    <p className="text-center text-[#666666]">
                        Wants to change role? <Link to="/auth" className="text-black font-bold ml-2 hover:underline">Go Back</Link>
                    </p>
                </div>
            </div>
        </section>
    );
}