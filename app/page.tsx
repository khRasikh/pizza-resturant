"use client";
import Image from "next/image";
import { getUsers } from "./components/users";
import Form from "./components/form";
import { createContext, useEffect, useState } from "react";

type Value = {
  val: string;
};

// 1. Create Context
export const ValueContext = createContext<Value | null>(null);

export default function Home() {
  const [value, setValue] = useState<Value>({ val: "" });
  const fetchData = async () => {
    const data = await getUsers();
    setValue({ val: data[0].title });
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(value);
  return (
    <div>
      Welcome to SSR Home
      {value.val === "" ? (
        <div>Loading...</div>
      ) : (
        <ValueContext.Provider value={value}>
          <Form>{}</Form>
        </ValueContext.Provider>
      )}
    </div>
  );
}
