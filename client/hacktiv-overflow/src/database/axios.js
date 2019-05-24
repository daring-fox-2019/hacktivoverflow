import Axios from 'axios';

const axiosInstance = Axios.create({
  //baseURL: 'http://server.hacktiv.overflow.komangmahendra.me',
  baseURL: 'http://localhost:3000'
});

export default axiosInstance;
