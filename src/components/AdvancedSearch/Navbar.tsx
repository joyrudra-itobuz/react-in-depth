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
import ThemeToggleButton from '../Global/Buttons/ThemeToggleButton';

export default function Navbar() {
  const { setShowSearchWindow } = useContext(SearchContext);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
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
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 50);

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <nav
      className={
        'fixed top-0 z-[999] flex w-full  items-center justify-between gap-5 bg-gray-100 p-5 text-black transition-transform duration-500 dark:bg-slate-800 dark:text-white' +
        (visible ? ' shadow-2xl' : ' translate-y-[-100%]')
      }
    >
      <div className='flex items-center gap-5 text-2xl'>
        <Link to={'/'}>
          <FaReact className={'react-logo-spinner text-6xl text-sky-500'} />
        </Link>
        <h2 className='hidden min-w-max lg:block'>Advanced Search</h2>
      </div>

      <div className='flex items-center gap-2'>
        <button
          onClick={() => setShowSearchWindow(true)}
          className='flex h-12 w-12 items-center justify-center gap-3 rounded-3xl border-[3px] border-transparent bg-gray-500 text-white  focus:border-teal-600 focus:outline-none lg:w-full lg:min-w-[20rem] lg:justify-start lg:p-2 lg:px-5 dark:bg-gray-200 dark:text-black'
        >
          <CiSearch className='text-2xl' />
          <p className='hidden lg:block'>Search</p>
        </button>

        <ThemeToggleButton />

        <div className='relative'>
          <button
            onClick={() => {
              setShowProfilePopup(!showProfilePopup);
            }}
          >
            <CgProfile className='s my-auto min-w-max rounded-full text-[2.8rem]  dark:text-gray-100' />
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
