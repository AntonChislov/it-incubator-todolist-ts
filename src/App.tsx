import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

export interface TasksType {
    id: string
    title: string
    isDone: boolean
}

type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

export type FilterValueType = 'all' | 'active' | 'completed'

function App() {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolist] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'active'}
    ])

    const [tasks, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), isDone: true, title: 'eat'},
            {id: v1(), isDone: true, title: 'sleep'},
        ],
        [todolistId2]: [
            {id: v1(), isDone: false, title: '123'},
            {id: v1(), isDone: false, title: '456'},
        ]
    })

    const [error, setError] = useState<string | null>(null)

    const removeTodolist = (todolistId: string) => {
        setTodolist(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
    }

    const deleteTask = (id: string, todolistId: string) => {
        const todolist = tasks[todolistId]
        tasks[todolistId] = todolist.filter(item => item.id != id)
        setTasks({...tasks})
    }

    const addTask = (taskText: string, todolistId: string) => {
        const todolist = tasks[todolistId]
        if (taskText.trim() !== '') {
            tasks[todolistId] = [{id: v1(), isDone: false, title: taskText}, ...todolist]
            setTasks({...tasks})
        } else {
            setError('Field is required')
        }
    }

    const checkedHandle = (taskId: string, value: boolean, todolistId: string) => {
        const todolist = tasks[todolistId]
        const task = todolist.find(t => t.id === taskId)
        if (task) task.isDone = value
        tasks[todolistId] = todolist
        setTasks({...tasks})
    }

    const setFilterTasks = (value: FilterValueType, todolistId: string) => {
        const todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolist([...todolists])
        }
    }

    return (
        <div className="App">
            {todolists.map(tl => {

                    let tasksForTodoList: Array<TasksType> = tasks[tl.id]

                    if (tl.filter === 'active') {
                        tasksForTodoList = tasksForTodoList.filter(item => !item.isDone)
                    } else if (tl.filter === 'completed') {
                        tasksForTodoList = tasksForTodoList.filter(item => item.isDone)
                    }

                    return <TodoList filterTasks={tl.filter} error={error} setError={setError}
                                     checkedHandle={checkedHandle}
                                     addTask={addTask} tasks={tasksForTodoList} title={tl.title}
                                     deleteTask={deleteTask}
                                     setFilterTasks={setFilterTasks}
                                     id={tl.id}
                                     removeTodolist={removeTodolist}
                                     key={tl.id}/>
                }
            )}


        </div>
    );
}

export default App;