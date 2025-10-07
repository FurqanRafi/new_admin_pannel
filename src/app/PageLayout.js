"use client";
import { AuthContext } from "@/AppContext/AppContext";
import Login from "@/components/Authentications/Login";
import Slidebar from "@/components/Slidebar/Slidebar";
import React, { useContext } from "react";

const PageLayout = ({ children }) => {
  const { user, token } = useContext(AuthContext);
  if (user || token) {
    return (
      <>
        <div className="w-[15%] min-h-screen ">
          <Slidebar />
        </div>
        <div className="w-[85%] min-h-screen">{children}</div>
      </>
    );
  } else {
    return <Login />;
  }
};

export default PageLayout;
