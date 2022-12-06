import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";

export interface TasksType {
    id: number
    title: string
    isDone: boolean
}

export type FilterValueType = 'all' | 'active' | 'completed'

function App() {
    const [tasks, setTasks] = useState([
        {id: 1, isDone: true, title: 'eat'},
        {id: 2, isDone: true, title: 'sleep'},
        {id: 3, isDone: false, title: '123'},
        {id: 4, isDone: false, title: '456'},
    ])
    const [filterTasks, setFilterTasks] = useState<FilterValueType>('all')
    let tasksForTodoList: Array<TasksType> = tasks

    if (filterTasks === 'active') {
        tasksForTodoList = tasks.filter( item => item.isDone === false)
    } else if (filterTasks === 'completed') {
        tasksForTodoList = tasks.filter( item => item.isDone === true)
    }

    const deleteTask = (id: number) => {
        setTasks(tasks.filter( item => item.id != id))
    }

    return (
        <div className="App">
            <TodoList tasks={tasksForTodoList} title={'What to learn'} deleteTask={deleteTask} setFilterTasks={setFilterTasks}/>
        </div>
    );
}

export default App;