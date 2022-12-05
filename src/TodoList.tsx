import React from 'react';
import './App.css';
import {TasksType} from "./App";

interface TodoListPropsType {
    title: string
    tasks: Array<TasksType>
}

export  const TodoList: React.FC<TodoListPropsType> = ({title, tasks}) => {

    const tasksEl = tasks.map(el => <li key={el.id}><input type="checkbox" checked={el.isDone}/> <span>{el.title}</span></li>)

    return (
            <div>
                <h3>{title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {tasksEl}
                </ul>
                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
    );
}