"use client";
import PageLayout from "@/components/PageLayout";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DefaultPageNumber, MenuColumns, clearMenuForm, toastMessages } from "@/components/shared/constants";
import { FormMenu } from "@/components/customers/form";
import { NoResultFound, PaginationCustomized, TableMenu } from "@/components/shared/table";
import { IArticles } from "@/components/interface/general";
import clsx from "clsx";
import { addDataToMongoDB, deleteMenuFromMongoDB, getMenusFromMongoDB } from "@/components/shared/mongodbCrud";

export const fetchCache = "force-no-store";

export default function Menu() {
  const t = useTranslations("MenuPage");
  const t1 = useTranslations("Body")
  const [menus, setMenus] = useState<any[]>([]); // Updated state variable name from customers to menus
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showForm, setShowForm] = useState<boolean>(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };
  const fetchData = async () => {
    // const getMenus: { data: IArticles[] } = await getMenusFromFile();
    const getMenus: { data: IArticles[] } = await getMenusFromMongoDB("menus")
    // console.log("test", getMenus1)
    if (getMenus.data) {
      setMenus(getMenus.data);
      setIsLoading(false);

    } else {
      setMenus([]);
      setIsLoading(false);
    }
  };

  // form
  const [formData, setFormData] = useState<IArticles>(clearMenuForm);

  const submit = async (e: any) => {
    e.preventDefault();

    const { CompNum, Type, Name } = formData;
    formData["Type"] = "N"

    if (!CompNum || !Type || !Name) {
      return toast.error(t1("Form.errorMessage"), toastMessages.OPTION);
    }
    // Here, implement your code to send formData to your backend API
    // const addMenu = await addData<IArticles>(formData, Tables.Article)
    const addMenu = await addDataToMongoDB(formData, "menus")

    if (addMenu.status && addMenu.statusCode === 200) {
      setFormData(clearMenuForm);
      toast.success(t1("Form.inCompleteMessage"), toastMessages.OPTION);
    } else {
      toast.error(t1("Form.errorMessage"), toastMessages.OPTION);
    }
  };

  const change = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const inputFields: any = [
    // { name: "Type", value: formData.Type, placeholder: `${t1("Form.Type")}` },
    { name: "CompNum", value: formData.CompNum.toString(), placeholder: `${t1("Form.CompNum")}` },
    { name: "Name", value: formData.Name.toString(), placeholder: `${t1("Form.Name")}` },
    { name: "SinglPreis", value: formData.SinglPreis, placeholder: `${t1("Form.SinglPreis")}` },
    { name: "JumboPreis", value: formData.JumboPreis.toString(), placeholder: `${t1("Form.JumboPreis")}` },
    { name: "FamilyPreis", value: formData.FamilyPreis.toString(), placeholder: `${t1("Form.FamilyPreis")}` },
    { name: "PartyPreis", value: formData.PartyPreis?.toString(), placeholder: `${t1("Form.PartyPreis")}` },
    { name: "MWSt", value: formData.MWSt?.toString(), placeholder: `${t1("Form.MWSt")}` },
    { name: "Rabatt", value: formData.Rabatt?.toString(), placeholder: `${t1("Form.Rabatt")}` },
  ];


  //delete
  const deleteMenu = async (menuId: string) => {

    try {
      // const response = await deleteData(JSON.parse(menuId), "article", "CompNum")
      const response = await deleteMenuFromMongoDB(JSON.parse(menuId), "menus")

      if (response.status && response.statusCode === 200) {
        toast.success(toastMessages.SUCCESS_CONTENT, toastMessages.OPTION);
      } else {
        toast.error(toastMessages.ERROR_CONTENT, toastMessages.OPTION);
      }
    } catch (error) {
      toast.error(toastMessages.ERROR_CONTENT, toastMessages.OPTION);
      console.error("Error deleting customer:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [menus]);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState<any[]>([]);
  const [pageItemsSize, setPageItemsSize] = useState<number>(DefaultPageNumber);
  const [pageNumber, setPageNumber] = useState<number>(1);

  useEffect(() => {
    const indexOfLastItem = currentPage * pageItemsSize;
    const indexOfFirstItem = indexOfLastItem - pageItemsSize;
    const updatedCurrentItems = menus.slice(indexOfFirstItem, indexOfLastItem);
    setCurrentItems(updatedCurrentItems);
    setCurrentPage(pageNumber);
  }, [menus, pageItemsSize]);

  return (
    <PageLayout title={t("title")}>
      <div className="justify-between items-between">
        <div className={clsx(`${showForm ? "rounded-md px-8 bg-slate-200" : "rounded-md px-8"}`)}>
          {showForm ? <FormMenu formData={formData} fields={inputFields} handleChange={change} handleSubmit={submit} toggleForm={toggleForm} />
            : <div className="flex flex-row items-center justify-center">
              <button
                onClick={toggleForm}
                type="button"
                className="flex rounded-md hover:text-green-700 hover:font-bold
                 bg-slate-200 hover:white pr-4 pl-2 pb-2 pt-2 text-sm font-medium 
                 leading-normal text-primary hover:text-primary-600 focus:text-primary-600
                  focus:outline-none focus:ring-0 active:text-primary-700 shadow-md mx-2">
                <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                  className="w-6 h-5 font-bold hover:text-green-700">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg></span>
                {t1("Button.addMenu")}
              </button>
              <div></div>
            </div>}
        </div>
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            {menus.length > 0 && !isLoading ? (
              <div>
                <TableMenu isLoading={isLoading} items={currentItems} deleteRow={deleteMenu} columns={MenuColumns} />
                <PaginationCustomized
                  pageItemsSize={pageItemsSize}
                  totalItems={menus.length}
                  pageNumber={pageNumber}
                  setPageItemsSize={setPageItemsSize}
                  setPageNumber={setPageNumber}
                />
              </div>
            ) : (
              <div>
                {menus.length === 0 && !isLoading ? (
                  <NoResultFound message={t1("notFound")} />
                ) : (
                  <NoResultFound message={t1("loading")} />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
