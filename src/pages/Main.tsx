import { useNavigate } from 'react-router-dom'
import { alignCenter} from "../styles/_Main.module.scss"
import { button, center } from "../styles/_Primitives.module.scss"

function Main() {
    const navigate = useNavigate();
    return (
        <div className={center}>
            <h1 className={alignCenter}>Example Chat App</h1>
            <button onClick={() => navigate("/login")} className={button}>Log In</button>
        </div>
    )
}

export default Main
