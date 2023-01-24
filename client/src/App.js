import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Chats from "./Components/Chats";
import Signup from "./Components/Signup";

function App() {
  return (
    <>
    <Routes>
<Route exact path="/" element={<Home />} />
<Route exact path="/signup" element={<Signup />} />
<Route exact path="/chats" element={<Chats />} />
</Routes>
</>
  );
}

export default App;
