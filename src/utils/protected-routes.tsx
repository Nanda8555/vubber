import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import Loading from "@/shared/components/loading";

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => {
    const { isAuthenticated } = useSelector(
      (state: RootState) => state.userInfo
    );
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const checkAuth = async () => {
        if (!isAuthenticated) {
          navigate("/");
          return;
        }
        setLoading(false);
    };

    useEffect(() => {
      checkAuth();
    }, [isAuthenticated]);

    if (loading) {
      return (
        <div className="h-screen flex justify-center items-center bg-custom-black">
          <Loading />
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
};

const withPublicAuth = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => {
    const { isAuthenticated } = useSelector(
      (state: RootState) => state.userInfo
    );
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const checkAuth = async () => {
      if (isAuthenticated) {
        navigate("/projects");
        return;
      }
      setLoading(false);
    };

    useEffect(() => {
      checkAuth();
    }, [isAuthenticated]);

    if (loading) {
      return (
        <div className="h-screen flex justify-center items-center bg-custom-black">
          <Loading />
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
};

export { withAuth, withPublicAuth };