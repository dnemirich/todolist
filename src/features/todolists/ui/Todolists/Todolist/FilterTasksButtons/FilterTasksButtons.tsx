import React from 'react';
import {filterButtonsContainerSx} from "./FilterTasksButton.styles";
import {FilterButton} from "./FilterButton/FilterButton";
import {Box} from "@mui/material";
import {changeTodolistFilterAC, type FilterValuesType, type TodolistType} from "../../../../model/todolists-reducer";
import {useAppDispatch} from "../../../../../../app/hooks";

type Props = {
    todolist: TodolistType
}


export const FilterTasksButtons = ({todolist}: Props) => {

    const dispatch = useAppDispatch();

    const changeFilterTasksHandler = (newFilter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC({newFilter, todolistId: todolist.id}));
    }

    return (
        <Box sx={filterButtonsContainerSx}>
            <FilterButton title="all" filter={todolist.filter} activeFilterValue="all" onClickHandler={() => changeFilterTasksHandler("all")} />
            <FilterButton title="active" filter={todolist.filter} activeFilterValue="active" onClickHandler={() => changeFilterTasksHandler("active")} />
            <FilterButton title="completed" filter={todolist.filter} activeFilterValue="completed" onClickHandler={() => changeFilterTasksHandler("completed")} />
        </Box>
    );
};
