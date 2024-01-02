import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Item } from '../../types/global';
import apiCall from '../../helper/apiCalls';

import './_ItemPage.scoped.scss';
import GradientButton from '../../components/Global/Buttons/GradientButton';

export default function ItemPage() {
  const { id } = useParams();
  const [item, setItem] = useState<Item>();

  useEffect(() => {
    async function getItem() {
      const response = await apiCall<Item, null>(
        `/menu-editor/get-item-detail/${id}`,
        'GET',
        null,
        true
      );

      setItem(response.data);
    }

    getItem();
  }, [id]);

  return (
    <div className='p-5'>
      <div className='m-auto flex flex-col justify-center rounded-3xl border-[3px] border-black/90 bg-black/90 p-5 lg:w-[50rem] lg:flex-row lg:gap-5'>
        <div className='aspect-square sm:m-auto sm:h-[30rem] sm:w-full'>
          <img
            src={item?.itemImage}
            alt={item?.itemImageName}
            className='h-full w-full object-cover'
          />
        </div>

        <div className=' mt-5 flex flex-col justify-between gap-5 bg-stone-600/20 p-5 lg:mt-0 lg:gap-0'>
          <div className='  flex flex-col gap-4  '>
            <h4 className='text-2xl font-[600] text-gray-300'>
              ₹ {item?.price} plate
            </h4>
            <p>Limit : {item?.limit}</p>
            <p>Taxes : ₹ 890</p>
            <h2>Total : ₹ {item?.price && item.price + 890}</h2>
          </div>
          <GradientButton className='max-w-min'>Order</GradientButton>
        </div>
      </div>
    </div>
  );
}
