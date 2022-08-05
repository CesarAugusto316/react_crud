import axios, { AxiosError, AxiosRequestConfig } from 'axios';


export class RestAPI {
  private baseUrl = import.meta.env.VITE_TODOS_API_URL;
  public token!: string|null;
  public hasToken = false;

  constructor() {
    this.readFromLocalStorage();
  }

  private generateHeaders(auth:boolean): AxiosRequestConfig {
    if (auth) {
      return {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      };
    }
    return {};
  }

  protected async get(url: string, auth = true) {
    const headers = this.generateHeaders(auth);
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.baseUrl}${url}`, headers)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((error:AxiosError) => {
          reject(error);
        });
    });
  }

  protected async post(url: string, payload: any, auth = true) {
    const headers = this.generateHeaders(auth);
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.baseUrl}${url}`, payload, headers)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((error :AxiosError) => {
          reject(error);
        });
    });
  }

  protected async delete(url: string, auth = true) {
    const headers = this.generateHeaders(auth);
    return new Promise((resolve, reject) => {
      axios
        .delete(`${this.baseUrl}${url}`, headers)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  }

  protected async put(url: string, payload: any, auth = true) {
    const headers = this.generateHeaders(auth);
    return new Promise((resolve, reject) => {
      axios
        .put(`${this.baseUrl}${url}`, payload, headers)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  }

  protected readFromLocalStorage(): void {
    this.token = JSON.parse(
      localStorage.getItem('user-token') as string,
    );
    this.hasToken = this.token ? true : false;
  }

  protected writeToLocalStorage(): void {
    this.hasToken = this.token ? true : false;
    localStorage.setItem(
      'user-token',
      JSON.stringify(this.token as string),
    );
  }
}
