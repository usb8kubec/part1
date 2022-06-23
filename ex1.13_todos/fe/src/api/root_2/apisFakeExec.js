import apisFake from './apisFake';

apisFake.getAll()
  .then((result) => console.log(result))
  .catch((error) => console.log(error));

// const doGetAll = async () => {
//   try {
//     const result = await apisFake.getAll();
//     console.log(result);
//   } catch (error) {
//     console.log(error);
//   }
// };
// doGetAll();

const doGetById = async (id) => {
  try {
    const result = await apisFake.getById(id);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
doGetById('1');

const doCreate = async (payload) => {
  try {
    const result = await apisFake.create(payload);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
doCreate({ 'name': 'fake task new new', 'status': 0 });

const doUpdate = async (id, payload) => {
  try {
    const result = await apisFake.update(id, payload);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
doUpdate('3', { 'name': 'fake task 3 edited', 'status': 0 });

const doDelete = async (id) => {
  try {
    const result = await apisFake.delete(id);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
doDelete('1');