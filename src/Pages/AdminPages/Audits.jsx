import { CircleAlert } from "lucide-react";
import LeadsTable from "../../components/Common/LeadsTable";

export default function Audits() {
    return (
        <section>
            <div className="mb-8">
                <h1 className="text-4xl font-normal text-neutral-800 mb-2">Audits</h1>
                <p className="flex gap-2 items-center text-[#6B7280] text-[16px]">
                    <CircleAlert className="text-red-500" size={18} strokeWidth={2.5} />
                    <span>You have <span className="font-semibold text-red-600">2 new audits</span> this week.</span>
                </p>
            </div>
            <LeadsTable />
        </section>
    )
}