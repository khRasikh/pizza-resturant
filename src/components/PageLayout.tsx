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
          <span className="font-bold text-red-600">F3=</span>
          <span className="text-black font-extrabold">Bearbeiten</span>
        </div>
        <div>
          <span className="font-bold text-red-600">Enter=</span>{" "}
          <span className="text-black font-extrabold">Neue Bestellung</span>
        </div>
        <div>
          <span className="font-bold text-red-600">F9=</span>{" "}
          <span className="text-black font-extrabold">Speichern</span>
        </div>
        <div>
          <span className="font-bold text-red-600">F9=</span>
          <span className="text-black font-extrabold">Drucken</span>
        </div>
        <div>
          <span className="font-bold text-red-600">F11=</span>
          <span className="text-black font-extrabold">Großer Bildschirm</span>
        </div>
        <div>
          <span className="font-bold text-red-600">ESC=</span>{" "}
          <span className="text-black font-extrabold">Beenden</span>
        </div>
        <div></div>
      </div>
    </SessionProvider>
  );
}
