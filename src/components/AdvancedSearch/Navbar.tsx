import { FaReact } from 'react-icons/fa';
import { CiSearch } from 'react-icons/ci';
import { CgProfile } from 'react-icons/cg';
import { useContext } from 'react';
import { SearchContext } from '../../context/AdvancedSearch/SearchContext';

export default function Navbar() {
  const { setShowSearchWindow } = useContext(SearchContext);

  return (
    <nav className='flex items-center justify-between gap-5  bg-blue-900 p-5'>
      <div className='flex items-center gap-5 text-2xl'>
        <FaReact className={'react-logo-spinner text-6xl text-sky-500'} />
        <h2 className='hidden min-w-max lg:block'>Advanced Search</h2>
      </div>

      <div className='flex gap-2'>
        <button
          onClick={() => {
            console.log('Clicked!');
            setShowSearchWindow(true);
          }}
          className='flex h-12 w-12 items-center justify-center gap-3 rounded-3xl border-[3px] border-transparent bg-gray-800 focus:border-teal-600 focus:outline-none lg:w-full lg:justify-start lg:p-2 lg:px-5'
        >
          <CiSearch />
          <p className='hidden lg:block'>Search</p>
        </button>
        <CgProfile className='my-auto min-w-max rounded-full border-[3px] border-gray-800 text-[2.8rem] text-gray-800' />
      </div>
    </nav>
  );
}
