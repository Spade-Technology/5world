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

export function HomeCTAComponent() {
  return (
    <section className="flex flex-col items-center bg-gradient-to-r from-vdao-light to-vdao-dark py-24 px-6 md:px-8 xl:px-0">
      <h1 className="text-center text-5xl font-medium text-white">
        Ready to Join?
      </h1>
      <div className="mt-6 w-full max-w-3xl text-center font-body text-2xl text-white">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi turpis
        mi, faucibus vitae elementum id, tristique at lectus.
      </div>
      <Button type="primary" className="mt-8 scale-125 md:scale-0">
        Apply Now
      </Button>
    </section>
  );
}

export function HomePartnersComponent() {
  return (
    <section className="overflow-hidden px-6 text-vdao-dark md:px-8 xl:px-0">
      <div className="mx-auto flex max-w-[1440px] flex-col md:flex-row">
        <div className="mt-24 max-w-[1280px] md:mx-auto md:w-1/2 ">
          <h1 className="mb-6 w-full text-left text-5xl font-medium">
            Our Partners
          </h1>
          <div className="max-w-sm font-body text-2xl font-medium text-vdao-dark">
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
    </section>
  );
}

export function HomeCommunityComponent() {
  return (
    <section className="mt-36 overflow-hidden bg-vdao-dark px-6 text-vdao-light  md:px-0">
      <div className="mx-auto flex max-w-[1440px] flex-col ">
        <div className="xl:p-O mx-auto mt-24 w-full max-w-[1280px] p-0 md:px-8">
          <h1 className="mb-6 w-full text-left text-5xl font-medium">
            Community
          </h1>
          <span className="text-2xl font-medium text-white">
            The VDAO Community is:
          </span>
        </div>
        <div className="mt-12 flex flex-col-reverse md:flex-row">
          <Image
            src={CommunityHero}
            alt="VDAO"
            className="my-10 scale-125 md:my-0 md:w-1/3 md:scale-100"
          />
          <div className="gapx-8 grid w-full grid-flow-col grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-2">
            <div className="flex max-w-[340px] flex-col gap-4">
              <h1 className="text-2xl font-medium">Apolitical</h1>
              <span className="text-lg font-normal">
                We welcome members from all walks of life and political beliefs
                if they are aligned with the DAO’s core values and mission.
              </span>
            </div>
            <div className="flex max-w-[340px] flex-col gap-4">
              <h1 className="text-2xl font-medium">Positive</h1>
              <span className="text-lg font-normal">
                We believe that with focus and collective effort, the world's
                ecosystems can and will be regenerated.
              </span>
            </div>
            <div className="flex max-w-[340px] flex-col gap-4">
              <h1 className="text-2xl font-medium">Curious</h1>
              <span className="text-lg font-normal">
                We exist at the bleeding edge of regenerative agriculture
                innovation, creating global networks that can bring about a new
                era of modern agriculture.
              </span>
            </div>
            <div className="flex max-w-[340px] flex-col gap-4">
              <h1 className="text-2xl font-medium">Engaged</h1>
              <span className="text-lg font-normal">
                We contribute to regenerative agriculture conversations,
                developing a vibrant learning culture.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeGetInvolvedComponent() {
  return (
    <section className="xl:p-O mx-6 my-36 flex max-w-[1440px] flex-col p-0 md:px-8 lg:mx-auto">
      <div className="mx-auto w-full max-w-[1280px]">
        <h1 className="mb-6 w-full text-left text-5xl font-medium">
          Get Involved
        </h1>
        <span className="text-2xl font-medium text-vdao-dark">
          Support VDAOs mission in 3 ways:
        </span>
      </div>
      <div className="flex flex-col lg:flex-row">
        <Image
          src={VDAOGetInvolved}
          alt="VDAO"
          height={750}
          width={750}
          className=" my-auto h-[45vw] w-[45vw] xl:!h-[750px] xl:!w-[750px]"
        />
        <div className="flex w-full justify-center">
          <div className="flex max-w-xs flex-col gap-16">
            <div className="flex flex-col">
              <h1 className="mb-4 text-2xl font-medium text-vdao-dark">
                NFT Auction
              </h1>
              <span className="text-lg font-normal text-vdao-dark">
                Participate in our NFT auction for an opportunity to fund
                regenerative agriculture innovation, own a unique piece of art,
                and access real-world learning opportunities and events.
              </span>
              <Button type="primary" className="mt-8 mr-auto">
                Our Auction
              </Button>
            </div>
            <div className="flex flex-col">
              <h1 className="mb-4 text-2xl font-medium text-vdao-dark">
                Donate
              </h1>
              <span className="text-lg font-normal text-vdao-dark">
                Donate directly to the VDAO treasury to receive an exclusive
                on-chain badge that highlight’s your impact and unlocks access
                to quadratic voting in future grants rounds.
              </span>
              <Button type="primary" className="mt-8 mr-auto">
                Donate
              </Button>
            </div>
            <div className="flex flex-col">
              <h1 className="mb-4 text-2xl font-medium text-vdao-dark">
                Coordinate
              </h1>
              <span className="text-lg font-normal text-vdao-dark">
                Apply now to become a core member of the VDAO community,
                pledging your time and support towards our mission of global
                ecosystem regeneration.
              </span>
              <Button type="primary" className="mt-8 mr-auto">
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
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
  <div className="flex w-full flex-col items-center gap-5 px-14 md:items-start md:px-0">
    <Image src={icon} alt="VDAO" height={100} />
    <h1 className="text-3xl font-medium">{title}</h1>
    <div className="w-full border-y-[1px] border-vdao-dark" />
    <span className="text-center font-inter text-base font-normal text-vdao-dark md:text-left md:text-xl">
      {description}
    </span>
  </div>
);

export function HomeObjectivesComponent() {
  return (
    <section className="xl:p-O mx-auto mt-36 flex max-w-[1440px] flex-col p-0 md:px-8">
      <h1 className="w-full text-center text-5xl font-medium">
        Core Objectives
      </h1>
      <div className="mx-auto mt-16 flex max-w-[1280px] flex-col gap-14 md:flex-row md:gap-10">
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
    </section>
  );
}

export function HomeIntroComponent() {
  return (
    <section className="mx-auto mt-36 flex max-w-[1440px] flex-col-reverse overflow-hidden px-6 md:flex-row md:px-8 xl:px-0 ">
      <Image
        src={IntroHero}
        alt="VDAO"
        className="my-auto h-1/2 w-1/2 -translate-x-16 scale-150 md:-mt-14 md:translate-x-0 md:scale-100 "
      />
      <div className="z-10 flex w-full flex-col">
        <h1 className="text-5xl font-medium ">Introduction</h1>
        <span className="mt-9 text-vdao-dark">
          VDAO funds regenerative agriculture research and development (R&D)
          projects worldwide. <br />
          <br />
          Regenerative land management uses techniques and practices to restore
          soil, biodiversity, ecosystems, and water quality; techniques used in
          farming for centuries, but recently replaced by chemical, industrial
          alternatives. <br />
          <br />
          VDAO empowers us to dream of fully regenerated planet. Using
          cutting-edge Web3 tech, it connects artists, land stewards, funders,
          scientists, researchers, and innovators to collaborate for planetary
          regeneration.
        </span>
      </div>
    </section>
  );
}

export function HomeWelcomeComponent() {
  return (
    <section className="mx-auto flex max-w-[1440px] flex-col overflow-hidden">
      <div className="mx-auto mt-28 flex flex-col">
        <h1 className="text-center text-7xl font-medium">
          Re : imagine the future
        </h1>
        <h4 className="mt-5 text-center font-body text-2xl font-medium">
          A dao to restore ecosystems from the soil up.
        </h4>
        <Button type="primary" className="mx-auto mt-10">
          Join Us
        </Button>
      </div>
      <Image
        src={WelcomeHero}
        alt="VDAO"
        className="-z-10 -mt-16 scale-[140%] md:scale-100"
      />
    </section>
  );
}
