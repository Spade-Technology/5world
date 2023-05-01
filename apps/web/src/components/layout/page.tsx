import React from "react";
import Header from "./header";
import Footer from "./footer";

function Page({
  children,
  web2 = false,
}: {
  children: React.ReactNode;
  web2?: boolean;
}) {
  const bodyClassName =
    "w-full text-vdao-dark xl:mx-0 md:mx-6 mx-0 " + (!web2 && " bg-vdao-deep");

  return (
    <>
      <Header web2={web2} />
      <div className={bodyClassName}>{children}</div>
      <Footer />
    </>
  );
}

export default Page;
