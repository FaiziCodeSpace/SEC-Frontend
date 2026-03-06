import { MapPin, Phone, SquareUserRound, Trash2 } from "lucide-react";

export default function EmployeeTable({ applications }) {
    return (
        
        <section className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6 w-full">
            {applications && applications.map((application) => (
                <div 
                    key={application._id}
                    className="flex flex-col relative bg-white p-6 border-[0.8px] rounded-[8.6px] border-gray-200 shadow-sm"
                >
                <div className="absolute top-5 right-5 cursor-pointer"><Trash2 color="red" size={18} /></div>
                    {/* Header Section */}
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                            <img 
                                src={application.pfp} 
                                alt={`${application.name}'s profile`} 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col justify-center min-w-0">
                            <p className="text-[24px] md:text-[28.87px] font-medium truncate leading-tight">
                                {application.name}
                            </p>
                            <p className="text-[13.04px] text-[#B5B7C0] truncate">
                                {application.email}
                            </p>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="mt-10 flex flex-col gap-5 flex-grow">
                        <div className="flex items-center text-[18px] gap-4 text-gray-700">
                            <SquareUserRound strokeWidth={1.8} className="flex-shrink-0" />
                            <span className="truncate">{application.nationId}</span>
                        </div>
                        <div className="flex items-center text-[18px] gap-4 text-gray-700">
                            <Phone strokeWidth={1.8} className="flex-shrink-0" />
                            <span>{application.phone}</span>
                        </div>
                        <div className="flex items-start text-[18px] gap-4 text-gray-700">
                            <MapPin strokeWidth={1.8} className="mt-1 flex-shrink-0" />
                            <span className="leading-snug">{application.Address}</span>
                        </div>
                    </div>

                    {/* Action Section */}
                     <div className="shadow-wrapper w-full mt-8 ">
                        <button
                            type="submit"
                            className={`relative z-20 w-full cursor-pointer bg-black text-white py-4 rounded-[13px] font-bold text-lg hover:bg-gray-900 transition-all active:scale-[0.98]`}
                        > Approve
                        </button>
                    </div>
                </div>
            ))}
        </section>
    );
}