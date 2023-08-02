import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import { deleteTask, toggleStatusTask } from "../redux/slices/TaskSlice";

type Task = {
  id: number
  title: string
  completed: boolean
}

const TodoItem:React.FC<Task> = ({ id, title, completed }) => {
  const dispatch = useAppDispatch()

  return <div className="todo-item">
    <span>{id}</span>
    <p>{title}</p>
    <input type="checkbox" onChange={() => dispatch(toggleStatusTask(id))} defaultChecked={completed} />
    <button onClick={() => dispatch(deleteTask(id))}>Delete</button>
  </div>
}

export default TodoItem