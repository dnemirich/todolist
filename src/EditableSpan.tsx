import { TextField } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';

type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string) => void
}

export const EditableSpan = ({ title, changeTitle }: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false);

    const [itemTitle, setItemTitle] = useState(title);

    const onEditMode = () => setEditMode(true)

    const offEditMode = () => {
        changeTitle(itemTitle);
        setEditMode(false);
    }


    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(event.currentTarget.value)
    }

    return (
        editMode
            ? <TextField size='small'
                variant="standard"
                value={itemTitle}
                onBlur={offEditMode}
                onChange={changeItemTitleHandler}
                autoFocus />
            // <input value={itemTitle} onBlur={offEditMode} onChange={changeItemTitleHandler} autoFocus/>
            : <span onDoubleClick={onEditMode}>{title}</span>
    );
};
