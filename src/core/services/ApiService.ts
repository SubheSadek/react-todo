import axios from "axios";
import type {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    Method,
} from "axios";
import { destroyToken, getToken } from "./AuthTokenService";
import { errorMsg } from "./Message";

/* ---------------------------------------------------
   Axios Instance
--------------------------------------------------- */
const axiosClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
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
        return response.data;
    },
    (error) => {
        const response = error.response;

        if (!response) {
            errorMsg('Something went wrong');
            return Promise.reject(error);
        }

        if (response.status === 401) {
            destroyToken();
            errorMsg('Unauthorized');
            window.location.href = "/sign-in";
        }

        if ([400, 404, 422].includes(response.status)) {
            setError(response);
        }

        return Promise.reject(error);
    }
);

const setError = (response: AxiosResponse): void => {
    const errors = response.data.messages || { error: [response.data.message] };
    for (const key in errors) {
        errorMsg(errors[key][0]);
    }
};

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
export const callApi = <R = any, D = any>(
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
