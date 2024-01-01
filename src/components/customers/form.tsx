"use client"
import { ChangeEvent, useEffect, useState } from 'react';
import { IArticles, IArticlesForm, ICustomers, IForm, IFormModal } from '../interface/general';
import { useTranslations } from 'next-intl';
import { extaListStatic, formatNumber } from '../shared/constants';
import { getMenusFromMongoDB } from '../shared/mongodbCrud';
import clsx from 'clsx';
import { PrintIcon, SaveIcon } from '../shared/icons';

export const FormCreateOrder = ({ formDataModal, handleChange, handleSubmit, addToOrderList, handlePrint, isSubmitted }: IFormModal) => {
    const t = useTranslations("Body")
    const sizes = ["SinglPreis", "JumboPreis", "FamilyPreis", "PartyPreis"] as const
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedPrice, setSelectedPrice] = useState<string>();
    const [priceOptions, setPriceOptions] = useState<any[]>()
    const [count, setCount] = useState<number>(0);
    const [extra, setExtra] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [discount, setDiscount] = useState<number>(0);
    const [menu, setMenu] = useState<IArticles[]>([])

    useEffect(() => {
        const fetchMenus = async () => {
            // const menus = await getMenusFromFile()
            const menus = await getMenusFromMongoDB("menus")
            if (menus.data) {
                setMenu(menus.data)
            }
        }
        fetchMenus()

    }, [])

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

    const [category, setCategory] = useState("SinglPreis")
    const handleChangePrice = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setCategory(JSON.parse(value).name)
        setSelectedPrice(JSON.parse(value).price)
        formDataModal["price"] = formatNumber(parseFloat((JSON.parse(value).price)));
        calculateTotal(formDataModal["count"], extra, discount);
    };

    // Function to calculate the total with discount
    const calculateTotal = (newCount: number, newExtra: number, newDiscount: number) => {
        const c = newCount === 0 ? formDataModal["count"] : newCount
        if (selectedPrice) {
            let discountedTotal = (c * parseFloat(selectedPrice) + newExtra);
            // Calculate the discount amount
            const discountAmount = (discountedTotal * newDiscount) / 100;
            // Apply the discount to the total
            discountedTotal -= discountAmount;

            formDataModal["total"] = discountedTotal;
            // Format the total to two decimal places using formatNumber function if needed
            setTotal(Number(formatNumber(discountedTotal)));
        }
    };

    // Handler for count change
    const handleCountChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newCount = parseInt(e.target.value);
        setCount(newCount);
        calculateTotal(newCount, extra, discount); // Pass discount as an argument here
        formDataModal["count"] = newCount;
    };

    // Handler for extra change
    const extraList = extaListStatic

    const handleExtraChange = (e: any) => {
        const newExtra = Number(e.target.value);
        setExtra(newExtra);
        formDataModal["extra"] = newExtra;
        calculateTotal(count, newExtra, discount); // Pass discount as an argument here
    };

    // Handler for discount change
    const handleDiscountChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newDiscount = parseInt(e.target.value)
        setDiscount(newDiscount);
        calculateTotal(count, extra, newDiscount); // Pass the new discount as an argument here
        formDataModal["discount"] = newDiscount
    };

    // const kasset = sessionStorage.getItem("kasset") ? sessionStorage.getItem("kasset") : "1" //TODO: Kassets
    /**
     * 
     * if kasset 2 following prices should be changed or decreased 20% off:
     * all single pizza price €5.90
     * all jumbo pizza price €8.90
     * all family pizza price €5.90
     * all party pizza price €10
     */
    const [isClicked, setIsClicked] = useState(false);

    const handleSubmitOrdersAsync = () => {
        if (!isClicked) {
            () => handleSubmit
            setIsClicked(true);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="overflow-hidden">
                <div className="w-full">
                    <table className="min-w-full text-left text-sm font-light items-center justify-center">
                        <tbody>
                            <tr className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-1">
                                <td className={`${"pl-1 py-1 border-gray-500 font-bold"}`}>
                                    <input
                                        type="number"
                                        value={formDataModal["count"] === 0 ? "" : formDataModal["count"]}
                                        name="count"
                                        onChange={handleCountChange}
                                        className="w-full p-2 border rounded-md disabled"
                                        placeholder={t("Form.count")}
                                    />
                                </td>
                                <td className={`${"pl-1 py-1 border-gray-500 font-bold"}`}>
                                    <select
                                        className="w-full p-2 border rounded-md"
                                        value={selectedOption}
                                        onChange={handleChangeCompNum}
                                    >
                                        <option value="">{t("Form.select")}</option>
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
                                <td className={`${"pl-1 py-1 border-gray-500 font-bold"}`}>
                                    <select className="w-full p-2 border rounded-md" onChange={handleChangePrice}>
                                        <option value="">
                                        </option>
                                        {priceOptions && priceOptions.length > 0 &&
                                            priceOptions.map((p) => {
                                                return (
                                                    <option key={p.name} value={JSON.stringify({ name: p.name, price: p.price })}>
                                                        {p.name}
                                                    </option>
                                                )
                                            })}
                                    </select>
                                </td>
                                <td className={`${"pl-1 py-1 border-gray-500 font-bold"}`}>
                                    <input
                                        type="text"
                                        name="price"
                                        value={formDataModal["price"]}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded-md disabled"
                                        placeholder={t("Form.price")}
                                    />
                                </td>


                                <td className={`${"pl-1 py-1 border-gray-500 text-green-700 font-extrabold"}`}>
                                    <input
                                        type="number"
                                        name="rabatt"
                                        onChange={handleDiscountChange}
                                        // value={formDataModal["discount"]}
                                        className="w-full p-2 border rounded-md"
                                        placeholder={`${t("Form.Rabatt")} (%)`}
                                    />
                                </td>

                                <td className={`${"pl-1 py-1 border-gray-500 text-green-700 font-extrabold"}`}>
                                    <input
                                        type="text"
                                        name="total"
                                        value={total > 0 ? formatNumber(formDataModal["total"]) : ""}
                                        className="w-full p-2 border rounded-md disabled"
                                        placeholder={`${t("Form.total")}(€)`}
                                    />

                                </td>

                                <td className={`${"pl-1 py-1 border-gray-500 font-bold"}`}>
                                    <select className="w-full p-2 border rounded-md" onChange={handleExtraChange}>
                                        <option value="">
                                        </option>
                                        {extraList.length > 0 &&
                                            extraList.map((p) => {
                                                if (category === "SinglPreis") {
                                                    return (
                                                        <option key={p.name} value={p.SinglPreis}>
                                                            {p.id}-{p.name}
                                                        </option>
                                                    )
                                                } else if (category === "JumboPreis") {
                                                    return (
                                                        <option key={p.name} value={p.JumboPreis}>
                                                            {p.id}-{p.name}
                                                        </option>
                                                    )
                                                } else if (category === "FamilyPreis") {
                                                    return (
                                                        <option key={p.name} value={p.FamilyPreis}>
                                                            {p.id}-{p.name}
                                                        </option>
                                                    )
                                                } else if (category === "PartyPreis") {
                                                    return (
                                                        <option key={p.name} value={p.PartyPreis}>
                                                            {p.id}-{p.name}
                                                        </option>
                                                    )
                                                }
                                            })}
                                    </select>
                                </td>

                                <td>
                                    <div className='flex'>
                                        {!isSubmitted && <button className='mx-1 mt-2 py-2 flex' type='button' onClick={addToOrderList}>
                                            <svg className="w-4 h-4 text-green-800 hover:bg-green-300 hover:text-black rounded-full dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                            <p className='text-black hover:text-green-700 font-bold px-1 text-xs'>{t("Button.add")}</p>
                                        </button>}

                                        {!isSubmitted ? <button type="submit" className={clsx(`my-4 pb-4 flex px-1`)} onClick={handleSubmitOrdersAsync}>
                                            <SaveIcon />
                                            <p className='text-black hover:text-green-700 font-bold px-1 text-xs'>{t("Button.save")}</p>

                                        </button> :
                                            <button type='button' className='my-4 py-1 flex px-2' onClick={handlePrint}>
                                                <PrintIcon />
                                                <p className='text-black hover:text-green-700 font-bold px-1 text-md'>{t("Button.print")}</p>
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

const Form = ({ formData, fields, handleChange, handleSubmit, handleClose, filteredStr }: IForm) => {
    const t = useTranslations("Body")
    const [showOptions, setShowOptions] = useState(false);

    const handleOptionClick = (value: ICustomers) => {
        setShowOptions(false);
        formData["Str"] = value.Str
        formData["Ort"] = value.Ort
    };

    useEffect(() => {
        setShowOptions(filteredStr.length > 0); // Show options only if there are items in the filtered list
    }, [filteredStr]);

    return (
        <form onSubmit={handleSubmit}>
            <div className="overflow-hidden">
                <div className="w-full">
                    <table className="min-w-full text-left text-sm font-light items-between justify-between">
                        <tbody>
                            <tr className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 font-bold ">
                                {fields.map((field, index) => {

                                    return (
                                        <td key={field.name} className={`${"pl-1 py-4 border-gray-500"}`}>
                                            <div className='flex flex-row w-full'>
                                                <input
                                                    type="text"
                                                    name={field.name}
                                                    value={formData[field.name]}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded-md"
                                                    placeholder={field.placeholder}
                                                />
                                                {showOptions && field.placeholder === "Str" && (
                                                    <span className="options-list absolute mt-10 h-44 w-fit px-6 overflow-x-hidden overflow-y-scroll bg-white  border rounded-md">
                                                        {filteredStr.map((obj: any, index = 1) => (
                                                            <button
                                                                type='button'
                                                                key={index + 1}
                                                                className="option block w-full p-2 text-left hover:bg-slate-500 hover:text-white"
                                                                onClick={() => handleOptionClick(obj)}
                                                            >
                                                                {obj.Str}
                                                            </button>
                                                        ))}
                                                    </span>
                                                )}
                                            </div>
                                        </td>)
                                }
                                )}

                            </tr>
                            <tr>
                                <td className="whitespace-nowrap px-2 py-4 flex justify-center items-center">
                                    <button
                                        type="submit"
                                        className="flex rounded-md hover:text-black hover:font-bold
                                        bg-green-700 hover:white pr-4 pl-2 pb-2 pt-2 text-sm font-medium 
                                        leading-normal text-primary hover:text-primary-600 focus:text-primary-600
                                        focus:outline-none focus:ring-0 active:text-primary-700 shadow-md mx-2">
                                        <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                                            className="w-6 h-5 font-bold hover:text-green-700">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg></span>
                                        {t("Button.submit")}
                                    </button>
                                    <button
                                        onClick={handleClose}
                                        type="button"
                                        className="flex rounded-md  hover:font-bold
                                        bg-red-700 text-white hover:text-black pr-4 pl-2 pb-2 pt-2 text-sm font-medium 
                                        leading-normal text-primary hover:text-primary-600 focus:text-primary-600
                                        focus:outline-none focus:ring-0 active:text-primary-700 shadow-md mx-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                                            className="w-6 h-5 font-bold hover:text-green-700">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
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
                            <tr className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-2 font-bold ">
                                {fields.map((field, index) => {
                                    return (
                                        <td key={field.name} className={`lg:col-span-2 pl-1 py-4 border-gray-500" `}>
                                            <input
                                                type={field.placeholder === "Discount" ? `${"number"}` : `${"text"}`}
                                                name={field.name}
                                                value={formData[field.name] === 0 ? "" : formData[field.name]}
                                                onChange={handleChange}
                                                className="w-full p-2 border rounded-md"
                                                placeholder={field.placeholder}
                                            />
                                        </td>
                                    );
                                })}
                            </tr>
                            <tr>
                                <td className="col-span-4 px-1 py-4 flex items-center justify-center lg:justify-center">
                                    <button
                                        type="submit"
                                        className="flex rounded-md hover:font-bold
                                        bg-green-700 hover:text-white hover:white pr-4 pl-2 pb-2 pt-2 text-sm font-medium 
                                        leading-normal text-primary hover:text-primary-600 focus:text-primary-600
                                        focus:outline-none focus:ring-0 active:text-primary-700 shadow-md mx-2">
                                        <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                                            className="w-6 h-5 font-bold hover:text-green-700">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
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
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                                            className="w-6 h-5 font-bold hover:text-green-700">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
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
