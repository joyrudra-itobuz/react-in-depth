import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import apiCall from '../../helper/apiCalls';
import { Item, ItemModel } from '../../types/global';
import './_Content.scoped.scss';
import ItemImages from './ItemImages';

export default function Content() {
  const [allItems, setAllItems] = useState<Array<Item>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getAllItems() {
      try {
        const response = await apiCall<ItemModel, null>(
          '/menu-editor/all-food-items',
          'GET',
          null,
          true
        );

        setAllItems(response.data.allItems);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }

    getAllItems();
  }, []);

  return (
    <div className='flex justify-center p-5'>
      <div className='items-image-container  grid max-w-[1920px]  grid-cols-1 justify-items-center gap-5 sm:grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
        {loading
          ? // Render skeleton loader while loading
            Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className='skeleton-loader'>
                <Skeleton height={200} width={300} />
              </div>
            ))
          : // Render actual content once loaded
            allItems.map((data) => <ItemImages key={data._id} data={data} />)}
      </div>
    </div>
  );
}