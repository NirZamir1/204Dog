import "./styles/App.css";
import Nav from "./Components/Nav";
import HomePage from "./Components/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./Components/About";
import Scoreboard from "./Components/Scoreboard";

function App() {
  return (
    <div className="AppContainer">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="*"
            element={<div className="notFound">404 Not Found</div>}
          />
          <Route path="/scoreboard" element={<Scoreboard />}></Route>
          <Route path="/about" element={<About></About>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
