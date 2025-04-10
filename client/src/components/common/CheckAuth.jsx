import React from 'react'
import { useLocation, Navigate } from 'react-router-dom'

function CheckAuth(props) {
    const location = useLocation();

    if (!props.isAuthenticated && !(location.pathname.includes("/login") || location.pathname.includes("/register"))) {
      return <Navigate to="/auth/login" />;
    }

  if(props.isAuthenticated && (location.pathname.includes("/login") || location.pathname.includes("/register"))){
    if(props.user?.role === "admin"){
        return <Navigate to="/admin/dashboard" />
    }
    else{
        return <Navigate to="/shop/home" />
    }
  }

  if(props.isAuthenticated && location.pathname.includes("admin") &&props.user?.role !== "admin"){
    return <Navigate to="/un-auth" />
  }

  if(props.isAuthenticated && location.pathname.includes("admin") && props.user?.role === "admin"){
    return <Navigate to="/admin/dashboard" />
  }

  
  return props.children;



}

export default CheckAuth