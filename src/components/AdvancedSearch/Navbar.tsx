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
  const [isStatic, setIsStatic] = useState(true);
  const { setProfile } = useContext(UserContext);

  useEffect(() => {
    console.log(showProfilePopup);
  }, [showProfilePopup]);

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

      setIsStatic(prevScrollPos > currentScrollPos || currentScrollPos < 50);

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
        isStatic
          ? ' '
          : ' flex justify-center lg:p-5' + ' transition-all duration-500'
      }
    >
      <div
        className={
          'fixed top-0 z-[999] flex items-center   justify-between gap-5 bg-gray-100 px-2 py-3 text-black shadow-2xl transition-all  duration-500 sm:px-5 lg:p-5 dark:bg-slate-800 dark:text-white' +
          (isStatic ? ' w-full ' : ' top-3 rounded-full px-10 shadow-black/80')
        }
      >
        <div className='flex items-center gap-5 text-2xl'>
          <Link to={'/'}>
            <FaReact
              className={
                'react-logo-spinner  text-sky-500' +
                (!isStatic ? ' text-4xl xs:text-5xl md:text-6xl' : ' text-6xl')
              }
            />
          </Link>
          <h2 className='hidden min-w-max lg:block'>Advanced Search</h2>
        </div>
        <div className='flex items-center justify-center gap-2'>
          <button
            onClick={() => setShowSearchWindow(true)}
            className={
              'flex h-12 items-center justify-center gap-3 rounded-3xl border-[3px] border-slate-200 border-transparent shadow-inner shadow-slate-800 focus:border-teal-600 focus:outline-none  md:w-full md:justify-start  md:px-5 lg:min-w-[20rem] lg:p-2 dark:border-slate-700 dark:bg-slate-600 dark:shadow-gray-800 ' +
              (!isStatic ? ' h-12 w-12  ' : ' w-12 xs:w-[7.5rem]')
            }
          >
            <CiSearch className='text-2xl' />
            <p className={isStatic ? ' hidden xs:block' : ' hidden md:block'}>
              Search
            </p>
          </button>

          <ThemeToggleButton />

          <div className='relative'>
            <button
              className='flex flex-col items-center'
              onClick={() => {
                setShowProfilePopup(!showProfilePopup);
              }}
            >
              <CgProfile className=' my-auto min-w-max rounded-full text-5xl  dark:text-gray-100' />
            </button>
            {showProfilePopup && (
              <div className='absolute bottom-[-8rem] right-[-1rem] w-[8rem]'>
                <Popup />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
