import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AdvancedSearchProvider } from './context/AdvancedSearch/SearchContext';
import Layout from './Layout';
import DefaultLoading from './components/Global/Loaders/DefaultLoading';
import ProfileRouter from './pages/Profile/ProfileRouter';
import Profile from './pages/Profile/Profile';
import EditProfile from './pages/Profile/EditProfile';
import ProfileLayout from './pages/Profile/Layout/ProfileLayout';
import { UserContextProvider } from './context/Globals/UserContext';

const SignIn = lazy(() => import('./pages/SignIn/SignIn'));
const ItemPage = lazy(() => import('./pages/ItemPage/ItemPage'));
const AdvancedSearch = lazy(
  () => import('./pages/AdvancedSearch/AdvancedSearch')
);
const Filter = lazy(() => import('./pages/Filter/Filter'));
// const Profile = lazy(() => import('./pages/Profile/Profile.tsx'));
// const EditProfile = lazy(() => import('./pages/EditProfile/EditProfile.tsx'));

export default function Router() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <AdvancedSearchProvider>
          <Suspense fallback={<DefaultLoading />}>
            <Layout>
              {/* <ProfileRouter /> */}
              <Routes>
                <Route path='/' element={<SignIn />} />
                <Route path='/filter' element={<Filter />} />
                <Route path='/dashboard' element={<AdvancedSearch />} />
                <Route path='/item/:id' element={<ItemPage />} />
                {/* <Route path='/profile' element={<Profile />} />
              <Route path='/profile/edit' element={<EditProfile />} /> */}
              </Routes>
            </Layout>
            <ProfileLayout>
              <Routes>
                <Route path='/profile' element={<Profile />} />
                <Route path='/profile/edit' element={<EditProfile />} />
              </Routes>
            </ProfileLayout>
          </Suspense>
        </AdvancedSearchProvider>
      </UserContextProvider>
    </BrowserRouter>
  );
}
