import { memo, useEffect, useState } from 'react';
import apiCall from '../../helper/apiCalls';
import { Item, ItemModel } from '../../types/global';
import './_Content.scoped.scss';
import ItemImages from './ItemImages';

const Content = memo(function Content() {
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
          ? Array.from({ length: 15 }).map(() => (
              <div
                key={crypto.randomUUID()}
                className='rounded-2xl bg-gray-300 dark:bg-[#2d2d2d]'
              >
                <div className='m-5'>
                  <div className='h-[320px] w-[320px] animate-pulse rounded-2xl bg-gray-500 dark:bg-stone-500'></div>
                </div>
                <div className='m-5'>
                  <div className='h-[246px] w-[320px] animate-pulse rounded-2xl bg-gray-500 dark:bg-stone-500'></div>
                </div>
              </div>
            ))
          : allItems
              .slice(23, allItems.length)
              .map((data) => <ItemImages key={data._id} data={data} />)}
      </div>
    </div>
  );
});

export default Content;
