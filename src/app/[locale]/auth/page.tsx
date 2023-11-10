"use client"
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { useTranslations } from 'next-intl';
import withAuth from './withAuth';

const AuthorizationPage: React.FC = () => {
    const t = useTranslations('AuthorizationPage');

    // Assume the user's role is passed as a prop by withAuth HOC
    const userRole = "user"

    const isModel1Allowed = ['admin', 'user'].includes(userRole);
    const isModel2Allowed = ['admin'].includes(userRole);

    const handleModel1Click = () => {
        // Logic for Model 1 functionality
        console.log('Model 1 clicked');
    };

    const handleModel2Click = () => {
        // Logic for Model 2 functionality
        console.log('Model 2 clicked');
    };

    return (
        <PageLayout title={t('title')}>
            <div className="max-w-[460px]">{t.rich('description')}</div>
            Welcome to AuthorizationPage
            <div className='flex flex-row '>
                {isModel1Allowed ? <button className='bg-blue-500 m-3 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded' onClick={handleModel1Click}>
                    Model 1</button> : <button className="bg-blue-500 m-3 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed">
                    unauthorized
                </button>}
                {isModel2Allowed ? <button className='bg-blue-500 m-3 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded' onClick={handleModel2Click}>Model 2</button> :
                    <button className="bg-blue-500 m-3 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed">
                        unauthorized
                    </button>}
                <button className='bg-blue-500 m-3 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'>Model 1</button>
                <button className='bg-blue-500 m-3 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'>Model 2</button>
                <button className='bg-blue-500 m-3 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'>Functionality 1</button>
                <button className='bg-blue-500 m-3 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'> Functionality 2</button>

            </div>

        </PageLayout>
    );
};

AuthorizationPage.displayName = 'AuthorizationPage';

// Wrap AuthorizationPage with the withAuth HOC
export default withAuth(AuthorizationPage, ['admin', "user"]);


