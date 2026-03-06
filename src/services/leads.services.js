import api from "./api/api.service";

const BASE_URL = '/Lead';

const leadsService = {
    getLeads: async (page = 1, limit = 10, filters = {}) => {
        const params = { page, limit, ...filters };
        const response = await api.get(`${BASE_URL}/`, { params });
        return response.data;
    },
    
    getLeadById: async (id) => {
        const response = await api.get(`${BASE_URL}/${id}`);
        return response.data;
    },

    createLead: async (leadData) => {
        const response = await api.post(`${BASE_URL}/createLead`, leadData);
        return response.data;
    },

    editLead: async (id, updateData) => {
        const response = await api.patch(`${BASE_URL}/editLead/${id}`, updateData);
        return response.data;
    },

    deleteLead: async (id) => {
        const response = await api.delete(`${BASE_URL}/deleteLead/${id}`);
        return response.data;
    },
};

export default leadsService;