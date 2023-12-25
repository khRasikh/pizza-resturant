"use client"
import React, { useEffect, useState } from 'react';
import { FormCreateOrder } from './form';
import { OrderColumns, clearOrderFields, toastMessages } from '../shared/constants';
import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';
import { TableOrder, TableLastOrders, } from '../shared/table';
import { handlePrint } from '../lib/print';
import { IOrder, IOrderModal } from '../interface/general';
import { getDataByID } from '../shared/psqlCrud';

export const OrderModal: React.FC<IOrderModal> = ({ toggleModal, customer }) => {
    const [formData, setFormData] = useState(clearOrderFields);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const t = useTranslations("Body")



    const [orderList, setOrderList] = useState<IOrder[]>([]);

    // Function to add values to the array in formData
    const addToOrderList = () => {
        const newOrder = { ...formData };

        const { id, name, price, count, total, customer_id } = formData;

        if (!id || !count || !price || !total || !customer_id) {
            return toast.error(t("Form.inCompleteMessage"), toastMessages.OPTION);
        }
        setOrderList([...orderList, newOrder]);
    };

    const submit = async (e: any) => {
        e.preventDefault();

        const { id, name, price, count, extra, total, customer_id } = formData;

        if (!id || !count || !price || !customer_id || !total) {
            return toast.error(t("Form.inCompleteMessage"), toastMessages.OPTION);
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
            toast.success(t("Form.successMessage"), toastMessages.OPTION);
            setIsSubmitted(true)
        } else {
            toast.error(t("Form.errorMessage"), toastMessages.OPTION);
        }
    };

    const change = (e: any) => {
        const { name, value } = e.target;
        let newValue = value;

        if (name === 'total') {
            newValue = parseFloat(value).toFixed(2);
        }
        formData["customer_id"] = customer.KNr!
        formData["discount"] = customer.Rabatt!
        setFormData({
            ...formData,
            [name]: newValue
        });
    };

    // lastOrders table 
    const [lastOrders, setLastOrders] = useState<any[]>([])
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                if (customer.KNr !== 0) {
                    const getLastOrders = await getDataByID("orders", customer.KNr!)

                    if (getLastOrders.body.length > 0) {
                        setLastOrders(getLastOrders.body)
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchOrders()
    }, [lastOrders])

    return (
        <div className="overflow-y-auto overflow-x-hidden fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-300 bg-opacity-70 z-50">
            <div className="bg-white overflow-x-hidden rounded-lg p-4 md:p-8 min-w-[95%] md:min-w-[80%] lg:max-w-[50%]">
                <div className="overflow-y-auto overflow-x-hidden relative h-[70vh] max-h-[70vh]">
                    <div className="overflow-y-auto overflow-x-hidden flex items-center justify-between border-b mb-5">
                        <h3 className="text-lg text-black mb-4">
                            {t("Label.createNewOrder")} {customer.Name}(<span className='text-green-700 font-bold'> {customer.KNr}</span>)
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
                        </button>
                    </div>

                    <FormCreateOrder formDataModal={formData} handleChange={change} handleSubmit={submit} addToOrderList={addToOrderList}
                        handlePrint={() => handlePrint({ customer, orderList, toggleModal })} isSubmitted={isSubmitted} />

                    <div className="overflow-scroll max-h-[30vh]">
                        <TableOrder items={orderList} columns={OrderColumns} />
                    </div>

                    {lastOrders.length > 0 && <div className="overflow-scroll max-h-[20vh] justify-center items-center text-center
                    mt-6 bg-slate-200">
                        <h3 className="text-lg text-black py-2">
                            {t("Label.lastOrders")} {customer.Name}(<span className='text-green-700 font-bold'> {customer.KNr}</span>)
                        </h3>
                        <TableLastOrders ordered={lastOrders} />
                    </div>
                    }
                </div>
            </div>
        </div>
    );
}