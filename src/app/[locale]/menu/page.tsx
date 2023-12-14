"use client";
import PageLayout from "@/components/PageLayout";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DefaultPageNumber, MenuColumns, clearMenuForm, toastMessages } from "@/components/shared/constants";
import { FormMenu } from "@/components/customers/form";
import { NoResultFound, PaginationCustomized, TableMenu } from "@/components/shared/table";
import { deleteOne, fetchData, insertOne } from "@/components/lib/CURD";

export const fetchCache = "force-no-store";

export default function Menu() {
  const t = useTranslations("MenuPage");
  const t1 = useTranslations("Body")
  const [menus, setMenus] = useState<any[]>([]); // Updated state variable name from customers to menus
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchMenu = async () => {
    const getMenus = await fetchData("menus");
    if (getMenus && getMenus.status) {
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

    const { id, name, category, price, shift } = formData;

    if (!id) {
      return toast.error(t1("Form.errorMessage").replace("ID", id), toastMessages.OPTION);
    } else if (!name) {
      return toast.error(t1("Form.errorMessage").replace("Name", name), toastMessages.OPTION);
    } else if (!category) {
      return toast.error(t1("Form.errorMessage").replace("category", category), toastMessages.OPTION);
    } else if (!price) {
      return toast.error(t1("Form.errorMessage").replace("price", price), toastMessages.OPTION);
    } else if (!shift) {
      return toast.error(t1("Form.errorMessage").replace("shift", shift), toastMessages.OPTION);
    } else if (!shift) {
      return toast.error(t1("Form.errorMessage").replace("shift", shift), toastMessages.OPTION);
    }

    const addMenu = await insertOne(JSON.stringify(formData), "menus")

    if (addMenu.status) {
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

  const inputFields = [
    { name: "id", value: formData.id, placeholder: `${t1("Form.id")}` },
    { name: "name", value: formData.name, placeholder: `${t1("Form.name")}` },
    { name: "category", value: formData.category, placeholder: `${t1("Form.category")}` },
    { name: "description", value: formData.description, placeholder: `${t1("Form.description")}` },
    { name: "extra", value: formData.extra, placeholder: `${t1("Form.extra")}` },
    { name: "price", value: formData.price, placeholder: `${t1("Form.price")}` },
    { name: "shift", value: formData.shift, placeholder: `${t1("Form.shift")}` },
  ];

  //delete
  const deleteMenu = async (menuId: string) => {
    try {
      const response = await deleteOne(menuId, "menus")

      if (response.data) {
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
    fetchMenu();
  }, [FormMenu]);

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
