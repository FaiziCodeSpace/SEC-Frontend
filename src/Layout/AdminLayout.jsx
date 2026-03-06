import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "../components/AdminComponents/AdminSidebar";
import Topbar from "../components/AdminComponents/TopBar";


export default function AdminLayout() {
    const location = useLocation();

    if (location.pathname === "/admin-login") {
        return <Outlet />;
    }

    return (
        <div className="bg-[#FAFAFB] h-screen flex overflow-hidden font-Onest">
            <AdminSidebar />

            <div className="flex flex-col flex-1 h-full min-w-0">
                <Topbar />
                
                <main className="flex-1 overflow-y-auto p-6 md:p-8">
                    <div> 
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}

