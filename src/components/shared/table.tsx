"use client"
import clsx from 'clsx';
import { ITable, NoResultFoundProps } from '../interface/general';
import { useState, useEffect } from 'react';
import { timeZone, dateTimeFormat } from './constants';

export const Table: React.FC<ITable> = ({ isLoading, items, columns, deleteRow }) => {
    return (
        <table className="min-w-full text-left text-sm font-light">
            <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600 rounded-md">
                <tr>
                    {columns.map((l) => {
                        return (<th scope="col" key={l} className="px-6 py-4">{l}</th>)
                    })}
                </tr>
            </thead>
            <tbody>
                {isLoading && <tr><td colSpan={6}>Loading...</td></tr>}
                {!isLoading && items.length > 0 ? (
                    items.map((i) => (
                        <tr
                            key={i.id}
                            className={clsx(
                                `${i.id % 2 !== 0 ? "bg-neutral-100" : "bg-white"} border-b dark:border-neutral-500 dark:bg-neutral-600`
                            )}
                        >
                            <td className="whitespace-nowrap px-6 py-4">{i.id}</td>
                            <td className="whitespace-nowrap px-6 py-4">{i.first_name}</td>
                            <td className="whitespace-nowrap px-6 py-4">{i.last_name}</td>
                            <td className="whitespace-nowrap px-6 py-4">{i.phone_number}</td>
                            <td className="whitespace-nowrap px-6 py-4">{i.postal_code}  {i.street_name} {i.home_number}</td>
                            <td className="whitespace-nowrap px-6 py-4">{i.description}</td>
                            <td className="whitespace-nowrap px-6 py-4">
                                <div className='flex flex-row'>
                                    <button onClick={() => deleteRow(i.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0,0,256,256">
                                            <g fill="#f60303" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none"><g transform="scale(5.33333,5.33333)"><path d="M24,4c-3.50831,0 -6.4296,2.62143 -6.91992,6h-10.58008c-0.54095,-0.00765 -1.04412,0.27656 -1.31683,0.74381c-0.27271,0.46725 -0.27271,1.04514 0,1.51238c0.27271,0.46725 0.77588,0.75146 1.31683,0.74381h2.13672l2.51953,26.0293c0.274,2.833 2.62956,4.9707 5.47656,4.9707h14.73438c2.847,0 5.20156,-2.1377 5.47656,-4.9707l2.51953,-26.0293h2.13672c0.54095,0.00765 1.04412,-0.27656 1.31683,-0.74381c0.27271,-0.46725 0.27271,-1.04514 0,-1.51238c-0.27271,-0.46725 -0.77588,-0.75146 -1.31683,-0.74381h-10.58008c-0.49032,-3.37857 -3.41161,-6 -6.91992,-6zM24,7c1.87916,0 3.42077,1.26816 3.86133,3h-7.72266c0.44056,-1.73184 1.98217,-3 3.86133,-3zM19.5,18c0.828,0 1.5,0.671 1.5,1.5v15c0,0.829 -0.672,1.5 -1.5,1.5c-0.828,0 -1.5,-0.671 -1.5,-1.5v-15c0,-0.829 0.672,-1.5 1.5,-1.5zM28.5,18c0.828,0 1.5,0.671 1.5,1.5v15c0,0.829 -0.672,1.5 -1.5,1.5c-0.828,0 -1.5,-0.671 -1.5,-1.5v-15c0,-0.829 0.672,-1.5 1.5,-1.5z"></path></g></g>
                                        </svg>
                                    </button>
                                    <button>
                                        <svg width="19px" height="19px" viewBox="0 0 19 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                            <svg width="19px" height="19px" viewBox="0 0 19 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                                <g id="Icons" stroke="2" stroke-width="1" fill="none" fill-rule="evenodd">
                                                    <g id="Rounded" transform="translate(-612.000000, -2106.000000)">
                                                        <g id="Editor" transform="translate(100.000000, 1960.000000)">
                                                            <g id="-Round-/-Editor-/-format_list_bulleted" transform="translate(510.000000, 142.000000)">
                                                                <g>
                                                                    <polygon id="Path" points="0 0 24 0 24 24 0 24"></polygon>
                                                                    <path d="M4,10.5 C3.17,10.5 2.5,11.17 2.5,12 C2.5,12.83 3.17,13.5 4,13.5 C4.83,13.5 5.5,12.83 5.5,12 C5.5,11.17 4.83,10.5 4,10.5 Z M4,4.5 C3.17,4.5 2.5,5.17 2.5,6 C2.5,6.83 3.17,7.5 4,7.5 C4.83,7.5 5.5,6.83 5.5,6 C5.5,5.17 4.83,4.5 4,4.5 Z M4,16.5 C3.17,16.5 2.5,17.18 2.5,18 C2.5,18.82 3.18,19.5 4,19.5 C4.82,19.5 5.5,18.82 5.5,18 C5.5,17.18 4.83,16.5 4,16.5 Z M8,19 L20,19 C20.55,19 21,18.55 21,18 C21,17.45 20.55,17 20,17 L8,17 C7.45,17 7,17.45 7,18 C7,18.55 7.45,19 8,19 Z M8,13 L20,13 C20.55,13 21,12.55 21,12 C21,11.45 20.55,11 20,11 L8,11 C7.45,11 7,11.45 7,12 C7,12.55 7.45,13 8,13 Z M7,6 C7,6.55 7.45,7 8,7 L20,7 C20.55,7 21,6.55 21,6 C21,5.45 20.55,5 20,5 L8,5 C7.45,5 7,5.45 7,6 Z" id="🔹-Icon-Color" fill="#1ce659"></path>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </svg>
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

export const TableMenu: React.FC<ITable> = ({ isLoading, items, columns, deleteRow }) => {
    return (
        <table className="min-w-full text-left text-sm font-light">
            <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600 rounded-md">
                <tr>
                    {columns.map((l) => {
                        return (<th key={l} scope="col" className="px-6 py-4">{l}</th>)
                    })}
                </tr>
            </thead>
            <tbody>
                {isLoading && <tr><td colSpan={6}>Loading...</td></tr>}
                {!isLoading && items.length > 0 ? (
                    items.map((i) => (
                        <tr
                            key={i.id}
                            className={clsx(
                                `${i.id % 2 !== 0 ? "bg-neutral-100" : "bg-white"} border-b dark:border-neutral-500 dark:bg-neutral-600`
                            )}
                        >
                            <td className="whitespace-nowrap px-6 py-4">{i.id}</td>
                            <td className="whitespace-nowrap px-6 py-4">{i.name}</td>
                            <td className="whitespace-nowrap px-6 py-4">{i.category}</td>
                            <td className="whitespace-nowrap px-6 py-4">{i.description}</td>
                            <td className="whitespace-nowrap px-6 py-4">{0}</td>
                            <td className="whitespace-nowrap px-6 py-4">{i.currency} {i.price}</td>
                            <td className="whitespace-nowrap px-6 py-4">
                                <div className='flex flex-row'>
                                    <button onClick={() => deleteRow(i.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0,0,256,256">
                                            <g fill="#f60303" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none"><g transform="scale(5.33333,5.33333)"><path d="M24,4c-3.50831,0 -6.4296,2.62143 -6.91992,6h-10.58008c-0.54095,-0.00765 -1.04412,0.27656 -1.31683,0.74381c-0.27271,0.46725 -0.27271,1.04514 0,1.51238c0.27271,0.46725 0.77588,0.75146 1.31683,0.74381h2.13672l2.51953,26.0293c0.274,2.833 2.62956,4.9707 5.47656,4.9707h14.73438c2.847,0 5.20156,-2.1377 5.47656,-4.9707l2.51953,-26.0293h2.13672c0.54095,0.00765 1.04412,-0.27656 1.31683,-0.74381c0.27271,-0.46725 0.27271,-1.04514 0,-1.51238c-0.27271,-0.46725 -0.77588,-0.75146 -1.31683,-0.74381h-10.58008c-0.49032,-3.37857 -3.41161,-6 -6.91992,-6zM24,7c1.87916,0 3.42077,1.26816 3.86133,3h-7.72266c0.44056,-1.73184 1.98217,-3 3.86133,-3zM19.5,18c0.828,0 1.5,0.671 1.5,1.5v15c0,0.829 -0.672,1.5 -1.5,1.5c-0.828,0 -1.5,-0.671 -1.5,-1.5v-15c0,-0.829 0.672,-1.5 1.5,-1.5zM28.5,18c0.828,0 1.5,0.671 1.5,1.5v15c0,0.829 -0.672,1.5 -1.5,1.5c-0.828,0 -1.5,-0.671 -1.5,-1.5v-15c0,-0.829 0.672,-1.5 1.5,-1.5z"></path></g></g>
                                        </svg>
                                    </button>
                                    <button>
                                        <svg width="19px" height="19px" viewBox="0 0 19 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                            <svg width="19px" height="19px" viewBox="0 0 19 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                                <g id="Icons" stroke="2" stroke-width="1" fill="none" fill-rule="evenodd">
                                                    <g id="Rounded" transform="translate(-612.000000, -2106.000000)">
                                                        <g id="Editor" transform="translate(100.000000, 1960.000000)">
                                                            <g id="-Round-/-Editor-/-format_list_bulleted" transform="translate(510.000000, 142.000000)">
                                                                <g>
                                                                    <polygon id="Path" points="0 0 24 0 24 24 0 24"></polygon>
                                                                    <path d="M4,10.5 C3.17,10.5 2.5,11.17 2.5,12 C2.5,12.83 3.17,13.5 4,13.5 C4.83,13.5 5.5,12.83 5.5,12 C5.5,11.17 4.83,10.5 4,10.5 Z M4,4.5 C3.17,4.5 2.5,5.17 2.5,6 C2.5,6.83 3.17,7.5 4,7.5 C4.83,7.5 5.5,6.83 5.5,6 C5.5,5.17 4.83,4.5 4,4.5 Z M4,16.5 C3.17,16.5 2.5,17.18 2.5,18 C2.5,18.82 3.18,19.5 4,19.5 C4.82,19.5 5.5,18.82 5.5,18 C5.5,17.18 4.83,16.5 4,16.5 Z M8,19 L20,19 C20.55,19 21,18.55 21,18 C21,17.45 20.55,17 20,17 L8,17 C7.45,17 7,17.45 7,18 C7,18.55 7.45,19 8,19 Z M8,13 L20,13 C20.55,13 21,12.55 21,12 C21,11.45 20.55,11 20,11 L8,11 C7.45,11 7,11.45 7,12 C7,12.55 7.45,13 8,13 Z M7,6 C7,6.55 7.45,7 8,7 L20,7 C20.55,7 21,6.55 21,6 C21,5.45 20.55,5 20,5 L8,5 C7.45,5 7,5.45 7,6 Z" id="🔹-Icon-Color" fill="#1ce659"></path>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </svg>
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
        <div className='flex  flex-row justify-between'>
            <div className="items-center flex flex-col-reverse sm:flex-row-reverse  py-3 pl-4 ">
                <div className='p-2 text-green-500 font-bold'>{currentDateTime}</div>
            </div>
            <div className="items-center flex flex-col-reverse sm:flex-row-reverse  py-3 pl-4 ">
                <div className="flex items-center justify-end pl-4 ">
                    <div className="py-2 pl-4">
                        <p className="text-sm text-gray-700">
                            <span className="font-medium ">{(pageNumber - 1) * pageItemsSize + 1}</span>{'-'}
                            <span className="font-medium pr-2">{Math.min(pageNumber * pageItemsSize, totalItems)}</span>
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
                    <p className="text-title-xsm font-arboriabook font-semibold py-1 px-3"> Per Page :</p>
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
                            <ul
                                className="absolute z-10 mt-1 max-h-56 w-18 overflow-auto rounded-md bg-white py-1 text-base  ring-0  focus:outline-none sm:text-sm border primary-border"
                                tabIndex={-1}
                                role="listbox"
                                aria-labelledby="listbox-label"
                                aria-activedescendant="listbox-option-3"
                            >
                                <li
                                    className="relative cursor-pointer select-none py-2 pl-3 "
                                    id="listbox-option-0"
                                    onClick={() => handlePageSizeChange(5)}
                                >
                                    <div className="flex items-end">
                                        <span className=" pl-8 font-normal block truncate">5</span>
                                    </div>
                                </li>
                                <li
                                    className="relative cursor-pointer select-none py-2 pl-3 "
                                    id="listbox-option-0"
                                    onClick={() => handlePageSizeChange(10)}
                                >
                                    <div className="flex items-end">
                                        <span className=" pl-7 font-normal block truncate">10</span>
                                    </div>
                                </li><li
                                    className="relative cursor-pointer select-none py-2 pl-3 "
                                    id="listbox-option-0"
                                    onClick={() => handlePageSizeChange(25)}
                                >
                                    <div className="flex items-end">
                                        <span className="font-normal pl-7 block truncate">25</span>
                                    </div>
                                </li><li
                                    className="relative cursor-pointer select-none py-2 pl-3 "
                                    id="listbox-option-0"
                                    onClick={() => handlePageSizeChange(50)}
                                >
                                    <div className="flex items-end">
                                        <span className="font-normal pl-7 block truncate">50</span>
                                    </div>
                                </li><li
                                    className="relative cursor-pointer select-none py-2 pl-3 "
                                    id="listbox-option-0"
                                    onClick={() => handlePageSizeChange(100)}
                                >
                                    <div className="flex items-end">
                                        <span className="font-normal pl-6 block truncate">100</span>
                                    </div>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
};
