"use client"
import { getMenusFromFile } from '@/app/fileCrud';
import { ChangeEvent, useEffect, useState } from 'react';
import { IArticles, IArticlesForm, IForm, IFormModal } from '../interface/general';
import { useTranslations } from 'next-intl';
import { formatNumber } from '../shared/constants';

export const FormCreateOrder = ({ formDataModal, handleChange, handleSubmit, addToOrderList, handlePrint, isSubmitted }: IFormModal) => {
    const sizes = ["SinglPreis", "JumboPreis", "FamilyPreis", "PartyPreis"] as const

    const [menu, setMenu] = useState<IArticles[]>([])
    useEffect(() => {
        const fetchMenus = async () => {
            const menus = await getMenusFromFile()
            if (menus.data) {
                setMenu(menus.data)
            }
        }
        fetchMenus()

    }, [])


    const [selectedOption, setSelectedOption] = useState('');
    const [selectedPrice, setSelectedPrice] = useState<string>();

    const [priceOptions, setPriceOptions] = useState<any[]>()
    const handleChangeCompNum = (e: any) => {
        const value = e.target.value;
        setSelectedOption(value);

        // Find the price associated with the selected CompNum
        const selectedMenu = menu.length > 0 && menu.find((item) => item.CompNum.toString() === value.toString()
        );

        if (selectedMenu) {

            setSelectedPrice(selectedMenu.SinglPreis.toString()); // selected by default
            const priceDetails = sizes.map(priceKey => ({
                name: priceKey,
                price: selectedMenu[priceKey]
            }));

            setPriceOptions(priceDetails)
            formDataModal["id"] = value
            formDataModal["name"] = selectedMenu.Name

        } else {
            setSelectedPrice('');
        }
    };


    const handleChangePrice = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedPrice(value)
        formDataModal["price"] = value;
    };


    const [count, setCount] = useState<number>(0);
    const [extra, setExtra] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);

    const handleCountChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newCount = parseInt(e.target.value);
        setCount(newCount);
        calculateTotal(newCount, extra);
        formDataModal["count"] = newCount;
    };

    const handleExtraChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newExtra = parseInt(e.target.value);
        setExtra(newExtra);
        formDataModal["extra"] = newExtra;
        calculateTotal(count, newExtra);
    };

    const calculateTotal = (newCount: number, newExtra: number) => {
        if (selectedPrice) {
            const newTotal = newCount * parseFloat(selectedPrice) + newExtra;
            formDataModal["total"] = newTotal;
            setTotal(newTotal); // Format to two decimal places using formatNumber function
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="overflow-hidden">
                <div className="w-full">
                    <table className="min-w-full text-left text-sm font-light items-center justify-center">
                        <tbody>
                            <tr className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-2">
                                <td className={`${"pl-1 py-4 border-gray-500"}`}>
                                    <select
                                        className="w-full p-2 border rounded-md"
                                        value={selectedOption}
                                        onChange={handleChangeCompNum}
                                    >
                                        <option value="">Select an option</option>
                                        {menu.length > 0 &&
                                            menu.map((item) => (
                                                <option key={item.CompNum}
                                                    value={item.CompNum}
                                                >
                                                    {item.CompNum}: {item.Name}
                                                </option>
                                            ))}
                                    </select>
                                </td>
                                <td className={`${"pl-1 py-4 border-gray-500"}`}>
                                    <select className="w-full p-2 border rounded-md" onChange={handleChangePrice}>
                                        {priceOptions && priceOptions.length > 0 &&
                                            priceOptions.map((p) => (
                                                <option key={p.name} value={p.price}>
                                                    {p.name}
                                                </option>
                                            ))}
                                    </select>
                                </td>
                                <td className={`${"pl-1 py-4 border-gray-500"}`}>
                                    <input
                                        type="text"
                                        name="price"
                                        value={formDataModal["price"]}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded-md disabled"
                                        placeholder="Price"
                                    />
                                </td>
                                <td className={`${"pl-1 py-4 border-gray-500"}`}>
                                    <input
                                        type="number"
                                        value={formDataModal["extra"]}
                                        name="extra"
                                        onChange={handleExtraChange}
                                        className="w-full p-2 border rounded-md disabled"
                                        placeholder="extra"
                                    />
                                </td>

                                <td className={`${"pl-1 py-4 border-gray-500"}`}>
                                    <input
                                        type="number"
                                        value={formDataModal["count"]}
                                        name="count"
                                        onChange={handleCountChange}
                                        className="w-full p-2 border rounded-md disabled"
                                        placeholder="count"
                                    />
                                </td>

                                <td className={`${"pl-1 py-4 border-gray-500"}`}>
                                    <input
                                        type="text"
                                        name="total"
                                        value={formatNumber(total)}
                                        className="w-full p-2 border rounded-md disabled"
                                        placeholder="Price"
                                    />
                                </td>

                                <td>
                                    <div className='flex'>
                                        {!isSubmitted && <button className='mx-4 mt-4 py-2 flex' type='button' onClick={addToOrderList}>
                                            <svg className="w-4 h-4 text-green-800 hover:bg-green-300 hover:text-black rounded-full dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                            <p className='text-black hover:text-green-700 font-bold px-1 text-md'>New</p>
                                        </button>}
                                        {!isSubmitted ? <button type="submit" className='my-5 py-1 flex px-2' onClick={() => handleSubmit}>
                                            <svg className="w-4 h-4 text-black hover:text-green-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="20" fill="none" viewBox="0 0 18 20">
                                                <path stroke="currentColor" stroke-linecap="round" strokeWidth="3" d="M12 2h4a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h4m6 0v3H6V2m6 0a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1M5 5h8m-5 5h5m-8 0h.01M5 14h.01M8 14h5" />
                                            </svg>
                                            <p className='text-black hover:text-green-700 font-bold px-1 text-md'>Save</p>

                                        </button> :
                                            <button type='button' className='my-5 py-1 flex px-2' onClick={handlePrint}>
                                                <svg className="w-4 h-4 hover:text-green-800 text-black dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M5 20h10a1 1 0 0 0 1-1v-5H4v5a1 1 0 0 0 1 1Z" />
                                                    <path d="M18 7H2a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2v-3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Zm-1-2V2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3h14Z" />
                                                </svg>
                                                <p className='text-black hover:text-green-700 font-bold px-1 text-md'>Print</p>
                                            </button>}
                                            <button type='button' className='my-5 py-1 flex px-2' onClick={handlePrint}>
                                                <svg className="w-4 h-4 hover:text-green-800 text-black dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M5 20h10a1 1 0 0 0 1-1v-5H4v5a1 1 0 0 0 1 1Z" />
                                                    <path d="M18 7H2a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2v-3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Zm-1-2V2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3h14Z" />
                                                </svg>
                                                <p className='text-black hover:text-green-700 font-bold px-1 text-md'>Print</p>
                                            </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </form>
    );
};

const Form = ({ formData, fields, handleChange, handleSubmit, handleClose }: IForm) => {
    const t = useTranslations("Body")
    return (
        <form onSubmit={handleSubmit}>
            <div className="overflow-hidden">
                <div className="w-full">
                    <table className="min-w-full text-left text-sm font-light items-between justify-between">
                        <tbody>
                            <tr className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 ">
                                {fields.map((field, index) => (
                                    <td key={index} className={`${"pl-1 py-4 border-gray-500"}`}>
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
                                <td className="whitespace-nowrap px-2 py-4 flex">
                                    <button
                                        type="submit"
                                        className="flex rounded-md hover:text-black hover:font-bold
                                        bg-green-700 hover:white pr-4 pl-2 pb-2 pt-2 text-sm font-medium 
                                        leading-normal text-primary hover:text-primary-600 focus:text-primary-600
                                        focus:outline-none focus:ring-0 active:text-primary-700 shadow-md mx-2">
                                        <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                            className="w-6 h-5 font-bold hover:text-green-700">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg></span>
                                        {t("Button.submit")}
                                    </button>
                                    <button
                                        onClick={handleClose}
                                        type="button"
                                        className="flex rounded-md  hover:font-bold
                                        bg-red-700 text-white hover:text-black pr-4 pl-2 pb-2 pt-2 text-sm font-medium 
                                        leading-normal text-primary hover:text-primary-600 focus:text-primary-600
                                        focus:outline-none focus:ring-0 active:text-primary-700 shadow-md mx-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                            className="w-6 h-5 font-bold hover:text-green-700">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>

                                        {t("Button.close")}
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

export const FormMenu = ({ formData, fields, handleChange, toggleForm, handleSubmit }: IArticlesForm) => {
    const t = useTranslations("Body")
    return (
        <form onSubmit={handleSubmit}>
            <div className="overflow-hidden">
                <div className="w-full">
                    <table className="min-w-full text-left text-sm font-light items-between justify-between">
                        <tbody>
                            <tr className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-2 ">
                                {fields.map((field, index) => {
                                    const inputType = field.name === "id";
                                    return (
                                        <td key={field.name} className={`lg:col-span-2 pl-1 py-4 border-gray-500" `}>
                                            <input
                                                type={`${inputType ? "number" : "text"}`}
                                                name={field.name as string}
                                                value={formData[field.name]}
                                                onChange={handleChange}
                                                className="w-full p-2 border rounded-md"
                                                placeholder={field.placeholder}
                                            />
                                        </td>
                                    );
                                })}

                                <td className="col-span-4 px-1 py-4 flex items-center justify-end lg:justify-start">
                                    <button
                                        type="submit"
                                        className="flex rounded-md hover:text-black hover:font-bold
                                        bg-green-700 hover:white pr-4 pl-2 pb-2 pt-2 text-sm font-medium 
                                        leading-normal text-primary hover:text-primary-600 focus:text-primary-600
                                        focus:outline-none focus:ring-0 active:text-primary-700 shadow-md mx-2">
                                        <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                            className="w-6 h-5 font-bold hover:text-green-700">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg></span>
                                        {t("Button.addMenu")}
                                    </button>
                                    <button
                                        onClick={toggleForm}
                                        type="button"
                                        className="flex rounded-md  hover:font-bold
                                        bg-red-700 text-white hover:text-black pr-4 pl-2 pb-2 pt-2 text-sm font-medium 
                                        leading-normal text-primary hover:text-primary-600 focus:text-primary-600
                                        focus:outline-none focus:ring-0 active:text-primary-700 shadow-md mx-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                            className="w-6 h-5 font-bold hover:text-green-700">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>

                                        {t("Button.close")}
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
