"use client";
import Panel from "./subForm";

export default function Form({ children }: { children: React.ReactNode }) {
  return (
    <Panel title="Welcome Tittle">
      <Button>Child</Button>
    </Panel>
  );
}

function Button({ children }: { children: React.ReactNode }) {
  return (
    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
      {children}
    </button>
  );
}
