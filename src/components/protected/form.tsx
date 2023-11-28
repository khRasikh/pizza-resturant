"use client"
import React, { useState } from 'react';
import { clearCustomerForm, toastMessages } from '../shared/constants';
import { toast } from 'react-toastify';

const Form = () => {
    const [formData, setFormData] = useState(clearCustomerForm);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        // Here, implement your code to send formData to your backend API
        const addCustomer = await fetch('/api/psql/add', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (addCustomer.ok) {
            setFormData(clearCustomerForm);
            toast.success('A new customer has been added', toastMessages.OPTION);
        } else {
            toast.error('Faild to add new record', toastMessages.OPTION);
        }

    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    return (
        <form onSubmit={handleSubmit}>
            <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                    <tbody>
                        <tr>
                            <td className="whitespace-nowrap px-2 py-4 border-gray-500">
                                <input
                                    type="text"
                                    name="Id"
                                    value={formData.Id}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md"
                                    placeholder='ID#'
                                />
                            </td>
                            <td className="whitespace-nowrap px-2 py-4">
                                <input
                                    type="text"
                                    name="First Name"
                                    value={formData.First_Name}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md"
                                    placeholder='First Name'
                                />
                            </td>
                            <td className="whitespace-nowrap px-2 py-4">
                                <input
                                    type="text"
                                    name="Last_Name"
                                    value={formData.Last_Name}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md"
                                    placeholder='Last Name'
                                />
                            </td>
                            <td className="whitespace-nowrap px-2 py-4">
                                <input
                                    type="text"
                                    name="Phone_Number"
                                    value={formData.Phone_Number}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md"
                                    placeholder='Phone'
                                />
                            </td>
                            <td className="whitespace-nowrap px-2 py-4">
                                <input
                                    type="text"
                                    name="Address"
                                    value={formData.Address}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md"
                                    placeholder='address'
                                />
                            </td>
                            <td className="whitespace-nowrap px-2 py-4">
                                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    add
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </form>
    );
};

export default Form;
