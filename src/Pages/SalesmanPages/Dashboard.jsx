import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import LeadsTable from "../../components/Common/LeadsTable";
import Stats from "../../components/Common/Stats";
import leadsService from "../../services/leads.services";
import { useAuth } from "../../../useContext/AuthContext";
import toast from "react-hot-toast";

export default function SalesmanDashboard() {
    const { user, isApprovedSalesman } = useAuth();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    const { data, isLoading, isError } = useQuery({
        queryKey: ['leads', page, search, user?.id],
        queryFn: () => leadsService.getLeads(page, 10, { search, Salesman: user?.id }),
        enabled: !!user?.id,
    });

    const handleDelete = async (id) => {
        try {
            await leadsService.deleteLead(id);
            toast.success("Lead deleted successfully");
            queryClient.invalidateQueries(['leads']);
        } catch (error) {
            toast.error("Failed to delete lead");
        }
    };

    const leadsDetail = data?.stats ? [
        { label: "Total Audits", value: data.stats.total.value, percentValue: data.stats.total.percentValue },
        { label: "Approved", value: data.stats.approved.value, percentValue: data.stats.approved.percentValue },
        { label: "Pending", value: data.stats.pending.value, percentValue: data.stats.pending.percentValue },
        { label: "Rejected", value: data.stats.rejected.value, percentValue: data.stats.rejected.percentValue },
    ] : null;

    if (isError) return <div className="p-10 text-center text-red-500">Error loading dashboard.</div>;

    return (
        <section>
            {isApprovedSalesman && (
                <>
                    <Stats 
                        LeadsDetail={leadsDetail}
                        isLoading={isLoading}
                        newAuditsCount={data?.stats?.approvedLast24h || 0}
                        total={data?.stats?.total?.value || 0}
                    />
                    <LeadsTable
                        data={data?.data || []}
                        isLoading={isLoading}
                        onSearch={setSearch}
                        onDelete={handleDelete}
                        onEdit={(lead) => navigate(`/salesman/dashboard/leadform/edit/${lead._id}`)}
                    />
                </>
            )}
        </section>
    );
}