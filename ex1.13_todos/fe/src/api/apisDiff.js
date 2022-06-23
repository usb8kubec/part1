import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/',
  headers: {
    'content-type': 'application/json',
  },
  // timeout: 1000,
});

export default {
  get: (subUrl) =>
    instance({
      method: 'GET',
      url: subUrl,
    })
      .then(res => res.data)
      .catch(err => console.log(err.message)),

  add: (subUrl, payload) =>
    instance({
      method: 'POST',
      url: subUrl,
      data: payload,
    })
      .then(res => alert(res.data))
      .catch(err => console.log(err.message)),
      
  update: (subUrl, payload) =>
    instance({
      method: 'PUT',
      url: subUrl,
      data: payload,
    })
      .then(res => alert(res.data))  
      .catch(err => console.log(err.message)),
};
