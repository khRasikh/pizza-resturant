"use client"
import { IField, IForm, } from '../interface/general';

const Form = ({ formData, fields, handleChange, handleSubmit, handleClose }: IForm) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                    <tbody>
                        <tr>
                            {fields.map((field, index) => (
                                <td key={index} className="whitespace-nowrap pl-2 py-4 border-gray-500">
                                    <input
                                        type="text"
                                        name={field.name}
                                        value={formData[field.name]}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded-md"
                                        placeholder={field.placeholder}
                                    />
                                </td>
                            ))}
                            <td className="whitespace-nowrap px-2 py-4">
                                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-lg text-white font-bold py-1 px-3 mr-2 rounded">
                                    +
                                </button>
                                <button onClick={handleClose} type="button" className="bg-red-500 hover:bg-red-700 text-lg text-white font-bold py-1 px-3 rounded">
                                    -
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </form>
    );
};


export interface MENUFORM {
    formData: any;
    fields: IField[];
    handleChange: (e: any) => void;
    handleSubmit: (e: any) => void;
}
export const FormMenu = ({ formData, fields, handleChange, handleSubmit }: MENUFORM) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                    <tbody>
                        <tr>
                            {fields.map((field, index) => {
                                if (field.name === "category") {
                                    return (
                                        <td key={index} className="whitespace-nowrap pl-2 py-4 border-gray-500">
                                            <select
                                                role="text"
                                                name={field.name}
                                                value={formData[field.name]}
                                                onChange={(e) => handleChange(e)}
                                                className="w-full py-2 px-6 border rounded-md"
                                                placeholder={field.placeholder}
                                            >
                                                <option value="">select</option>
                                                <option value="Getränke">Getränke</option>
                                                <option value="Drehspieß">Drehspieß</option>
                                            </select>
                                        </td>)
                                }
                                if (field.name === "extra" && typeof (field.value) === "object") {
                                    return null //TODO: 
                                }

                                return (
                                    <td key={index} className="whitespace-nowrap pl-2 py-4 border-gray-500">
                                        <input
                                            type="text"
                                            name={field.name}
                                            value={formData[field.name]}
                                            onChange={handleChange}
                                            className="w-full p-2 border rounded-md"
                                            placeholder={field.placeholder}
                                        />
                                    </td>
                                )
                            })}

                            <td className="whitespace-nowrap px-2 py-4">
                                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-lg text-white font-bold py-1 px-3 mr-2 rounded">
                                    Add +
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
