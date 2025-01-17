import { Button } from "@mui/material"
import type { FilterValues } from "../../../../../lib/types/types"

type Props = {
  title: string
  filter: FilterValues
  activeFilterValue: FilterValues
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
