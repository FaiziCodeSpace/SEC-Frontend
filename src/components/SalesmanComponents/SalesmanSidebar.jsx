import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
    LayoutDashboard, Menu, X, LogOut, Bell,
    SquareUserRound,
    File
} from "lucide-react";
import Logo from "../../assets/Logos/Logo.png";
import { useAuth } from "../../../useContext/AuthContext";

export default function SalesmanSidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const closeSidebar = () => setIsOpen(false);

    const handleLogout = async () => {
        await logout();
        // Redirecting to your salesman login path
        navigate("/auth/salesman-login", { replace: true });
    };

    const NAV_ITEMS = [
        { to: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
        { to: "audits", icon: File, label: "Audits" }
    ];

    return (
        <>
            {/* --- MOBILE TOP BAR --- */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 flex items-center px-4 z-40">
                <button onClick={() => setIsOpen(true)} className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <Menu size={22} className="text-gray-600" />
                </button>
            </div>

            {/* --- MOBILE BACKDROP --- */}
            <div
                className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={closeSidebar}
            />

            {/* --- SIDEBAR --- */}
            <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 transform 
        transition-transform duration-300 ease-in-out bg-white border-r border-gray-100
        md:relative md:translate-x-0 
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
                <div className="flex flex-col h-full">

                    {/* Logo Section */}
                    <div className="flex items-center justify-between p-6">
                        <div className="h-10">
                            <img src={Logo} alt="Logo" className="h-full object-contain" />
                        </div>
                        <button onClick={closeSidebar} className="p-1 text-gray-400 hover:text-gray-600 md:hidden">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="h-4" />

                    {/* Navigation Section */}
                    <nav className="flex-1 overflow-y-auto px-4 space-y-2 scrollbar-hide">
                        <ul className="flex flex-col gap-4">
                            {NAV_ITEMS.map(item => (
                                <SidebarLink key={item.to} {...item} onClick={closeSidebar} />
                            ))}
                        </ul>
                    </nav>

                    {/* Footer Section */}
                    <div className="p-4 border-t border-gray-50 mt-auto">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium text-red-500 hover:bg-red-50 transition-all duration-200">
                            <LogOut size={19} strokeWidth={2} />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}

function SidebarLink({ icon: Icon, label, to, onClick, count }) {
    return (
        <li>
            <NavLink
                to={`/salesman/${to}`}
                onClick={onClick}
                className={({ isActive }) => `
          group flex items-center justify-between px-4 py-3 rounded-xl text-[14px] font-medium transition-all duration-200
          ${isActive
                        ? "bg-[#1F1F1F] text-white"
                        : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"}
        `}
            >
                {({ isActive }) => (
                    <>
                        <div className="flex items-center gap-3">
                            <Icon
                                size={19}
                                className={`${isActive ? "text-white" : "text-gray-400 group-hover:text-gray-600"}`}
                                strokeWidth={isActive ? 2.5 : 2}
                            />
                            <span className="truncate">{label}</span>
                        </div>

                        {count !== undefined && count > 0 && (
                            <span className={`
                text-[10px] px-2 py-0.5 rounded-full font-bold
                ${isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"}
              `}>
                                {count}
                            </span>
                        )}
                    </>
                )}
            </NavLink>
        </li>
    );
}