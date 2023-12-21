import { BrowserRouter, Route, Routes } from "react-router-dom";
import Entry from "./pages/Entry/Entry";
import Filter from "./pages/Filter/Filter";
import "./App.scss";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Entry />} />
        <Route path="/filter" element={<Filter />} />
      </Routes>
    </BrowserRouter>
  );
}
