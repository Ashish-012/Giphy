import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
const AppLayout = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      <div className="container px-6 py-4 mx-auto">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
