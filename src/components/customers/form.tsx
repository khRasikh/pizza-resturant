"use client"
import { IForm, MENUFORM, } from '../interface/general';
import { useTranslations } from 'next-intl';

const Form = ({ formData, fields, handleChange, handleSubmit, handleClose }: IForm) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="overflow-hidden">
                <div className="w-full">
                    <table className="min-w-full text-left text-sm font-light items-between justify-between">
                        <tbody>
                            <tr className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-2 ">
                                {fields.map((field) => (
                                    <td key={field.name} className={`${"pl-1 py-4 border-gray-500"}`}>
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
                                    <button onClick={handleClose} type="button" className="bg-red-500 hover:bg-red-700 text-lg text-white font-extrabold py-1 px-3 rounded">
                                        -
                                    </button>
                                    <button type="submit" className="bg-green-500 hover:bg-green-700 text-lg text-white font-extrabold py-1 px-3 ml-2 rounded">
                                        +
                                    </button>

                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </form>
    );
};

export const FormMenu = ({ formData, fields, handleChange, handleSubmit }: MENUFORM) => {
    const t = useTranslations("Body")
    return (
        <form onSubmit={handleSubmit}>
            <div className="overflow-hidden">
                <div className="w-full">
                    <table className="min-w-full text-left text-sm font-light items-between justify-between">
                        <tbody>
                            <tr className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-2 ">
                                {fields.map((field, index) => {
                                    if (field.name === "category") {
                                        return (
                                            <td key={field.name} className={`${"pl-1 py-4 border-gray-500"}`}>
                                                <select
                                                    role="text"
                                                    name={field.name}
                                                    value={formData[field.name]}
                                                    onChange={(e) => handleChange(e)}
                                                    className="w-full py-2 px-6 border rounded-md"
                                                    placeholder={field.placeholder}
                                                >
                                                    <option value="">{t("Form.select")}</option>
                                                    <option value="Getränke">Getränke</option>
                                                    <option value="Drehspieß">Drehspieß</option>
                                                </select>
                                            </td>
                                        );
                                    }

                                    if (field.name === "shift") {
                                        return (
                                            <td key={field.name} className={`${"pl-1 py-4 border-gray-500"}`}>
                                                <select
                                                    role="text"
                                                    name={field.name}
                                                    value={formData[field.name]}
                                                    onChange={(e) => handleChange(e)}
                                                    className="w-full py-2 px-6 border rounded-md"
                                                    placeholder={field.placeholder}
                                                >
                                                    <option value="">{t("Form.select")}</option>
                                                    <option value="morgen">morgen</option>
                                                    <option value="abend">abend</option>
                                                </select>
                                            </td>
                                        );
                                    }

                                    if (field.name === "extra" && typeof field.value === "object") {
                                        return null; // TODO: 
                                    }

                                    const inputType = field.name === "id";
                                    return (
                                        <td key={field.name} className={`${field.name === "description" ? "lg:col-span-2 pl-1 py-4 border-gray-500" : "pl-1 py-4 border-gray-500"}`}>
                                            <input
                                                type={`${inputType ? "number" : "text"}`}
                                                name={field.name}
                                                value={formData[field.name]}
                                                onChange={handleChange}
                                                className="w-full p-2 border rounded-md"
                                                placeholder={field.placeholder}
                                            />
                                        </td>
                                    );
                                })}

                                <td className=" px-1 py-4 flex items-center justify-end lg:justify-start">
                                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-lg text-white font-bold py-1 px-3 mr-2 rounded">
                                        {t("Button.add").replace("Record", "Menu")}
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>


        </form>
    );
};

export default Form;
