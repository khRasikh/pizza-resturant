import { useSession } from "next-auth/react";
import { IBody } from "../interface/general";

export default function Body({ children, title }: Readonly<IBody>) {
  const { data: session }: any = useSession()


  if (!session) {
    return <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-1 h-[20500px] w-[20500px] -translate-x-[47.5%] rounded-full  from-slate-900 via-cyan-500" />
      </div>
      <div className="container relative flex grow flex-col px-4">
        <h1 className="text-3xl font-semibold leading-tight tracking-tight text-black md:text-2xl"> Welcome to {title}</h1>
        <div className="mt-6 text-gray-800 md:text-lg">
          <p>Not authorized, please signin to see the details!</p>
        </div>
      </div>
    </div>
  }

  const { user } = session
  if (session && user.email === "kh.rasikh542@gmail.com" || user.email === "rahmaniachmad@yahoo.de") {
    return (
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-0 top-1 h-[20500px] w-[20500px] -translate-x-[47.5%] rounded-full  from-slate-900 via-cyan-500" />
        </div>
        <div className="container relative flex grow flex-col px-4">
          <h1 className="text-2xl font-semibold leading-tight tracking-tight text-black md:text-xl"> Welcome to  {title} </h1>
          <div className="mt-6 text-gray-800 md:text-lg">{children}</div>
        </div>
      </div>
    );
  }

  return (
    <div>Welcome to the page, you are not authorized to view all list! Only super admin knows!
      kh.rasikh542@gmail.com
    </div>
  )
}
