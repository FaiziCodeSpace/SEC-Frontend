import { CircleAlert } from 'lucide-react';
import { useAuth } from '../../../useContext/AuthContext';
import { Link } from 'react-router-dom';

export default function Stats({ LeadsDetail, newAuditsCount = 0, total = 0 }) {
  const { isApprovedSalesman, user } = useAuth();

  const stats = LeadsDetail || [
    { label: "Total Leads", value: "...", percentValue: "..." },
    { label: "Pending", value: "...", percentValue: "..." },
    { label: "Completed", value: "...", percentValue: "..." },
    { label: "High Risk", value: "...", percentValue: "..." },
  ];

  return (
    <section className="w-full space-y-8">
      {/* Header Section */}
      <div className="flex flex-col gap-1">
        <div className='flex justify-between'>
          <h2 className="text-[32px] md:text-[42px] font-bold text-[#1F1F1F] tracking-tight">
            Welcome back, {user?.name}
          </h2>
          {isApprovedSalesman ? (<Link to={"leadform"}>
          <div className="shadow-wrapper">
            <button
              type="submit"
              className={`relative z-20 cursor-pointer bg-black text-white px-5 py-2 rounded-[8px] font-bold text-sm hover:bg-gray-900 transition-all active:scale-[0.98]`}
            > Add a Lead
            </button>
          </div>
          </Link>) : null}
        </div>
        <p className="flex gap-2 items-center text-[#6B7280] text-[16px]">

          {/* Dynamic count injected here */}
          {newAuditsCount.length > 0 ? <span><CircleAlert className="text-red-500" size={18} strokeWidth={2.5} />You have <span className="font-semibold text-red-600">{newAuditsCount} new approved audits</span> over {total} leads in last 24h.</span> : null}

        </p>
      </div>

      {/* Stats Grid - "Fill" Logic */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {stats.map((adt, index) => {
          const isPositive = String(adt.percentValue).startsWith('+');
          return (
            <div
              key={index}
              className="flex flex-col justify-between bg-white p-6.5 rounded-2xl border border-gray-100 shadow-sm min-h-[140px] w-full"
            >
              <div>
                <p className="text-[12px] text-[#1B2128] uppercase tracking-widest mb-4.5">
                  {adt.label}
                </p>
                <h2 className="text-3xl font-bold text-[#1F1F1F]">
                  {adt.value}
                </h2>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <div className={`flex text-[12px] items-center gap-1 bg-[#1E1F20] text-white font-medium px-2.5 rounded-full`}>
                  {isPositive ? '' : '+'}
                  {adt.percentValue}%
                </div>
                <span className="text-gray-400 text-xs font-medium">vs last month</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}