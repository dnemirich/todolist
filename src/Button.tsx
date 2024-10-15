import {ButtonHTMLAttributes} from "react";

type ButtonPropsType =  ButtonHTMLAttributes<HTMLButtonElement> & {
    title: string
    onClickHandler: () => void
    isDisabled?: boolean
}




export const Button = (props: ButtonPropsType) => {
    return (
        <button className={props.className} onClick={props.onClickHandler} disabled={props.isDisabled}>{props.title}</button>
    )
}