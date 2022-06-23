import { useState, useEffect } from 'react';
// import axios from 'axios';
import apis from './api/apis';
import './App.css';
import Home from './routers/Home';

export default function App () {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // setTodos([
    //   {"id": "1", "name": "task 1", "status": 1},
    //   {"id": "2", "name": "task 2", "status": 0},
    //   {"id": "3", "name": "task 3", "status": 0}
    // ]);

    // const fetchData = () => {
    //   axios
    //     .get(`http://localhost:5000/list`)
    //     .then(res => setTodos(res.data))
    //     .catch(err => console.error(err))
    // };
    // fetchData();

    apis.get('/list')
      .then(res => setTodos(res.data))
  }, []);

  return (
    <div className="App">
      <div className="Home">
        <Home todos={todos} setTodos={setTodos} />
      </div>
    </div>
  );
};

// async function Conn () {
//   apis.get('/conn')
//     .then(res => console.log(res.data))
//     .catch(err => console.log(err))
// };
// Conn();