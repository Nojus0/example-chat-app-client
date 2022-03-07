import React from "react";
import { inputBar } from "../styles/_InputBar.module.scss";
import LoadingBar from "./LoadingBar";

interface IInputBarProps {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  keyUp: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  val: string;
  children?: React.ReactNode;
}

function InputBar({ setValue, keyUp, val, children }: IInputBarProps) {
  return (
    <div className={inputBar}>
      {children}
      <input
        value={val}
        onKeyUp={keyUp}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Message"
      />
    </div>
  );
}

export default InputBar;
