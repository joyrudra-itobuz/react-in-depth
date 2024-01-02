import { useEffect, useState } from 'react';
import apiCall from '../../helper/apiCalls';
import { Item, ItemModel } from '../../types/global';

import './_Content.scoped.scss';
import ItemImages from './ItemImages';

export default function Content() {
  const [allItems, setAllItems] = useState<Array<Item>>([]);

  useEffect(() => {
    async function getAllItems() {
      const response = await apiCall<ItemModel, null>(
        '/menu-editor/all-food-items',
        'GET',
        null,
        true
      );

      setAllItems(response.data.allItems);
    }

    getAllItems();
  }, []);

  return (
    <div className='flex justify-center p-5'>
      <div className='items-image-container  grid max-w-[1920px]  grid-cols-1 justify-items-center gap-5 sm:grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
        {allItems.map((data) => {
          return <ItemImages key={data._id} data={data} />;
        })}
      </div>
    </div>
  );
}
