import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './App.css';
import {FilterValueType, TasksType} from "./App";

interface TodoListPropsType {
    title: string
    error: string | null
    tasks: Array<TasksType>
    filterTasks: FilterValueType
    deleteTask: (id: string) => void
    setFilterTasks: (value: FilterValueType) => void
    addTask: (taskText: string) => void
    checkedHandle: (taskId: string, value: boolean) => void
    setError: (value: string | null) => void
}

export const TodoList: React.FC<TodoListPropsType> = ({filterTasks, error, setError, checkedHandle, addTask, title, tasks, deleteTask, setFilterTasks}) => {

    const [taskText, setTaskText] = useState('')

    const onChangeInputText = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskText(event.target.value)
    }

    const onKeyPressEnter = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.code) setError(null)
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
                <input className={error ? 'error' : ''} onChange={onChangeInputText} value={taskText} onKeyPress={onKeyPressEnter}/>
                <button onClick={onClickAddTask}>+</button>
                {error && <div className={'error-message'}>Field is required</div>}
            </div>
            <ul>
                {tasks.map((el, index) => <li className={el.isDone ? 'is-done' : ''} key={el.id}>
                    <input onChange={(e) => checkedHandle(el.id, e.currentTarget.checked)} type="checkbox"
                           checked={el.isDone}/>
                    <span>{el.title}</span>
                    <button onClick={() => deleteTask(el.id)}>x</button>
                </li>)}
            </ul>
            <div>
                <button className={filterTasks === 'all' ? 'active-filter' : ''} onClick={() => setFilterTasks('all')}>All</button>
                <button className={filterTasks === 'active' ? 'active-filter' : ''} onClick={() => setFilterTasks('active')}>Active</button>
                <button className={filterTasks === 'completed' ? 'active-filter' : ''} onClick={() => setFilterTasks('completed')}>Completed</button>
            </div>
        </div>
    );
}