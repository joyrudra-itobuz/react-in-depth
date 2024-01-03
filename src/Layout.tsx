import { ReactNode, useContext, useEffect } from 'react';
import Navbar from './components/AdvancedSearch/Navbar';
import SearchBox from './components/AdvancedSearch/SearchBox';
import { SearchContext } from './context/AdvancedSearch/SearchContext';
import { useNavigate } from 'react-router-dom';

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
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
      {showSearchWindow && <SearchBox />}
      <div className='mt-28'>{children}</div>
    </div>
  );
}
