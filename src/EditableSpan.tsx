import React, {ChangeEvent, FC, useState} from "react";

type EditableSpanProps = {
    title: string
    callback: (value: string) => void
}

export const EditableSpan: FC<EditableSpanProps> = ({title, callback}) => {

    const [editMode, setEditMode] = useState(false)
    const [titleValue, setTitle] = useState(title)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onBlurHandler = () => {
        callback(titleValue)
        setEditMode(false)
    }

    return <>
        {editMode
            ? <input autoFocus onChange={onChangeHandler} value={titleValue} onBlur={onBlurHandler}/>
            : <span onDoubleClick={() => setEditMode(true)}>{title}</span>
        }
    </>
}