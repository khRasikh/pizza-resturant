"use client";
import PageLayout from "@/components/PageLayout";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DefaultPageNumber, MenuColumns, Tables, clearMenuForm, toastMessages } from "@/components/shared/constants";
import { FormMenu } from "@/components/customers/form";
import { NoResultFound, PaginationCustomized, TableMenu } from "@/components/shared/table";
import { addData, deleteData, getMenusFromFile } from "@/app/fileCrud";
import { IArticles } from "@/components/interface/general";

export const fetchCache = "force-no-store";

export default function Menu() {
  const t = useTranslations("MenuPage");
  const t1 = useTranslations("Body")
  const [menus, setMenus] = useState<any[]>([]); // Updated state variable name from customers to menus
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = async () => {
    const getMenus: { data: IArticles[] } = await getMenusFromFile();
    if (getMenus.data) {
      setMenus(getMenus.data);
      setIsLoading(false);
    } else {
      setMenus([]);
      setIsLoading(false);
    }
  };

  // form
  const [formData, setFormData] = useState(clearMenuForm);

  const submit = async (e: any) => {
    e.preventDefault();

    const { CompNum, Type, Name } = formData;

    if (!CompNum || !Type || !Name) {
      return toast.error(t1("Form.errorMessage" + !CompNum || !Type || !Name), toastMessages.OPTION);
    }

    // Here, implement your code to send formData to your backend API
    const addMenu = await addData<IArticles>(formData, Tables.Article)

    if (addMenu.status && addMenu.statusCode === 200) {
      setFormData(clearMenuForm);
      toast.success(t1("Form.inCompleteMessage").replace("record", "menu"), toastMessages.OPTION);
    } else {
      toast.error(t1("Form.errorMessage").replace("record", "menu"), toastMessages.OPTION);
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
    { name: "Type", value: formData.Type, placeholder: `${t1("Form.Type")}` },
    { name: "CompNum", value: formData.CompNum.toString(), placeholder: `${t1("Form.CompNum")}` },
    { name: "Name", value: formData.Name.toString(), placeholder: `${t1("Form.Name")}` },
    { name: "SinglPreis", value: formData.SinglPreis, placeholder: `${t1("Form.SinglPreis")}` },
    { name: "JumboPreis", value: formData.JumboPreis.toString(), placeholder: `${t1("Form.JumboPreis")}` },
    { name: "FamilyPreis", value: formData.FamilyPreis.toString(), placeholder: `${t1("Form.FamilyPreis")}` },
    { name: "PartyPreis", value: formData.PartyPreis.toString(), placeholder: `${t1("Form.PartyPreis")}` },
    { name: "MWSt", value: formData.MWSt.toString(), placeholder: `${t1("Form.MWSt")}` },
    { name: "Rabatt", value: formData.Rabatt.toString(), placeholder: `${t1("Form.Rabatt")}` },
  ];


  //delete
  const deleteMenu = async (menuId: string) => {

    try {
      const response = await deleteData(JSON.parse(menuId), "article", "CompNum")

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
        <div className="bg-slate-200 rounded-md px-8">
          <FormMenu formData={formData} fields={inputFields} handleChange={change} handleSubmit={submit} />
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
