import React, { useState } from 'react'
import { center, button, textbox } from "../styles/_Primitives.module.scss"
import { widthClamp30, widthClamp10 } from "../styles/_Login.module.scss";
import { IResponse } from '../interfaces/IReponse';
import axios from "axios"
import InfoModal from '../Components/InfoModal';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showError, setError] = useState("");

    const [cookies, setCookies] = useCookies();
    const history = useHistory();

    if(cookies.auth != null) history.push("/messages");

    async function LogIn() {
        if (password.length < 3 || username.length < 3) return setError("Invalid credentials");

        const response = await axios({
            url: `${process.env.SERVER_URL}:4000/api/login?username=${username}&password=${password}`,
            method: "GET",
        });

        const body: IResponse = response.data;
        if (!body.success) return setError("Invalid credentials");

        if (body.success) {
            setCookies("auth", body.token);
            history.push("/messages");
        }
    }

    return (
        <div className={center}>
            <h1>Log In</h1>
            <input className={`${textbox} ${widthClamp30}`} onChange={e => setUsername(e.target.value)} placeholder="Username"></input>
            <input type="password" className={`${textbox} ${widthClamp30}`} onChange={e => setPassword(e.target.value)} placeholder="Password"></input>
            <button onClick={LogIn} className={`${button} ${widthClamp10}`}>Log In</button>
            {
                showError !== "" && <InfoModal text={showError} />
            }
        </div>
    )
}

export default Login