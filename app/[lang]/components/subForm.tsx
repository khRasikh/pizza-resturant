"use client";

export default function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-gray-100 p-4 rounded-lg">
      <h1 className="text-2xl mb-4">{title}</h1>
      <h1 className="text-2xl mb-4">this value comes from Parent to grand child:</h1>
      <div className="space-y-2">{children}</div>
    </section>
  );
}
