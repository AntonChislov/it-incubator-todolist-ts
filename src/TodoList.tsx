import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './App.css';
import {FilterValueType, TasksType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

interface TodoListPropsType {
    title: string
    tasks: Array<TasksType>
    filterTasks: FilterValueType
    deleteTask: (id: string, todolistId: string) => void
    setFilterTasks: (value: FilterValueType, todolistId: string) => void
    addTask: (taskText: string, todolistId: string) => void
    checkedHandle: (taskId: string, value: boolean, todolistId: string) => void
    id: string
    removeTodolist: (todolistId: string) => void
    changeTask: (taskText: string, taskId: string, todolistId: string) => void
    changeTodolist: (todolistTitle: string, todolistId: string) => void
}

export const TodoList: React.FC<TodoListPropsType> = ({
                                                          filterTasks,
                                                          checkedHandle,
                                                          removeTodolist,
                                                          addTask,
                                                          title,
                                                          tasks,
                                                          deleteTask,
                                                          setFilterTasks,
                                                          id,
                                                          changeTask,
                                                          changeTodolist
                                                      }) => {
    const addTaskCallBack = (taskText: string) => {
        addTask(taskText, id)
    }

    const changeTodolistTitle = (todolistTitle: string) => {
        changeTodolist(todolistTitle, id)
    }

    return (
        <div>
            <h3><EditableSpan title={title} callback={changeTodolistTitle}/><button onClick={() => removeTodolist(id)}>x</button></h3>
            <AddItemForm addItem={addTaskCallBack}/>
            <ul>
                {tasks.map((el, index) => {
                    const changeTaskTitle = (taskTitle: string) => {
                        changeTask(taskTitle, el.id, id)
                    }
                    return <li className={el.isDone ? 'is-done' : ''} key={el.id}>
                        <input onChange={(e) => checkedHandle(el.id, e.currentTarget.checked, id)} type="checkbox"
                               checked={el.isDone}/>
                        <EditableSpan callback={changeTaskTitle} title={el.title}/>
                        <button onClick={() => deleteTask(el.id, id)}>x</button>
                    </li>
                })}
            </ul>
            <div>
                <button className={filterTasks === 'all' ? 'active-filter' : ''}
                        onClick={() => setFilterTasks('all', id)}>All
                </button>
                <button className={filterTasks === 'active' ? 'active-filter' : ''}
                        onClick={() => setFilterTasks('active', id)}>Active
                </button>
                <button className={filterTasks === 'completed' ? 'active-filter' : ''}
                        onClick={() => setFilterTasks('completed', id)}>Completed
                </button>
            </div>
        </div>
    );
}