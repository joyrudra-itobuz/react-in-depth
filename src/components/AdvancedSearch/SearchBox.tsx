import { useContext, useEffect, useRef, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { SearchContext } from '../../context/AdvancedSearch/SearchContext';

type SearchHistory = {
  search: string;
  link: string;
  id: string;
};

export default function SearchBox() {
  const { setShowSearchWindow } = useContext(SearchContext);
  const [search, setSearch] = useState('');
  const [searchHistory, setSearchHistory] = useState<Array<SearchHistory>>([]);
  const searchContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Check if the click is inside the tracked element
      if (
        searchContainerRef.current &&
        searchContainerRef.current.contains(e.target as Node)
      ) {
        setShowSearchWindow(false);
      }
    };

    // Attach the click event listener when the component mounts
    document.addEventListener('click', handleClick);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    setDataToLocalStorage();
  }, [search]);

  function setDataToLocalStorage() {
    const searchHistoryCached = JSON.parse(
      localStorage.getItem('searchHistory') ?? '[]'
    ) as unknown as Array<SearchHistory>;

    setSearchHistory([
      ...searchHistoryCached,
      { search, link: '', id: crypto.randomUUID() },
    ]);

    console.log(searchHistory, 'after');

    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }

  return (
    <div
      ref={searchContainerRef}
      className=' z-99 fixed top-0  flex h-screen  w-screen justify-center bg-black/40 backdrop-blur-sm'
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='search-box mx-5 my-[5rem] max-h-[30rem] w-full rounded-3xl bg-[#232323] p-5 lg:max-h-full lg:max-w-[50%]'
      >
        <div className=' flex items-center gap-2 rounded-3xl border-[3px] border-transparent bg-[#3b3b3b] px-3 shadow-2xl focus:border-blue-700'>
          <CiSearch className='text-2xl' />
          <input
            type='text'
            onChange={(e) => {
              console.log(e.target.value);
              setSearch(e.target.value);
            }}
            placeholder='Search Docs'
            className='w-full bg-transparent px-3 py-2 outline-none'
          />
        </div>

        <div className='recent-searches mt-5 h-[20rem] lg:h-[85%]'>
          <h4>RECENT</h4>
          <ul className='my-4 h-full overflow-y-scroll'>
            {!searchHistory.length ? (
              <div>No Search Found!</div>
            ) : (
              searchHistory.map((data) => {
                return (
                  <li key={data.id}>
                    <Link to={data.link}>{data.search}</Link>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
