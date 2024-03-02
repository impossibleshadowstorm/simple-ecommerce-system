"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@redux/store-provider";
import { SnackbarProvider } from "notistack";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@redux/store";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
          <Providers>
            <PersistGate loading={null} persistor={persistor}>
              {children}
            </PersistGate>
          </Providers>
        </SnackbarProvider>
      </body>
    </html>
  );
}
