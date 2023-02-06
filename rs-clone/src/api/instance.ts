import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5050/',
  headers: {
    accept: 'application/json'
  }
});

export default instance;
