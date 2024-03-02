"use client";
import React from "react";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

export default function Providers({ children }) {
  return React.createElement(Provider, { store: store }, children);
}


