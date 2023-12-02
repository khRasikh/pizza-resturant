import Footer from "./layout/footer";
import Body from "./layout/body";
import { SessionProvider } from "next-auth/react";
import { IPageLayout } from "./interface/general";


export default function PageLayout({ children, title }: Readonly<
  IPageLayout>) {
  return (
    <SessionProvider>
      <div className="bg-white h-screen">
        <div className="relative flex grow flex-col ">
          <Body title={title}>{children} </Body>
        </div>
        <Footer />
      </div>
    </SessionProvider>
  );
}
