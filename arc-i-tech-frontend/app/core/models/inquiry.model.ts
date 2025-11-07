// src/app/core/models/inquiry.model.ts

export interface Inquiry {
  id?: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  response?: string;
  createdAt?: string;
  respondedBy?: string;
}
export interface InquiryResponse {  
  id?: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  response?: string;
  createdAt?: string;
  respondedBy?: string;
}