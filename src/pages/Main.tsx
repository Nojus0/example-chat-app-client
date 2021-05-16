import React from 'react'
import { useHistory } from 'react-router-dom'
import { alignCenter} from "../styles/_Main.module.scss"
import { button, center } from "../styles/_Primitives.module.scss"

function Main() {
    const history = useHistory();
    return (
        <div className={center}>
            <h1 className={alignCenter}>Example Chat App</h1>
            <button onClick={() => history.push("/login")} className={button}>Log In</button>
        </div>
    )
}

export default Main
