import React from "react";

import Image from "next/image";

import logo from "public/logo/png/color.png";
import discord from "public/illustrations/socials/discord.svg";
import twitter from "public/illustrations/socials/twitter.svg";
import { Divider } from "antd";
import { VDAOConnectButton } from "../walletconnect/connectbutton";
import whiteDiscord from "public/illustrations/socials/whiteDiscord.svg";
import whiteDiscourse from "public/illustrations/socials/whiteDiscourse.svg";
import hamburger from "public/illustrations/home/SVG/hamburger.svg";
import { useRouter } from "next/router";

type Props = {
  signatures?: number;
};

const Header = () => {
  const router = useRouter();

  /** common styles */
  const headerTextClassname =
    "hidden md:block my-auto text-lg font-normal text-vdao-dark cursor-pointer";

  return (
    <div className="mx-auto flex max-w-[1280px] justify-between bg-white py-11 ">
      <Image
        src={logo}
        alt="VDAO"
        className="mx-auto my-auto h-[30px] w-[130px] md:mx-0"
      />
      <div className="flex flex-row justify-center gap-7">
        <div className={headerTextClassname}>Home</div>
        <div className={headerTextClassname}>Participate</div>
        <div
          className={headerTextClassname}
          onClick={() => router.push("/getFunding")}
        >
          Get Funding
        </div>
        <div className={headerTextClassname}>Donate</div>
        <div className={headerTextClassname}>About</div>
        <Image
          src={whiteDiscourse}
          alt="Discourse"
          width={30}
          height={30}
          className="hidden md:block"
        />
        <Image
          src={whiteDiscord}
          alt="Discord"
          width={30}
          height={30}
          className="hidden md:block"
        />
        <div className="hidden md:block">
          <Divider type="vertical" className="hidden !h-full bg-[#848484]" />
        </div>
        <div className="flex flex-col-reverse gap-4 px-4 text-center md:flex-row md:gap-8">
          <VDAOConnectButton className="border-vdao-dark text-vdao-dark hidden md:block" />
        </div>
      </div>

      {/* For mobile */}
      <Image
        src={hamburger}
        alt="menu"
        width={30}
        height={17}
        className="mx-auto block cursor-pointer md:hidden"
      />
    </div>
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
          <VDAOConnectButton className="text-vdao-light border-vdao-light" />
        </div>
      </div>
    </div>
  );
};

export { HeaderManifesto, Header };

export default Header;
