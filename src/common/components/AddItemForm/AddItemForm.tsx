import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import { IconButton, TextField } from "@mui/material"
import { AddBox } from "@mui/icons-material"

type Props = {
  addItem: (title: string) => void
}

export const AddItemForm = ({ addItem }: Props) => {
  const [itemTitle, setItemTitle] = useState<string>("")
  const [error, setError] = useState<string | null>(null)

  const addItemHandler = () => {
    if (itemTitle.trim() !== "") {
      addItem(itemTitle.trim())
      setItemTitle("")
    } else {
      setError("Title is required")
    }
  }

  const onChangeItemHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setItemTitle(e.currentTarget.value)
  }

  const addItemOnKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.key === "Enter") {
      addItemHandler()
    }
  }

  const isTitleLengthValid = itemTitle.length < 15

  return (
    <div>
      <TextField
        size="small"
        label="Title is required"
        variant="outlined"
        value={itemTitle}
        onChange={onChangeItemHandler}
        onKeyUp={addItemOnKeyUp}
        error={!!error}
        helperText={error}
      />
      {/* <input
                value={itemTitle}
                onChange={onChangeItemHandler}
                placeholder={"Title is required"}
                onKeyUp={addItemOnKeyUp}
                className={error ? "error" : ""}
            /> */}
      <IconButton onClick={addItemHandler} disabled={!isTitleLengthValid}>
        <AddBox></AddBox>
      </IconButton>
      {/* <Button
                title={"+"}
                onClickHandler={addItemHandler}
                isDisabled={!isTitleLengthValid}
            /> */}
      {/* {error && <div className={"error-message"}>Title is required</div>} */}
    </div>
  )
}
