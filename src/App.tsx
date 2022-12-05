import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";

const todoListTitle_1: string = 'What to learn'
const todoListTitle_2: string = 'What to buy'

export interface TasksType {
    id: number
    title: string
    isDone: boolean
}

const tasks: Array<TasksType> = [
    {id: 1, isDone: true, title: 'eat'},
    {id: 2, isDone: true, title: 'sleep'},
    {id: 3, isDone: true, title: 'eat'},
]

function App() {

    return (
        <div className="App">
            <TodoList tasks={tasks} title={todoListTitle_1} />
            <TodoList tasks={tasks} title={todoListTitle_2} />
        </div>
    );
}

export default App;