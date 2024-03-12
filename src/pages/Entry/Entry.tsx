import { useEffect, useState } from 'react';

export default function App() {
  return (
    <div className='h-screen bg-black/90 text-white'>
      <IncreaseComponent />
    </div>
  );
}

function IncreaseComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Mounts');

    console.log('Updating');

    return () => {
      console.log('Unmounts');
    };
  }, []);

  return (
    <>
      <div>The Count is Now : {count}</div>
      <button
        onClick={() => {
          setCount(count + 1);
          setCount(count + 1);
          setCount(count + 1);
          setCount(count + 1); //The value of count will only update in the last update
        }}
      >
        Increase Count
      </button>
    </>
  );
}
