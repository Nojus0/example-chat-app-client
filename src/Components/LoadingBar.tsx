import React from 'react'
import { background, loader } from "../styles/_LoadingBar.module.scss";

export interface ILoadingBarProps {
    text: string,
    showSpinner?: boolean,
    color?: string,
    classes?: string
}


function LoadingBar({ text, color, showSpinner = true, classes }: ILoadingBarProps) {
    return (
        <div style={{ background: color }} className={`${classes} ${background}`}>
            {showSpinner && <Spinner />}
            <h1>{text}</h1>
        </div>
    )
}

function Spinner() {
    return (
        <div className={loader}>
            Loading
        </div>
    )
}

export default LoadingBar
