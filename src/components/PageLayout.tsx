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
    </SessionProvider>
  );
}
