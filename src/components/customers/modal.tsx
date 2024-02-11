"use client";
import React, { useCallback, useEffect, useState } from "react";
import Form, { FormCreateOrder } from "./form";
import { OrderColumns, Tables, clearCustomerForm, clearOrderFields, toastMessages } from "../shared/constants";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { TableOrder, TableLastOrders, TableSummary } from "../shared/table";
import { handlePrint } from "../lib/print";
import { ICustomers, IOrder, IOrderModal } from "../interface/general";
// import { getDataByID } from '../shared/psqlCrud';
import { addDataToMongoDB, getOrdersByIDFromMongoDB, updateDataToMongoDB } from "../shared/mongodbCrud";
import clsx from "clsx";
import { useRouter } from "next/navigation";

export const OrderModal: React.FC<IOrderModal> = ({ toggleModal, customer, customerFormLastData }) => {
  const t = useTranslations("Body");
  const [formDataModal, setFormDataModal] = useState(clearOrderFields);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [orderList, setOrderList] = useState<IOrder[]>([]);
  const [lastOrders, setLastOrders] = useState<any[]>([]);
  const [isDisplayLastOrder, setIsDisplayLastOrder] = useState<boolean>(true);
  formDataModal["customer_id"] = customer.KNr ?? 542;
  formDataModal["customer_name"] = customer.Name ?? "Kein";

  // formDataModal["discount"] = customer.Rabatt!
  // Function to add values to the array in formDataModal
  const addToOrderList = () => {
    const newOrder = { ...formDataModal };

    const { id, price, count, total, customer_id } = formDataModal;
    formDataModal["order_date"] = new Date().toString();

    if (!id || !count || !price || !total || !customer_id) {
      return toast.error(t("Form.inCompleteMessage"), toastMessages.OPTION);
    }
    setOrderList([...orderList, newOrder]);
    setFormDataModal(clearOrderFields);
  };

  const submitAsync = async (e: any) => {
    e.preventDefault();

    const { id, price, count, total, customer_id } = formDataModal;

    if (!id || !count || !price || !customer_id || !total) {
      return toast.error(t("Form.inCompleteMessage"), toastMessages.OPTION);
    }

    addToOrderList();
    setFormDataModal(clearOrderFields);
  };

  const change = (e: any) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "total") {
      newValue = parseFloat(value).toFixed(2);
    }
    setFormDataModal({
      ...formDataModal,
      [name]: newValue,
    });
  };

  const fetchOrders = useCallback(async () => {
    try {
      if (customer.KNr !== 0) {
        // const getLastOrders = await getDataByID("orders", customer.KNr!)
        const getLastOrders = await getOrdersByIDFromMongoDB("orders", customer.KNr!);

        if (getLastOrders.data.length > 0) {
          setLastOrders(getLastOrders.data);
        } else {
          setLastOrders([]); // Make sure to clear lastOrders if no data is found
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [customer.KNr, lastOrders]); 
  
  useEffect(() => {
    
    fetchOrders();
  }, [lastOrders]);

  const handlePrintAsync = async () => {
    const addOrder = await addDataToMongoDB(orderList, "orders");

    if (addOrder.status) {
      toast.success(t("Form.successMessage"), toastMessages.OPTION);
      setIsSubmitted(true);
      setFormDataModal(clearOrderFields);
      handlePrint({ customer, orderList, toggleModal });
    } else {
      toast.error(t("Form.errorMessage"), toastMessages.OPTION);
    }
  };

  // update customer
  const [newCustomer, setNewCustomer] = useState(false);
  const route = useRouter();
  const local = useLocale();
  const handlePressKey = (e: any) => {
    if (e.key === "F12") {
      e.preventDefault(); // Prevent default browser behavior
      route.push(`/${local}/orders`);
    } else if (e.key === "F9") {
      e.preventDefault(); // Prevent default browser behavior
      // pring and save
      orderList.length > 0 ? handlePrintAsync() : toast.error(t("Form.errorMessage"), toastMessages.OPTION);
    } else if (e.key === "Escape" && newCustomer) {
      e.preventDefault(); // Prevent default browser behavior
      // close update
      setNewCustomer(false);
    } else if (e.key === "Escape" && !newCustomer) {
      e.preventDefault(); // Prevent default browser behavior
      // close update
      window.location.reload();
    } else if (e.key === "F3") {
      e.preventDefault(); // Prevent default browser behavior
      setNewCustomer(true);
    } else if (e.key === "F2") {
      e.preventDefault(); // Prevent default browser behavior
      // redirect to orders list
      window.location.reload();
    } else if (e.key === "F1" && !newCustomer && lastOrders.length > 0) {
      e.preventDefault(); // Prevent default browser behavior
      // exit modal
      setIsDisplayLastOrder(false);
    }
  };

  const t1 = useTranslations("Body");

  // update form
  const [formData, setFormData] = useState(customer);

  const handleUpdateChange = (e: any) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdateCustomerAsync = async (e: any) => {
    e.preventDefault();

    const { Name, Tel, Str }: ICustomers = formData;

    if (!Name || !Tel || !Str) {
      return toast.error(t1("Form.inCompleteMessage"), toastMessages.OPTION);
    }

    // const addCustomer = await addDataToTextFile<ICustomers>(formData, Tables.Customers)
    const updateCustomer = await updateDataToMongoDB(`${customer.KNr!}` ?? "0", formData, Tables.Customers);

    if (updateCustomer.status) {
      toast.success(t1("Form.successMessage"), toastMessages.OPTION);
      setNewCustomer(false);
    } else {
      toast.error(t1("Form.errorMessage"), toastMessages.OPTION);
    }
  };

  return (
    <div onKeyDown={(e) => handlePressKey(e)}>
      {newCustomer && customerFormLastData && (
        <div className="flex flex-row w-full justify-center">
          <Form
            formData={formData}
            fields={customerFormLastData?.inputFields}
            handleChange={handleUpdateChange}
            handleSubmit={handleUpdateCustomerAsync}
            handleClose={() => setNewCustomer(false)}
            filteredStr={customerFormLastData.filteredStr} //TOOD: UPDATE
          />
        </div>
      )}

      <table className="min-w-full text-left rounded-sm text-sm font-light  pb-1">
        <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600 rounded-md">
          <tr>
            {OrderColumns.length > 0 &&
              OrderColumns.map((l) => {
                return (
                  <th scope="col" key={l} className={clsx(`px-6 py-2 text-left`)}>
                    {l}
                  </th>
                );
              })}
          </tr>
        </thead>
      </table>
      <div className="flex flex-row w-full mt-0 text-left">
        {orderList.length > 0 ? (
          <TableOrder items={orderList} columns={OrderColumns} deleteRow={() => console.log("under construction F")} />
        ) : (
          <>{isDisplayLastOrder && <TableLastOrders ordered={lastOrders} />}</>
        )}
      </div>

      <div className="flex flex-row mx-2 my-4 p-2 bg-blue-900 justify-between w-full">
        <FormCreateOrder
          formDataModal={formDataModal}
          handleChange={change}
          handleSubmitFormOrder={submitAsync}
          addToOrderList={addToOrderList}
          handlePrint={handlePrintAsync}
          isSubmitted={isSubmitted}
          orderList={orderList}
          lastOrders={lastOrders}
          customerInfo={customer}
        />
      </div>
    </div>
  );
};
