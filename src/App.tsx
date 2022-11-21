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
    const tasks = stateTasks.map((item, index) => {
        return <li key={index}><input onChange={() => changeCheckbox(index)} type="checkbox" checked={item.checked}/>
            <span>{item.task}</span></li>
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
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
        </div>
    );
}

export default App;
