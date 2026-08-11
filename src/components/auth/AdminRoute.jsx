import { Navigate, useLocation, Outlet } from "react-router";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";

export default function AdminRoute({ children }) {
  const { data, isLoading, isError } = useUserInfoQuery(undefined);
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-2">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Checking permissions...</p>
        </div>
      </div>
    );
  }

  const role = data?.data?.role;
  const isAdmin = role === "ADMIN" || role === "SUPER_ADMIN";

  if (isError || !data?.data?.email || !isAdmin) {
    // If not logged in at all, go to login. If logged in but not admin, go to home
    const redirectPath = data?.data?.email ? "/" : "/login";
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return children ? children : <Outlet />;
}
