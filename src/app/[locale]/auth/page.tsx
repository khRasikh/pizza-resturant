"use client"
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { useTranslations } from 'next-intl';
import withAuth from './withAuth';

const AuthorizationPage: React.FC = () => {
    const t = useTranslations('AuthorizationPage');

    return (
        <PageLayout title={t('title')}>
            <div className="max-w-[460px]">{t.rich('description')}</div>
            Welcome to AuthorizationPage
            <button>Model 1</button>
            <button>Model 2</button>
            <button>Functionality 1</button>
            <button>Functionality 2</button>
        </PageLayout>
    );
};

AuthorizationPage.displayName = 'AuthorizationPage';

// Wrap AuthorizationPage with the withAuth HOC
export default withAuth(AuthorizationPage, ['admin', "user"]);
