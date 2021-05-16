import React from "react"
import ReactDOM from "react-dom"
import App from "./src/App"
import { config } from "dotenv"
config();
ReactDOM.render(<App />, document.getElementById("root"));