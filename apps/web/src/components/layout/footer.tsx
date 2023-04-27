import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "public/logo/png/color.png";

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
    <footer className={`flex flex-col md:flex-row`}>
      <div>
        <img
          src={"/logo/svg/VDAO-color.svg"}
          alt="VDAO"
          className={`mt-[15.385vw] ml-[7.1719vw] h-[7.692vw] w-[32.231vw] md:mt-[4.167vw] md:mr-[11.34vw] md:ml-[10.486vw] md:h-[2.083vw] md:w-[8.729vw]`}
        />
        <div
          className={`inter mt-[21.319vw] mb-[2.083vw] ml-[10.486vw] hidden text-[1.111vw] text-vdao-dark sm:block`}
        >
          © 2023 5th World
        </div>
      </div>
      <section
        className={`ml-[7.179vw] flex flex-wrap justify-between md:ml-0`}
      >
        {footerTexts.map(({ title, text }, index) => {
          return (
            <div
              key={index}
              className={`w-[38.462vw] md:mr-[6.042vw] md:w-[8.681vw]`}
            >
              <div
                className={`clash mt-[16.41vw] mb-[8.718vw] text-[5.128vw] font-medium text-vdao-dark md:mb-[2.431vw] md:mt-[4.167vw] md:text-[1.839vw]`}
              >
                {title}
              </div>
              {text.map(({ text, url }, index) => {
                return (
                  <Link href={url} key={index}>
                    <div
                      className={`inter mb-[4.615vw] font-normal text-vdao-dark text-[4.103] md:mb-[1.25vw] md:text-[1.111vw]`}
                    >
                      {text}
                    </div>
                  </Link>
                );
              })}
            </div>
          );
        })}
      </section>
      <div
        className={` inter mt-[35.641vw] mb-[15.897vw] ml-[7.179vw] text-[4.103vw] font-normal text-vdao-dark md:hidden`}
      >
        © 2023 5th World
      </div>
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
