import { render, screen, cleanup } from '@testing-library/react';
import Todo from '../Todo';

afterEach(() => cleanup());

describe('COMPLETED TASK UI', () => {
  beforeEach(() => {
    let todo = {"id": "1", "name": "task 1", "status": 1};
    render(<Todo {...todo} index={0}/>);
  });
  
  it('should render name of task', async () => {
    const nameElement = screen.getByTestId('name-0');
    expect(nameElement).toBeInTheDocument();
    expect(nameElement).toHaveDisplayValue('task 1');
  });
  
  it('should render completed task & checked = true', async () => {
    const nameElement = screen.getByTestId('name-0');
    expect(nameElement).toHaveStyle('text-decoration-line: line-through');
    const checkElement = screen.getByTestId('check-1');
    expect(checkElement).toHaveProperty('checked', true);
  });
});
  
// test('should render incompleted task & checked = false', () => {
describe('INCOMPLETED TASK UI', () => {
  it('should render incompleted task & checked = false', async () => {  
    let todo = {"id": "2", "name": "task 2", "status": 0};
    render(<Todo {...todo} index={0} />);
    
    const nameElement = screen.getByTestId('name-0');
    expect(nameElement).toHaveStyle('text-decoration-line: none');
    
    const checkElement = screen.getByTestId('check-2');
    expect(checkElement).toHaveProperty('checked', false);
  });
});