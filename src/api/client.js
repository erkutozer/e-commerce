import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

export function setupInterceptions(store, onUnauthorized) {
    // Her isteğe token ekliyoruz
    api.interceptors.request.use((config) => {
        const token = store.getState().auth.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    })

    api.interceptors.response.use(
        (response) => response,
        (error) => {
            const url = error.config?.url ?? '';
            const isAuthCall = url.startsWith('/auth/login') || url.startsWith('/auth/register')

            if (error.response?.status === 401 && !isAuthCall) {
                onUnauthorized();
            }
            return Promise.reject(error);
        }
    )
}

export default api;