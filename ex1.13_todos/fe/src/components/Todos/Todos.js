import { React, useState } from 'react';
import Todo from './Todo';
import styles from "./Todos.module.css";
import apis from '../../api/apis';

export default function Todos(props) {
  const [newTaskName, setNewTaskName] = useState('');

  let listenChange = (e) => {
    // debugger
    setNewTaskName(e.target.value);
  }

  let listenSubmit = (e) => {
    e.preventDefault();

    apis.add('/list', {name: newTaskName})
      .then(res => {
        if(res.status === undefined || res.status === 400) {
          alert('Status 400 : Opps, somothing wrong in your input');
        } else {
          alert(res.data);
        }
      })
      .then(() => apis.get('/list'))
      .then(res => props.setTodos(res.data))
      .catch(err => alert(err))

    // props.setTodos([  //   {id: (props.todos.length+1).toString(), name: newTaskName, status: 0}
    setNewTaskName('');
  }
  
  return (
    <div style={{marginTop: '20px'}}>
      {props.todos.map((item, index) => (
        <Todo key={index} {...item} todos={props.todos} setTodos={props.setTodos} 
          index={index}
          // data-testid={`todo-item-${index}`}
        />
      ))}
      
      <div style={{marginTop: '20px'}}>
        <form action="" name="formOneLine" className={styles.formOneLine}
          onSubmit={listenSubmit}
        >
          <input type="text" name="name" className={styles.inputName}
            value={newTaskName} onChange={listenChange} required
            placeholder='Add a new task'
          />
          <button type="submit" className={styles.btn}>Create task</button>
        </form>
      </div>
    </div>
  );
};