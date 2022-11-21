import React from 'react';
import {useState} from 'react';
import './App.css';


function App() {
    const [stateTasks, setStateTasks] = useState([
        {
            id: 1,
            task: 'HTML&CSS',
            checked: true,
        },
        {
            id: 2,
            task: 'JS',
            checked: true,
        },
        {
            id: 3,
            task: 'React',
            checked: false,
        },
    ])
    const [valueInput, setValueInput] = useState('')
    const [valueId, setValueId] = useState(3)
    const [isCompleted, setIsCompleted] = useState(false)
    const [isActive, setIsActive] = useState(false)

    const addTask = () => {
        if (valueInput) {
            setValueId(valueId + 1)
            setStateTasks([...stateTasks, {
                id: valueId,
                task: valueInput,
                checked: false,
            }])
        }
        setValueInput('')
    }

    const changeCheckbox = (index: number) => {
        if (stateTasks[index].checked) {
            const res = [
                ...stateTasks.slice(0, index),
                {...stateTasks[index], checked: false},
                ...stateTasks.slice(index + 1)
            ]
            setStateTasks(res)
        } else {
            const res = [
                ...stateTasks.slice(0, index),
                {...stateTasks[index], checked: true},
                ...stateTasks.slice(index + 1)
            ]
            setStateTasks(res)
        }
    }

    const showCompleted = () => {
        setIsCompleted(true)
    }

    const showActive = () => {
        setIsActive(true)
    }

    const showAll = () => {
        setIsCompleted(false)
        setIsActive(false)
    }

    const tasks = stateTasks.map((item, index) => {
        if (isCompleted) {
            if (item.checked) {
                return <li key={index}><input onChange={() => changeCheckbox(index)} type="checkbox"
                                              checked={item.checked}/>
                    <span>{item.task}</span></li>
            }
        } else if (isActive) {
            if (!item.checked) {
                return <li key={index}><input onChange={() => changeCheckbox(index)} type="checkbox"
                                              checked={item.checked}/>
                    <span>{item.task}</span></li>
            }
        } else {
            return <li key={index}><input onChange={() => changeCheckbox(index)} type="checkbox"
                                          checked={item.checked}/>
                <span>{item.task}</span></li>
        }
    })

    return (
        <div className="App">
            <div>
                <h3>What to learn</h3>
                <div>
                    <input value={valueInput} onChange={(event) => setValueInput(event.target.value)}/>
                    <button onClick={addTask}>+</button>
                </div>
                <ul>
                    {tasks}
                </ul>
                <div>
                    <button onClick={showAll}>All</button>
                    <button onClick={showActive}>Active</button>
                    <button onClick={showCompleted}>Completed</button>
                </div>
            </div>
        </div>
    );
}

export default App;
