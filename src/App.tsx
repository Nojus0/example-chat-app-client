import { useCookies } from "react-cookie";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Messages from "./pages/Messages";

function App() {
  const [cookies] = useCookies();

  return (
    <Router>
      <Routes>
        <Route path="/messages" element={<Messages />} />

        <Route
          path="/login"
          element={cookies.auth == null ? <Login /> : <Messages />}
        />

        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
