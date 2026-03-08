import { useState } from "react";
import adminGrayIcon from "../../assets/svgs/admin-gray.svg";
import adminWhiteIcon from "../../assets/svgs/admin-white.svg";
import teamGrayIcon from "../../assets/svgs/team-gray.svg";
import teamWhiteIcon from "../../assets/svgs/team-white.svg";
import { Link } from "react-router-dom";

const ROLES = [
    {
        id: "admin",
        label: "Admin",
        grayIcon: adminGrayIcon,
        whiteIcon: adminWhiteIcon,
    },
    {
        id: "team",
        label: "Salesman",
        grayIcon: teamGrayIcon,
        whiteIcon: teamWhiteIcon,
    },
];

export default function RolesCheck() {
    const [hoveredRole, setHoveredRole] = useState(null);

    const cardBase = `
    group cursor-pointer font-poppins font-semibold flex flex-col 
    w-[254px] h-[273px] border-1 rounded-[52.82px] justify-center 
    items-center gap-2 z-10 transition-all duration-300 ease-in-out
    bg-[#FAFAFA] border-[#EEEEEE] text-[#CCCCCC]
    hover:bg-black hover:border-black hover:text-white
  `;

    return (
        <section className="font-jakarta h-screen w-screen flex flex-col justify-center items-center text-center gap-10 bg-white">
            <header>
                <h1 className="font-bold text-[53.71px] leading-tight text-black">
                    Who are you signing up as?
                </h1>
            </header>

            <div className="flex gap-4.5" role="group" aria-label="Role selection">
                {ROLES.map((role) => (
                    <Link key={role.id} to={`${role.id=="admin"? "/auth/admin-login": "/auth/salesman-login" }`}>
                        <div
                            className={`shadow-wrapper ${hoveredRole === role.id ? "relative z-10" : "relative z-50"
                                }`}
                            onMouseEnter={() => setHoveredRole(role.id)}
                            onMouseLeave={() => setHoveredRole(null)}
                        >
                            <button
                                type="button"
                                aria-pressed={hoveredRole === role.id}
                                className={cardBase}
                            >
                                <img
                                    src={hoveredRole === role.id ? role.whiteIcon : role.grayIcon}
                                    className="w-26 h-26 transition-opacity duration-300"
                                    alt={`${role.label} icon`}
                                />
                                <span className="text-[21.13px] font-semibold">{role.label}</span>
                            </button>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}