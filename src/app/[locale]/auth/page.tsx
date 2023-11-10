"use client"
// AuthorizationPage.tsx
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
    </PageLayout>
  );
};

// Wrap AuthorizationPage with the withAuth HOC
export default withAuth(AuthorizationPage, ['admin', "user"]);
