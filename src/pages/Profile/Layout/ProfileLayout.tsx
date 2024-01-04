import { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function ProfileLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  function handleSignout() {
    localStorage.clear();
    navigate('/');
  }

  if (!localStorage.getItem('accessToken')) {
    return <></>;
  }

  return (
    <section className='flex flex-col gap-5 p-5 text-black'>
      <nav className='flex justify-between'>
        <h2 className='p-2'>Settings/{}</h2>
        <button
          className='border-[2px] border-transparent p-2 hover:text-blue-700 hover:underline'
          onClick={handleSignout}
        >
          Signout
        </button>
      </nav>
      <div className='flex gap-10'>
        <aside className=''>
          <ul className='flex w-max flex-col gap-5'>
            <li>
              <Link to={'/profile'}>Profile</Link>
            </li>
            <li>
              <Link to={'/edit-profile'}>Edit Profile</Link>
            </li>
            <li>
              <Link to={'/orders'}>Orders</Link>
            </li>
          </ul>
        </aside>
        <main className='w-full'>{children}</main>
      </div>
    </section>
  );
}
