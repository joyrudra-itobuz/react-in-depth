import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Entry from './pages/Entry/Entry';
import Filter from './pages/Filter/Filter';
import './App.scss';
import AdvancedSearch from './pages/AdvancedSearch/AdvancedSearch';
import ItemPage from './pages/ItemPage/ItemPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Entry />} />
        <Route path='/filter' element={<Filter />} />
        <Route path='/advanced-search' element={<AdvancedSearch />} />
        <Route path='/item/:id' element={<ItemPage />} />
      </Routes>
    </BrowserRouter>
  );
}
