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
    const header = useSpring({from: {opacity: 0}, to: {opacity: 1}, config: {duration: 1000}})
    const input = useSpring({from: {opacity: 0}, to: {opacity: 1}, config: {duration: 700}})
    const checkbox = useSpring({from: {opacity: 0}, to: {opacity: 1}, config: {duration: 800}})
    const buttons = useSpring({from: {opacity: 0}, to: {opacity: 1}, config: {duration: 900}})
    const [state, toggle] = useState(true)
    const {x} = useSpring({
        from: {x: 0},
        x: state ? 1 : 0,
        config: {duration: 1000},
    })

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
        setIsActive(false)
        setIsCompleted(false)
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
                <animated.div onClick={() => toggle(!state)} style={{
                    scale: x.to({
                        range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
                        output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],
                    }),
                }}>
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