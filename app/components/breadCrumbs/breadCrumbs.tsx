"use client"
import { BreadCrumbContext, IBreadCrumbData, InitialBreadCrumb } from '@/app/[lang]/page';
import Link from 'next/link';
import { useContext, type FC } from 'react';
import { ArrowIcon } from '../icons/SVGIcons';

interface BreadCrumbsProps { }
const BreadCrumbs: FC<BreadCrumbsProps> = () => {
    const { breadCrumbList, updateBreadCrumbList } = useContext(BreadCrumbContext)

    console.log(breadCrumbList);
    return (
        <div
            className="flex flex-col md:flex-row px-3 mr-4 md:mx-4 lg:mx-7 py-3 text-gray-700 text-bold rounded-lg bg-gray-50 dark:bg-green dark:border-green"
            aria-label="Breadcrumb"
        >
            <ol className="inline-flex items-center space-x-1 md:space-x-1 xxl:space-x-1">
                {breadCrumbList?.map((e: IBreadCrumbData, k: number) => {
                    return (
                        <li key={e.url} className="inline-flex items-center">
                            {e.name && (
                                <Link
                                    href={e.url}
                                    className="inline-flex items-center text-md font-bold text-gray-700 breadcrumbs dark:text-gray-400 dark:hover:text-black"
                                >
                                    <div className="flex items-center">
                                        {k > 0 && <ArrowIcon />}
                                        <span className="ml-1 text-md font-bold text-gray-500 md:ml-2 dark:text-gray-400">{e.name}</span>
                                    </div>
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>

            <button className='bg-green-300 rounded-md px-3 py-1' onClick={() => updateBreadCrumbList({ name: "useContext", url: "/useContext" })}>
                UseContextOne
            </button>
        </div>
    );
};

const DisabledLinks: FC<{ name: string }> = ({ name }) => {
    return (
        <div className="flex items-center flex-start">
            <div className="flex items-center">
                <ArrowIcon />
                <span className="text-md font-bold disabledLinks dark:text-black space-x-1 md:space-x-1 xxl:space-x-1">
                    {name}
                </span>
            </div>
        </div>
    );
};

export default BreadCrumbs;

