import { useNavigate } from "react-router-dom";

export default function SuccessPage() {
    const navigate = useNavigate();
    return (
        <section className="flex flex-col justify-center items-center h-screen px-4">
            <div className="flex flex-col gap-10 text-center max-w-lg">
                <h2 className="text-[53.71px] font-bold text-black leading-tight">You are all Done!</h2>
                <p className="text-gray-600 text-lg">You will receive an email once an administrator verifies your account. This usually takes 24 hours.</p>
                <div className="w-full mt-4">
                    <button
                        onClick={() => navigate("/auth/salesman-login")}
                        className="w-full cursor-pointer bg-black text-white py-4 rounded-[13px] font-bold text-lg hover:bg-gray-900 transition-all"
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        </section>
    );
}