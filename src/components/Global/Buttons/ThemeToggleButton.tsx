import './_ThemeToggleButton.scss';
import { useEffect, useState } from 'react';
import { LuSunMedium } from 'react-icons/lu';
import { BsFillCloudMoonFill } from 'react-icons/bs';

export default function ThemeToggleButton() {
  function getTheme() {
    const dark = localStorage.getItem('dark');

    if (dark === 'true') {
      document.querySelector('body')?.classList.add('dark');
      return true;
    }

    document.querySelector('body')?.classList.remove('dark');
    return false;
  }

  const [isDark, setIsDark] = useState(getTheme());

  useEffect(() => {
    if (isDark) {
      document.querySelector('body')?.classList.add('dark');
      localStorage.setItem('dark', 'true');
      return;
    }

    document.querySelector('body')?.classList.remove('dark');
    localStorage.setItem('dark', 'false');
  }, [isDark]);

  return (
    <div className='theme-button-container'>
      <button
        onClick={() => setIsDark(!isDark)}
        className='relative h-8 w-16 rounded-3xl bg-white shadow-inner transition-all duration-500'
      >
        <div
          className={
            'absolute top-[2px] h-7 w-7 rounded-full transition-all duration-500 ' +
            (!isDark
              ? 'left-[2px] bg-yellow-400 text-black'
              : 'right-[2px] bg-slate-900')
          }
        >
          {!isDark ? (
            <LuSunMedium className='h-full w-full p-2 ' />
          ) : (
            <BsFillCloudMoonFill className='h-full w-full p-2' />
          )}
        </div>
      </button>
    </div>
  );
}
