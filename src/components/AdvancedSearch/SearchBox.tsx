import {
  Suspense,
  useContext,
  useEffect,
  useRef,
  useState,
  useTransition,
} from 'react';
import { CiSearch } from 'react-icons/ci';
import { SearchContext } from '../../context/AdvancedSearch/SearchContext';
import apiCall from '../../helper/apiCalls';
import { Item } from '../../types/global';
import { SearchHistory } from '../../types/AdvancedSearch';
import Suggestions from './Suggestions';
import DefaultLoading from '../Global/Loaders/DefaultLoading';

export default function SearchBox() {
  const { setShowSearchWindow } = useContext(SearchContext);
  const [search, setSearch] = useState('');
  const [searchedData, setSearchedData] = useState<Array<Item>>([]);
  const [searchHistory, setSearchHistory] = useState<Array<SearchHistory>>([]);
  const searchContainerRef = useRef<HTMLDivElement | null>(null);
  const [, startSearchTransition] = useTransition();
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  function setSearchHistoryData() {
    const searchHistoryCached = JSON.parse(
      localStorage.getItem('searchHistory') ?? '[]'
    ) as unknown as Array<SearchHistory>;

    setSearchHistory([...searchHistoryCached]);
  }

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchContainerRef.current?.contains(e.target as Node)) {
        setShowSearchWindow(false);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    async function advancedSearch() {
      try {
        if (!search.length) {
          setSearchedData([]);
          return;
        }

        const response = await apiCall<Array<Item>, null>(
          `/menu-editor/advanced-search?search=${search}`,
          'GET',
          null
        );

        setSearchedData(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    startSearchTransition(() => {
      advancedSearch();
    });
  }, [search]);

  useEffect(() => {
    setSearchHistoryData();
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  return (
    <div
      ref={searchContainerRef}
      className=' fixed top-0 z-[9999] flex h-screen w-screen justify-center bg-black/40 text-black backdrop-blur-sm dark:text-white'
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='search-box mx-5 my-[5rem] w-full rounded-3xl bg-slate-300 p-5 lg:max-w-[50%] dark:bg-[#232323]'
      >
        <div className='flex items-center gap-2 rounded-3xl border-[3px] border-transparent bg-slate-100 px-3 shadow-2xl focus:border-blue-700 dark:bg-[#3b3b3b]'>
          <CiSearch className='text-2xl' />
          <input
            type='text'
            ref={searchInputRef}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder='Search Docs'
            className='w-full bg-transparent px-3 py-2 outline-none'
          />
        </div>

        <div className='recent-searches mt-5 max-h-[30rem]'>
          <h4>RECENT</h4>
          <ul className='my-4 flex max-h-[20rem] flex-col gap-2 overflow-y-scroll'>
            {!searchHistory.length ? (
              <div>No Search Found!</div>
            ) : (
              searchHistory.map((data) => {
                return (
                  <Suspense fallback={<DefaultLoading />} key={data._id}>
                    <Suggestions
                      data={data}
                      isCached={false}
                      setSearchHistory={setSearchHistory}
                    />
                  </Suspense>
                );
              })
            )}
          </ul>

          {searchedData?.length ? (
            <div className='max-h-[30rem]'>
              <h2 className='my-2 font-bold'>Suggestions : </h2>
              <ul className='flex h-[20rem] flex-col gap-2 overflow-y-scroll'>
                {searchedData.map((data) => {
                  return (
                    <Suspense fallback={<DefaultLoading />} key={data._id}>
                      <Suggestions
                        data={data}
                        setSearchHistory={setSearchHistory}
                        isCached={true}
                        key={data._id}
                      />
                    </Suspense>
                  );
                })}
              </ul>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
}
