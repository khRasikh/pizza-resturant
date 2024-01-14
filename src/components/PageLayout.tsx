import Body from "./layout/body";
import { SessionProvider } from "next-auth/react";
import { IPageLayout } from "./interface/general";
import { ToastContainer } from "react-toastify";


export default function PageLayout({ children, title }: Readonly<
  IPageLayout>) {
  return (
    <SessionProvider>
      <ToastContainer />
      <div className="bg-white h-screen ">
        <div className="relative flex grow flex-col ">
          <Body title={title}>{children} </Body>

        </div>
      </div>
      <div className='flex flex-row justify-between -mt-28 py-8 z-100 bg-slate-100'>
        <div></div>
        <div><span className='font-bold'>Bearbeiten</span>: F3</div>
        <div><span className='font-bold'>Neue Bestellung</span>: Enter</div>
        <div><span className='font-bold'>Speichern</span>: F9</div>
        <div><span className='font-bold'>Drucken</span>: F9</div>
        <div><span className='font-bold'>Beenden</span>: ESC</div>
        <div></div>
      </div>
    </SessionProvider>
  );
}
