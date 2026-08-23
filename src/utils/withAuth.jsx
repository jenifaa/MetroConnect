import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { Navigate } from "react-router";

export default function withAuth(Component, requiredRole) {
  return function AuthWrapper() {
    const { data, isLoading } = useUserInfoQuery(undefined);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (!data?.data?.email) {
      return <Navigate to="/login" replace />;
    }

    if (requiredRole && requiredRole !== data?.data?.role) {
      return <Navigate to="/unauthorized" replace />;
    }

    // console.log("Inside withAuth", data);

    return <Component />;
  };
}
