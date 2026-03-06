import { Search, ChevronDown, Trash2, SquarePen } from 'lucide-react';

export default function EmployeeTable() {
    const employees = [
        { id: "1236", name: "Mikasa Ackerman", audits: "112", location: "Germany", status: "Active" },
        { id: "1237", name: "Eren Yeager", audits: "112", location: "Germany", status: "Active" },
        { id: "1238", name: "Levi Ackerman", audits: "112", location: "Germany", status: "Pending" },
        { id: "1239", name: "Armin Arlert", audits: "112", location: "Germany", status: "Inactive" },
        { id: "1240", name: "Historia Reiss", audits: "112", location: "Germany", status: "Active" },
        { id: "1241", name: "Jean Kirstein", audits: "112", location: "Germany", status: "Pending" },
        { id: "1242", name: "Sasha Blouse", audits: "112", location: "Germany", status: "Inactive" },
        { id: "1243", name: "Connie Springer", audits: "112", location: "Germany", status: "Active" },
        { id: "1244", name: "Ymir Fritz", audits: "112", location: "Germany", status: "Active" },
    ];

    const getStatusStyles = (status) => {
        switch (status) {
            case 'Active': return 'bg-emerald-500 text-white';
            case 'Pending': return 'bg-amber-500 text-white';
            case 'Inactive': return 'bg-rose-500 text-white';
            default: return 'bg-gray-400 text-white';
        }
    };

    return (
        <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-8">
            {/* Table Header / Toolbar */}
            <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="text-xl font-bold text-[#1F1F1F]">Employees</h2>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    {/* Search Bar */}
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1F1F1F]/5"
                        />
                    </div>

                    {/* Sort Dropdown */}
                    <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-100 rounded-xl cursor-pointer">
                        <span className="text-xs text-gray-500">Sort by:</span>
                        <span className="text-xs font-bold text-gray-700">Newest</span>
                        <ChevronDown size={14} className="text-gray-400" />
                    </div>
                </div>
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-50">
                            <th className="px-6 py-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">Employee ID</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">Employee Name</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">Total Audits</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">Location</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {employees.map((employee) => (
                            <tr key={employee.id} className="hover:bg-gray-50/50 transition-colors cursor-pointer">
                                <td className="px-6 py-4 text-sm font-medium text-gray-700">{employee.id}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{employee.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{employee.audits}</td>
                                <td className="px-6 py-4 text-sm text-gray-600 truncate max-w-[100px]">
                                    {employee.location}
                                </td>                <td className="px-6 py-4">
                                    <span className={`px-4 py-1 w-24 rounded-full text-xs font-medium inline-flex justify-center items-center gap-1.5 ${getStatusStyles(employee.status)}`}>
                                        <span className="w-1.5 h-1.5 bg-white rounded-full" />
                                        {employee.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3 text-gray-400">
                                        <button className="hover:text-[#1F1F1F] transition-colors cursor-pointer">
                                            <SquarePen size={18} />
                                        </button>
                                        <button className="hover:text-red-500 transition-colors cursor-pointer">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}