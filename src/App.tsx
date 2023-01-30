import React, {useReducer} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {
    actionCreateAddTodolist, actionCreateChangeTodolist,
    actionCreateRemoveTodolist,
    actionCreateSetFilter,
    todolistReducer
} from './reducers/todolist-reducer';
import {
    addTaskActionCreator, addTaskForTodolistActionCreator, changeIsDoneActionCreator, changeTaskActionCreator,
    deleteAllTaskActionCreator,
    deleteTaskActionCreator,
    taskReducer
} from './reducers/task-reducer';

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

export type FilterValueType = 'all' | 'active' | 'completed'

function App() {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, dispatchTL] = useReducer(todolistReducer, [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, dispatchTasks] = useReducer(taskReducer, {
        [todolistId1]: [
            {id: v1(), isDone: true, title: 'eat'},
            {id: v1(), isDone: true, title: 'sleep'},
        ],
        [todolistId2]: [
            {id: v1(), isDone: false, title: '123'},
            {id: v1(), isDone: false, title: '456'},
        ]
    })

    const removeTodolist = (todolistId: string) => {
        dispatchTL(actionCreateRemoveTodolist(todolistId))
        dispatchTasks(deleteAllTaskActionCreator(todolistId))
    }

    const deleteTask = (id: string, todolistId: string) => {
        dispatchTasks(deleteTaskActionCreator(todolistId, id))
    }

    const addTask = (taskText: string, todolistId: string) => {
        if (taskText.trim() !== '') {
            dispatchTasks(addTaskActionCreator(todolistId, taskText, false))
        }
    }

    const checkedHandle = (taskId: string, value: boolean, todolistId: string) => {
        dispatchTasks(changeIsDoneActionCreator(todolistId, taskId, value))
    }

    const setFilterTasks = (value: FilterValueType, todolistId: string) => {
        dispatchTL(actionCreateSetFilter(todolistId, value))
    }

    const addTodolist = (title: string) => {
        const todolistId = v1()
        dispatchTL(actionCreateAddTodolist(title, todolistId))
        dispatchTasks(addTaskForTodolistActionCreator(todolistId))
    }

    const changeTask = (title: string, taskId: string, todolistId: string) => {
        dispatchTasks(changeTaskActionCreator(todolistId, taskId, title))
    }

    const changeTodolist = (title: string, todolistId: string) => {
        dispatchTL(actionCreateChangeTodolist(todolistId, title))
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todolists.map(tl => {

                    let tasksForTodoList: Array<TasksType> = tasks[tl.id]

                    if (tl.filter === 'active') {
                        tasksForTodoList = tasksForTodoList.filter(item => !item.isDone)
                    } else if (tl.filter === 'completed') {
                        tasksForTodoList = tasksForTodoList.filter(item => item.isDone)
                    }

                    return <TodoList filterTasks={tl.filter}
                                     checkedHandle={checkedHandle}
                                     changeTodolist={changeTodolist}
                                     addTask={addTask} tasks={tasksForTodoList} title={tl.title}
                                     deleteTask={deleteTask}
                                     setFilterTasks={setFilterTasks}
                                     id={tl.id}
                                     changeTask={changeTask}
                                     removeTodolist={removeTodolist}
                                     key={tl.id}/>
                }
            )}


        </div>
    );
}

export default App;