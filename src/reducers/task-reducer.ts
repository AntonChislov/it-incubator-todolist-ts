import {TasksType} from '../App';
import {v1} from 'uuid';

type ArrayTasksType = {
    [key: string]: Array<TasksType>
}

type AddTaskType = {
    type: 'ADD_TASK'
    todolistId: string
    title: string
    isDone: boolean
}

type AddTaskForTodolistType = {
    type: 'ADD_TASK_FOR_TODOLIST'
    todolistId: string
}

type DeleteTaskType = {
    type: 'DELETE_TASK'
    todolistId: string
    taskId: string
}

type DeleteAllTaskType = {
    type: 'DELETE_ALL_TASK'
    todolistId: string
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

type ActionsType = AddTaskType | DeleteTaskType | ChangeTaskType | ChangeIsDoneType | DeleteAllTaskType | AddTaskForTodolistType

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
        case 'ADD_TASK_FOR_TODOLIST': {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case 'DELETE_TASK': {
            console.log(state)
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        }
        case 'DELETE_ALL_TASK': {
            const stateCopy = {...state}
            delete stateCopy[action.todolistId]
            return stateCopy
        }
        case 'CHANGE_TASK': {
            const task = state[action.todolistId].find(t => t.id === action.taskId)
            if (task && action.title !== '') task.title = action.title
            return {...state}
        }
        case 'CHANGE_IS_DONE': {
            const stateCopy = {...state}
            const task = stateCopy[action.todolistId].find(t => t.id === action.taskId)
            if (task) task.isDone = action.isDone
            return stateCopy
        }
        default:
            throw new Error('not found type')
    }
}

export const addTaskActionCreator = (todolistId: string, title: string, isDone: boolean): AddTaskType => {
    return {type: 'ADD_TASK', todolistId, title, isDone}
}

export const addTaskForTodolistActionCreator = (todolistId: string): AddTaskForTodolistType => {
    return {type: 'ADD_TASK_FOR_TODOLIST', todolistId}
}

export const deleteTaskActionCreator = (todolistId: string, taskId: string): DeleteTaskType => {
    return {type: 'DELETE_TASK', todolistId, taskId}
}

export const deleteAllTaskActionCreator = (todolistId: string): DeleteAllTaskType => {
    return {type: 'DELETE_ALL_TASK', todolistId}
}

export const changeTaskActionCreator = (todolistId: string, taskId: string, title: string): ChangeTaskType => {
    return {type: 'CHANGE_TASK', todolistId, taskId, title}
}

export const changeIsDoneActionCreator = (todolistId: string, taskId: string, isDone: boolean): ChangeIsDoneType => {
    return {type: 'CHANGE_IS_DONE', todolistId, taskId, isDone}
}