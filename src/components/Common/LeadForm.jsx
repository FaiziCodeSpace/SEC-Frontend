import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Building2, CheckCircle2, Loader2, XCircle } from 'lucide-react';
import leadsService from '../../services/leads.services'; 
import { useAuth } from '../../../useContext/AuthContext';
import { toast } from 'react-hot-toast';

export default function LeadForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, isAdmin } = useAuth(); // Added isAdmin from context
    const isEditMode = Boolean(id);

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(isEditMode);
    const [formData, setFormData] = useState({
        companyName: '',
        industryType: 'Other',
        addressText: '',
        decisionMakerMet: false,
        availabilityTime: '',
        contactCaptured: false,
        decisionMakerContact: '',
        currentStatus: 'pending',
        isRejected: false,
        energyIntensive: 'Low',
        investmentPlanned24Months: 'Not sure yet',
        estFundingPotential: '<15k',
        auditSold: 0,
        additionalNotes: ''
    });

    useEffect(() => {
        if (isEditMode) {
            const fetchLead = async () => {
                try {
                    const response = await leadsService.getLeadById(id);
                    if (response.success) {
                        const lead = response.data;
                        setFormData({
                            ...lead,
                            isRejected: lead.currentStatus === 'rejected',
                            addressText: lead.fullAddress?.addressText || ''
                        });
                    }
                } catch (error) {
                    toast.error("Failed to load lead details");
                    navigate('/dashboard');
                } finally {
                    setFetching(false);
                }
            };
            fetchLead();
        }
    }, [id, isEditMode, navigate]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!user || (!user.id && !user._id)) {
            toast.error("User session not found. Please re-login.");
            return;
        }

        setLoading(true);

        try {
            // LOGIC: DYNAMIC STATUS CALCULATION
            let calculatedStatus = 'pending';
            if (Number(formData.auditSold) > 0) {
                calculatedStatus = 'approved';
            } else if (formData.isRejected) {
                calculatedStatus = 'rejected';
            }

            const payload = {
                ...formData,
                currentStatus: calculatedStatus,
                fullAddress: {
                    addressText: formData.addressText,
                    coordinates: { lat: 0, lng: 0 }
                }
            };

            // LOGIC: PROTECTION FOR EMPLOYEE NAME (SALESMAN)
            // If editing, we keep the original Salesman from formData (loaded from DB)
            // If creating new, we assign the current user's ID
            if (!isEditMode) {
                payload.Salesman = user.id || user._id;
            } else {
                // When editing, if Salesman is an object (from populate), extract the ID
                payload.Salesman = formData.Salesman?._id || formData.Salesman;
            }

            let response;
            if (isEditMode) {
                response = await leadsService.editLead(id, payload);
            } else {
                response = await leadsService.createLead(payload);
            }

            if (response.success) {
                toast.success(isEditMode ? "Lead updated!" : "Lead created!");
                // Redirect based on role or general dashboard
                navigate(isAdmin ? '/admin/leads' : '/salesman');
            }
        } catch (error) {
            console.error("Submission Error:", error);
            const serverMsg = error.response?.data?.message || "Check your input fields";
            toast.error(serverMsg);
        } finally {
            setLoading(false); 
        }
    };

    if (fetching) return <div className="p-10 text-center font-Onest text-slate-500">Loading Lead Data...</div>;

    const inputClass = "w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-1 focus:ring-[#7CCF00] focus:border-[#7CCF00] outline-none transition-all placeholder:text-slate-400 text-slate-700";
    const labelClass = "block text-[13px] font-semibold text-slate-600 mb-1.5 uppercase tracking-tight";
    const sectionHeader = "flex items-center gap-2 mb-6 border-l-4 border-[#7CCF00] pl-4";

    return (
        <div className="max-w-6xl mx-auto pb-20 md:pb-0 font-Onest">
            <form onSubmit={handleSubmit}>
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                            {isEditMode ? 'Edit Lead' : 'Create New Lead'}
                        </h1>
                        <p className="text-slate-500 text-sm">
                            {isEditMode 
                                ? `Updating Lead ID: ${formData.LeadId} | Assigned to: ${formData.Salesman?.name || 'Loading...'}` 
                                : 'Fill in the site audit details to synchronize with the database.'
                            }
                        </p>
                    </div>
                    <div className="hidden md:flex gap-3">
                        <button 
                            type="submit"
                            disabled={loading}
                            className="px-5 py-2 text-sm font-medium cursor-pointer text-white bg-black rounded-lg hover:bg-zinc-800 transition-all flex items-center gap-2 disabled:opacity-50"
                        >
                            {loading ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={16} className="text-[#7CCF00]" />}
                            {isEditMode ? 'Update Changes' : 'Save Lead'}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <div className={sectionHeader}>
                                <h2 className="font-bold text-slate-900">General Information</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className={labelClass}>Company Legal Name</label>
                                    <input name="companyName" value={formData.companyName} onChange={handleChange} className={inputClass} placeholder="Enter full company name" required />
                                </div>
                                <div>
                                    <label className={labelClass}>Industry</label>
                                    <select name="industryType" value={formData.industryType} onChange={handleChange} className={inputClass}>
                                        <option>Manufacturing</option>
                                        <option>Healthcare</option>
                                        <option>Data Centers</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className={labelClass}>Full Address</label>
                                    <input name="addressText" value={formData.addressText} onChange={handleChange} className={inputClass} placeholder="Street, City, Postcode" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <div className={sectionHeader}>
                                <h2 className="font-bold text-slate-900">Field Engagement</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    <span className="text-sm font-medium text-slate-700">Decision Maker Met</span>
                                    <input type="checkbox" name="decisionMakerMet" checked={formData.decisionMakerMet} onChange={handleChange} className="w-5 h-5 accent-[#7CCF00] rounded" />
                                </div>
                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    <span className="text-sm font-medium text-slate-700">Contact Captured</span>
                                    <input type="checkbox" name="contactCaptured" checked={formData.contactCaptured} onChange={handleChange} className="w-5 h-5 accent-[#7CCF00] rounded" />
                                </div>
                                
                                <div className="md:col-span-2 flex items-center justify-between p-4 bg-rose-50/50 rounded-lg border border-rose-100">
                                    <div className="flex items-center gap-2">
                                        <XCircle size={16} className="text-rose-500" />
                                        <span className="text-sm font-semibold text-rose-700">Mark Lead as Rejected</span>
                                    </div>
                                    <input type="checkbox" name="isRejected" checked={formData.isRejected} onChange={handleChange} className="w-5 h-5 accent-rose-500 rounded cursor-pointer" />
                                </div>

                                {formData.contactCaptured && (
                                    <div className="md:col-span-2 space-y-1 animate-in slide-in-from-top-2">
                                        <label className={labelClass}>Decision Maker Details</label>
                                        <input name="decisionMakerContact" value={formData.decisionMakerContact} onChange={handleChange} className={inputClass} placeholder="Phone or Email address" />
                                    </div>
                                )}
                                <div className="md:col-span-2">
                                    <label className={labelClass}>Follow-up Window</label>
                                    <input name="availabilityTime" value={formData.availabilityTime} onChange={handleChange} className={inputClass} placeholder="e.g. Next Tuesday morning" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-black text-white p-6 rounded-xl shadow-lg">
                            <div className="flex items-center gap-2 mb-6 border-l-4 border-[#7CCF00] pl-4">
                                <h2 className="font-bold uppercase tracking-widest text-sm">Audit Parameters</h2>
                            </div>
                            <div className="space-y-5">
                                <div>
                                    <label className="text-[11px] font-bold text-slate-400 uppercase mb-2 block">Energy Intensive</label>
                                    <div className="flex gap-2">
                                        {['Low', 'Mid', 'High'].map((level) => (
                                            <button
                                                key={level}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, energyIntensive: level })}
                                                className={`flex-1 py-2 text-xs font-bold rounded border transition-all ${formData.energyIntensive === level ? 'bg-[#7CCF00] border-[#7CCF00] text-black' : 'bg-transparent border-zinc-700 text-slate-400 hover:border-slate-500'}`}
                                            >
                                                {level}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[11px] font-bold text-slate-400 uppercase mb-2 block">Investment Plan (24M)</label>
                                    <select name="investmentPlanned24Months" value={formData.investmentPlanned24Months} onChange={handleChange} className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-[#7CCF00] outline-none">
                                        <option>Yes</option>
                                        <option>No</option>
                                        <option>Not sure yet</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[11px] font-bold text-slate-400 uppercase mb-2 block">Audit Tier Sold</label>
                                    <select name="auditSold" value={formData.auditSold} onChange={handleChange} className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-[#7CCF00] outline-none">
                                        <option value={0}>$0 (None)</option>
                                        <option value={500}>$500 (Entry)</option>
                                        <option value={1500}>$1,500 (Pro)</option>
                                        <option value={3000}>$3,000 (Enterprise)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <div className={sectionHeader}>
                                <h2 className="font-bold text-slate-900">Internal Notes</h2>
                            </div>
                            <textarea name="additionalNotes" value={formData.additionalNotes} onChange={handleChange} rows="5" className={`${inputClass} resize-none`} placeholder="Internal observations..."></textarea>
                        </div>

                        <div className="md:hidden pt-4">
                            <button type="submit" disabled={loading} className="w-full py-4 text-sm font-bold text-white bg-black rounded-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 border-b-4 border-[#7CCF00]">
                                {loading ? <Loader2 className="animate-spin" /> : <CheckCircle2 size={18} className="text-[#7CCF00]" />}
                                {isEditMode ? 'UPDATE LEAD' : 'SAVE LEAD'}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}