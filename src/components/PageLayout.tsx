import Body from "./layout/body";
import { SessionProvider } from "next-auth/react";
import { IPageLayout } from "./interface/general";
import { ToastContainer } from "react-toastify";
import FooterDetails from "./auth/footer";

export default function PageLayout({ children, title }: Readonly<IPageLayout>) {
  return (
    <SessionProvider>
      <ToastContainer />
      <div className="bg-blue-900 h-screen ">
        <div className="relative flex grow flex-col ">
          <Body title={title}>{children} </Body>
        </div>
      </div>
      <FooterDetails />
    </SessionProvider>
  );
}
