import { type FC } from 'react';
import BreadCrumbs from '../components/breadCrumbs/breadCrumbs';

interface PageLayoutProps {
    children: React.ReactNode
}

const PageLayout: FC<PageLayoutProps> = ({ children }) => {
    return (
        <div>
            <BreadCrumbs />
            <h1>Welcome PageLayout</h1>
            {children}
        </div>
    );
}

export default PageLayout;
