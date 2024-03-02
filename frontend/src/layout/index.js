import React from "react";
import Header from "@layout/header";

export default function CommonLayout(props) {
  const { headerProps, children } = props;

  return (
    <>
      <div className="min-h-full bg-black">
        <Header {...headerProps} />

        <main>
          <div className="mx-auto max-w-7xl py-6 px-4">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
