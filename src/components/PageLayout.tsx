import { ReactNode } from "react";
import Footer from "./layout/footer";
import Body from "./layout/body";
import { SessionProvider } from "next-auth/react";

type Props = {
  children?: ReactNode;
  title: ReactNode;
};

export default function PageLayout({ children, title }: Readonly<
  Props>) {
  return (
    <SessionProvider>
      <div className="bg-slate-200 h-screen">
        <div className="relative flex grow flex-col ">
          <Body title={title}>{children} </Body>
        </div>
        <Footer />
      </div>
    </SessionProvider>
  );
}
