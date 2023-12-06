"use client";
import PageLayout from "@/components/PageLayout";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MenuColumns, clearMenuForm, toastMessages } from "@/components/shared/constants";
import { FormMenu } from "@/components/customers/form";
import { NoResultFound, PaginationCustomized, TableMenu } from "@/components/shared/table";
import { fetchMenu } from "@/components/shared/menu";

export const fetchCache = "force-no-store";

export default function Menu() {
  const t = useTranslations("MenuPage");
  const [menus, setMenus] = useState<any[]>([]); // Updated state variable name from customers to menus
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = async () => {
    const getMenus = await fetchMenu();
    if (getMenus) {
      setMenus(getMenus);
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
      return toast.error("Please fill in the ID field", toastMessages.OPTION);
    } else if (!name) {
      return toast.error("Please fill in the Name field", toastMessages.OPTION);
    } else if (!category) {
      return toast.error("Please fill in the category field", toastMessages.OPTION);
    } else if (!price) {
      return toast.error("Please fill in the price field", toastMessages.OPTION);
    } else if (!shift) {
      return toast.error("Please fill in the shift field", toastMessages.OPTION);
    } else if (!shift) {
      return toast.error("Please fill in the shift field", toastMessages.OPTION);
    }

    // Here, implement your code to send formData to your backend API
    const addMenu = await fetch("/api/psql/menu/add", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });

    if (addMenu.status == 200) {
      setFormData(clearMenuForm);
      toast.success("A new customer has been added", toastMessages.OPTION);
    } else {
      toast.error("Faild to add new record", toastMessages.OPTION);
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
    { name: "id", value: formData.id, placeholder: "ID#" },
    { name: "name", value: formData.name, placeholder: "Name" },
    { name: "category", value: formData.category, placeholder: "Category" },
    { name: "description", value: formData.description, placeholder: "Description" },
    { name: "extra", value: formData.extra, placeholder: "Extra" },
    { name: "price", value: formData.price, placeholder: "Price" },
    { name: "shift", value: formData.shift, placeholder: "shift" },
  ];

  //delete
  const deleteMenu = async (menuId: string) => {
    try {
      const response = await fetch("/api/psql/menu/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: menuId }),
      });

      if (response.ok) {
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
  const [pageItemsSize, setPageItemsSize] = useState<number>(5);
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
      <div className="justify-center items-center">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center">
              <div className="bg-slate-200 rounded-md px-8">
                <FormMenu formData={formData} fields={inputFields} handleChange={change} handleSubmit={submit} />
              </div>
            </div>
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
                  <NoResultFound message={"No Menu Found!"} />
                ) : (
                  <NoResultFound message={"Loading..."} />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
