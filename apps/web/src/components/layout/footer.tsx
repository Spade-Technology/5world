import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "public/logo/png/color.png";

import discord from "public/illustrations/socials/discord.svg";
import discourse from "public/illustrations/socials/discourse.svg";
import twitter from "public/illustrations/socials/twitter.svg";

type Props = {
  signatures?: number;
  ref?: any;
};

const Footer = (props: Props) => {
  const socialLinks = [
    { img: twitter, url: "#1" },
    { img: discourse, url: "#1" },
    { img: discord, url: "#1" },
  ];
  return (
    <footer>
      <div className="mx-auto flex h-24 max-w-[1280px] flex-col gap-4 py-16 px-6">
        <Image
          src={logo}
          alt="VDAO"
          height={30}
          className="mb-auto block md:hidden"
        />
        <div className="my-16 grid grid-cols-2 justify-between gap-16 md:mt-0 md:grid-cols-5 md:gap-0">
          <Image
            src={logo}
            alt="VDAO"
            height={30}
            className="mb-auto hidden md:block"
          />
          <div>
            <span className="clash text-xl font-medium text-vdao-dark">
              Participate
            </span>
            <div className="mt-8 flex flex-col gap-4">
              <Link className="inter w-fit text-base font-normal" href="/apply">
                Apply
              </Link>
              <Link className="inter w-fit text-base font-normal" href="/nft">
                NFT Collections
              </Link>
              <Link
                className="inter w-fit text-base font-normal"
                href="/donate"
              >
                Donate
              </Link>
              <Link
                className="inter w-fit text-base font-normal"
                href="/getfunding"
              >
                Get Funding
              </Link>
            </div>
          </div>
          <div>
            <span className="clash text-xl font-medium text-vdao-dark">
              Community
            </span>
            <div className="mt-8 flex flex-col gap-4">
              <Link className="inter w-fit text-base font-normal" href="#">
                Discord
              </Link>
              <Link className="inter w-fit text-base font-normal" href="#">
                Forum
              </Link>
            </div>
          </div>
          <div>
            <span className="clash text-xl font-medium text-vdao-dark">
              Organisation
            </span>
            <div className="mt-8 flex flex-col gap-4">
              <Link className="inter w-fit text-base font-normal" href="#">
                About Us
              </Link>
              <Link className="inter w-fit text-base font-normal" href="#">
                Analytics
              </Link>
              <Link className="inter w-fit text-base font-normal" href="#">
                Whitepaper
              </Link>
            </div>
          </div>
          <div>
            <span className="clash text-xl font-medium text-vdao-dark">
              Legal
            </span>
            <div className="mt-8 flex flex-col gap-4">
              <Link className="inter w-fit text-base font-normal" href="#">
                Terms of Service
              </Link>
              <Link className="inter w-fit text-base font-normal" href="#">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
        <div className="items-center gap-24 pb-8 md:flex">
          <span className="inter text-base font-normal text-vdao-dark">
            © 2023 5th World
          </span>
          <div className="my-4 flex items-center gap-4 md:my-0">
            {socialLinks.map(({ img, url }, index) => {
              return (
                <Link href={url}>
                  <Image alt="social link" className="w-5" src={img} />
                </Link>
              );
            })}
          </div>
        </div>
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
