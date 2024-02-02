import Body from "./layout/body";
import { SessionProvider } from "next-auth/react";
import { IPageLayout } from "./interface/general";
import { ToastContainer } from "react-toastify";

export default function PageLayout({ children, title }: Readonly<IPageLayout>) {
  return (
    <SessionProvider>
      <ToastContainer />
      <div className="bg-blue-900 h-screen ">
        <div className="relative flex grow flex-col ">
          <Body title={title}>{children} </Body>
        </div>
      </div>
      <div className="flex flex-row justify-between py-2 z-100 bg-blue-400">
        <div></div>
        <div>
          <span className="font-bold text-red-600">F1=</span>
          <span className="text-black font-extrabold">B.Neu</span>
        </div>
        <div>
          <span className="font-bold text-red-600">F2=</span> <span className="text-black font-extrabold">Suche</span>
        </div>
        <div>
          <span className="font-bold text-red-600">F3=</span> <span className="text-black font-extrabold">Anderen</span>
        </div>
        <div>
          <span className="font-bold text-red-600">F4=</span>
          <span className="text-black font-extrabold">R.OK</span>
        </div>
        <div>
          <span className="font-bold text-red-600">F6=</span>
          <span className="text-black font-extrabold">Fahrer</span>
        </div>
        <div>
          <span className="font-bold text-red-600">F7=</span>
          <span className="text-black font-extrabold">R.Neu</span>
        </div>
        <div>
          <span className="font-bold text-red-600">F9=</span>
          <span className="text-black font-extrabold">Druck</span>
        </div>
        <div>
          <span className="font-bold text-red-600">F10=</span> <span className="text-black font-extrabold">Ende</span>
        </div>
        <div></div>
      </div>
    </SessionProvider>
  );
}
