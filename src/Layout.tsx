import { ReactNode, useContext } from 'react';
import Navbar from './components/AdvancedSearch/Navbar';
import SearchBox from './components/AdvancedSearch/SearchBox';
import { SearchContext } from './context/AdvancedSearch/SearchContext';

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const { showSearchWindow } = useContext(SearchContext);

  return (
    <div>
      <Navbar />
      {showSearchWindow && <SearchBox />}
      <div className='mt-28'>{children}</div>
    </div>
  );
}
