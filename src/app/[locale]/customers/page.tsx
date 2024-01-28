"use client";
import PageLayout from "@/components/PageLayout";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  DefaultPageNumber,
  Tables,
  clearCustomerForm,
  defaultCustomer,
  toastMessages,
} from "@/components/shared/constants";
import Form from "@/components/customers/form";
import SearchBar from "@/components/shared/search";
import { filterData } from "@/components/lib/filter";
import { ICustomerFormLastData, ICustomers } from "@/components/interface/general";
import { addDataToMongoDB, getCustomersFromMongoDB } from "@/components/shared/mongodbCrud";
import { OrderModal } from "@/components/customers/modal";
import { AddICon } from "@/components/shared/icons";

interface ICustomerList {
  data: { items: any[]; pageSize: number; pageNumber: number; total: number };
  status: boolean;
}

export default function Customers() {
  const t = useTranslations("CustomerPage");
  const t1 = useTranslations("Body");
  const [customers, setCustomers] = useState<ICustomers[]>([clearCustomerForm]);
  const [customer, setCustomer] = useState<ICustomers>(clearCustomerForm);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showForm, setShowForm] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  //pagination
  const [pageItemsSize, setPageItemsSize] = useState<number>(DefaultPageNumber);
  const [pageNumber, setPageNumber] = useState<number>(1);

  // form
  const [formData, setFormData] = useState(clearCustomerForm);

  // filter str input textbox
  const [filteredStr, setFilteredStr] = useState<any>([]);

  //open modal after search
  const [pickup, setPickup] = useState<boolean>(false);

  //search ssr
  const [searchSSR, setSearchSSR] = useState<string>("");

  const mergeCustomerLists = (list1: any, list2: any) => {
    // Assuming both lists have a unique identifier like 'KNr'
    const merged: any = new Map();

    list1.forEach((customer: { KNr: any }) => {
      merged.set(customer.KNr, customer);
    });

    list2.forEach((customer: { KNr: any }) => {
      merged.set(customer.KNr, customer);
    });

    return Array.from(merged.values());
  };

  const confirmNewCustomer = (): boolean => {
    const isConfirmed = window.confirm(`${"Neu Kunden?"}`);
    if (isConfirmed) {
      console.log("test confired");
      toggleForm();
      return true;
    } else {
      console.info("test new consumer cancelled");
      return false;
    }
  };

  const handleSearch = async (value: string) => {
    if (value === "0") {
      setPickup(true);
      setCustomer(defaultCustomer);
    } else if (value !== "0" && value !== "") {
      const getConsumerBySearch: ICustomerList = await getCustomersFromMongoDB(
        "customers",
        value.trim().toString(),
        pageNumber,
        pageItemsSize
      );
      const { data, status } = getConsumerBySearch;
      if (status && data.items.length > 0) {
        setCustomer(data.items[0]);
        setShowForm(true);
        console.log("test ssr consumer", data.items[0]);
        setIsLoading(false);
        setPickup(true);
      } else {
        confirmNewCustomer();
      }

      const currentSearch = value.substring(10);
      setSearchSSR(currentSearch.toString());
    } else if (value === "") {
      setSearchSSR("");
    }

    setSearchTerm(value);
    setPageNumber(1);
  };
  //search & filter
  const filteredCustumers = filterData(customers, searchTerm);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { Name, Tel, Str }: ICustomers = formData;

    if (!Name || !Tel || !Str) {
      return toast.error(t1("Form.inCompleteMessage"), toastMessages.OPTION);
    }

    // const addCustomer = await addDataToTextFile<ICustomers>(formData, Tables.Customers)
    const addCustomer = await addDataToMongoDB(formData, Tables.Customers);

    if (addCustomer.status) {
      setFormData(clearCustomerForm);
      toast.success(t1("Form.successMessage"), toastMessages.OPTION);
      setShowForm(true);
      if (addCustomer.data) {
        setCustomer(addCustomer.data! as unknown as ICustomers);
      }
    } else {
      toast.error(t1("Form.errorMessage"), toastMessages.OPTION);
    }
  };

  const change = (e: any) => {
    const { name, value } = e.target;

    if (name === "Str") {
      // Grouping by Postal Codes (Ort)
      const matchingObjects = customers.length > 0 && customers.filter((obj: any) => obj.Str.includes(value));
      if (Array.isArray(matchingObjects) && value.length > 0) {
        setFilteredStr(matchingObjects);
      }
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const inputFields = [
    { name: "Name", value: formData.Name, placeholder: t1("Form.name") },
    { name: "Tel", value: formData.Tel, placeholder: t1("Form.Tel") },
    { name: "Str", value: formData.Str, placeholder: t1("Form.Str") },
    { name: "Ort", value: formData.Ort, placeholder: t1("Form.Ort") },
    { name: "Seit", value: formData.Seit, placeholder: t1("Form.Seit") },
    // { name: "Mal", value: formData.Mal ? formData.Mal : '', placeholder: t1("Form.Mal") },
    // { name: "DM", value: formData.DM || '', placeholder: t1("Form.DM") },
    { name: "letzte", value: formData.letzte || "", placeholder: t1("Form.letzte") },
    { name: "Rabatt", value: formData.Rabatt ? formData.Rabatt : "", placeholder: t1("Form.Rabatt") },
    { name: "Bemerkung", value: formData.Bemerkung || "", placeholder: t1("Form.Bemerkung") },
    // { name: "Fix", value: formData.Fix ? formData.Fix : '', placeholder: t1("Form.fixed") },
  ];

  const toggleForm = () => {
    setShowForm(!showForm);
    setFormData(clearCustomerForm);
    setFilteredStr([]);
  };

  const handleToggelModal = () => {
    handleSearch("");
    setSearchTerm("");
    setPickup(false);
    setCustomer(clearCustomerForm);
  };
  const customerFormDataLast: ICustomerFormLastData = {
    change,
    filteredStr,
    inputFields,
  };

  return (
    <PageLayout title={t("title")}>
      {showForm ? (
        <div className="top-0 -mt-6">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <p>
                <span className="bg-red-500 px-2 py-1 my-2 font-extrabold text-yellow-300 rounded-sm">K-Nr:</span>
                <span className="px-2 py-1 my-2 font-extrabold text-yellow-300">{customer.KNr}</span>
              </p>
            </div>
            <div className="flex flex-col">
              <p>
                <span className="bg-red-500 px-2 py-1 my-2 font-extrabold text-yellow-300 rounded-sm">Name:</span>
                <span className="px-2 py-1 my-2 font-extrabold text-lime-300">{customer.Name}</span>
              </p>
            </div>
            <div className="flex flex-col">
              <p>
                <span className="bg-red-500 px-2 py-1 my-2 font-extrabold text-yellow-300 rounded-sm">Phone:</span>
                <span className="px-2 py-1 my-2 font-extrabold text-lime-300">{customer.Tel}</span>
              </p>
            </div>
            <div className="flex">
              <SearchBar searchTerm={searchTerm} onSearch={handleSearch} placeholderValue="Kundennummer" />
              <button onClick={toggleForm} type="button">
                <AddICon />
              </button>
            </div>
          </div>
          <div>
            <div className="flex flex-col -mt-8">
              <p className="flex flex-row">
                <span className="bg-red-500 px-2 py-1 my-1 font-extrabold text-yellow-300 w-16 rounded-sm">Str.</span>
                <span className="px-2 py-1 my-1 font-extrabold text-lime-300">{customer.Str}</span>
              </p>
              <p className="flex flex-row">
                <span className="bg-red-500 px-2 py-1 my-1 font-extrabold text-yellow-300 w-16 rounded-sm">Ort.</span>
                <span className="px-2 py-1 my-1 font-extrabold text-yellow-300">{customer.Ort}</span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-blue-900 rounded-md px-8">
          <Form
            formData={formData}
            fields={inputFields}
            handleChange={change}
            handleSubmit={handleSubmit}
            handleClose={toggleForm}
            filteredStr={filteredStr}
          />
        </div>
      )}
      {pickup && customer && (
        <OrderModal customer={customer} toggleModal={handleToggelModal} customerFormLastData={customerFormDataLast} />
      )}
    </PageLayout>
  );
}
