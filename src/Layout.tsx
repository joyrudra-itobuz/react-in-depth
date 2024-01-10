import { ReactNode, Suspense, lazy, useContext, useEffect } from 'react';
import Navbar from './components/AdvancedSearch/Navbar';
// import SearchBox from './components/AdvancedSearch/SearchBox';

import { SearchContext } from './context/AdvancedSearch/SearchContext';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './context/Globals/UserContext';
import DefaultLoading from './components/Global/Loaders/DefaultLoading';

const SearchBox = lazy(() => import('./components/AdvancedSearch/SearchBox'));

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const { profile } = useContext(UserContext);
  const { showSearchWindow } = useContext(SearchContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/');
    }
  }, []);

  return (
    <div>
      <Navbar />
      {showSearchWindow && (
        <Suspense fallback={<DefaultLoading />}>
          <SearchBox />
        </Suspense>
      )}
      <div className={profile ? 'mt-28' : ''}>{children}</div>
    </div>
  );
}
