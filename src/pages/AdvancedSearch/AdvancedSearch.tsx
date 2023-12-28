import Navbar from '../../components/AdvancedSearch/Navbar';
import SearchBox from '../../context/AdvancedSearch/SearchBox';
import { AdvancedSearchProvider } from '../../context/AdvancedSearch/SearchContext';
import './_AdvancedSearch.scoped.scss';

export default function AdvancedSearch() {
  return (
    <section className='advanced-search'>
      <AdvancedSearchProvider>
        <Navbar />
        <SearchBox />
      </AdvancedSearchProvider>
    </section>
  );
}
