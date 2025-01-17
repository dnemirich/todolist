import React from "react"
import { filterButtonsContainerSx } from "./FilterTasksButton.styles"
import { FilterButton } from "./FilterButton/FilterButton"
import { Box } from "@mui/material"
import { useAppDispatch } from "../../../../../../app/hooks"
import { todolistApi } from "../../../../api/todolistsApi"
import type { DomainTodolist, FilterValues } from "../../../../lib/types/types"

type Props = {
  todolist: DomainTodolist
}

export const FilterTasksButtons = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  const changeFilterTasksHandler = (newFilter: FilterValues) => {
    dispatch(
      //частично меняем закешированные данные в стейте. запрос при этом не идет.
      todolistApi.util.updateQueryData("getTodolists", undefined, (todolists) => {
        const todo = todolists.find((tl) => tl.id === todolist.id)
        if (todo) {
          todo.filter = newFilter
        }
      }),
    )
  }

  return (
    <Box sx={filterButtonsContainerSx}>
      <FilterButton
        title="all"
        filter={todolist.filter}
        activeFilterValue="all"
        onClickHandler={() => changeFilterTasksHandler("all")}
      />
      <FilterButton
        title="active"
        filter={todolist.filter}
        activeFilterValue="active"
        onClickHandler={() => changeFilterTasksHandler("active")}
      />
      <FilterButton
        title="completed"
        filter={todolist.filter}
        activeFilterValue="completed"
        onClickHandler={() => changeFilterTasksHandler("completed")}
      />
    </Box>
  )
}
