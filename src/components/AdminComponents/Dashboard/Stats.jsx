import { CircleAlert } from 'lucide-react';

export default function Stats({ LeadsDetail, newAuditsCount = 0, total = 0 }) {
  // Uses the passed data, or defaults to your original fallback
  const stats = LeadsDetail || [
    { label: "Total Leads", value: "1,284", percentValue: "12.5" },
    { label: "Pending", value: "43", percentValue: "2.1" },
    { label: "Completed", value: "1,241", percentValue: "8.2" },
    { label: "High Risk", value: "12", percentValue: "0.5" },
  ];

  return (
    <section className="w-full space-y-8">
      {/* Header Section */}
      <div className="flex flex-col gap-1">
        <h2 className="text-[32px] md:text-[42px] font-bold text-[#1F1F1F] tracking-tight">
          Welcome back, Admin!
        </h2>
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