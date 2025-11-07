// src/app/core/services/inquiry.service.ts
import ApiService from "./api.service";

export interface Inquiry {
  id?: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt?: string;
}

export const InquiryService = {
  async submitInquiry(data: Inquiry): Promise<Inquiry> {
    return ApiService.post<Inquiry>("/inquiries", data);
  },

  async getAll(): Promise<Inquiry[]> {
    return ApiService.get<Inquiry[]>("/inquiries");
  },

  async getById(id: number): Promise<Inquiry> {
    return ApiService.get<Inquiry>(`/inquiries/${id}`);
  },

  async delete(id: number): Promise<void> {
    return ApiService.delete(`/inquiries/${id}`);
  },
};
