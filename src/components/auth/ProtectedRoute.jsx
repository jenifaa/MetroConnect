import { Navigate, useLocation, Outlet } from "react-router";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";

export default function ProtectedRoute({ children }) {
  const { data, isLoading, isError } = useUserInfoQuery(undefined);
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-2">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground animate-pulse">
            Verifying session...
          </p>
        </div>
      </div>
    );
  }

  if (isError || !data?.data?.email) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children ? children : <Outlet />;
}
