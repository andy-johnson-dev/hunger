import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/';

class UserService {
    getUserPhoto(key) {
        return axios.get(API_URL + '/' + key, { headers: authHeader() })
    }
    getPublicContent() {
        return axios.get(API_URL + 'all');
    }

    getUserBoard() {
        return axios.get(API_URL + 'user', { headers: authHeader() });
    }

    getAdminBoard() {
        return axios.get(API_URL + 'admin', { headers: authHeader() });
    }
}

export default new UserService();
