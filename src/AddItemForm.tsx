import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";

type AddItemProps = {
    addItem: (taskText: string) => void
}

export const AddItemForm: FC<AddItemProps> = ({addItem}) => {

    const [taskText, setTaskText] = useState('')

    const [error, setError] = useState<string | null>(null)

    const onChangeInputText = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskText(event.target.value)
    }

    const onKeyPressEnter = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.code) setError(null)
        if (event.code === 'Enter') {
            addItem(taskText)
            setTaskText('')
        }
    }

    const onClickAddTask = () => {
        addItem(taskText)
        setTaskText('')
    }

    return <div>
        <input className={error ? 'error' : ''} onChange={onChangeInputText} value={taskText}
               onKeyPress={onKeyPressEnter}/>
        <button onClick={onClickAddTask}>+</button>
        {error && <div className={'error-message'}>Field is required</div>}
    </div>
}
