"use client";
import React, { createContext, useEffect, useState } from "react";
import { getUsers } from "../components/users";

type Value = {
  userId: number;
  id: number;
  title: string;
};

// 1. Create Context
const ValueContext = createContext<Value[] | null>(null);

interface Props {
  initialData: Value[] | null;
}

export default function MyApp({ initialData }: Props) {
  //   2. define variables
  const [value, setValue] = useState<Value[] | null>(initialData);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!initialData) {
        const data = await getUsers();
        const filteredData = data.filter(
          (item: Value) => item.id === 100 || item.id === 99
        );
        setValue(filteredData);
      }
    };

    fetchUsers();
  }, [initialData]);

  console.log(value);
  // 3. define provider
  return (
    <ValueContext.Provider value={value}>
      <div className="container text-center justify-center">
        {value ? <Form>{}</Form> : <p>Loading</p>}
      </div>
    </ValueContext.Provider>
  );
}

function Form({ children }: { children: React.ReactNode }) {
  return (
    <Panel title="Welcome Tittle">
      {children}
      <Button>Sign up</Button>
      <Button>Log in</Button>
    </Panel>
  );
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-gray-100 p-4 rounded-lg">
      <h1 className="text-2xl mb-4">{title}</h1>
      <h2>This values come from Parent</h2>
      <ValueList />
      <div className="space-y-2">{children}</div>
    </section>
  );
}

function ValueList() {
  const getvalue = React.useContext(ValueContext);

  if (!getvalue) {
    return null;
  }

  return (
    <ul>
      {getvalue.map((item) => (
        <li key={item.id}>
          <div>{item.id}</div>
          <div>{item.title}</div>
          <div>{item.userId}</div>
        </li>
      ))}
    </ul>
  );
}
function Button({ children }: { children: React.ReactNode }) {
  return (
    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
      {children}
    </button>
  );
}
