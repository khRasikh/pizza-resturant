"use client"
// withAuth.tsx
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const withAuth = (WrappedComponent: React.ComponentType, allowedRoles: string[]) => {
  return (props: any) => {
    const router = useRouter();

    // Replace this function with your logic to get the user's role
    const getUserRole = (): string => {
      // Example: Retrieve the user's role from your authentication system
      // For now, returning 'user' for demonstration purposes
      return 'user';
    };

    // Logic to check if the user has the required role
    const userRole = getUserRole();
    useEffect(() => {
      if (!allowedRoles.includes(userRole)) {
        // Redirect to unauthorized page or login page
        router.push('/unauthorized');
      }
    }, [allowedRoles, userRole, router]);

    // Render the wrapped component if the user has the required role
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
