import React from 'react'
import Todos from '../components/Todos/Todos';

export default function Home(props) {
  return (
    <div>
      <Todos {...props} />
    </div>
  );
};
