import { Link, useNavigate } from 'react-router-dom';
import { Item } from '../../types/global';
import { Dispatch, useCallback, useContext, useEffect } from 'react';
import { SearchContext } from '../../context/AdvancedSearch/SearchContext';
import {
  LocalStorageHistoryData,
  SearchHistory,
} from '../../types/AdvancedSearch';
import { LazyImage } from '../Global/LazyImage';

import { IoMdReturnLeft } from 'react-icons/io';

export default function Suggestions({
  data,
  isCached,
  setSearchHistory,
  selectedLi,
}: Readonly<{
  data: Item | SearchHistory;
  isCached: boolean;
  setSearchHistory: Dispatch<React.SetStateAction<SearchHistory[]>>;
  selectedLi?: boolean | null;
}>) {
  const { setShowSearchWindow } = useContext(SearchContext);
  const navigate = useNavigate();

  function setDataToLocalStorage({
    _id,
    itemName,
    price,
    itemImage,
  }: LocalStorageHistoryData) {
    setShowSearchWindow(false);

    const link = `/item/${_id}`;

    const searchHistoryCached = JSON.parse(
      localStorage.getItem('searchHistory') ?? '[]'
    ) as unknown as Array<SearchHistory>;

    const findIndex = searchHistoryCached.findIndex((data) => data._id === _id);

    if (findIndex > -1) {
      return;
    }

    const newArr = [
      ...searchHistoryCached,
      {
        itemName,
        link,
        _id,
        price,
        itemImage,
      },
    ];

    setSearchHistory(newArr);
    localStorage.setItem('searchHistory', JSON.stringify(newArr));
  }

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const key = event.key;

      if (key === 'Enter' && selectedLi) {
        navigate(`/item/${data._id}`);
        setShowSearchWindow(false);
      }
    },
    [data._id, selectedLi]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <li key={data._id} className='relative'>
      <Link
        to={`/item/${data._id}`}
        onClick={() =>
          isCached &&
          setDataToLocalStorage({
            _id: data._id,
            itemName: data.itemName,
            price: data.price,
            itemImage: data.itemImage ?? '',
          })
        }
        className={
          'flex gap-5 bg-black/30 p-4 hover:bg-teal-700 hover:text-white ' +
          (selectedLi && ' bg-cyan-700 text-white')
        }
      >
        <div className='h-20 w-20'>
          <LazyImage
            className='h-full w-full object-cover'
            src={data.itemImage}
            alt={data.itemName}
          />
        </div>
        <div className='flex flex-col items-start gap-2'>
          <p>{data.itemName}</p>
          <p>{data.price}</p>
        </div>
      </Link>
      <div
        className={
          'absolute right-5 top-[50%] translate-y-[-50%]  rounded-sm border-[2px] border-gray-100  bg-gray-200 p-1 text-3xl shadow-inner dark:border-gray-600 dark:bg-slate-800 dark:text-white' +
          (selectedLi ? ' block' : ' hidden')
        }
      >
        <IoMdReturnLeft />
      </div>
    </li>
  );
}
