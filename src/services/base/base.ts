import axios, { AxiosInstance } from "axios";
import { IBaseRequestOption, IResponse } from "./request-interface";

export function successHandler<T>(response: IResponse<T>) {
  return response;
}

export function errorHandler(error: any): void {
  throw error;
}

export async function sendRequest<T, D = any>({
  headers,
  sendAuthorization = false,
  ...restOptions
}: IBaseRequestOption<D>): Promise<IResponse<T>> {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const token = "";

  const axiosInstance: AxiosInstance = axios.create({ baseURL });

  // Request Interceptors
  axiosInstance.interceptors.request.use((config) => {
    config.headers.set({
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      ...config.headers,
      ...headers,
    });
    // Add Authorization header if token is available
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  });

  // Response Interceptors
  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  try {
    const response: IResponse<T> = await axiosInstance({ ...restOptions });
    successHandler<T>(response);
    return response;
  } catch (error: any) {
    errorHandler(error);
    return error;
  }
}
