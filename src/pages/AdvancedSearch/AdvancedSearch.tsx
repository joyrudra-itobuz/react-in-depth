import { useContext } from 'react';
import Navbar from '../../components/AdvancedSearch/Navbar';
import SearchBox from '../../components/AdvancedSearch/SearchBox';
import {
  AdvancedSearchProvider,
  SearchContext,
} from '../../context/AdvancedSearch/SearchContext';
import './_AdvancedSearch.scoped.scss';
import Content from '../../components/AdvancedSearch/Content';

function Search() {
  const { showSearchWindow } = useContext(SearchContext);

  return (
    <section className='advanced-search'>
      <Navbar />
      {showSearchWindow && <SearchBox />}
      <Content />
    </section>
  );
}

export default function AdvancedSearch() {
  return (
    <AdvancedSearchProvider>
      <Search />
    </AdvancedSearchProvider>
  );
}
