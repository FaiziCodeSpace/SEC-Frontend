import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, User, Building2, ClipboardList, Info, Edit3 } from 'lucide-react';
import leadsService from '../../services/leads.services';

const LeadDetails = () => {
  const { id } = useParams();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);

  // Status Color Logic
  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-50 border-green-200';
      case 'rejected': return 'text-red-600 bg-red-50 border-red-200';
      case 'pending': return 'text-orange-500 bg-orange-50 border-orange-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  useEffect(() => {
    leadsService.getLeadById(id).then((res) => {
      setLead(res.data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="p-8 text-center">Loading Lead Details...</div>;
  if (!lead) return <div className="p-8 text-center">Lead not found.</div>;

  return (
    <div className="mx-auto p-6 bg-white border border-gray-200 shadow-sm rounded-lg">
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <ClipboardList className="text-[#7CCF00]" /> Lead ID: {lead.LeadId}
        </h2>
        <Link 
          to={`/salesman/dashboard/leadform/edit/${id}`} 
          className="flex items-center gap-2 bg-[#7CCF00] text-black px-6 py-2 rounded-md font-semibold hover:opacity-90 transition-opacity"
        >
          <Edit3 size={18} /> Edit Lead
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <InfoCard icon={<Building2 size={20} />} title="Company Information" data={[
            { label: "Company Name", value: lead.companyName },
            { label: "Industry", value: lead.industryType },
            { 
              label: "Status", 
              value: <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase ${getStatusColor(lead.currentStatus)}`}>
                       {lead.currentStatus}
                     </span> 
            }
          ]} />
          
          <InfoCard icon={<User size={20} />} title="Assigned Salesman" data={[
            { label: "Name", value: lead.Salesman?.name || "Unassigned" },
            { label: "Email", value: lead.Salesman?.email || "N/A" }
          ]} />
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 h-48 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 gap-2">
            <MapPin className="text-gray-400" size={32} />
            <span className="text-gray-500 font-medium text-sm">Map Placeholder</span>
            <span className="text-xs text-gray-400">Lat: {lead.fullAddress?.coordinates.lat}, Lng: {lead.fullAddress?.coordinates.lng}</span>
          </div>
          
          <InfoCard icon={<Info size={20} />} title="Additional Details" data={[
            { label: "Decision Maker Met", value: lead.decisionMakerMet ? "Yes" : "No" },
            { label: "Contact", value: lead.decisionMakerContact },
            { label: "est. Funding Potential", value: lead.estFundingPotential },
            { label: "Energy Intensity", value: lead.energyIntensive },
            { label: "Investment Planned", value: lead.investmentPlanned24Months },
            { label: "Notes", value: lead.additionalNotes || "None" }
          ]} />
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ icon, title, data }) => (
  <div className="border border-gray-100 rounded-lg p-4 bg-white shadow-sm">
    <h3 className="text-sm uppercase tracking-widest text-gray-400 font-bold mb-4 flex items-center gap-2">
      {icon} {title}
    </h3>
    <div className="space-y-3">
      {data.map((item, i) => (
        <div key={i} className="flex justify-between items-center border-b border-gray-50 pb-2">
          <span className="text-gray-600 text-sm">{item.label}:</span>
          <span className="text-gray-900 font-medium text-sm">{item.value}</span>
        </div>
      ))}
    </div>
  </div>
);

export default LeadDetails;