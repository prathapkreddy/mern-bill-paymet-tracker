import axios from "axios";
import { getAuth } from "firebase/auth";

const api = axios.create({
    baseURL: import.meta.env.BACKEND_BASE_URL,
});

api.interceptors.request.use(
    async (config) => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const token = await user.getIdToken();
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
