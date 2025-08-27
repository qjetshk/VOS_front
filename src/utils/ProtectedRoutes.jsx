import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProtectedRoutes = () => {
  const { checkAuth, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth();
      setIsLoading(false);
    };
    verifyAuth();
  }, []);

  if (isLoading) {
    return (
      <section className="mt-25 mb-20 grid grid-cols-[120px_1fr] gap-10 mx-auto max-w-[700px]">
        <Skeleton circle className="w-30 h-30" />
        <Skeleton count={10} className="w-full h-10" />
      </section>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" />;
};

export default ProtectedRoutes;
