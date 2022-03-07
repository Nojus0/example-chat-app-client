import { useState } from "react";
import { center, button, textbox } from "../styles/_Primitives.module.scss";
import { widthClamp30, widthClamp10 } from "../styles/_Login.module.scss";
import { IResponse } from "../interfaces/IReponse";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import LoadingBar from "../Components/LoadingBar";
import { widthClamp20 } from "../styles/_Login.module.scss";

function Login() {
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");
  const [showError, setError] = useState("");

  const [loading, setLoading] = useState("");
  const [cookies, setCookies] = useCookies();
  const navigate = useNavigate();
  if (cookies.auth != null) navigate("/messages");

  async function LogIn() {
    let GOT_RESPONSE = false;

    if (password.length < 3 || username.length < 3)
      return setError("Invalid credentials");
    setError("");
    setLoading("Connecting");

    setTimeout(() => {
      if (!GOT_RESPONSE) setLoading("Starting server");
    }, 1500);

    const response = await axios({
      url: `${
        import.meta.env.VITE_SERVER_URL
      }/api/login?username=${username}&password=${password}`,
      method: "GET",
    });

    GOT_RESPONSE = true;
    const body: IResponse = response.data;

    if (!body.success) {
      setLoading("");

      return setError("Invalid credentials");
    }

    if (body.success) {
      setLoading("");
      setError("");
      setCookies("auth", body.token, {
        maxAge: 30 * 86400,
      });
      navigate("/messages");
    }
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} className={center}>
      <h1>Log In</h1>
      <input
        className={`${textbox} ${widthClamp30}`}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      ></input>
      <input
        type="password"
        className={`${textbox} ${widthClamp30}`}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      ></input>

      <button onClick={LogIn} className={`${button} ${widthClamp10}`}>
        Log In
      </button>
      {showError !== "" && (
        <LoadingBar
          classes={`${widthClamp20}`}
          color={"#ff1944"}
          showSpinner={false}
          text={showError}
        />
      )}
      {loading !== "" && (
        <LoadingBar classes={`${widthClamp20}`} text={loading} />
      )}
    </form>
  );
}

export default Login;
