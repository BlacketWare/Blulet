const BASE_URL = "/api/v1";

export const ENDPOINTS = {
    AUTHENTICATION: {
        USER: `${BASE_URL}/auth/user`,
        REGISTER: `${BASE_URL}/auth/register`,
        LOGIN: `${BASE_URL}/auth/login`,
        LOGOUT: `${BASE_URL}/auth/logout`
    }
};

export default BASE_URL;