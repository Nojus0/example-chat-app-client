import React from 'react'
import { inputBar } from "../styles/_InputBar.module.scss";

interface IInputBarProps {
    setValue: React.Dispatch<React.SetStateAction<string>>,
    keyUp: (e: React.KeyboardEvent<HTMLInputElement>) => void
    val: string

}

function InputBar({ setValue, keyUp, val }: IInputBarProps) {
    return (
        <div className={inputBar}>
            <input value={val} onKeyUp={keyUp} onChange={e => setValue(e.target.value)} placeholder="Žinutė" />
        </div>
    )
}

export default InputBar
