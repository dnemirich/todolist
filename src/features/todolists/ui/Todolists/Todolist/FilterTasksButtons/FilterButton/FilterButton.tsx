import { Button } from "@mui/material"
import type { FilterValuesType } from "../../../../../model/todolistsSlice"

type Props = {
  title: string
  filter: FilterValuesType
  activeFilterValue: FilterValuesType
  onClickHandler: () => void
}

export const FilterButton = ({ title, filter, activeFilterValue, onClickHandler }: Props) => {
  const color = filter === activeFilterValue ? "secondary" : "primary"

  return (
    <Button color={color} size="small" variant="contained" onClick={onClickHandler}>
      {title}
    </Button>
  )
}
