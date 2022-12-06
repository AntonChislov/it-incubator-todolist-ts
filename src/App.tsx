import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";

export interface TasksType {
    id: number
    title: string
    isDone: boolean
}

function App() {
    const [tasks, setTasks] = useState([
        {id: 1, isDone: true, title: 'eat'},
        {id: 2, isDone: true, title: 'sleep'},
        {id: 3, isDone: true, title: 'eat'},
    ])

    const deleteTask = (id: number) => {
        setTasks(tasks.filter( item => item.id != id))
    }

    return (
        <div className="App">
            <TodoList tasks={tasks} title={'What to learn'} deleteTask={deleteTask}/>
        </div>
    );
}

export default App;