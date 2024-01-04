import { useContext } from 'react';
import { LazyImage } from '../../components/Global/LazyImage';
import { UserContext } from '../../context/Globals/UserContext';
import './_Profile.module.scss';

export default function Profile() {
  const { profile } = useContext(UserContext);
  return (
    <h2>
      <div className='h-32 w-28'>
        <LazyImage
          className='h-full w-full object-cover'
          src={profile?.profileImage}
        />
      </div>
    </h2>
  );
}
