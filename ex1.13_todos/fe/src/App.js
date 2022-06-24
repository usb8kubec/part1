import { useState, useEffect } from 'react';
// import axios from 'axios';
import apis from './api/apis';
import './App.css';
import Home from './routers/Home';

let linkImg = `${process.env.REACT_APP_BACKEND_URL || 'hihi'}/image`

export default function App () {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    apis.get('/list')
      .then(res => setTodos(res.data))
  }, []);

  return (
    <div className="App">
      <div className="Home">
        <img src={linkImg} alt="" />
        {/* DONE:  */}
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