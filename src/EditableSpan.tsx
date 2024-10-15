import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string) => void
}

export const EditableSpan = ({title, changeTitle}: EditableSpanPropsType) => {
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
            ? <input value={itemTitle} onBlur={offEditMode} onChange={changeItemTitleHandler} autoFocus/>
            :<span  onDoubleClick={onEditMode}>{title}</span>
    );
};
