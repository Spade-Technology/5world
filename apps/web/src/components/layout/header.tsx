import React from "react";

import Image from "next/image";

import logo from "public/logo/png/color.png";

import discord from "public/illustrations/socials/discord.svg";
import discordCircle from "public/illustrations/socials/discordCircle.svg";
import discourse from "public/illustrations/socials/discourse.svg";

import darkDiscourse from "public/illustrations/socials/darkDiscourse.svg";
import darkDiscord from "public/illustrations/socials/darkDiscord.svg";

import twitter from "public/illustrations/socials/twitter.svg";
import { Divider } from "antd";
import { VDAOConnectButton } from "../walletconnect/connectbutton";
import Link from "next/link";

type Props = {
  signatures?: number;
  className?: string;
  invertImages?: boolean;
};

const Header = (props: Props) => {
  return (
    <header className={`h-24 ${props.className} `}>
      <div className="mx-auto flex h-24 max-w-[1280px] items-center justify-between">
        <Link href="/">
          <Image src={logo} alt="VDAO" height={30} />
        </Link>
        <div className="ml-72 flex justify-between gap-9">
          <Link href="/">Home</Link>
          <Link href="/apply">Participate</Link>
          <Link href="/funding">Get Funding</Link>
          <Link href="/donate">Donate</Link>
          <Link href="/about">About</Link>
        </div>
        <div className="flex gap-7">
          <Image
            src={props.invertImages ? darkDiscourse : discourse}
            alt="VDAO"
            width={30}
            height={30}
            className="hidden md:block"
          />
          <Image
            src={props.invertImages ? darkDiscord : discordCircle}
            alt="VDAO"
            width={30}
            height={30}
            className="hidden md:block"
          />
        </div>

        <VDAOConnectButton
          className={
            props.invertImages
              ? "border-vdao-light text-vdao-light"
              : "border-vdao-dark text-vdao-dark"
          }
        />
      </div>
    </header>
  );
};

const HeaderManifesto = (props: Props) => {
  return (
    <div className="mx-auto flex max-w-[1280px] justify-between bg-vdao-deep py-11 ">
      <Image
        src={logo}
        alt="VDAO"
        className="mx-auto my-auto h-[30px] w-[130px] md:mx-0"
      />
      <div className="flex flex-row justify-center gap-7">
        <Image
          src={twitter}
          alt="VDAO"
          width={30}
          height={30}
          className="hidden md:block"
        />
        <Image
          src={discord}
          alt="VDAO"
          width={30}
          height={30}
          className="hidden md:block"
        />
        <Divider
          type="vertical"
          className="hidden !h-full bg-[#848484] md:block"
        />
        <div className="flex flex-col-reverse gap-4 px-4 text-center md:flex-row md:gap-8">
          <span className="my-auto text-lg font-medium text-white">
            {props.signatures || 0} Signatures
          </span>
          <VDAOConnectButton className="border-vdao-light text-vdao-light" />
        </div>
      </div>
    </div>
  );
};

export { HeaderManifesto, Header };

export default Header;
