import { React, useState } from 'react';
import apis from '../../api/apis';
import styles from "./Todo.module.css";

export default function Todo(props) {
  const [todoName, setTodoName] = useState(props.name);

  let listenChange = (e) => {
    // debugger
    setTodoName(e.target.value);
  };

  let listenSubmit = (e) => {
    e.preventDefault();

    let payload = {
      name: e.target.name.value,
      status: props.status
    }

    apis.update(`/list/${props.id}`, payload)
      // .then(() => {
      //   let todos = [...props.todos];
      //   todos[parseInt(props.id)-1].name = e.target.name.value;
      //   props.setTodos(todos);
      // })
      .then(res => {
        if(res.status === undefined || res.status === 400) {
          alert('Status 400 : Opps, somothing wrong in your input');
        } else {
          alert(res.data);
          return true;
        }
      })
      .then((res) => {
        if(res === true) {
          return apis.get('/list')
        }
      })
      .then(res => props.setTodos(res.data))
      .catch(err => alert(err))
  };

  /**************************************************/
  const [checked, setChecked] = useState((props.status === 0) ? false : true);
  let listenToggleCheckbox = (e) => {
    setChecked(!checked);

    let payload = {
      name: props.name,
      status: (!checked) ? 1 : 0
    }

    apis.update(`/list/${props.id}`, payload)
      .then(res => {
        if(res.status === undefined || res.status === 400) {
          alert('Status 400 : Opps, somothing wrong in your input');
        } else {
          alert(res.data);
          return true;
        }
      })
      .then((res) => {
        if(res === true) {
          return apis.get('/list')
        }
      })
      .then(res => props.setTodos(res.data))
      .catch(err => alert(err))
  };

  let nameStyle = {
    textDecorationLine: (checked ? 'line-through' : 'none'),
    border: 'none',
    maxWidth: '154px',
  };

  return (
    <div className={styles.todo}>
      <div className={styles.todo1}>
        <input type="checkbox" onChange={listenToggleCheckbox} checked={checked}
          data-testid={`check-${props.id}`}
        />
      </div>

      <div className={styles.todo2}>
        <form action="" name="formOneLine" className={styles.formOneLine}
          onSubmit={listenSubmit}
        >
          <input type="text" name="name" style={nameStyle}
            value={todoName} onChange={listenChange} required
            data-testid={`name-${props.index}`}
            // data-testid={`name-${props.id}`}
          />
          <button type="submit" className={styles.btn}>Confirm Edit</button>
        </form>
      </div>    
    </div>
  );
};