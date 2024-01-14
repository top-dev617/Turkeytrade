import useAuth from "@/lib/useAuth";
import { Spinner } from "@material-tailwind/react";
import React from "react";
import Login from "../shared/Login";
import StoreTable from "../Store-ui/StoreTable";

const HomePage = () => {
  const { user, isLoading, logout } = useAuth();

  if (isLoading) {
    return (
      <div className="w-full min-h-screen h-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  }
  return (
    <>
      {!isLoading && user?._id ? (
        <div className="scrollbar overflow-y-auto">
          <div className="flex flex-col h-full w-full flex-grow max-h-screen min-h-screen max-w-[1235px] mx-auto">
            <StoreTable logout={logout} />
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default HomePage;
