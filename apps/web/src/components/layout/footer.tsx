import { Button } from "antd";
import Link from "next/link";
import React from "react";

type Props = {
  signatures?: number;
  ref?: any;
};

const Footer = (props: Props) => {
  return <div>Footer</div>;
};

const FooterManifesto = (props: Props) => {
  return (
    <div className="bg-white px-14 py-10">
      <div className="mx-auto flex max-w-[1280px]  flex-col gap-10">
        <div className="flex gap-9">
          <Link href="#">
            <h2>Home</h2>
          </Link>
          <Link href="#">
            <h2>Discord</h2>
          </Link>
          <Link href="#">
            <h2>Twitter</h2>
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-base font-medium text-black">
            {props.signatures || 0} Signatures
          </span>
          <Button
            type="primary"
            className="!h-10 w-44 !bg-vdao-dark"
            onClick={() => {
              const element = document.getElementById("SignModule");
              element?.scrollIntoView({ block: "end", behavior: "smooth" });
            }}
          >
            Sign Manifesto
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
export { FooterManifesto, Footer };
