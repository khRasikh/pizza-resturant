import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  title: ReactNode;
};

export default function Body({ children, title }: Props) {
  return (
    <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-1 h-[20500px] w-[20500px] -translate-x-[47.5%] rounded-full  from-slate-900 via-cyan-500" />
      </div>
      <div className="container relative flex grow flex-col px-4">
        <h1 className="text-3xl font-semibold leading-tight tracking-tight text-black md:text-5xl">{title}</h1>
        <div className="mt-6 text-gray-800 md:text-lg">{children}</div>
      </div>
    </div>
  );
}
