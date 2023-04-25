import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "public/logo/png/color.png";
import footerStyle from "./footerStyle.module.scss";

import discord from "public/illustrations/socials/discord.svg";
import discourse from "public/illustrations/socials/discourse.svg";
import twitter from "public/illustrations/socials/twitter.svg";
import { footerTexts } from "./mockData";

type Props = {
  signatures?: number;
  ref?: any;
};

const Footer = (props: Props) => {
  return (
    <footer className={footerStyle.footer}>
      <div>
        <img
          src={"/logo/svg/VDAO-color.svg"}
          alt="VDAO"
          className={footerStyle.img}
        />
        <div className={footerStyle.copyL}>© 2023 5th World</div>
      </div>
      <section>
        {footerTexts.map(({ title, text }, index) => {
          return (
            <div key={index}>
              <div className={footerStyle.title}>{title}</div>
              {text.map(({ text }) => {
                return <div className={footerStyle.text}>{text}</div>;
              })}
            </div>
          );
        })}
      </section>
      <div className={footerStyle.copy}>© 2023 5th World</div>
    </footer>
  );
};

const FooterManifesto = (props: Props) => {
  return (
    <div className="bg-white px-14 py-10">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-10">
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
