import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import Todos from '../Todos';

afterEach(() => cleanup());

describe('EVENT LISTENNING', () => {
  beforeEach(() => {
    // const mockSetTodo = jest.fn();
    render(
      <Todos todos={[]} 
        setTodos={() => {}}
        // setTodos={mockSetTodo}
      />
    );
  });

  describe('--INPUT', () => {
    it('should render input element', async () => {
      const inputCreateElement = screen.getByPlaceholderText(/Add a new task/i);
      expect(inputCreateElement).toBeInTheDocument();
    });

    it('should be able to type in input element', async () => {
      const inputCreateElement = screen.getByPlaceholderText(/Add a new task/i);
      fireEvent.change(inputCreateElement, {target : {value: 'Task 4'}});
      expect(inputCreateElement.value).toBe ('Task 4');
    });
  });

  describe('--CLICK BUTTON - CREATE', () => {
    it('should have emty input element after click', async () => {
      const inputCreateElement = screen.getByPlaceholderText(/Add a new task/i);
      fireEvent.change(inputCreateElement, {target : {value: 'Task 4'}});

      const buttonCreateElement = screen.getByRole('button', {name: /Create task/i});
      fireEvent.click(buttonCreateElement);
      expect(inputCreateElement.value).toBe ('');
    });
  });
});