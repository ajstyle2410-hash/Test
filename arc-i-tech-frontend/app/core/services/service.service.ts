import axiosClient from '@/app/lib/axiosClient';

export interface ServiceDTO {
  id: number;
  name: string;
  description?: string;
}

const ServiceService = {
  async listServices(): Promise<ServiceDTO[]> {
    const res = await axiosClient.get<ServiceDTO[]>('/services');
    return res.data;
  },

  async getService(id: number): Promise<ServiceDTO> {
    const res = await axiosClient.get<ServiceDTO>(`/services/${id}`);
    return res.data;
  }
};

export default ServiceService;
