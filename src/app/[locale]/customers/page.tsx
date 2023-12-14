"use client";
import PageLayout from "@/components/PageLayout";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CustomerColumns, DefaultPageNumber, clearCustomerForm, toastMessages } from "@/components/shared/constants";
import Form from "@/components/customers/form";
import { NoResultFound, PaginationCustomized, Table } from "@/components/shared/table";
import SearchBar from "@/components/shared/search";
import { filterData } from "@/components/lib/filter";
import { deleteOne, fetchData, insertOne } from "@/components/lib/CURD";

export default function Customers() {
  const t = useTranslations("CustomerPage");
  const t1 = useTranslations("Body");
  const [customers, setCustomer] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showForm, setShowForm] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setPageNumber(1);
  };

  const fetchCustomers = async () => {
    // const customerList = await getCustomers(); //PSQL
    const customerList = await fetchData("customers"); //MONGODB
    if (customerList && customerList.status) {
      setCustomer(customerList.data);
      setIsLoading(false);
    } else {
      setCustomer([]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);
  //search & filter
  const filteredCustumers = filterData(customers, searchTerm);

  // form
  const [formData, setFormData] = useState(clearCustomerForm);

  const submit = async (e: any) => {
    e.preventDefault();

    const { first_name, home_number, street_name, postal_code, phone_number } = formData;

    if (!first_name) {
      return toast.error(t1("Form.inCompleteMessage").replace("record", first_name), toastMessages.OPTION);
    } else if (!home_number) {
      return toast.error(t1("Form.inCompleteMessage").replace("record", home_number), toastMessages.OPTION);
    } else if (!street_name) {
      return toast.error(t1("Form.inCompleteMessage").replace("record", street_name), toastMessages.OPTION);
    } else if (!postal_code) {
      return toast.error(t1("Form.inCompleteMessage").replace("record", postal_code), toastMessages.OPTION);
    } else if (!phone_number) {
      return toast.error(t1("Form.inCompleteMessage").replace("record", phone_number), toastMessages.OPTION);
    }

    // Here, implement your code to send formData to your backend API
    const addCustomer = await insertOne(JSON.stringify(formData), "customers")

    if (addCustomer.status) {
      setFormData(clearCustomerForm);
      toast.success(t1("Form.successMessage").replace("record", "Customer"), toastMessages.OPTION);
      setShowForm(true);
    } else {
      toast.error(t1("Form.errorMessage").replace("record", "Customer"), toastMessages.OPTION);
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
    { name: "first_name", value: formData.first_name, placeholder: t1("Form.name") },
    { name: "last_name", value: formData.last_name, placeholder: t1("Form.lastName") },
    { name: "home_number", value: formData.home_number, placeholder: t1("Form.homeNumber") },
    { name: "street_name", value: formData.street_name, placeholder: t1("Form.street") },
    { name: "postal_code", value: formData.postal_code, placeholder: t1("Form.postalCode") },
    { name: "phone_number", value: formData.phone_number, placeholder: t1("Form.phone") },
    { name: "description", value: formData.description, placeholder: t1("Form.description") },
  ];

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState<any[]>([]);
  const [pageItemsSize, setPageItemsSize] = useState<number>(DefaultPageNumber);
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
      const response = await deleteOne(customerId, "customers")

      if (response.status) {
        toast.success(t1("Form.successMessage").replace("record", "Customer"), toastMessages.OPTION);
      } else {
        toast.error(t1("Form.errorMessage").replace("record", "Customer"), toastMessages.OPTION);
      }
    } catch (error) {
      toast.error(t1("Form.errorMessage").replace("record", "Customer"), toastMessages.OPTION);
      console.error("Error deleting customer:", error);
    }
  };

  return (
    <PageLayout title={t("title")}>
      {showForm ? (
        <div className="flex flex-col items-center ">
          <div className="flex flex-row">
            <div>
              <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
            </div>{" "}
            <div>
              <button
                className="bg-green-500 hover:bg-green-700 my-2 py-2 text-white font-bold text-md px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                onClick={toggleForm}
              >
                {t1("Button.add").replace("Record", "Customer")}
              </button>
            </div>
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

      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">

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
                <NoResultFound message={t1("notFound")} />
              ) : (
                <NoResultFound message={t1("loading")} />
              )}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
