import {IconButton, Typography} from "@mui/material";
import {EditableSpan} from "../../../../../../common/components/EditableSpan/EditableSpan";
import {DeleteRounded} from "@mui/icons-material";
import {changeTodolistTitleAC, removeTodolistAC, type TodolistType} from "../../../../model/todolists-reducer";
import {useAppDispatch} from "../../../../../../app/hooks";


type Props = {
    todolist: TodolistType
}

export const TodolistTitle = ({todolist}: Props) => {
    const dispatch = useAppDispatch();

    const removeTodolist = () => {
        dispatch(removeTodolistAC(todolist.id));
    }

    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleAC({title, todolistId: todolist.id}))
    }

    return (
        <div>
            <Typography variant="h6" align="center">
                <EditableSpan title={todolist.title} changeTitle={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}><DeleteRounded/></IconButton>
            </Typography>
        </div>
    );
};
