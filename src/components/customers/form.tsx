"use client"
import { getMenusFromFile } from '@/app/fileCrud';
import { useEffect, useState } from 'react';
import { IArticles, IArticlesForm, IForm, IFormModal } from '../interface/general';
import { useTranslations } from 'next-intl';

export const FormCreateOrder = ({ formDataModal, fields, handleChange, handleSubmit, addToOrderList, handlePrint, isSubmitted }: IFormModal) => {
    const sizes = ["SinglPreis", "JumboPreis", "FamilyPreis", "PartyPreis"]

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
    const [selectPrice, setSelectPrice] = useState<IArticles>();

    const handleChangeCompNum = (e: any) => {
        const value = e.target.value;
        setSelectedOption(value);

        // Find the price associated with the selected CompNum
        const selectedMenu = menu.length > 0 && menu.find((item) => item.CompNum.toString() === value.toString()
        );

        if (selectedMenu) {
            formDataModal[selectedMenu.SinglPreis.toString()]
            console.log("test  e.target.value", selectedMenu.SinglPreis, formDataModal[selectedMenu.SinglPreis], selectedMenu)
            setSelectedPrice(selectedMenu.SinglPreis.toString());
            setSelectPrice(selectedMenu);
        } else {
            setSelectedPrice('');
        }
    };

    const handleChangePrice = (e: any) => {
        const value = e.target.value;
        console.log("test pricexxx", value, sizes[0])

        if (selectPrice) {
            console.log(formDataModal[selectPrice.SinglPreis.toString()])
            if (value.toString().toLowerCase() === sizes[0].toLowerCase()) {
                console.log("test price1", selectPrice)
                setSelectedPrice(formDataModal[selectPrice.SinglPreis.toString()])
            } else if (value.toString().toLowerCase() === sizes[1].toLowerCase()) {
                console.log("test price2", selectPrice)
                setSelectedPrice(formDataModal[selectPrice.JumboPreis.toString()])
            } else if (value.toString().toLowerCase() === sizes[2].toLowerCase()) {
                console.log("test price3", selectPrice)
                setSelectedPrice(formDataModal[selectPrice.FamilyPreis.toString()])
            } else if (value.toString().toLowerCase() === sizes[3].toLowerCase()) {
                console.log("test price4", selectPrice)
                setSelectedPrice(formDataModal[selectPrice.PartyPreis.toString()])
            }
            // formDataModal[selectedMenu.SinglPreis.toString()]
            // setSelectedPrice(selectedMenu.SinglPreis.toString());
            // setSelectPrice(selectedMenu);
        } else {
            setSelectedPrice('');
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className="overflow-hidden">
                <div className="w-full">
                    <table className="min-w-full text-left text-sm font-light items-center justify-center">
                        <tbody>
                            <tr className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2">
                                <td className={`${"pl-1 py-4 border-gray-500"}`}>
                                    <select
                                        className="w-full p-2 border rounded-md"
                                        value={selectedOption}
                                        onChange={handleChangeCompNum}
                                    >
                                        <option value="">Select an option</option>
                                        {menu.length > 0 &&
                                            menu.map((item) => (
                                                <option key={item.CompNum} value={item.CompNum}>
                                                    {item.CompNum}: {item.Name}
                                                </option>
                                            ))}
                                    </select>
                                </td>
                                <td className={`${"pl-1 py-4 border-gray-500"}`}>
                                    <select className="w-full p-2 border rounded-md" onChange={handleChangePrice}>
                                        {sizes.length > 0 &&
                                            sizes.map((s) => (
                                                <option key={s} value={s}>
                                                    {s}
                                                </option>

                                            ))}
                                    </select>
                                </td>
                                <td className={`${"pl-1 py-4 border-gray-500"}`}>
                                    <input
                                        type="text"
                                        name="price"
                                        value={selectedPrice}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded-md"
                                        placeholder="Price"
                                    />
                                </td>
                                {fields.map((field, index) => {
                                    if (field.placeholder === "Kr-Nr") return null
                                    return (
                                        <td key={index} className={`${"pl-1 py-4 border-gray-500"}`}>
                                            <input
                                                type="text"
                                                name={field.name}
                                                value={formDataModal[field.name]}
                                                onChange={handleChange}
                                                className="w-full p-2 border rounded-md"
                                                placeholder={field.placeholder}
                                            />
                                        </td>
                                    )
                                }
                                )}


                                <td>
                                    <div className='flex'>
                                        <button className='mx-4 mt-4 py-2 flex' type='button' onClick={addToOrderList}>
                                            <svg className="w-4 h-4 text-green-800 hover:bg-green-300 hover:text-black rounded-full dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                            <p className='text-black hover:text-green-700 font-bold px-1 text-md'>New</p>
                                        </button>
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
    return (
        <form onSubmit={handleSubmit}>
            <div className="overflow-hidden">
                <div className="w-full">
                    <table className="min-w-full text-left text-sm font-light items-between justify-between">
                        <tbody>
                            <tr className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-2 ">
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

export const FormMenu = ({ formData, fields, handleChange, handleSubmit }: IArticlesForm) => {
    const t = useTranslations("Body")
    return (
        <form onSubmit={handleSubmit}>
            <div className="overflow-hidden">
                <div className="w-full">
                    <table className="min-w-full text-left text-sm font-light items-between justify-between">
                        <tbody>
                            <tr className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-2 ">
                                {fields.map((field, index) => {
                                    // if (field.name === "category") {
                                    //     return (
                                    //         <td key={index} className={`${"pl-1 py-4 border-gray-500"}`}>
                                    //             <select
                                    //                 role="text"
                                    //                 name={field.name}
                                    //                 value={formData[field.name]}
                                    //                 onChange={(e) => handleChange(e)}
                                    //                 className="w-full py-2 px-6 border rounded-md"
                                    //                 placeholder={field.placeholder}
                                    //             >
                                    //                 <option value="">{t("Form.select")}</option>
                                    //                 <option value="Getränke">Getränke</option>
                                    //                 <option value="Drehspieß">Drehspieß</option>
                                    //             </select>
                                    //         </td>
                                    //     );
                                    // }

                                    // if (field.name === "shift") {
                                    //     return (
                                    //         <td key={field.name} className={`${"pl-1 py-4 border-gray-500"}`}>
                                    //             <select
                                    //                 role="text"
                                    //                 name={field.name}
                                    //                 value={formData[field.name]}
                                    //                 onChange={(e) => handleChange(e)}
                                    //                 className="w-full py-2 px-6 border rounded-md"
                                    //                 placeholder={field.placeholder}
                                    //             >
                                    //                 <option value="">{t("Form.select")}</option>
                                    //                 <option value="morgen">morgen</option>
                                    //                 <option value="abend">abend</option>
                                    //             </select>
                                    //         </td>
                                    //     );
                                    // }

                                    // if (field.name === "extra" && typeof field.value === "object") {
                                    //     return null; // TODO: 
                                    // }

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
