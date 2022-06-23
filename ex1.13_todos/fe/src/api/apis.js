import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/';  // global or configuration axios defaults header
axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';

export default {
  get: (subUrl) => 
    axios
      .get(subUrl)
      .then(res => res)  // NOTE: res include: res.data & res.status
      .catch(err => err.message),

  add: (subUrl, payload) =>
    axios
      .post(subUrl, payload)
      .then(res => res)
      .catch(err => err.message),
  
  update: (subUrl, payload) =>
    axios
      .put(subUrl, payload)
      .then(res => res)
      .catch(err => err.message),
};
