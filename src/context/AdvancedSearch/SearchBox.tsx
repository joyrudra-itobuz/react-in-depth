import { CiSearch } from 'react-icons/ci';

export default function SearchBox() {
  return (
    <div className=' z-99 fixed top-0 flex h-screen w-screen items-center justify-center bg-black/40 backdrop-blur-sm'>
      <div className='search-box mx-5 w-full rounded-3xl bg-[#4b4b4b] p-5 lg:max-w-[50%]'>
        <div className='m-2 flex items-center gap-2 rounded-3xl border-[3px] border-transparent bg-[#272727] px-3 focus:border-blue-700'>
          <CiSearch className='text-2xl' />
          <input
            type='text'
            placeholder='Search Docs'
            className='bg-transparent px-3 py-2 outline-none'
          />
        </div>

        <div className='recent-searches'>
          <h4>RECENT</h4>
          <ul></ul>
        </div>
      </div>
    </div>
  );
}
