import {TasksType} from '../App';
import {v1} from 'uuid';
import {behaviorPlugin} from '@testing-library/user-event/dist/keyboard/types';

type ArrayTasksType = {
    [key: string]: Array<TasksType>
}

type AddTaskType = {
    type: 'ADD_TASK'
    todolistId: string
    title: string
    isDone: boolean
}

type DeleteTaskType = {
    type: 'DELETE_TASK'
    todolistId: string
    taskId: string
}

type ChangeTaskType = {
    type: 'CHANGE_TASK'
    todolistId: string
    taskId: string
    title: string
}

type ChangeIsDoneType = {
    type: 'CHANGE_IS_DONE'
    todolistId: string
    taskId: string
    isDone: boolean
}

type ActionsType = AddTaskType | DeleteTaskType | ChangeTaskType | ChangeIsDoneType

export const taskReducer = (state: ArrayTasksType, action: ActionsType): ArrayTasksType => {
    switch (action.type) {
        case 'ADD_TASK': {
            return {
                ...state,
                [action.todolistId]: [
                    ...state[action.todolistId],
                    {id: v1(), title: action.title, isDone: action.isDone}
                ]
            }
        }
        case 'DELETE_TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        }
        case 'CHANGE_TASK': {
            const task = state[action.todolistId].find(t => t.id === action.taskId)
            if (task) task.title = action.title
            return {...state}
        }
        case 'CHANGE_IS_DONE': {
            const task = state[action.todolistId].find(t => t.id === action.taskId)
            if (task) task.isDone = action.isDone
            return {...state}
        }
        default:
            throw new Error('not found type')
    }
}

export const addTaskActionCreator = (todolistId: string, title: string, isDone: boolean): AddTaskType => {
    return {type: 'ADD_TASK', todolistId, title, isDone}
}

export const deleteTaskActionCreator = (todolistId: string, taskId: string): DeleteTaskType => {
    return {type: 'DELETE_TASK', todolistId, taskId}
}

export const changeTaskActionCreator = (todolistId: string, taskId: string, title: string): ChangeTaskType => {
    return {type: 'CHANGE_TASK', todolistId, taskId, title}
}

export const changeIsDoneActionCreator = (todolistId: string, taskId: string, isDone: boolean): ChangeIsDoneType => {
    return {type: 'CHANGE_IS_DONE', todolistId, taskId, isDone}
}