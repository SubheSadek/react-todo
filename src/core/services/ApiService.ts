import axios from "axios";
import type {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    Method,
} from "axios";
import { destroyToken, getToken } from "./AuthTokenService";

/* ---------------------------------------------------
   Axios Instance
--------------------------------------------------- */
const axiosClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
});

/* ---------------------------------------------------
   Request Interceptor
--------------------------------------------------- */
axiosClient.interceptors.request.use(
    (config: any) => {
        const token = getToken();

        if (token) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${token}`,
            };
        }

        return config;
    },
    (error) => Promise.reject(error)
);

/* ---------------------------------------------------
   Response Interceptor
--------------------------------------------------- */
axiosClient.interceptors.response.use(
    (response: AxiosResponse) => {
        // Always return response data only
        return response.data;
    },
    (error) => {
        const status = error.response?.status;

        if (status === 401) {
            destroyToken();
            window.location.href = "/sign-in";
        }

        return Promise.reject(error);
    }
);

/* ---------------------------------------------------
   Generic Request Types
--------------------------------------------------- */
export interface RequestOptions<D = any> {
    method: Method;
    url: string;
    params?: Record<string, any>;
    data?: D;
    headers?: Record<string, string>;
}

/* ---------------------------------------------------
   Generic Request Executor
--------------------------------------------------- */
export const request = <R = any, D = any>(
    options: RequestOptions<D>
): Promise<R> => {
    const config: AxiosRequestConfig = {
        method: options.method,
        url: options.url,
        params: options.params,
        data: options.data,
        headers: options.headers,
    };

    return axiosClient(config);
};

export default axiosClient;
