"use client"
import clsx from 'clsx';
import { useState, type FC, useEffect } from 'react';
import { dateTimeFormat, timeZone, toastMessages } from './constants';
import { toast } from 'react-toastify';
import { ITable, NoResultFoundProps } from '../interface/general';

export const NoResultFound = ({ message }: NoResultFoundProps) => {
    return (
        <div className="text-black my-2 py-2 flex justify-center items-center">
            <div className="whitespace-nowrap px-6 py-4 font-bold">
                {message}
            </div>
        </div>
    );
};

export const Table: FC<ITable> = (props) => {
    const { data, isLoading, itemsPerPage } = props;
    const [currentPage, setCurrentPage] = useState(1);
    const [currentItems, setCurrentItems] = useState<any[]>([]);

    useEffect(() => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const updatedCurrentItems = data.slice(indexOfFirstItem, indexOfLastItem);
        setCurrentItems(updatedCurrentItems);
    }, [currentPage, data, itemsPerPage]);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const changePage = (page: number) => {
        setCurrentPage(page);
    };

    //current time
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

    //delete 
    const handleDeleteCustomer = async (customerId: string) => {

        try {
            const response = await fetch('/api/psql/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Id: customerId }),
            });

            if (response.ok) {
                toast.success(toastMessages.SUCCESS_CONTENT, toastMessages.OPTION);
            } else {
                toast.error(toastMessages.ERROR_CONTENT, toastMessages.OPTION);
            }
        } catch (error) {
            toast.error(toastMessages.ERROR_CONTENT, toastMessages.OPTION);
            console.error('Error deleting customer:', error);
        }
    };

    return (
        <div>
            <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                    <thead
                        className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600 rounded-md">
                        <tr>
                            <th scope="col" className="px-6 py-4">ID#</th>
                            <th scope="col" className="px-6 py-4">Name</th>
                            <th scope="col" className="px-6 py-4">Last Name</th>
                            <th scope="col" className="px-6 py-4">Phone Number</th>
                            <th scope="col" className="px-6 py-4">Address</th>
                            <th scope="col" className="px-6 py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading && <tr><td colSpan={6}>Loading...</td></tr>}
                        {!isLoading && currentItems.length > 0 ? (
                            currentItems.map((i) => (
                                <tr key={i.id}
                                    className={clsx(`${i.id % 2 !== 0 ? "bg-neutral-100" : "bg-white"} "border-b  dark:border-neutral-500 dark:bg-neutral-600`)}>
                                    <td className="whitespace-nowrap px-6 py-4" >{i.id}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{i.first_name} </td>
                                    <td className="whitespace-nowrap px-6 py-4">{i.last_name} </td>
                                    <td className="whitespace-nowrap px-6 py-4">{i.phone_number} </td>
                                    <td className="whitespace-nowrap px-6 py-4">{i.address} </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <div className='flex flex-row'>
                                            <button onClick={() => handleDeleteCustomer(i.id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0,0,256,256">
                                                    <g fill="#f60303" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none"><g transform="scale(5.33333,5.33333)"><path d="M24,4c-3.50831,0 -6.4296,2.62143 -6.91992,6h-10.58008c-0.54095,-0.00765 -1.04412,0.27656 -1.31683,0.74381c-0.27271,0.46725 -0.27271,1.04514 0,1.51238c0.27271,0.46725 0.77588,0.75146 1.31683,0.74381h2.13672l2.51953,26.0293c0.274,2.833 2.62956,4.9707 5.47656,4.9707h14.73438c2.847,0 5.20156,-2.1377 5.47656,-4.9707l2.51953,-26.0293h2.13672c0.54095,0.00765 1.04412,-0.27656 1.31683,-0.74381c0.27271,-0.46725 0.27271,-1.04514 0,-1.51238c-0.27271,-0.46725 -0.77588,-0.75146 -1.31683,-0.74381h-10.58008c-0.49032,-3.37857 -3.41161,-6 -6.91992,-6zM24,7c1.87916,0 3.42077,1.26816 3.86133,3h-7.72266c0.44056,-1.73184 1.98217,-3 3.86133,-3zM19.5,18c0.828,0 1.5,0.671 1.5,1.5v15c0,0.829 -0.672,1.5 -1.5,1.5c-0.828,0 -1.5,-0.671 -1.5,-1.5v-15c0,-0.829 0.672,-1.5 1.5,-1.5zM28.5,18c0.828,0 1.5,0.671 1.5,1.5v15c0,0.829 -0.672,1.5 -1.5,1.5c-0.828,0 -1.5,-0.671 -1.5,-1.5v-15c0,-0.829 0.672,-1.5 1.5,-1.5z"></path></g></g>
                                                </svg>
                                            </button>

                                            <button>
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
                                            </button>

                                        </div>
                                    </td>
                                </tr>

                            )
                            )
                        )
                            : (
                                <tr><td colSpan={6}>No posts available.</td></tr>
                            )
                        }
                    </tbody>
                </table>
                <div className='flex flex-row justify-between  text-sm font-bold'>
                    <div>{totalPages > 1 && (
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
                            {totalPages > 5 && currentPage >= 4 && (
                                <span className="text-gray-500 mx-2">1</span>
                            )}
                            {totalPages > 5 && currentPage >= 4 && (
                                <span className="text-gray-500 mx-2">...</span>
                            )}
                            {totalPages > 5 && currentPage >= 4 && (
                                Array.from({ length: totalPages - currentPage >= 3 ? 3 : totalPages - currentPage }, (_, index) => (
                                    <button
                                        key={currentPage + index}
                                        className={clsx('mx-2', {
                                            'text-green-500': currentPage + index !== currentPage,
                                            'text-gray-500': currentPage + index === currentPage,
                                        })}
                                        onClick={() => changePage(currentPage + index)}
                                    >
                                        {currentPage + index}
                                    </button>
                                ))
                            )}
                            {currentPage <= totalPages - 1 && (
                                <span className="text-gray-500 mx-2">...</span>
                            )}
                            {currentPage <= totalPages - 1 && (
                                <button
                                    className={clsx('mx-2', {
                                        'text-green-500': currentPage < totalPages,
                                        'text-gray-500': currentPage === totalPages,
                                    })}
                                    onClick={() => changePage(totalPages)}
                                    disabled={currentPage === totalPages}
                                >
                                    {totalPages}
                                </button>
                            )}
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
                        </div>
                    )}</div>
                    <div className='p-2 text-green-500 font-bold'>{currentDateTime}</div>
                    <div className='p-2'>Total: {props.data.length}</div>
                </div>

            </div>
        </div>
    );
}