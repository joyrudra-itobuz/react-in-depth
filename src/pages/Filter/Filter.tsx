import { FormEvent, useEffect, useRef, useState } from "react";

type someData = {
  name: string;
  id: string;
  username: string;
};

export default function Filter() {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [someData, setSomeData] = useState<Array<someData>>([]);

  async function getSomeData() {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();

    setSomeData(data);
  }

  useEffect(() => {
    getSomeData();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!searchRef.current?.value) {
      return await getSomeData();
    }

    const res = await fetch(
      `https://jsonplaceholder.typicode.com/users/${searchRef.current.value}`
    );
    const data = await res.json();

    setSomeData([data]);
  }

  return (
    <div className="p-5">
      <form
        className="mb-5 flex gap-5"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          ref={searchRef}
          type="text"
          className="bg-transparent border p-5 text-3xl w-full"
        />

        <button className="px-5 py-2 bg-blue-700 w-[10rem]">Search</button>
      </form>

      <div id="results" className="flex flex-col gap-5">
        {someData.map((data) => {
          return (
            <div key={data.id} className="bg-gray-800 p-5">
              <p>Name : {data.name}</p>
              <p>Id : {data.id}</p>
              <p>Username : {data.username}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
