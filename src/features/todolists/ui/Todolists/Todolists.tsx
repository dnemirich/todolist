import React from 'react';
import {Todolist} from "./Todolist/Todolist";
import {Grid2} from "@mui/material";
import {useAppSelector} from "../../../../app/hooks";
import {selectTodolists} from "../../model/todolists-selectors";


export const Todolists = () => {
    const todolists = useAppSelector(selectTodolists)

    return (
        <>
            {
                todolists.map(tl => {
                    return (
                        <Grid2 key={tl.id}>
                        <Todolist
                            todolist={tl}
                        />
                        </Grid2>
                    )
                })
            }
        </>
    );
};
