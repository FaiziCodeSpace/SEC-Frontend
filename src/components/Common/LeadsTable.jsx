import { useState } from 'react';
import { Search, ChevronDown, Trash2, SquarePen } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; 
import ConfirmationModal from '../alerts/ConfirmationModal'; 

export default function LeadsTable({ data = [], onEdit, onDelete }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const navigate = useNavigate();
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Logic: Filter and Sort data
  const filteredLeads = data
    .filter((lead) =>
      lead.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.LeadId?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved': return 'bg-[#7CCF00] text-white';
      case 'pending': return 'bg-amber-500 text-white';
      case 'rejected': return 'bg-rose-500 text-white';
      case 'in-progress': return 'bg-blue-500 text-white';
      default: return 'bg-gray-400 text-white';
    }
  };

  // Internal Delete Handlers
  const handleDeleteClick = (e, id) => {
    e.stopPropagation(); 
    setSelectedLeadId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedLeadId) return;
    
    setIsDeleting(true);
    try {
      await onDelete(selectedLeadId);
      toast.success("Lead deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete lead");
    } finally {
      setIsDeleting(false);
      setIsModalOpen(false);
      setSelectedLeadId(null);
    }
  };

  return (
    <>
      <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-8">
        <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-xl font-bold text-[#1F1F1F]">Leads</h2>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1F1F1F]/5"
              />
            </div>

            <div
              className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-100 rounded-xl cursor-pointer"
              onClick={() => setSortOrder(prev => prev === "newest" ? "oldest" : "newest")}
            >
              <span className="text-xs text-gray-500">Sort by:</span>
              <span className="text-xs font-bold text-gray-700 capitalize">{sortOrder}</span>
              <ChevronDown size={14} className="text-gray-400" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="px-6 py-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">Lead ID</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">Company Name</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">Employee Name</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">Industry Type</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => (
                  <tr 
                    key={lead._id} 
                    onClick={() => navigate(`/salesman/dashboard/LeadDetails/${lead._id}`)}
                    className="hover:bg-gray-50/50 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">{lead.LeadId}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{lead.companyName}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{lead.Salesman?.name || "Unassigned"}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{lead.industryType}</td>
                    <td className="px-6 py-4">
                      <span className={`px-4 py-1 w-25 rounded-full text-xs font-medium inline-flex justify-center items-center gap-1.5 ${getStatusStyles(lead.currentStatus)}`}>
                        <span className="w-1.5 h-1.5 bg-white rounded-full" />
                        {lead.currentStatus || 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3 text-gray-400">
                        <Link 
                          to={`/salesman/dashboard/leadform/edit/${lead._id}`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button className="hover:text-[#1F1F1F] transition-colors cursor-pointer"><SquarePen size={18} /></button>
                        </Link>
                        <div>
                          <button 
                            onClick={(e) => handleDeleteClick(e, lead._id)} 
                            className="hover:text-red-500 transition-colors cursor-pointer"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center text-gray-400 text-sm">
                    No leads found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal Hooked into Table Logic */}
      <ConfirmationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Lead"
        message="Are you sure you want to delete this lead? This action cannot be undone."
        loading={isDeleting}
      />
    </>
  );
}