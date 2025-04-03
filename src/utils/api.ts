import axios from 'axios';
import type { AxiosInstance } from 'axios';

class Api {
  protected client: AxiosInstance;

  constructor() {
    const tokenAlegra = btoa(`${process.env.ALEGRA_EMAIL}:${process.env.ALEGRA_TOKEN}`);

    this.client = axios.create({
      baseURL: process.env.API_URL,
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Basic ${tokenAlegra}`,
      },
    });

    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = (error && error.response && error.response.status) || undefined;
        const errorData = (error && error.response && error.response.data) || undefined;
        const message =
          (error && error.response && error.response.data && error.response.data.message) ||
          'Ocurrio un problema al procesar su petición';

        return Promise.reject({
          message,
          status,
          data: errorData,
        });
      }
    );
  }
}

export default Api;
