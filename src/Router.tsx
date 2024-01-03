import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AdvancedSearchProvider } from './context/AdvancedSearch/SearchContext';
import Filter from './pages/Filter/Filter';
import AdvancedSearch from './pages/AdvancedSearch/AdvancedSearch';
import ItemPage from './pages/ItemPage/ItemPage';
import Layout from './Layout';
import SignIn from './pages/SignIn/SignIn';

export default function Router() {
  return (
    <BrowserRouter>
      <AdvancedSearchProvider>
        <Layout>
          <Routes>
            <Route path='/' element={<SignIn />} />
            <Route path='/filter' element={<Filter />} />
            <Route path='/advanced-search' element={<AdvancedSearch />} />
            <Route path='/item/:id' element={<ItemPage />} />
          </Routes>
        </Layout>
      </AdvancedSearchProvider>
    </BrowserRouter>
  );
}
