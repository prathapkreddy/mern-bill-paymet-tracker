import axios, { AxiosRequestConfig } from 'axios';
import { getAuth } from 'firebase/auth';

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
});

api.interceptors.request.use(
    async config => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const token = await user.getIdToken();
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    },
);

export default api;

export const axiosBaseQuery =
    ({ baseUrl }: { baseUrl: string }) =>
    async ({ url, method, data, params }: AxiosRequestConfig) => {
        try {
            const response = await api({
                url: baseUrl + url,
                method,
                data,
                params,
            });
            return { data: response.data };
        } catch (axiosError: any) {
            let err = axiosError;
            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data || err.message,
                },
            };
        }
    };
