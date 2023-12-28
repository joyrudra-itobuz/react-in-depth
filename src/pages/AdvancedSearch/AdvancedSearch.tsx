import Navbar from '../../components/AdvancedSearch/Navbar';
import { AdvancedSearchProvider } from '../../context/AdvancedSearch/SearchContext';
import './_AdvancedSearch.scoped.scss';

export default function AdvancedSearch() {
  return (
    <section className='advanced-search bg-blue-900 p-5'>
      <AdvancedSearchProvider>
        <Navbar />
      </AdvancedSearchProvider>
    </section>
  );
}
