import { useEffect, useState } from "react";

export default function App() {
  return (
    <div className="bg-black/90 text-white h-screen">
      <IncreaseComponent />
    </div>
  );
}

function IncreaseComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Mounts");

    console.log("Updating");

    return () => {
      console.log("Unmounts");
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
          setCount(count + 1);
        }}
      >
        {" "}
        Increase Count
      </button>
    </>
  );
}
