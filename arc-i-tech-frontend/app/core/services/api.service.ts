import axiosClient from "@/app/lib/axiosClient";

class ApiService {
  async get<T>(url: string, config: object = {}) {
    const response = await axiosClient.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, data: any, config: object = {}) {
    const response = await axiosClient.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data: any, config: object = {}) {
    const response = await axiosClient.put<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config: object = {}) {
    const response = await axiosClient.delete<T>(url, config);
    return response.data;
  }
}

export default new ApiService();