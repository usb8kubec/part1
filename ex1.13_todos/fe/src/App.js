import { useState, useEffect } from 'react';
// import axios from 'axios';
import apis from './api/apis';
import './App.css';
import Home from './routers/Home';

export default function App () {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    apis.get('/list')
      .then(res => setTodos(res.data))
  }, []);

  return (
    <div className="App">
      <div className="Home">
        <img src="http://localhost:5000/image" alt="" />
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