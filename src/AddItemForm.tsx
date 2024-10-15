import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "./Button";

type AddItemFormProps = {
    addItem: (title: string) => void
}


export const AddItemForm = ({addItem}: AddItemFormProps) => {
    const [taskTitle, setTaskTitle] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const addTaskHandler = () => {
        if (taskTitle.trim() !== "") {
            addItem(taskTitle.trim(), props.todolistId);
            setTaskTitle("");

        } else {
            setError("Title is required")
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }

    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === "Enter") {
            addTaskHandler();
        }
    }

    const isTitleLengthValid = taskTitle.length < 15;

    return (
        <div>
            <input
                value={taskTitle}
                onChange={onChangeHandler}
                placeholder={"Title is required"}
                onKeyUp={onKeyUpHandler}
                className={error ? "error" : ""}
            />
            <Button
                title={"+"}
                onClickHandler={addTaskHandler}
                isDisabled={!isTitleLengthValid}
            />
            {error && <div className={"error-message"}>Title is required</div>}
        </div>
    );
};
