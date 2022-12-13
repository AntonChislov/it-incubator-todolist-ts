import React from 'react';
import './App.css';
import {FilterValueType, TasksType} from "./App";

interface TodoListPropsType {
    title: string
    tasks: Array<TasksType>
    deleteTask: (id: string) => void
    setFilterTasks: (value: FilterValueType) => void
}

export const TodoList: React.FC<TodoListPropsType> = ({title, tasks, deleteTask, setFilterTasks}) => {

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasks.map(el => <li key={el.id}><input type="checkbox" checked={el.isDone}/> <span>{el.title}</span>
                    <button onClick={() => deleteTask(el.id)}>x</button>
                </li>)}
            </ul>
            <div>
                <button onClick={() => setFilterTasks('all')}>All</button>
                <button onClick={() => setFilterTasks('active')}>Active</button>
                <button onClick={() => setFilterTasks('completed')}>Completed</button>
            </div>
        </div>
    );
}