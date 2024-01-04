import { FaReact } from 'react-icons/fa';
import { CiSearch } from 'react-icons/ci';
import { CgProfile } from 'react-icons/cg';
import { useContext, useEffect, useState } from 'react';
import { SearchContext } from '../../context/AdvancedSearch/SearchContext';
import { Link } from 'react-router-dom';
import Popup from '../Navbar/Popup';
import apiCall from '../../helper/apiCalls';
import { Profile } from '../../types/global';
import { UserContext } from '../../context/Globals/UserContext';

export default function Navbar() {
  const { setShowSearchWindow } = useContext(SearchContext);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const { setProfile } = useContext(UserContext);

  useEffect(() => {
    async function getProfile() {
      try {
        const response = await apiCall<Profile, null>('/profile', 'GET');

        setProfile(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    if (localStorage.getItem('accessToken')) {
      getProfile();
    }
  });

  return (
    <nav className='fixed top-0 flex w-full  items-center justify-between gap-5 bg-gray-900 p-5'>
      <div className='flex items-center gap-5 text-2xl'>
        <Link to={'/'}>
          <FaReact className={'react-logo-spinner text-6xl text-sky-500'} />
        </Link>
        <h2 className='hidden min-w-max lg:block'>Advanced Search</h2>
      </div>

      <div className='flex gap-2'>
        <button
          onClick={() => setShowSearchWindow(true)}
          className='flex h-12 w-12 items-center justify-center gap-3 rounded-3xl border-[3px] border-transparent bg-gray-500 focus:border-teal-600 focus:outline-none lg:w-full lg:justify-start lg:p-2 lg:px-5'
        >
          <CiSearch />
          <p className='hidden lg:block'>Search</p>
        </button>
        <div className='relative'>
          <button
            onClick={() => {
              setShowProfilePopup(!showProfilePopup);
            }}
          >
            <CgProfile className='my-auto min-w-max rounded-full border-[3px] border-gray-200 text-[2.8rem] text-gray-100' />
          </button>
          {showProfilePopup && (
            <div className='absolute bottom-[-8rem] right-[-1rem] w-[8rem]'>
              <Popup />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
