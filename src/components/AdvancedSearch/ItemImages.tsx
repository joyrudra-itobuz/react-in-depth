import { Link } from 'react-router-dom';
import { Item } from '../../types/global';
import { LazyImage } from '../Global/LazyImage';

export default function ItemImages({ data }: { data: Item }) {
  return (
    <Link
      to={`/item/${data._id}`}
      className='cursor-pointer rounded-2xl bg-[#2d2d2d] p-5'
    >
      <div className='aspect-square rounded-2xl shadow-2xl sm:h-[20rem] sm:w-[20rem]'>
        <LazyImage
          src={data.itemImage}
          alt={data.itemImageName}
          className='h-full w-full rounded-2xl object-cover'
        />
      </div>

      <div className='p-5'>
        <p>{data.itemName}</p>
        <p>{data.description ?? 'Something'}</p>
        <p>{data.spicyMeter}</p>
        <p>₹ {data.price} Plate</p>
        <span>{data.averageRating}</span>
      </div>
    </Link>
  );
}
