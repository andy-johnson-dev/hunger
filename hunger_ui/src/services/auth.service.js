import axios from 'axios';

const API_URL = `http://localhost:3001/auth/`;

class AuthService {
    login(user) {
        return axios.post(API_URL + 'signin', {
            username: user.username,
            password: user.password
        })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
        return axios.post(API_URL + 'signout');
    }

    register(user) {
        return axios.post(API_URL + 'signup', {
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: user.password
        }).then(response => {
            if (response.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data
        });
    }

}

export default new AuthService();