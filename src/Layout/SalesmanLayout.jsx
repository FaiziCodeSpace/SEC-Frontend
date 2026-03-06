import { Outlet, useLocation } from "react-router-dom";
import SalesmanSidebar from "../components/SalesmanComponents/SalesmanSidebar";
import SalesmanTopBar from "../components/SalesmanComponents/SalesmanTopBar";


export default function SalesmanLayout() {
    const location = useLocation();

    if (location.pathname === "/admin-login") {
        return <Outlet />;
    }

    return (
        <div className="bg-[#FAFAFB] h-screen flex overflow-hidden font-Onest">
            <SalesmanSidebar />

            <div className="flex flex-col flex-1 h-full min-w-0">
                <SalesmanTopBar />
                
                <main className="flex-1 overflow-y-auto p-6 md:p-8">
                    <div> 
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}

