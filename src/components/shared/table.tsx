"use client"
import clsx from 'clsx';
import { IConsumerInOrder, ICustomers, ITable, ITableOrder, NoResultFoundProps } from '../interface/general';
import { useState, useEffect } from 'react';
import { timeZone, dateTimeFormat, OrderColumns, formatNumber } from './constants';
import { useTranslations } from 'next-intl';
import { OrderModal } from '../customers/modal';
import { formattedDate } from '../lib/customDate';
import { DeleteIcon } from './icons';

export const Table: React.FC<ITable> = ({ isLoading, items, columns, deleteRow }) => {
    const t = useTranslations("Body")

    const confirmDelete = (itemId: string, name: string) => {
        const isConfirmed = window.confirm(`${t("Table.confirmDelete") + " " + name}`);
        if (isConfirmed) {
            deleteRow(itemId);
        } else {
            console.info("Delete cancelled")
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [customer, setCustomer] = useState<ICustomers | null>(null);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const createOrderAsync = (customerInOrder: ICustomers) => {
        toggleModal()
        setCustomer(customerInOrder)
    };

    return (
        <table className="min-w-full text-left text-sm font-light text-black  justify-center items-center content-center">
            {isModalOpen && customer != null && <OrderModal toggleModal={toggleModal} customer={customer} />}
            <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600 rounded-md">
                <tr>
                    {columns.map((l) => {
                        return (<th scope="col" key={l} className="px-3 py-2">{l}</th>)
                    })}
                </tr>
            </thead>
            <tbody>
                {isLoading && <tr><td colSpan={6}>Loading...</td></tr>}
                {!isLoading && items.length > 0 ? (
                    items.map((i) => {
                        return (<tr
                            key={parseInt(i.KNr)}
                            className={clsx(
                                `${i.KNr % 2 !== 0 ? "bg-salte-100" : "bg-white"} border-b hover:bg-slate-300 hover:font-bold hover:rounded-md  text-black`
                            )}
                        >
                            <td className="whitespace-nowrap px-3 py-2">{i.KNr}</td>
                            <td className="whitespace-nowrap px-3 py-2"><button onClick={() => createOrderAsync(i)}
                                className='text-green-700 hover:text-black hover:font-bold'>{i.Name}</button></td>
                            <td className="whitespace-nowrap px-3 py-2">{i.Tel}</td>
                            <td className="whitespace-nowrap px-3 py-2">{i.Str}</td>
                            <td className="whitespace-nowrap px-3 py-2">{i.Ort}</td>
                            {/* <td className="whitespace-nowrap px-3 py-2">{i.Rabatt}%</td> */}
                            <td className="whitespace-nowrap px-3 py-2">
                                <div className='flex flex-row'>
                                    <button onClick={() => confirmDelete(i.KNr, i.Name)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0,0,256,256">
                                            <g fill="#f60303" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none"><g transform="scale(5.33333,5.33333)"><path d="M24,4c-3.50831,0 -6.4296,2.62143 -6.91992,6h-10.58008c-0.54095,-0.00765 -1.04412,0.27656 -1.31683,0.74381c-0.27271,0.46725 -0.27271,1.04514 0,1.51238c0.27271,0.46725 0.77588,0.75146 1.31683,0.74381h2.13672l2.51953,26.0293c0.274,2.833 2.62956,4.9707 5.47656,4.9707h14.73438c2.847,0 5.20156,-2.1377 5.47656,-4.9707l2.51953,-26.0293h2.13672c0.54095,0.00765 1.04412,-0.27656 1.31683,-0.74381c0.27271,-0.46725 0.27271,-1.04514 0,-1.51238c-0.27271,-0.46725 -0.77588,-0.75146 -1.31683,-0.74381h-10.58008c-0.49032,-3.37857 -3.41161,-6 -6.91992,-6zM24,7c1.87916,0 3.42077,1.26816 3.86133,3h-7.72266c0.44056,-1.73184 1.98217,-3 3.86133,-3zM19.5,18c0.828,0 1.5,0.671 1.5,1.5v15c0,0.829 -0.672,1.5 -1.5,1.5c-0.828,0 -1.5,-0.671 -1.5,-1.5v-15c0,-0.829 0.672,-1.5 1.5,-1.5zM28.5,18c0.828,0 1.5,0.671 1.5,1.5v15c0,0.829 -0.672,1.5 -1.5,1.5c-0.828,0 -1.5,-0.671 -1.5,-1.5v-15c0,-0.829 0.672,-1.5 1.5,-1.5z"></path></g></g>
                                        </svg>
                                    </button>
                                    <button className='mx-3' onClick={() => createOrderAsync(i)}>
                                        <svg className="w-6 h-6 text-green-800 hover:text-red-800 hover:font-bold dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 18">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.5 3h9.563M9.5 9h9.563M9.5 15h9.563M1.5 13a2 2 0 1 1 3.321 1.5L1.5 17h5m-5-15 2-1v6m-2 0h4" />
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>)
                    })
                ) : (
                    <tr><td colSpan={6}>No posts available.</td></tr>
                )}
            </tbody>
        </table>
    );
};

export const TableMenu: React.FC<ITable> = ({ isLoading, items, columns, deleteRow }) => {

    const t = useTranslations("Body")

    const confirmDelete = (itemId: string, name: string) => {
        const isConfirmed = window.confirm(`${t("Table.confirmDelete") + " " + name}`);
        if (isConfirmed) {
            deleteRow(itemId);
        } else {
            console.info("Delete cancelled")
        }
    };

    return (
        <table className="min-w-full text-sm font-light text-center">
            <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600 rounded-md">
                <tr>
                    {columns.map((l) => {
                        return (<th key={l} scope="col" className="px-6 py-1">{l}</th>)
                    })}
                </tr>
            </thead>
            <tbody>
                {isLoading && <tr><td colSpan={6}>Loading...</td></tr>}
                {!isLoading && items.length > 0 ? (
                    items.map((i) => (
                        <tr
                            key={i.CompNum}
                            className={clsx(
                                `${i.CompNum % 2 !== 0 ? "bg-neutral-100" : "bg-white"} text-black hover:bg-slate-300 hover:font-bold hover:rounded-md border-b dark:border-neutral-500 dark:bg-neutral-600`
                            )}
                        >
                            <td className="whitespace-nowrap px-3 py-1">{i.Type}</td>
                            <td className="whitespace-nowrap px-3 py-1">{i.CompNum}</td>
                            <td className="whitespace-nowrap px-3 py-1">{i.Name}</td>
                            <td className="whitespace-nowrap px-3 py-1">€ {i.SinglPreis}</td>
                            <td className="whitespace-nowrap px-3 py-1"> {i.JumboPreis === parseInt("0") ? <span className="text-sm text-gray-400">{t("Label.notAvailable")}</span> : `€ ${i.JumboPreis}`}</td>
                            <td className="whitespace-nowrap px-3 py-1"> {i.FamilyPreis === parseInt("0") ? <span className="text-sm text-gray-400">{t("Label.notAvailable")}</span> : `€ ${i.FamilyPreis}`}</td>
                            <td className="whitespace-nowrap px-3 py-1"> {i.PartyPreis === parseInt("0") ? <span className="text-sm text-gray-400">{t("Label.notAvailable")}</span> : `€ ${i.PartyPreis}`}</td>
                            <td className="whitespace-nowrap px-3 py-1">
                                <div className='flex flex-row'>
                                    <button onClick={() => confirmDelete(i.CompNum, i.Name)} >
                                        <DeleteIcon />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr><td colSpan={6}>No posts available.</td></tr>
                )}
            </tbody>
        </table>
    );
};

interface ITableLastOrders {
    ordered: any[];
}

export const TableLastOrders: React.FC<ITableLastOrders> = ({ ordered }) => {

    return (
        <table className=" min-w-full text-left text-sm font-light">
            <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600 rounded-md">
                <tr>
                    {OrderColumns.map((l) => {
                        return (<th scope="col" key={l} className="px-2 py-1">{l}</th>)
                    })}
                </tr>
            </thead>
            <tbody>
                {ordered.length > 0 && ordered.map((i) => (
                    <tr
                        key={i.order_date}
                        className={clsx(
                            `${i.id % 2 !== 0 ? "bg-neutral-200" : "bg-neutral-100"} hover:bg-slate-300 hover:font-bold hover:rounded-md border-b dark:border-neutral-500 dark:bg-neutral-600`
                        )}
                    >
                        <td className="whitespace-nowrap px-2 py-1">{i.id}</td>
                        <td className="whitespace-nowrap px-2 py-1">{i.customer_id}</td>
                        <td className="whitespace-nowrap px-2 py-1">{i.count}</td>
                        <td className="whitespace-nowrap px-2 py-1">€{i.price}</td>
                        <td className="whitespace-nowrap px-2 py-1">{i.extra} </td>
                        <td className="whitespace-nowrap px-2 py-1">% {i.discount ? i.discount : 0} </td>
                        <td className="whitespace-nowrap px-2 py-1">€{formatNumber(Number(i.total))}</td>
                        <td className="whitespace-nowrap px-1 py-2">{i.order_date && formattedDate(i.order_date?.toString())}</td>
                    </tr>
                )
                )}
            </tbody>

        </table>
    );
};

export const TableOrder: React.FC<ITableOrder> = ({ items, columns, deleteRow }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const t = useTranslations("Body")

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const confirmDelete = (id: string) => {
        const isConfirmed = window.confirm(`${t("Table.confirmDelete")}`);
        if (isConfirmed) {
            deleteRow(id);
        } else {
            console.info("Delete cancelled")
        }
    };

    return (
        <table className="min-w-full text-center text-sm font-light  justify-center items-center content-center">
            {isModalOpen && items != null && <OrderModal toggleModal={toggleModal} customer={items as unknown as IConsumerInOrder} />}
            <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600 rounded-md">
                <tr>
                    {columns.length > 0 && columns.map((l) => {
                        return (<th scope="col" key={l} className="px-6 py-2">{l}</th>)
                    })}
                </tr>
            </thead>
            <tbody>
                {items.length > 0 ? (
                    items.map((i, index = 0) => (
                        <tr
                            key={i.order_date! + index}
                            className={clsx(
                                `${(index + 1) % 2 !== 0 ? "bg-neutral-100" : "bg-white"}  justify-center items-center content-center text-black border-b hover:bg-slate-300 hover:font-bold hover:rounded-md`
                            )}
                        >
                            <td className="whitespace-nowrap px-4 py-2">{i.id}</td>
                            {/* <td className="whitespace-nowrap px-4 py-2">{i.user_id}</td> */}
                            <td className="whitespace-nowrap px-4 py-2">{i.customer_id}</td>
                            <td className="whitespace-nowrap px-4 py-2">{i.count}</td>
                            <td className="whitespace-nowrap px-4 py-2">€ {i.price}</td>
                            <td className="whitespace-nowrap px-4 py-2">€{formatNumber(Number(i.extra))} </td>
                            <td className="whitespace-nowrap px-4 py-2">% {i.discount} </td>
                            <td className="whitespace-nowrap px-4 py-2">€ {formatNumber(Number(i.total))}</td>
                            <td className="whitespace-nowrap px-4 py-2">{i.order_date ? formattedDate(i.order_date?.toString()) : formattedDate(new Date().toString()).substring(10)}</td>
                            <td className="whitespace-nowrap px-3 py-1">
                                <div className='flex flex-row'>
                                    <button onClick={() => confirmDelete(i.id)} >
                                        <DeleteIcon />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                ) :
                    <tr className='justify-center items-center text-center my-12 py-14'>
                        <td className='my-12 py-12'></td>
                        <td className='my-12 py-12'></td>
                        <td className='my-12 py-12'>{t("Label.noNewOrdersYet")}</td>
                    </tr>}
            </tbody>

        </table>
    );
};

export const NoResultFound = ({ message }: NoResultFoundProps) => {
    return (
        <div className="text-black my-2 py-2 flex justify-center items-center">
            <div className="whitespace-nowrap px-6 py-4 font-bold">
                {message}
            </div>
        </div>
    );
};


export const PaginationCustomized = ({ totalItems, pageNumber, pageItemsSize, setPageItemsSize, setPageNumber }: any) => {
    const t = useTranslations("Body.Table")
    const totalPages = Math.ceil(totalItems / pageItemsSize);
    const [isPageSizeDropdownOpen, setIsPageSizeDropdownOpen] = useState(false);
    const handlePrevClick = () => {
        if (pageNumber > 1) {
            onPageChange(pageNumber - 1, pageItemsSize);
        }
    };

    const handleNextClick = () => {
        if (pageNumber < totalPages) {
            onPageChange(pageNumber + 1, pageItemsSize);
        }
    };


    const onPageChange = (pageNumber: number, pageItemsize: number) => {
        setPageNumber(pageNumber);
        setPageItemsSize(pageItemsize)
    };



    const handlePageSizeChange = (value: number) => {
        setPageItemsSize(value);
        onPageChange(1, value);
        setIsPageSizeDropdownOpen(false);
    };

    // time 
    const getDateTime = new Date().toLocaleString(timeZone.deutch, dateTimeFormat)
    const [currentDateTime, setCurrentDateTime] = useState(getDateTime);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDateTime(getDateTime);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [1000]);
    return (
        <div className='flex flex-row justify-between'>
            <div className="items-center flex flex-col-reverse sm:flex-row-reverse  py-3 pl-4 ">
                <div className='p-2 text-green-500 font-bold'>{currentDateTime}</div>
            </div>
            <div className="items-center flex flex-col-reverse sm:flex-row-reverse  py-3 pl-4 ">
                <div className="flex items-center justify-end pl-4 ">
                    <div className="py-2 pl-4">
                        <p className="text-sm text-gray-700">
                            <span className="font-medium ">{(pageNumber - 1) * pageItemsSize + 1}</span>{'-'}
                            <span className="font-medium pr-2">
                                {Math.min(pageNumber * pageItemsSize, totalItems)}
                            </span>
                            of <span className="font-medium pr-2">{totalItems} </span>
                        </p>
                    </div>
                    <div>
                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                            <button
                                onClick={handlePrevClick}
                                disabled={pageNumber === 1}
                                className={`relative inline-flex items-center rounded-l-md px-2 py-2 ${pageNumber === 1
                                    ? 'primary-text'
                                    : 'primary-text ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
                                    } ${pageNumber === 1 ? 'disabled-arrow' : ''}`}
                            >
                                <span className="sr-only">Previous</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke={pageNumber === 1 ? 'gray' : 'currentColor'}
                                    className="w-6 h-6"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>
                            </button>

                            <button
                                onClick={handleNextClick}
                                disabled={pageNumber === totalPages}
                                className={`relative inline-flex items-center rounded-r-md px-2 py-2 ${pageNumber === totalPages
                                    ? 'primary-text'
                                    : 'primary-text ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
                                    } ${pageNumber === totalPages ? 'disabled-arrow' : ''}`}
                            >
                                <span className="sr-only">Next</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke={pageNumber === totalPages ? 'gray' : 'currentColor'}
                                    className="w-6 h-6"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </button>
                        </nav>
                    </div>
                </div>

                <div className="flex items-center justify-end">
                    <p className="text-title-sm font-arboriabook font-semibold py-1 px-3">{t("pagination")}</p>
                    <div className="relative mt-2">
                        <button
                            type="button"
                            className="relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10   ring-0  primary-border     sm:text-sm sm:leading-6"
                            aria-haspopup="listbox"
                            aria-expanded="true"
                            aria-labelledby="listbox-label"
                            onClick={() => setIsPageSizeDropdownOpen(!isPageSizeDropdownOpen)}
                        >
                            <span className="flex items-center">
                                <span className="ml-3 block truncate" >{pageItemsSize}</span>
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                <svg
                                    className={`w-5 h-5 pt-1`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </span>
                        </button>
                        {isPageSizeDropdownOpen && (
                            <div
                                className="absolute z-10 mt-1 max-h-56 w-18 overflow-auto rounded-md bg-white py-1 text-base  ring-0  focus:outline-none sm:text-sm border primary-border"
                                tabIndex={-1}
                            >
                                <button
                                    className="relative cursor-pointer select-none py-2 pl-3 "
                                    id="listbox-option-0"
                                    onClick={() => handlePageSizeChange(5)}
                                    type='button'
                                >
                                    <div className="flex items-end">
                                        <span className=" pl-8 font-normal block truncate">5</span>
                                    </div>
                                </button>
                                <button
                                    type='button'
                                    className="relative cursor-pointer select-none py-2 pl-3 "
                                    id="listbox-option-0"
                                    onClick={() => handlePageSizeChange(10)}
                                >
                                    <div className="flex items-end">
                                        <span className=" pl-7 font-normal block truncate">10</span>
                                    </div>
                                </button><button
                                    type='button'
                                    className="relative cursor-pointer select-none py-2 pl-3 "
                                    id="listbox-option-0"
                                    onClick={() => handlePageSizeChange(25)}
                                >
                                    <div className="flex items-end">
                                        <span className="font-normal pl-7 block truncate">25</span>
                                    </div>
                                </button><button
                                    type='button'
                                    className="relative cursor-pointer select-none py-2 pl-3 "
                                    id="listbox-option-0"
                                    onClick={() => handlePageSizeChange(50)}
                                >
                                    <div className="flex items-end">
                                        <span className="font-normal pl-7 block truncate">50</span>
                                    </div>
                                </button><button
                                    type='button'
                                    className="relative cursor-pointer select-none py-2 pl-3 "
                                    id="listbox-option-0"
                                    onClick={() => handlePageSizeChange(100)}
                                >
                                    <div className="flex items-end">
                                        <span className="font-normal pl-6 block truncate">100</span>
                                    </div>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
};
