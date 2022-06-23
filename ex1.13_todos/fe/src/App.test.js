import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import App from './App';
import apis from './api/apis';

afterEach(() => cleanup());

window.alert = jest.fn();  // NOTE: solve err: jest not implemented window.alert()

const addTask = async (tasks) => {
  const inputCreateElement = screen.getByPlaceholderText(/Add a new task/i);
  const buttonCreateElement = screen.getByRole('button', {name: /Create task/i});
  await tasks.forEach((task) => {
    fireEvent.change(inputCreateElement, {target : {value: task}});
    fireEvent.click(buttonCreateElement);
  });
};

const MockApp = () => {
  return (
    <App />  // NOTE: nơi khởi điểm của state --> để test function, ko có props trong App
  );
};

describe('INTEGRATION-FUNCTION', () => {
  describe('--CREATE TASK', () => {
    beforeEach(() => {
      render( <MockApp /> );
    });

    it('should render new task-todo after create', async () => {
      addTask(['Task aaa'])
        .then(() => screen.findAllByDisplayValue(/Task aaa/i))
        .then((res) => expect(res.length).toBeGreaterThanOrEqual(1))
    });

  });

  describe('--MULTIPLE ELEMENTS', () => {
    beforeEach(() => {
      render( <MockApp /> );
    });

    it('should render multiple items', async () => {
      addTask(['Task 1', 'Task 1', 'Task 1'])
        .then(() => screen.findAllByDisplayValue(/Task 1/i))
        .then((res) => expect(res.length).toBeGreaterThanOrEqual(3))
    });

    it('new task should not have line-through when initally rendered', async () => {
      addTask(['Task www'])
      .then(() => screen.findAllByDisplayValue(/Task 1/i))
      .then((res) => {
        res.forEach((item) => {
          expect(item).toHaveStyle('text-decoration-line: none');
        });
      })
    });
    
    // // it('task should have line-through when clicked', () => {
    // //   addTask(['Task 1'])
    // //   const inputResultElements = screen.getByDisplayValue(/Task 1/i);
    // //   fireEvent.click(inputResultElements)  // --> If we don't use button confirm edit
    // //   expect(inputResultElements).toHaveStyle('text-decoration-line: line-through')
    // // });
  });

  describe('--API REAL', () => {
    beforeEach(() => {
      render( <MockApp /> );
    });

    it('can connect --> backend -->  database --> return string of time now', async () => {
      apis.get('/conn')
        .then(res => {
          expect(res.status).toBe(200);
          expect(typeof res.data).toBe('string');
        })
    });
    it('should fetch and render first input element', async () => {
      const todoElement = await screen.findByTestId('name-0');
      expect(todoElement).toBeInTheDocument();
    });
  });

  // NOTE: lead to errr, due to axios.defaults
  // describe('--API MOCK', () => {
  //   beforeEach(() => {
  //     jest.mock('./api/__mocks__/axios')
  //     render( <MockApp /> );
  //   });
    
  //   it('should fetch and render first input element', async () => {
  //     const todoElement = await screen.findByTestId('name-0');
  //     expect(todoElement).toBeInTheDocument();
  //   });
  // });
});
