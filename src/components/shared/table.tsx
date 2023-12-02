"use client"
import clsx from 'clsx';
import { ITable, NoResultFoundProps, IPagination } from '../interface/general';
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
                            <td className="whitespace-nowrap px-6 py-4">{i.address}</td>
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

export const Pagination: React.FC<IPagination> = ({
    currentPage,
    totalPages,
    changePage,
    rowCount
}) => {

    const getDateTime = new Date().toLocaleString(timeZone.deutch, dateTimeFormat)
    const [currentDateTime, setCurrentDateTime] = useState(getDateTime);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDateTime(getDateTime);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className='flex flex-row justify-between text-sm font-bold'>
            <div>
                {totalPages > 1 && (
                    <div className="pagination">
                        <button
                            className={clsx('my-2', {
                                'text-green-500': currentPage > 1,
                                'text-gray-500': currentPage === 1,
                            })}
                            onClick={() => changePage(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        {Array.from({ length: totalPages > 5 ? 5 : totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                className={clsx('mx-2', {
                                    'text-green-500': index + 1 !== currentPage,
                                    'text-gray-500': index + 1 === currentPage,
                                })}
                                onClick={() => changePage(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                        {currentPage < totalPages && (
                            <button
                                className={clsx('mx-2', {
                                    'text-green-500': currentPage < totalPages,
                                    'text-gray-500': currentPage === totalPages,
                                })}
                                onClick={() => changePage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        )}
                    </div>
                )}
            </div>
            <div className='p-2 text-green-500 font-bold'>{currentDateTime}</div>
            <div className='p-2'>Total: {rowCount}</div>
        </div>
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