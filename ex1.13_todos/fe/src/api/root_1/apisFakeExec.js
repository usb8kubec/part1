import apisFake from './apisFake';

apisFake.getUsers()
  .then((result) => console.log(result))
  .catch((error) => console.log(error));

// const doGetUsers = async () => {
//   try {
//     const result = await apisFake.getUsers();
//     console.log(result);
//   } catch (error) {
//     console.log(error);
//   }
// };
// doGetUsers();

const doGetUser = async (id) => {
  try {
    const result = await apisFake.getUser(id);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
doGetUser('1');

const doCreateUser = async (data) => {
  try {
    const result = await apisFake.createUser(data);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
doCreateUser({ firstName: 'Liam', lastName: 'Wieruch' });

const doUpdateUser = async (id, data) => {
  try {
    const result = await apisFake.updateUser(id, data);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
doUpdateUser('1', { isDeveloper: false });

const doDeleteUser = async (id) => {
  try {
    const result = await apisFake.deleteUser(id);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
doDeleteUser('1');