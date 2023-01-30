import {TodolistType} from '../App';
import {v1} from 'uuid';
import {
    actionCreateAddTodolist, actionCreateChangeTodolist,
    actionCreateRemoveTodolist,
    actionCreateSetFilter,
    todolistReducer
} from './todolist-reducer';

test('length todolist shoold be changed', () => {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const todolists: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}]

    const action = actionCreateRemoveTodolist(todolistId1)

    const newTodolists = todolistReducer(todolists, action)

    expect(newTodolists.length).toBe(1)
    expect(newTodolists[0]).toEqual({id: todolistId2, title: 'What to buy', filter: 'all'})
})

test('add todolist', () => {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const todolists: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}]

    const action = actionCreateAddTodolist('What to break', todolistId1)

    const newTodolists = todolistReducer(todolists, action)

    expect(newTodolists.length).toBe(3)
    expect(newTodolists[2].filter).toBe('all')
    expect(newTodolists[2].title).toBe('What to break')
})

test('set filter', () => {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const todolists: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}]

    const action = actionCreateSetFilter(todolistId1, 'completed')

    const newTodolists = todolistReducer(todolists, action)

    expect(newTodolists[0].filter).toBe('completed')
})

test('changeTodolist', () => {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const todolists: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}]

    const action = actionCreateChangeTodolist(todolistId2, 'What to break')

    const newTodolists = todolistReducer(todolists, action)

    expect(newTodolists[1].title).toBe('What to break')
})
