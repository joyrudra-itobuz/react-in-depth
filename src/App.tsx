import { BrowserRouter, Route, Routes } from "react-router-dom";
import Entry from "./pages/Entry/Entry";
import Filter from "./pages/Filter/Filter";
import "./App.scss";
import AdvancedSearch from "./pages/AdvancedSearch/AdvancedSearch";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Entry />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/advanced-search" element={<AdvancedSearch />} />
      </Routes>
    </BrowserRouter>
  );
}
