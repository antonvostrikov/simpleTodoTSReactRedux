import React from "react";
import { useAppSelector } from "../hooks/hook";

import TodoItem from "./TodoItem";

const TodoList:React.FC = () => {
  const tasks = useAppSelector(state => state.tasks.tasks)

  return <div className="todo-list">
    { tasks.map(task => <TodoItem key={task.id} {...task}/>) }
  </div>
}

export default TodoList