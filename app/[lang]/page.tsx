"use client"
import { createContext, useState } from "react";
import { Locale } from "../../i18n-config";
import LocaleSwitcher from "./components/locale-switcher";
import BreadCrumbs from "../components/breadCrumbs/breadCrumbs";

export interface IBreadCrumbData {
  name: string,
  url: string
}

export let InitialBreadCrumb: IBreadCrumbData[] = [{ name: "home", url: "/" }]

export let BreadCrumbContext = createContext<any>(InitialBreadCrumb)

export default function IndexPage({
  params: { lang },
}: {
  params: { lang: Locale };

}) {
  const [breadCrumbList, setBreadCrumbList] = useState<IBreadCrumbData[]>(InitialBreadCrumb);

  const updateBreadCrumbList = (newData: IBreadCrumbData) => {
    const filterData = breadCrumbList.filter((i) => i.name === newData.name || i.url === newData.url)
    if (filterData.length > 0) {
      console.log("already exists!", newData)
    } else {
      const updated = [...breadCrumbList, newData]
      setBreadCrumbList(updated)
    }
  }

  return (
    <div>
      <BreadCrumbContext.Provider value={{ breadCrumbList, updateBreadCrumbList }}>
        <BreadCrumbs />
        <LocaleSwitcher />
        <p>Current locale: {lang}</p>
      </BreadCrumbContext.Provider>
    </div>
  );
}
