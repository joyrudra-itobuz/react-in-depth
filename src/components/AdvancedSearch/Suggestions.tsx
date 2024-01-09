import { Link } from 'react-router-dom';
import { Item } from '../../types/global';
import { Dispatch, useContext } from 'react';
import { SearchContext } from '../../context/AdvancedSearch/SearchContext';
import {
  LocalStorageHistoryData,
  SearchHistory,
} from '../../types/AdvancedSearch';
import { LazyImage } from '../Global/LazyImage';

export default function Suggestions({
  data,
  isCached,
  setSearchHistory,
}: Readonly<{
  data: Item | SearchHistory;
  isCached: boolean;
  setSearchHistory: Dispatch<React.SetStateAction<SearchHistory[]>>;
}>) {
  const { setShowSearchWindow } = useContext(SearchContext);

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

  return (
    <li key={data._id}>
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
        className='flex gap-5 bg-black/30 p-4'
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
    </li>
  );
}
