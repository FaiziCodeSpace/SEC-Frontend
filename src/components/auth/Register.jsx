import { useState } from "react";
import authBg from "../../assets/authBg/authPageBg.png";
import { Mail, Lock, Eye, EyeOff, User, Phone, CreditCard, MapPin } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api/api.service";

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "", email: "", phone: "", nationalId: "", address: "", password: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await api.post("/auth/create-salesman", formData);
            navigate("/auth/success");
        } catch (err) {
            // This displays: "Phone already in use" or "NationalID already in use"
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <section className="relative h-screen w-screen overflow-hidden bg-white font-jakarta">
            <img
                className="absolute top-[-50%] left-[-30%] animate-slide-tl"
                src={authBg}
                alt="Background Decor Top"
            />

            <img
                className="absolute bottom-[-50%] right-[-30%] animate-slide-br"
                src={authBg}
                alt="Background Decor Bottom"
            />
            <div className="relative z-10 flex items-center justify-center h-full px-4 py-10 overflow-y-auto">
                <div className="w-[525px] flex flex-col gap-6 animate-fade-in-up">
                    <div className="text-center">
                        <h2 className="text-[42px] font-bold text-black leading-tight">Create Account</h2>
                        <p className="text-[#666666] text-lg">Join us by entering your details below.</p>
                    </div>

                    {error && <p className="text-red-500 text-center font-medium bg-red-50 p-2 rounded-lg border border-red-100">{error}</p>}

                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <div className="flex gap-4 border-2 py-3 px-6 rounded-[13px] border-[#EEEEEE] bg-[#FAFAFA] focus-within:border-black transition-colors">
                            <User width={22} className="text-[#CCCCCC]" />
                            <input name="name" type="text" placeholder="Full Name" onChange={handleChange} className="w-full bg-transparent outline-none" required />
                        </div>

                        <div className="flex gap-4 border-2 py-3 px-6 rounded-[13px] border-[#EEEEEE] bg-[#FAFAFA] focus-within:border-black transition-colors">
                            <Mail width={22} className="text-[#CCCCCC]" />
                            <input name="email" type="email" placeholder="Email Address" onChange={handleChange} className="w-full bg-transparent outline-none" required />
                        </div>

                        <div className="flex gap-4">
                            <div className="flex flex-1 gap-3 border-2 py-3 px-6 rounded-[13px] border-[#EEEEEE] bg-[#FAFAFA] focus-within:border-black transition-colors">
                                <Phone width={20} className="text-[#CCCCCC]" />
                                <input name="phone" type="tel" placeholder="Phone" onChange={handleChange} className="w-full bg-transparent outline-none" required />
                            </div>
                            <div className="flex flex-1 gap-3 border-2 py-3 px-6 rounded-[13px] border-[#EEEEEE] bg-[#FAFAFA] focus-within:border-black transition-colors">
                                <CreditCard width={20} className="text-[#CCCCCC]" />
                                <input name="nationalId" type="text" placeholder="National ID" onChange={handleChange} className="w-full bg-transparent outline-none" required />
                            </div>
                        </div>

                        <div className="flex gap-4 border-2 py-3 px-6 rounded-[13px] border-[#EEEEEE] bg-[#FAFAFA] focus-within:border-black transition-colors">
                            <MapPin width={22} className="text-[#CCCCCC]" />
                            <input name="address" type="text" placeholder="Residential Address" onChange={handleChange} className="w-full bg-transparent outline-none" required />
                        </div>

                        <div className="flex items-center gap-4 border-2 py-3 px-6 rounded-[13px] border-[#EEEEEE] bg-[#FAFAFA] focus-within:border-black transition-colors">
                            <Lock width={22} className="text-[#CCCCCC]" />
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Create Password"
                                onChange={handleChange}
                                className="w-full bg-transparent outline-none"
                                required
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        <button type="submit" className="w-full bg-black text-white py-4 rounded-[13px] font-bold text-lg hover:bg-gray-900 transition-all">
                            Create Account
                        </button>
                    </form>
                    <p className="text-center text-[#666666]">
                        Already have an account? <Link to="/auth/salesman-login" className="text-black font-bold ml-2 hover:underline">Sign In</Link>
                    </p>
                </div>
            </div>
        </section>
    );
}