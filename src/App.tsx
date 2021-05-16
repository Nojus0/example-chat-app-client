import React from 'react'
import { useCookies } from 'react-cookie'
import { BrowserRouter as Router, Switch, Route, useHistory, Redirect } from "react-router-dom"
import Login from './pages/Login'
import Main from './pages/Main'
import Messages from './pages/Messages'
function App() {
    const [cookies] = useCookies();

    return (
        <Router>
            <Switch>

                <Route path="/messages" component={Messages} />

                <Route path="/login" component={cookies.auth == null ? Login : Messages} />

                <Route path="/" component={Main} />

            </Switch>
        </Router>
    )
}


export default App
