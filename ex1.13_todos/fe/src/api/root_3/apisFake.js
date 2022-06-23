import { v4 as uuidv4 } from 'uuid';
let items = [
  {'id': '1', 'name': 'fake task 1', 'status': 1},
  {'id': '2', 'name': 'fake task 2', 'status': 0},
  {'id': '3', 'name': 'fake task 3', 'status': 0}
];

/*************************************************/
export default {
  getAll : (subUrl) =>
    new Promise((resolve, reject) => { 
      if (!items) {
        return setTimeout(() => reject(new Error('Items not found')), 250);
      }
      setTimeout(() => resolve(items), 250);
    }),

  getById : (subUrl) =>
    new Promise((resolve, reject) => {
      let id = subUrl.split('/').pop();
      let dictionary = Object.assign({}, ...items.map((item, index) => ({[item.id]: item})));
      const item = dictionary[id];
      
      if (!item) {
        return setTimeout(() => reject(new Error('Item not found')), 250);
      }
      setTimeout(() => resolve(item), 250);
    }),

  create : (subUrl, payload) =>
    new Promise((resolve, reject) => {
      if (!payload.name || !payload.status) {
        return setTimeout(() => reject(new Error('Not all information provided')), 250);
      }
  
      const id = uuidv4();
      const newItem = { id, ...payload };  // NOTE: ... for dict
      items = [ ...items, newItem ];  // NOTE: ... for array
      // items = {... items};  // NOTE: ... array --> dict (key = index)
      setTimeout(() => resolve(true), 250);
    }),

  update_old : (subUrl, payload) =>  // NOTE: ... array --> dict (but CHANGE order index)
    new Promise((resolve, reject) => {
      let id = subUrl.split('/').pop();
      let dictionary = Object.assign({}, ...items.map((item, index) => ({[item.id]: item})));
      const item = dictionary[id];

      if (!item) {
        return setTimeout(() => reject(new Error('Item not found')), 250);
      }
  
      const updateItem = { id, ...payload };
      dictionary[id] = { ...dictionary[id], ...updateItem };
      items = Object.values(dictionary);
      return setTimeout(() => resolve(true), 250);
    }),

  update : (subUrl, payload) =>
    new Promise((resolve, reject) => {
      let id = subUrl.split('/').pop();
      let indexItem = items.findIndex((item, index) => (item.id === id));

      if (indexItem === -1) {
        return setTimeout(() => reject(new Error('Item not found')), 250);
      }
  
      const updateItem = { id, ...payload };
      items[indexItem] = updateItem;
      return setTimeout(() => resolve(true), 250);
    }),

  delete : (subUrl) =>
    new Promise((resolve, reject) => {
      let id = subUrl.split('/').pop();
      let indexItem = items.findIndex((item, index) => (item.id === id));

      if (indexItem === -1) {
        return setTimeout(() => reject(new Error('Item not found')), 250);
      }
  
      items.splice(indexItem, 1); 
      return setTimeout(() => resolve(true), 250);
    }),
};