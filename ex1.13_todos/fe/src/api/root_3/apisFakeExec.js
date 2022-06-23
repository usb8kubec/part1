import apisFake from './apisFake';

apisFake.getAll(subUrl)
  .then((result) => console.log(result))
  .catch((error) => console.log(error));

// const doGetAll = async (subUrl) => {
//   try {
//     const result = await apisFake.getAll();
//     console.log(result);
//   } catch (error) {
//     console.log(error);
//   }
// };
// doGetAll(subUrl);

const doGetById = async (subUrl) => {
  try {
    const result = await apisFake.getById(subUrl);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
doGetById('/1');

const doCreate = async (subUrl, payload) => {
  try {
    const result = await apisFake.create(payload);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
doCreate('/', { 'name': 'fake task new new', 'status': 0 });

const doUpdate = async (subUrl, payload) => {
  try {
    const result = await apisFake.update(subUrl, payload);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
doUpdate('/3', { 'name': 'fake task 3 edited', 'status': 0 });

const doDelete = async (subUrl) => {
  try {
    const result = await apisFake.delete(subUrl);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
doDelete('/1');