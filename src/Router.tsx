import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AdvancedSearchProvider } from './context/AdvancedSearch/SearchContext';
import Layout from './Layout';

const SignIn = lazy(() => import('./pages/SignIn/SignIn'));
const ItemPage = lazy(() => import('./pages/ItemPage/ItemPage'));
const AdvancedSearch = lazy(
  () => import('./pages/AdvancedSearch/AdvancedSearch')
);
const Filter = lazy(() => import('./pages/Filter/Filter'));

export default function Router() {
  return (
    <BrowserRouter>
      <AdvancedSearchProvider>
        <Layout>
          <Routes>
            <Route path='/' element={<SignIn />} />
            <Route path='/filter' element={<Filter />} />
            <Route path='/dashboard' element={<AdvancedSearch />} />
            <Route path='/item/:id' element={<ItemPage />} />
          </Routes>
        </Layout>
      </AdvancedSearchProvider>
    </BrowserRouter>
  );
}
