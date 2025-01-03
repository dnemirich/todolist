import s from "./Page404.module.css"
import { Link } from "react-router"
import { Button, Stack } from "@mui/material"
import { Path } from "common/routing/Routing"

export const Page404 = () => {
  return (
    <Stack gap={2}>
      <h1 className={s.title}>404</h1>
      <h2 className={s.subTitle}>page not found</h2>
      <Button component={Link} to={Path.Main} variant="contained" color="secondary" className={s.button}>
        To the main page
      </Button>
    </Stack>
  )
}
