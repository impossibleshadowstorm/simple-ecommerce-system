"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function ProtectedRoute(Component) {
  return function ProtectedRoute(props) {

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        redirect("/auth");
      }
    }, []);

    return <Component {...props} />;
  };
}
