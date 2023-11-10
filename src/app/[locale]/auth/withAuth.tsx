"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const withAuth = (WrappedComponent: React.ComponentType, allowedRoles: string[]) => {
  const WithAuth: React.FC = (props: any) => {
    const router = useRouter();
    const [userRole, setUserRole] = useState<string | null>(null);

    // Replace this function with your logic to get the user's role
    const getUserRole = async (): Promise<string | null> => {
      try {
        return await (await fetch("/api/roles", { method: 'GET', headers: { 'Content-Type': 'application/json' }, })).json();
      } catch (error) {
        console.error("Error fetching user roles:", error);
        return null;
      }
    };

    // Load user role on component mount
    useEffect(() => {
      const loadUserRole = async () => {
        const role:any = await getUserRole();
        console.log("test", role[0].modules)
        setUserRole(role[0].modules);
      };
      loadUserRole();
    }, []);

    // Logic to check if the user has the required role
    useEffect(() => {
      if (userRole && !allowedRoles.includes(userRole)) {
        // Redirect to unauthorized page or login page
        router.push('/unauthorized');
      }
    }, [allowedRoles, userRole, router]);

    // Render the wrapped component if the user has the required role
    return <WrappedComponent {...props} />;
  };

  // Set displayName for the HOC
  WithAuth.displayName = `withAuth(${(WrappedComponent.displayName ?? WrappedComponent.name) || 'Component'})`;

  return WithAuth;
};

export default withAuth;
