import axios, { AxiosInstance } from 'axios';

class Api {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
    });
  }

  // Method to get the axios instance
  getClient(): AxiosInstance {
    return this.client;
  }

  // Generic GET method
  async get<T>(url: string) {
    const response = await this.client.get<T>(url);
    return response.data;
  }

  // Generic POST method
  async post<T>(url: string, data: any) {
    const response = await this.client.post<T>(url, data);
    return response.data;
  }

  // Generic PUT method
  async put<T>(url: string, data: any) {
    const response = await this.client.put<T>(url, data);
    return response.data;
  }

  // Generic DELETE method
  async delete<T>(url: string) {
    const response = await this.client.delete<T>(url);
    return response.data;
  }
}

// Export a singleton instance
export const api = new Api();
