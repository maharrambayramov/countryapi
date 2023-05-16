import { Route, Routes } from "react-router-dom";
import "./App.css";
import Countrycard from "./pages/Countrycard";
import CardDetails from "./pages/CardDetails";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Countrycard />}></Route>
        <Route path="/:capital" element={<CardDetails />}></Route>
      </Routes>
    </div>
  );
}

export default App;
