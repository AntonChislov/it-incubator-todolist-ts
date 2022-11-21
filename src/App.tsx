import React from 'react';
import {useState} from 'react';
import './App.css';


function App() {
    const [stateTasks, setStateTasks] = useState([
        {
            id: 1,
            show: false,
            task: 'HTML&CSS',
            checked: true,
        },
        {
            id: 2,
            show: false,
            task: 'JS',
            checked: true,
        },
        {
            id: 3,
            show: false,
            task: 'React',
            checked: false,
        },
    ])

    const changeCheked = () => {

    }

    const tasks = stateTasks.map((item, index) => {
        return <li><input onChange={changeCheked} key={index} type="checkbox" checked={item.checked}/> <span>{item.task}</span></li>
    })

    return (
        <div className="App">
            <div>
                <h3>What to learn</h3>
                <div>
                    <input/>
                    <button>+</button>
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
