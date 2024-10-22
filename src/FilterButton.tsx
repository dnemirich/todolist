import { Button } from "@mui/material"
import { FilterValuesType } from "./App"

type FilterValuesPropsType = {
    title: string
    filter: FilterValuesType
    activeFilterValue: FilterValuesType
    onClickHandler: () => void
}


export const FilterButton = ({ title, filter, activeFilterValue, onClickHandler }: FilterValuesPropsType) => {
    const color = filter === activeFilterValue ? "secondary" : "primary";

    return (
        <Button
            color={color}
            size="small"
            variant="contained"
            onClick={onClickHandler}>{title}</Button>
    )
}