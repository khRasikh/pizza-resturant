"use client"
import React, { useEffect, useState } from 'react';
import { FormCreateOrder } from './form';
import { OrderColumns, clearOrderFields, toastMessages } from '../shared/constants';
import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';
import { TableOrder, TableOrderList } from '../shared/table';
import { handlePrint } from '../lib/print';
import { IOrderModal } from '../interface/general';

export const OrderModal: React.FC<IOrderModal> = ({ toggleModal, customer }) => {
    const [formData, setFormData] = useState(clearOrderFields);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const t = useTranslations("Body")

    const orderFields = [
        { name: "id", value: formData.id, placeholder: `${t("Form.id")}` },
        // { name: "name", value: formData.name, placeholder: `${t("Form.name")}` },
        { name: "count", value: formData.count, placeholder: `${t("Form.count")}` },
        { name: "price", value: formData.price, placeholder: `${t("Form.price")}` },
        { name: "extra", value: formData.extra, placeholder: `${t("Form.extra")}` },
        { name: "total", value: formData.total, placeholder: `${t("Form.total")}` },
    ]
    const [orderList, setOrderList] = useState<any[]>([]); // Step 1: New state for array of values

    // Function to add values to the array in formData
    const addToOrderList = () => {

        const newOrder = { ...formData };
        const { id, name, price, count, extra, total, created_at } = formData;

        if (!id) {
            return toast.error(t("Form.inCompleteMessage").replace("record", id), toastMessages.OPTION);
        } else if (!count) {
            return toast.error(t("Form.inCompleteMessage").replace("record", count), toastMessages.OPTION);
        } else if (!price) {
            return toast.error(t("Form.inCompleteMessage").replace("record", price), toastMessages.OPTION);
        } else if (!extra) {
            return toast.error(t("Form.inCompleteMessage").replace("record", extra), toastMessages.OPTION);
        }

        setOrderList([...orderList, newOrder]);
    };

    const submit = async (e: any) => {
        e.preventDefault();

        const { id, name, price, count, extra, total, created_at, } = formData;

        if (!id) {
            return toast.error(t("Form.inCompleteMessage").replace("record", id), toastMessages.OPTION);
        } else if (!count) {
            return toast.error(t("Form.inCompleteMessage").replace("record", count), toastMessages.OPTION);
        } else if (!price) {
            return toast.error(t("Form.inCompleteMessage").replace("record", price), toastMessages.OPTION);
        } else if (!extra) {
            return toast.error(t("Form.inCompleteMessage").replace("record", extra), toastMessages.OPTION);
        }
        
        // Here, implement your code to send formData to your backend API
        const addOrder = await fetch("/api/psql/order/add", {
            method: "POST",
            body: JSON.stringify(orderList),
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-cache",
        });

        if (addOrder.status == 200) {
            setFormData(clearOrderFields);
            toast.success(t("Form.successMessage").replace("record", "Customer"), toastMessages.OPTION);
            // toggleModal()
            setIsSubmitted(true)
        } else {
            toast.error(t("Form.errorMessage").replace("record", "Customer"), toastMessages.OPTION);
        }
    };

    const change = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

   
    return (
        <div className="overflow-y-auto overflow-x-hidden fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-300 bg-opacity-70 z-50">
            <div className="bg-white overflow-x-hidden rounded-lg p-4 md:p-8 min-w-[95%] md:min-w-[80%] lg:max-w-[50%]">
                <div className="overflow-y-auto overflow-x-hidden relative h-[70vh] max-h-[70vh]">
                    <div className="overflow-y-auto overflow-x-hidden flex items-center justify-between border-b mb-5">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Create New Order for Customer {customer.name} {customer.last_name}
                        </h3>
                        <button
                            type="button"
                            onClick={toggleModal}
                            className="text-red-400 hover:bg-red-200 mb-4 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
                            data-modal-toggle="crud-modal"
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only ">Close modal</span>
                        </button>
                    </div>

                    <FormCreateOrder formDataModal={formData} fields={orderFields} handleChange={change} handleSubmit={submit} addToOrderList={addToOrderList}
                        handlePrint={() => handlePrint({ orderList, toggleModal })} isSubmitted={isSubmitted} />

                    {orderList.length > 0 && <div className="overflow-scroll max-h-[40vh]">
                        <TableOrder items={orderList} columns={OrderColumns} />
                    </div>
                    }
                    {/* {<TableOrderList id={"69"}/>} */}
                </div>
            </div>
        </div>
    );
}