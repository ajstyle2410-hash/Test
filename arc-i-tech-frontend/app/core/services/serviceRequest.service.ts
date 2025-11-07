import axiosClient from '@/app/lib/axiosClient';

export interface ServiceRequestDTO {
  id?: number;
  serviceId: number;
  userId?: number;
  status?: 'PENDING' | 'APPROVED' | 'REJECTED';
  requestedAt?: string;
}

const ServiceRequestService = {
  async createRequest(payload: { serviceId: number; details?: string }) {
    const res = await axiosClient.post('/service-requests', payload);
    return res.data;
  },

  async getUserRequests() {
    const res = await axiosClient.get<ServiceRequestDTO[]>('/service-requests/me');
    return res.data;
  },

  async getPendingRequests() {
    const res = await axiosClient.get<ServiceRequestDTO[]>('/service-requests/pending');
    return res.data;
  },

  async approveRequest(id: number, approve = true) {
    const res = await axiosClient.post(`/service-requests/${id}/approve?approve=${approve}`);
    return res.data;
  },

  async getTimeline(id: number) {
    const res = await axiosClient.get(`/service-requests/${id}/timeline`);
    return res.data;
  }
};

export default ServiceRequestService;
