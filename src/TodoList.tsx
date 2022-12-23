import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './App.css';
import {FilterValueType, TasksType} from "./App";

interface TodoListPropsType {
    title: string
    tasks: Array<TasksType>
    deleteTask: (id: string) => void
    setFilterTasks: (value: FilterValueType) => void
    addTask: (taskText: string) => void
    checkedHandle: (taskId: string) => void
}

export const TodoList: React.FC<TodoListPropsType> = ({checkedHandle, addTask, title, tasks, deleteTask, setFilterTasks}) => {

    const [taskText, setTaskText] = useState('')

    const onChangeInputText = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskText(event.target.value)
    }

    const onKeyPressEnter = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.code === 'Enter') {
            addTask(taskText)
            setTaskText('')
        }
    }

    const onClickAddTask = () => {
        addTask(taskText)
        setTaskText('')
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input onChange={onChangeInputText} value={taskText} onKeyPress={onKeyPressEnter}/>
                <button onClick={onClickAddTask}>+</button>
            </div>
            <ul>
                {tasks.map((el, index) => <li key={el.id}>
                    <input onChange={() => checkedHandle(el.id)} type="checkbox"
                           checked={el.isDone}/>
                    <span>{el.title}</span>
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