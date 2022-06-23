// https://www.robinwieruch.de/javascript-fake-api/
import { v4 as uuidv4 } from 'uuid';
const idOne = uuidv4();
const idTwo = uuidv4();
let users = {
  ['1']: {
    id: idOne,
    firstName: 'Robin',
    lastName: 'Wieruch',
    isDeveloper: true,
  },
  ['2']: {
    id: idTwo,
    firstName: 'Dave',
    lastName: 'Davddis',
    isDeveloper: false,
  },
};

/*************************************************/
export default {
  // getUsers_old : () => {
  //   return new Promise((resolve, reject) => {
  //     if (!users) { reject(new Error('Users not found')) }
  //     resolve(Object.values(users));
  //   });
  // },

  getUsers_old : () =>
    new Promise((resolve, reject) => {
      if (!users) { reject(new Error('Users not found')) }
      resolve(Object.values(users));
  }),

  getUsers : () =>
    new Promise((resolve, reject) => { 
      if (!users) {
        return setTimeout(() => reject(new Error('Users not found')), 250);
      }
      setTimeout(() => resolve(Object.values(users)), 250);
    }),

  getUser : (id) =>
    new Promise((resolve, reject) => {
      const user = users[id];
      if (!user) {
        return setTimeout(() => reject(new Error('User not found')), 250);
      }
      setTimeout(() => resolve(users[id]), 250);
    }),

  createUser : (data) =>
    new Promise((resolve, reject) => {
      if (!data.firstName || !data.lastName) {
        reject(new Error('Not all information provided'));
      }
  
      const id = uuidv4();
      const newUser = { id, ...data };
      users = { ...users, [id]: newUser };
      setTimeout(() => resolve(true), 250);
    }),

  updateUser : (id, data) =>
    new Promise((resolve, reject) => {
      if (!users[id]) {
        return setTimeout(() => reject(new Error('User not found')), 250);
      }
  
      users[id] = { ...users[id], ...data };
      return setTimeout(() => resolve(true), 250);
    }),

  deleteUser : (id) =>
    new Promise((resolve, reject) => {
      const { [id]: user, ...rest } = users;
      if (!user) {
        return setTimeout(() => reject(new Error('User not found')), 250);
      }
  
      users = { ...rest };
      return setTimeout(() => resolve(true), 250);
    }),
};