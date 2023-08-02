import React from 'react';
import './App.css';

import { getTasks, addTasks } from './redux/slices/TaskSlice';
import { useAppDispatch } from './hooks/hook';
import TodoList from './components/TodoList';

function App() {
  const dispatch = useAppDispatch()
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = React.useState('')

  React.useEffect(() => {
    dispatch(getTasks())
  }, [])

  const inputValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const onAddNewTask = (title: string) => {
    dispatch(addTasks(title))
    setInputValue('')
  }

  return (
    <div className="App">
      <div className="add-field">
        <input onChange={inputValueHandler} value={inputValue} type="text" placeholder="Введите название задачи.." ref={inputRef}/>
        <button onClick={() => onAddNewTask(inputValue)}>Добавить</button>
      </div>
      <TodoList />
    </div>
  );
}

export default App;
