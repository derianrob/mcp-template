import axios from 'axios';
import type { AxiosInstance } from 'axios';

class Api {
  protected client: AxiosInstance;

  constructor() {
    const tokenAlegra = btoa(
      `${process.env.NEXT_PUBLIC_ALEGRA_EMAIL}:${process.env.NEXT_PUBLIC_ALEGRA_TOKEN}`
    );

    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${tokenAlegra}`,
      },
    });
  }
}

export default Api;
