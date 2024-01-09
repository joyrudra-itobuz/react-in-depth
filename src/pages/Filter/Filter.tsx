import {
  FormEvent,
  Suspense,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
  useTransition,
} from 'react';
// import throttle from "../../helper/throttle";

// import { throttle } from 'lodash';

type someData = {
  name: string;
  id: string;
  username: string;
};

export default function Filter() {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [someData, setSomeData] = useState<Array<someData>>([]);
  const [search, setSearch] = useState('');
  const [, startTransition] = useTransition();

  async function getSomeData() {
    if (!search.length) {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users/${search}`
      );

      const data = await res.json();

      setTimeout(() => {
        startTransition(() => setSomeData(data));
      }, 1200);

      return;
    }

    setSomeData([]);

    const res = await fetch(
      `https://jsonplaceholder.typicode.com/users/${search}`
    );
    const data = await res.json();

    setTimeout(() => {
      startTransition(() => setSomeData([data]));
    }, 1200);
  }

  // const throttledFunction = throttle(getSomeData, 2000);

  useEffect(() => {
    getSomeData();
  }, [search]);

  useDeferredValue(() => someData);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!searchRef.current?.value) {
      return await getSomeData();
    }

    const res = await fetch(
      `https://jsonplaceholder.typicode.com/users/${searchRef.current.value}`
    );
    const data = await res.json();

    setTimeout(() => {
      setSomeData([data]);
    }, 1200);
  }

  return (
    <div className='p-5'>
      <form
        className='mb-5 flex gap-5'
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          ref={searchRef}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder='id'
          type='text'
          className='w-full border bg-transparent p-5 text-3xl'
        />

        <button className='w-[10rem] bg-blue-700 px-5 py-2'>Search</button>
      </form>

      <Suspense fallback={<div>Loading...</div>}>
        <div id='results' className='flex flex-col gap-5'>
          {!someData.length ? (
            <div>...</div>
          ) : (
            someData.map((data) => {
              return (
                <div key={data.id} className='bg-gray-800 p-5'>
                  <p>Name : {data.name}</p>
                  <p>Id : {data.id}</p>
                  <p>Username : {data.username}</p>
                </div>
              );
            })
          )}
        </div>
      </Suspense>
    </div>
  );
}
