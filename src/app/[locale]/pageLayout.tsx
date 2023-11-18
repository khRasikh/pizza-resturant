import clsx from "clsx";
export default function PageLayout({ children }: { children: React.ReactNode }) {
  return <div className={clsx("flex h-full flex-col")}>{children}</div>;
}
