import axios from 'axios';

export const api = axios.create({
  baseURL: `https://dowhile-oficial.herokuapp.com`,
});
