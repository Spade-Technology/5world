import React from "react";

import Image from "next/image";

import logo from "public/logo/png/color.png";
import discord from "public/illustrations/socials/discord.svg";
import twitter from "public/illustrations/socials/twitter.svg";
import { Divider } from "antd";
import { VDAOConnectButton } from "../walletconnect/connectbutton";

type Props = {
  signatures?: number;
};

const Header = (props: Props) => {
  return <div>Header</div>;
};

const HeaderManifesto = (props: Props) => {
  return (
    <div className="mx-auto  flex max-w-[1280px] justify-between bg-vdao-deep py-11">
      <Image src={logo} alt="VDAO" width={170} height={41} />
      <div className="flex flex-row justify-center gap-7">
        <Image src={twitter} alt="VDAO" width={30} height={30} />
        <Image src={discord} alt="VDAO" width={30} height={30} />
        <Divider type="vertical" className="!h-full bg-[#848484]" />
        <span className="my-auto -mr-2 text-lg font-medium text-white">
          {props.signatures || 0} Signatures
        </span>
        <VDAOConnectButton />
      </div>
    </div>
  );
};

export { HeaderManifesto, Header };

export default Header;
