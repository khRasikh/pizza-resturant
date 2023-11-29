"use client"
import React, { ChangeEvent, FormEvent } from 'react';
interface FormProps {
    formData: any;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}
const Form = ({ formData, handleChange, handleSubmit }: FormProps) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="overflow-hidden bg-slate-200">
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
                                    name="First_Name"
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
                                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-lg text-white font-bold py-1 px-3 rounded">
                                    +
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
