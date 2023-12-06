"use client";
import PageLayout from "@/components/PageLayout";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CustomerColumns, clearCustomerForm, toastMessages } from "@/components/shared/constants";
import Form from "@/components/customers/form";
import { NoResultFound, PaginationCustomized, Table } from "@/components/shared/table";
import SearchBar from "@/components/shared/search";
import { filterData } from "@/components/lib/filter";
import { getCustomers } from "@/components/customers/customers";

export default function Customers() {
  const t = useTranslations("CustomerPage");
  const [customers, setCustomer] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showForm, setShowForm] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setPageNumber(1);
  };

  const fetchCustomers = async () => {
    const customerList = await getCustomers();

    if (customerList) {
      setCustomer(customerList);
      setIsLoading(false);
    } else {
      setCustomer([]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [customers]);
  //search & filter
  const filteredCustumers = filterData(customers, searchTerm);

  // form
  const [formData, setFormData] = useState(clearCustomerForm);

  const submit = async (e: any) => {
    e.preventDefault();

    const { first_name, last_name, home_number, street_name, postal_code, phone_number } = formData;

    if (!first_name) {
      return toast.error("Please fill in the First Name field", toastMessages.OPTION);
    } else if (!last_name) {
      return toast.error("Please fill in the Last Name field", toastMessages.OPTION);
    } else if (!home_number) {
      return toast.error("Please fill in the Home Number field", toastMessages.OPTION);
    } else if (!street_name) {
      return toast.error("Please fill in the Street Name field", toastMessages.OPTION);
    } else if (!postal_code) {
      return toast.error("Please fill in the Postal Code field", toastMessages.OPTION);
    } else if (!phone_number) {
      return toast.error("Please fill in the Phone Number field", toastMessages.OPTION);
    }

    // Here, implement your code to send formData to your backend API
    const addCustomer = await fetch("/api/psql/add", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });

    if (addCustomer.status == 200) {
      setFormData(clearCustomerForm);
      toast.success("A new customer has been added", toastMessages.OPTION);
      setShowForm(true);
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

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const inputFields = [
    { name: "first_name", value: formData.first_name, placeholder: "First Name" },
    { name: "last_name", value: formData.last_name, placeholder: "Last Name" },
    { name: "home_number", value: formData.home_number, placeholder: "Home#" },
    { name: "street_name", value: formData.street_name, placeholder: "Street Name" },
    { name: "postal_code", value: formData.postal_code, placeholder: "POSTAL CODE" },
    { name: "phone_number", value: formData.phone_number, placeholder: "0049163000000" },
    { name: "description", value: formData.description, placeholder: "Description" },
  ];

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState<any[]>([]);
  const [pageItemsSize, setPageItemsSize] = useState<number>(5);
  const [pageNumber, setPageNumber] = useState<number>(1);

  useEffect(() => {
    const indexOfLastItem = currentPage * pageItemsSize;
    const indexOfFirstItem = indexOfLastItem - pageItemsSize;
    const updatedCurrentItems = filteredCustumers.slice(indexOfFirstItem, indexOfLastItem);
    setCurrentItems(updatedCurrentItems);
    setCurrentPage(pageNumber);
  }, [customers, pageItemsSize]);

  //delete
  const deleteCustomer = async (customerId: string) => {
    try {
      const response = await fetch("/api/psql/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Id: customerId }),
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

  //edit
  const displayConsumer = async (id: any) => {
    const getCustomer = await fetch("/api/psql/customers/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });

    const { data } = await getCustomer.json();
    if (getCustomer.status == 200) {
      toggleForm();
      setFormData(data);
    } else {
      console.error("Faild to update a record");
    }
  };

  return (
    <PageLayout title={t("title")}>
      <div className="justify-center items-center">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center ">
              {showForm ? (
                <div className="flex flex-row">
                  <div>
                    <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
                  </div>{" "}
                  <div>
                    <button
                      className="bg-green-500 hover:bg-green-700 my-2 py-2 text-white font-bold text-md px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                      onClick={toggleForm}
                    >
                      + New
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-200 rounded-md px-8">
                  <Form
                    formData={formData}
                    fields={inputFields}
                    handleChange={change}
                    handleSubmit={submit}
                    handleClose={toggleForm}
                  />
                </div>
              )}
            </div>
            {currentItems.length > 0 && !isLoading ? (
              <div>
                <Table
                  isLoading={isLoading}
                  items={currentItems}
                  deleteRow={deleteCustomer}
                  columns={CustomerColumns}
                />
                <PaginationCustomized
                  pageItemsSize={pageItemsSize}
                  totalItems={filteredCustumers.length}
                  pageNumber={pageNumber}
                  setPageItemsSize={setPageItemsSize}
                  setPageNumber={setPageNumber}
                />
              </div>
            ) : (
              <div>
                {filteredCustumers.length === 0 && !isLoading ? (
                  <NoResultFound message={"No Customer Found!"} />
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
