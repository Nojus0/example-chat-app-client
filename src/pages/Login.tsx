import React, { useState } from 'react'
import { center, button, textbox } from "../styles/_Primitives.module.scss"
import { widthClamp30, widthClamp10 } from "../styles/_Login.module.scss";
import { IResponse } from '../interfaces/IReponse';
import axios from "axios"
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router';
import LoadingBar from '../Components/LoadingBar';
import { widthClamp20 } from "../styles/_Login.module.scss";

function Login() {

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");
    const [showError, setError] = useState("");

    const [loading, setLoading] = useState("");
    const [cookies, setCookies] = useCookies();
    const history = useHistory();

    if (cookies.auth != null) history.push("/messages");

    async function LogIn() {
        let GOT_RESPONSE = false;

        if (password.length < 3 || username.length < 3) return setError("Invalid credentials");
        setError("");
        setLoading("Connecting");

        setTimeout(() => {
            if (!GOT_RESPONSE)
                setLoading("Starting server");
        }, 1500);

        const response = await axios({
            url: `${process.env.SERVER_URL}/api/login?username=${username}&password=${password}`,
            method: "GET",
        });

        GOT_RESPONSE = true;
        const body: IResponse = response.data;

        if (!body.success) {
            setLoading("");

            return setError("Invalid credentials")
        };

        if (body.success) {
            setLoading("");
            setError("");
            setCookies("auth", body.token, {
                maxAge: 30 * 86400
            });
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
                showError !== "" && <LoadingBar classes={`${widthClamp20}`} color={"#ff1944"} showSpinner={false} text={showError} />
            }
            {
                loading !== "" && <LoadingBar classes={`${widthClamp20}`} text={loading} />
            }
        </div>
    )
}

export default Login