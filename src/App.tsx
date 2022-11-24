import React from 'react';
import {useState} from 'react';
import './App.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import {useSpring, animated} from 'react-spring'

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
    const header = useSpring({vector: [0, 10, 30], to: {opacity: 1}, from: {opacity: 0}, config: {duration: 600}})
    const input = useSpring({to: {opacity: 1}, from: {opacity: 0}, config: {duration: 700}})
    const checkbox = useSpring({to: {opacity: 1}, from: {opacity: 0}, config: {duration: 800}})
    const buttons = useSpring({to: {opacity: 1}, from: {opacity: 0}, config: {duration: 900}})

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
        setIsActive(false)
    }

    const showActive = () => {
        setIsActive(true)
        setIsCompleted(false)
    }

    const showAll = () => {
        setIsCompleted(false)
        setIsActive(false)
    }

    const tasks = stateTasks.map((item, index) => {
        if (isCompleted) {
            if (item.checked) {
                return <li key={index}><Checkbox size="small" onChange={() => changeCheckbox(index)}
                                                 checked={item.checked}/>
                    <span>{item.task}</span></li>
            }
        } else if (isActive) {
            if (!item.checked) {
                return <li key={index}><Checkbox size="small" onChange={() => changeCheckbox(index)}
                                                 checked={item.checked}/>
                    <span>{item.task}</span></li>
            }
        } else {
            return <li key={index}><Checkbox size="small" onChange={() => changeCheckbox(index)}
                                             checked={item.checked}/>
                <span>{item.task}</span></li>
        }
    })

    return (
        <div className="App">
            <div className="box">
                <animated.div style={header}>
                    <Typography color={"primary"} variant="h5" gutterBottom>
                        What to learn
                    </Typography>
                </animated.div>
                <animated.div style={input}>
                    <TextField color={"primary"} size='small' value={valueInput}
                               onChange={(event) => setValueInput(event.target.value)}
                               id="outlined-basic" label="Write task" variant="outlined"/>
                    <Button onClick={addTask}>Add</Button>
                </animated.div>
                <animated.ul style={checkbox}>
                    {tasks}
                </animated.ul>
                <animated.div style={buttons}>
                    <Button onClick={showAll}>All</Button>
                    <Button onClick={showActive}>Active</Button>
                    <Button onClick={showCompleted}>Completed</Button>
                </animated.div>
            </div>
        </div>
    );
}

export default App;