import { ReactNode } from "react";
import Footer from "./layout/footer";
import Body from "./layout/body";

type Props = {
  children?: ReactNode;
  title: ReactNode;
};

export default function PageLayout({ children, title }: Props) {
  return (
    <div className="relative flex grow flex-col bg-slate-200 py-12">
      <Body title={title}>{children} </Body>
      <Footer />
    </div>
  );
}
