import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

function AuthLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen w-full">
<div className="relative w-1/2 flex items-center justify-center ">
<h1 className="absolute top-2  left-2 text-2xl  text-gray-800 font-poppins ">
          M-TECH 
        </h1>

        
        {location.pathname.includes('/auth/register') ? 
        <img 
        src="/images/1.svg" 
        alt="Logo" 
        className="w-full h-full object-contain"
      />
       :
      <img 
          src="/images/2.svg" 
          alt="Logo" 
          className="w-full h-full object-contain"
        />}
      </div>

      <div className="flex flex-1 items-center justify-center bg--background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
