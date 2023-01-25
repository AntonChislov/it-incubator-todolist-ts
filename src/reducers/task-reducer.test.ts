import {v1} from 'uuid';
import {
    addTaskActionCreator,
    changeIsDoneActionCreator,
    changeTaskActionCreator,
    deleteTaskActionCreator,
    taskReducer
} from './task-reducer';

test('add task', () => {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const tasks = {
        [todolistId1]: [
            {id: v1(), isDone: true, title: 'eat'},
            {id: v1(), isDone: true, title: 'sleep'},
        ],
        [todolistId2]: [
            {id: v1(), isDone: false, title: '123'},
            {id: v1(), isDone: false, title: '456'},
        ]
    }

    const action = addTaskActionCreator(todolistId1, 'eat', false)

    const newTasks = taskReducer(tasks, action)

    expect(newTasks[todolistId1].length).toBe(3)
    expect(newTasks[todolistId1][2].title).toBe('eat')
    expect(newTasks[todolistId1][2].isDone).toBe(false)
})

test('delete task', () => {

    const todolistId1 = v1()
    const todolistId2 = v1()
    const taskId1 = v1()
    const taskId2 = v1()
    const taskId3= v1()
    const taskId4 = v1()

    const tasks = {
        [todolistId1]: [
            {id: taskId1, isDone: false, title: 'eat'},
            {id: taskId2, isDone: true, title: 'sleep'},
        ],
        [todolistId2]: [
            {id: taskId3, isDone: false, title: '123'},
            {id: taskId4, isDone: false, title: '456'},
        ]
    }

    const action = deleteTaskActionCreator(todolistId1, taskId1)

    const newTasks = taskReducer(tasks, action)

    expect(newTasks[todolistId1].length).toBe(1)
    expect(newTasks[todolistId1][0].isDone).toBe(true)
    expect(newTasks[todolistId1][0].title).toBe('sleep')
})

test('change title task', () => {

    const todolistId1 = v1()
    const todolistId2 = v1()
    const taskId1 = v1()
    const taskId2 = v1()
    const taskId3= v1()
    const taskId4 = v1()

    const tasks = {
        [todolistId1]: [
            {id: taskId1, isDone: false, title: 'eat'},
            {id: taskId2, isDone: true, title: 'sleep'},
        ],
        [todolistId2]: [
            {id: taskId3, isDone: false, title: '123'},
            {id: taskId4, isDone: false, title: '456'},
        ]
    }

    const action = changeTaskActionCreator(todolistId1, taskId1, 'жрат')

    const newTasks = taskReducer(tasks, action)

    expect(newTasks[todolistId1].length).toBe(2)
    expect(newTasks[todolistId1][0].isDone).toBe(false)
    expect(newTasks[todolistId1][0].title).toBe('жрат')
})

test('change isDone task', () => {

    const todolistId1 = v1()
    const todolistId2 = v1()
    const taskId1 = v1()
    const taskId2 = v1()
    const taskId3= v1()
    const taskId4 = v1()

    const tasks = {
        [todolistId1]: [
            {id: taskId1, isDone: false, title: 'eat'},
            {id: taskId2, isDone: true, title: 'sleep'},
        ],
        [todolistId2]: [
            {id: taskId3, isDone: false, title: '123'},
            {id: taskId4, isDone: false, title: '456'},
        ]
    }

    const action = changeIsDoneActionCreator(todolistId2, taskId4, true)

    const newTasks = taskReducer(tasks, action)

    expect(newTasks[todolistId2].length).toBe(2)
    expect(newTasks[todolistId2][1].isDone).toBe(true)
    expect(newTasks[todolistId2][1].title).toBe('456')
})