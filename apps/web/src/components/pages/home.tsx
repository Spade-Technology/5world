import { Button } from "antd";

import Image, { StaticImageData } from "next/image";

import CommunityHero from "public/illustrations/home/PNG/VDAO-home-community.png";
import WelcomeHero from "public/illustrations/home/PNG/VDAO-home-hero.png";
import IntroHero from "public/illustrations/home/PNG/VDAO-home-intro.png";

import CreateIcon from "public/icons/home/VDAO-icon-home-create.svg";
import FundRaiseIcon from "public/icons/home/VDAO-icon-home-fundraise.svg";
import ImagineIcon from "public/icons/home/VDAO-icon-home-imagine.svg";
import InnovateIcon from "public/icons/home/VDAO-icon-home-innovate.svg";

import VDAOGetInvolved from "public/illustrations/home/PNG/VDAO-get-involved.png";

import FifthworldLogo from "public/thirdparty/5world.png";
import ConsensysLogo from "public/thirdparty/consensys.png";
import DecentralandLogo from "public/thirdparty/decentraland.png";
import DiscoLogo from "public/thirdparty/disco.png";
import EtheraLogo from "public/thirdparty/ethera.png";
import InfuraLogo from "public/thirdparty/infura.png";
import PalmLogo from "public/thirdparty/palm.png";
import PleasrDaoLogo from "public/thirdparty/pleasrdao.png";
import PleasrHouseLogo from "public/thirdparty/pleasrHouse.png";
import PrimaryButton from "~/styles/shared/buttons/primaryButton";
import { Section } from "../layout/section";

export function HomeCTAComponent() {
  return (
    <Section className="flex flex-col items-center bg-gradient-to-r from-vdao-light to-vdao-dark px-6 md:py-[100px] md:px-8 xl:px-0">
      <div className="clash text-center text-[46px] font-medium text-white">
        Ready to Join?
      </div>
      <div className="satoshi mt-[25px] w-full max-w-3xl text-center font-body text-[26px] leading-[30px] text-white">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi turpis
        mi, faucibus vitae elementum id, tristique at lectus.
      </div>
      <PrimaryButton
        text=" Apply Now"
        className=" mx-auto mt-[62px] mr-auto bg-vdao-light"
      />
    </Section>
  );
}

export function HomePartnersComponent() {
  return (
    <Section className="overflow-hidden px-6 text-vdao-dark md:px-8 xl:px-0">
      <div className="mx-auto flex max-w-[1280px] flex-col md:flex-row">
        <div className="mt-24 max-w-[1280px] md:mx-auto md:w-1/2 ">
          <div className="clash mb-6 w-full text-left text-[46px] font-medium text-vdao-dark">
            Our Partners
          </div>
          <div className="satoshi max-w-sm font-body text-2xl font-medium leading-[30px] text-vdao-dark md:text-[26px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit morbi turpis
            mi.
          </div>
        </div>
        <div className="mx-auto mt-28 mb-16 grid w-full scale-95 grid-flow-col grid-cols-2 grid-rows-5 gap-20 opacity-70 md:mb-0 md:scale-75 md:grid-cols-3 md:grid-rows-3">
          <Image src={FifthworldLogo} alt="VDAO" className="w-full" />
          <Image src={ConsensysLogo} alt="VDAO" className="w-full" />
          <Image src={DecentralandLogo} alt="VDAO" className="w-full" />
          <Image src={DiscoLogo} alt="VDAO" className="w-full" />
          <Image src={EtheraLogo} alt="VDAO" className="w-full" />
          <Image src={InfuraLogo} alt="VDAO" className="w-full" />
          <Image src={PalmLogo} alt="VDAO" className="w-full" />
          <Image src={PleasrDaoLogo} alt="VDAO" className="w-full" />
          <Image src={PleasrHouseLogo} alt="VDAO" className="w-full" />
        </div>
      </div>
    </Section>
  );
}

export function HomeCommunityComponent() {
  return (
    <Section className="  mt-10 bg-vdao-dark px-6 text-vdao-light">
      <div className="relative mx-auto flex max-w-[1440px] flex-col ">
        <div className="mt-24">
          <div className="clash mb-6 text-4xl font-medium md:ml-9 md:text-[46px] lg:ml-36">
            Community
          </div>
          <div className="satoshi text-2xl font-medium text-white md:ml-9 md:text-[26px] lg:ml-36">
            The VDAO Community is:
          </div>
        </div>
        <div className="mt-12 flex flex-col-reverse md:flex-row">
          <div className="mb-96 grid gap-12 md:ml-[40%] md:mb-48 md:grid-cols-2 md:gap-0 lg:ml-[40%]">
            <div className="flex  flex-col gap-4 md:w-9/12">
              <div className="clash text-2xl font-medium md:text-3xl">
                Apolitical
              </div>
              <div className="satoshi text-lg font-normal leading-[22px] text-white">
                We welcome members from all walks of life and political beliefs
                if they are aligned with the DAO’s core values and mission.
              </div>
            </div>
            <div className="flex flex-col gap-4 md:w-10/12 lg:w-9/12">
              <div className="clash text-2xl font-medium md:text-3xl">
                Positive
              </div>
              <div className="satoshi text-lg font-normal leading-[22px] text-white">
                We believe that with focus and collective effort, the world's
                ecosystems can and will be regenerated.
              </div>
            </div>
            <div className="mt-10 flex flex-col gap-4 md:w-10/12 lg:w-9/12">
              <div className="clash text-2xl font-medium md:text-3xl">
                Curious
              </div>
              <div className="satoshi text-lg font-normal leading-[22px] text-white">
                We exist at the bleeding edge of regenerative agriculture
                innovation, creating global networks that can bring about a new
                era of modern agriculture.
              </div>
            </div>
            <div className="mt-10 flex flex-col gap-4 md:w-10/12 lg:w-9/12">
              <div className="clash text-2xl font-medium md:text-3xl">
                Engaged
              </div>
              <div className="satoshi text-lg font-normal leading-[22px] text-white">
                We contribute to regenerative agriculture conversations,
                developing a vibrant learning culture.
              </div>
            </div>
          </div>
        </div>
        <Image
          src={CommunityHero}
          alt="VDAO"
          className="absolute bottom-0 left-0 md:h-3/6 md:w-6/12 lg:h-5/6"
        />
      </div>
    </Section>
  );
}

export function HomeGetInvolvedComponent() {
  return (
    <Section className="my-36 flex max-w-[1440px] flex-col lg:mx-auto">
      <div className="clash mb-6 ml-6 text-4xl font-medium md:ml-9 md:text-[46px] lg:ml-36">
        Get Involved
      </div>
      <div className="flex flex-col md:flex-row md:items-start md:gap-9">
        <div className="w-full md:w-1/2 ">
          <div className="satoshi md:text-[26px ml-6 text-2xl font-medium text-vdao-dark md:ml-9 lg:ml-36">
            Support VDAOs mission in 3 ways:
          </div>
          <Image
            src={VDAOGetInvolved}
            alt="VDAO"
            className="mt-12 mb-10 w-full md:mt-20 md:mb-0"
          />
        </div>
        <div className="flex flex-col gap-16 px-6 md:w-1/2 md:px-0 md:pr-5 lg:w-1/3">
          <div className="flex flex-col">
            <div className="clash mb-4 text-3xl font-medium text-vdao-dark">
              NFT Auction
            </div>
            <div className="satoshi text-lg font-normal leading-[22px] text-vdao-dark">
              Participate in our NFT auction for an opportunity to fund
              regenerative agriculture innovation, own a unique piece of art,
              and access real-world learning opportunities and events.
            </div>
            <PrimaryButton text="Our Auction" className=" mt-8 mr-auto" />
          </div>
          <div className="flex flex-col">
            <div className="clash mb-4 text-3xl font-medium text-vdao-dark">
              Donate
            </div>
            <div className="satoshi text-lg font-normal leading-[22px] text-vdao-dark">
              Donate directly to the VDAO treasury to receive an exclusive
              on-chain badge that highlight’s your impact and unlocks access to
              quadratic voting in future grants rounds.
            </div>
            <PrimaryButton text="Donate" className=" mt-8 mr-auto" />
          </div>
          <div className="flex flex-col">
            <div className="clash mb-4 text-3xl font-medium text-vdao-dark">
              Coordinate
            </div>
            <div className="satoshi text-lg font-normal leading-[22px] text-vdao-dark">
              Apply now to become a core member of the VDAO community, pledging
              your time and support towards our mission of global ecosystem
              regeneration.
            </div>
            <PrimaryButton text="Apply Now" className=" mt-8 mr-auto" />
          </div>
        </div>
      </div>
    </Section>
  );
}

const ObjectiveSubComponent = ({
  icon,
  title,
  description,
}: {
  icon: StaticImageData;
  title: string;
  description: string;
}) => (
  <div className="flex w-full flex-col items-center gap-5 md:items-start">
    <Image src={icon} alt="VDAO" height={100} />
    <div className="clash text-3xl font-medium">{title}</div>
    <div className="w-full border-y-[1px] border-vdao-dark" />
    <div className="satoshi text-center text-base font-normal text-vdao-dark md:text-left md:text-lg">
      {description}
    </div>
  </div>
);

export function HomeObjectivesComponent() {
  return (
    <Section className="xl:p-O md:lg-14 mx-auto mt-36 flex max-w-[1440px] flex-col p-0 md:px-16">
      <h1 className="w-full text-center text-4xl font-medium md:text-[46px]">
        Core Objectives
      </h1>
      <div className="mx-auto mt-16 flex flex-col gap-14 px-16 md:flex-row md:gap-10 md:px-0 lg:px-16">
        <ObjectiveSubComponent
          icon={InnovateIcon}
          title="Innovate"
          description="We provide grants to researchers, research initiatives and individuals working in and around the field of regenerative agriculture."
        />
        <ObjectiveSubComponent
          icon={FundRaiseIcon}
          title="Fundraise"
          description="We provide opportunities for individuals and institutions to donate to meaningful research initiatives and R&D that will regenerate the world's ecosystems."
        />
        <ObjectiveSubComponent
          icon={CreateIcon}
          title="Create"
          description="We are thought leaders within regenerative agriculture conversations, producing content that clearly communicates our vision, mission and the impact of the projects we support."
        />
        <ObjectiveSubComponent
          icon={ImagineIcon}
          title="Imagine"
          description="Our art and our vision helps others to experience how the world might look and feel once VDAO’s core mission is achieved."
        />
      </div>
    </Section>
  );
}

export function HomeIntroComponent() {
  return (
    <Section className="mx-auto mt-36 grid max-w-[1440px] flex-col-reverse items-center gap-5 md:grid-cols-2 md:px-6">
      <div className="z-10 flex w-11/12 flex-col px-6">
        <h1 className="text-4xl font-medium md:text-[46px] ">Introduction</h1>
        <div className="satoshi font-nornal mt-9 text-lg leading-[22px] text-vdao-dark">
          VDAO funds regenerative agriculture research and development (R&D)
          projects worldwide.
          <div className="my-3" />
          Regenerative land management uses techniques and practices to restore
          soil, biodiversity, ecosystems, and water quality; techniques used in
          farming for centuries, but recently replaced by chemical, industrial
          alternatives.
          <div className="my-3" />
          VDAO empowers us to dream of fully regenerated planet. Using
          cutting-edge Web3 tech, it connects artists, land stewards, funders,
          scientists, researchers, and innovators to collaborate for planetary
          regeneration.
        </div>
      </div>
      <Image
        width={"0"}
        height={"0"}
        src={"illustrations/home/SVG/illustraion02 (2).svg"}
        alt="VDAO"
        className="w-full  md:order-first md:hidden"
      />
      <Image
        src={IntroHero}
        alt="VDAO"
        className="hidden md:order-first md:block"
      />
    </Section>
  );
}

export function HomeWelcomeComponent() {
  return (
    <Section className="mx-auto flex max-w-[1440px] flex-col overflow-hidden">
      <div className="mx-auto mt-28">
        <div className="clash mx-auto w-10/12 text-center text-5xl font-medium text-vdao-dark md:w-auto md:text-[80px]">
          Re:imagine the future
        </div>
        <h4 className="mt-5 px-6 text-center font-body text-[26px] font-medium text-vdao-dark">
          A dao to restore ecosystems from the soil up.
        </h4>
        <PrimaryButton text="Join Us" className="mx-auto mt-10 " />
      </div>
      <Image
        src={WelcomeHero}
        alt="VDAO"
        className="md:max-w-100 relative left-[-5%] -z-10 mt-5 scale-[100%]"
      />
    </Section>
  );
}
