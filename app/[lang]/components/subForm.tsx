"use client";
import { useContext } from "react";
import { ValueContext } from "../page";

export default function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const getvalue = useContext(ValueContext)!;
  console.log(getvalue.val);
  return (
    <section className="bg-gray-100 p-4 rounded-lg">
      <h1 className="text-2xl mb-4">{title}</h1>
      <h1 className="text-2xl mb-4">
        this value comes from Parent to grand child:
        <p className="text-green-800">{getvalue.val}</p>
      </h1>
      <div className="space-y-2">{children}</div>
    </section>
  );
}
