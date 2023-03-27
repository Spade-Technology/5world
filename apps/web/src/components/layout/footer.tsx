import { Button } from "antd";
import Link from "next/link";
import React from "react";

type Props = {
  signatures?: number;
};

const Footer = (props: Props) => {
  return <div>Footer</div>;
};

const FooterManifesto = (props: Props) => {
  return (
    <div className="flex flex-col gap-10 bg-white px-14 py-10 pb-32">
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
        <Button type="primary" className="!h-10 w-44 !bg-vdao-dark">
          Sign Manifesto
        </Button>
      </div>
    </div>
  );
};

export default Footer;
export { FooterManifesto, Footer };
