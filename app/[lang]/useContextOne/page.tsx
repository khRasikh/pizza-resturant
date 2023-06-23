"use client";
import React, { Children, createContext, useContext, useState } from "react";

type Value = {
  val: string;
};

// 1. Create Context
const ValueContext = createContext<Value | null>(null);

export default function MyApp() {
  //   2. define variables
  const [value, setValue] = useState<Value>({ val: "" });
  // 3. define provider
  return (
    <ValueContext.Provider value={value}>
      <Form>{}</Form>
      <label>
        <button onClick={() => setValue({ val: "New Value" })}>
          Show Value
        </button>
      </label>
    </ValueContext.Provider>
  );
}

function Form({ children }: { children: React.ReactNode }) {
  return (
    <Panel title="Welcome Tittle">
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
  const getvalue = useContext(ValueContext)!;

  return (
    <section className="bg-gray-100 p-4 rounded-lg">
      <h1 className="text-2xl mb-4">{title}</h1>
      <h1 className="text-2xl mb-4">Value: {getvalue.val}</h1>
      <div className="space-y-2">{children}</div>
    </section>
  );
}

function Button({ children }: { children: React.ReactNode }) {
  return (
    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
      {children}
    </button>
  );
}
