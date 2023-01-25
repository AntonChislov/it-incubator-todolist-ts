import {FilterValueType, TodolistType} from '../App';
import {v1} from 'uuid';

type RemoveTodolistType = {
    type: 'REMOVE_TODOLIST'
    todolistId: string
}
type AddTodolistType = {
    type: 'ADD_TODOLIST'
    title: string
}
type SetFilterType = {
    type: 'SET_FILTER'
    todolistId: string
    filter: FilterValueType
}
type ChangeTodolistTitle = {
    type: 'CHANGE_TODOLIST_TITLE'
    todolistId: string
    title: string
}

type ActionsType = RemoveTodolistType | AddTodolistType | SetFilterType | ChangeTodolistTitle

export const todolistReducer = (state: Array<TodolistType>, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE_TODOLIST': {
            return state.filter(t => t.id != action.todolistId)
        }
        case 'ADD_TODOLIST': {
            const todolistId = v1()
            return [
                ...state,
                {id: todolistId, title: action.title, filter: 'all'}
            ]
        }
        case 'SET_FILTER': {
            const todolist = state.find(t => t.id === action.todolistId)
            if (todolist) todolist.filter = action.filter
            return [...state]
        }
        case 'CHANGE_TODOLIST_TITLE': {
            const todolist = state.find(t => t.id === action.todolistId)
            if (todolist) todolist.title = action.title
            return [...state]
        }
        default:
            throw new Error('not found type')
    }
}

export const actionCreateRemoveTodolist = (id: string): RemoveTodolistType => {
    return {type: 'REMOVE_TODOLIST', todolistId: id}
}

export const actionCreateAddTodolist = (title: string): AddTodolistType => {
    return {type: 'ADD_TODOLIST', title}
}

export const actionCreateSetFilter = (todolistId: string, filter: FilterValueType): SetFilterType => {
    return {type: 'SET_FILTER', todolistId, filter}
}

export const actionCreateChangeTodolist = (todolistId: string, title: string): ChangeTodolistTitle => {
    return {type: 'CHANGE_TODOLIST_TITLE', todolistId, title}
}