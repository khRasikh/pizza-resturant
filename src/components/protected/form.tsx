"use client"
import React, { useState } from 'react';
import { clearCustomerForm } from '../shared/constants';
import { toast } from 'react-toastify';

const Form = () => {
    const [formData, setFormData] = useState(clearCustomerForm);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            // Here, implement your code to send formData to your backend API
            fetch('/api/psql/add', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Clear form fields after successful submission
            setFormData(clearCustomerForm);
            toast.success('Failed to delete customer', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
            });
        } catch (error) {
            toast.error('Failed to delete customer', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
            });
            console.error('Error submitting form data:', error);
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
                    <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600 rounded-md">
                        <tr>
                            <th scope="col" className="px-6 py-4">
                                ID#
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Last Name
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Phone Number
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Address
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="whitespace-nowrap px-6 py-4">
                                <input
                                    type="text"
                                    name="Id"
                                    value={formData.Id}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md"
                                />
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                                <input
                                    type="text"
                                    name="First_Name"
                                    value={formData.First_Name}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md"
                                />
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                                <input
                                    type="text"
                                    name="Last_Name"
                                    value={formData.Last_Name}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md"
                                />
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                                <input
                                    type="text"
                                    name="Phone_Number"
                                    value={formData.Phone_Number}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md"
                                />
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                                <input
                                    type="text"
                                    name="Address"
                                    value={formData.Address}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md"
                                />
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Submit
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
