import React from 'react';
import './App.css';
import {TasksType} from "./App";

interface TodoListPropsType {
    title: string
    tasks: Array<TasksType>
    deleteTask: Function
}

export  const TodoList: React.FC<TodoListPropsType> = ({title, tasks, deleteTask}) => {

    return (
            <div>
                <h3>{title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {tasks.map(el => <li key={el.id}><input type="checkbox" checked={el.isDone}/> <span>{el.title}</span><button onClick={() => deleteTask(el.id)}>x</button></li>)}
                </ul>
                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
    );
}