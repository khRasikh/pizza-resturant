"use client"
import clsx from 'clsx';
import { type FC } from 'react';

interface tableProps {
    data: any[]
    isLoading: boolean
}
export const Table: FC<tableProps> = (props) => {

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
                        {props.data.length > 0
                            && props.data.map((i) => (
                                <tr key={i.id}
                                    className={clsx(`${i.id % 2 !== 0 ? "bg-neutral-100" : "bg-white"} "border-b  dark:border-neutral-500 dark:bg-neutral-600`)}>
                                    <td className="whitespace-nowrap px-6 py-4" >{i.id}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{i.first_name} </td>
                                    <td className="whitespace-nowrap px-6 py-4">{i.last_name} </td>
                                    <td className="whitespace-nowrap px-6 py-4">{i.phone_number} </td>
                                    <td className="whitespace-nowrap px-6 py-4">{i.address} </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <div className='flex flex-row'>
                                            <button>
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
                        }
                    </tbody>
                </table>
                {props.data.length === 0 && <p>No posts available.</p>}
            </div>
        </div>
    );
}