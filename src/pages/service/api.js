import axios from 'axios';

// api key = 2cce89105d714803d9bb3629cb8cdbe5
// base da api = https://api.themoviedb.org/3/    +  api_key=  +  2cce89105d714803d9bb3629cb8cdbe5

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;