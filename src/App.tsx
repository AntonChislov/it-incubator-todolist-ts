import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import set = Reflect.set;

export interface TasksType {
    id: string
    title: string
    isDone: boolean
}

export type FilterValueType = 'all' | 'active' | 'completed'

function App() {
    const [tasks, setTasks] = useState([
        {id: v1(), isDone: true, title: 'eat'},
        {id: v1(), isDone: true, title: 'sleep'},
        {id: v1(), isDone: false, title: '123'},
        {id: v1(), isDone: false, title: '456'},
    ])
    const [filterTasks, setFilterTasks] = useState<FilterValueType>('all')
    let tasksForTodoList: Array<TasksType> = tasks

    if (filterTasks === 'active') {
        tasksForTodoList = tasks.filter(item => !item.isDone)
    } else if (filterTasks === 'completed') {
        tasksForTodoList = tasks.filter(item => item.isDone)
    }

    const deleteTask = (id: string) => {
        setTasks(tasks.filter(item => item.id != id))
    }

    const addTask = (taskText: string) => {
        if (taskText && taskText.trim() !== '') setTasks([{id: v1(), isDone: false, title: taskText}, ...tasks])
    }

    const checkedHandle = (taskId: string) => {
        const task = tasks.find(t => t.id === taskId)
        if (task) task.isDone = !task.isDone

        setTasks([...tasks])
    }

    /*const checkedHandle = (index: number) => {
        let checkedTasks = []
        if (tasks[index].isDone) {
            checkedTasks = [
                ...tasks.slice(0, index),
                {...tasks[index], isDone: false},
                ...tasks.slice(index + 1)
            ]
        } else {
            checkedTasks = [
                ...tasks.slice(0, index),
                {...tasks[index], isDone: true},
                ...tasks.slice(index + 1)
            ]
        }
        setTasks(checkedTasks)
    }*/

    return (
        <div className="App">
            <TodoList checkedHandle={checkedHandle} addTask={addTask} tasks={tasksForTodoList} title={'What to learn'} deleteTask={deleteTask}
                      setFilterTasks={setFilterTasks}/>
        </div>
    );
}

export default App;