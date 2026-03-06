import { useQuery } from '@tanstack/react-query';
import leadsService from '../../services/leads.services';
import LeadsTable from "../../components/AdminComponents/Dashboard/LeadsTable";
import Stats from "../../components/AdminComponents/Dashboard/Stats";
import { useState } from 'react';

export default function Dashboard() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    // Fetch data using React Query
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['leads', page, search],
        queryFn: () => leadsService.getLeads(page, 10, { search }),
        keepPreviousData: true,
    });

    // Transform backend stats into the format your Stats component expects
    const leadsDetail = data?.stats ? [
        { label: "Total Audits", value: data.stats.total.value, percentValue: data.stats.total.percentValue },
        { label: "Approved", value: data.stats.approved.value, percentValue: data.stats.approved.percentValue },
        { label: "Pending", value: data.stats.pending.value, percentValue: data.stats.pending.percentValue },
        { label: "Rejected", value: data.stats.rejected.value, percentValue: data.stats.rejected.percentValue },
    ] : null;

    if (isError) return <div className="p-10 text-center text-red-500">Error loading dashboard data.</div>;

    return (
        <section>
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
                onDelete={(id) => alert(`Placeholder: Delete lead ${id}`)}
                onEdit={(lead) => alert(`Placeholder: Edit lead ${lead.LeadId}`)}
            />
        </section>
    );
}