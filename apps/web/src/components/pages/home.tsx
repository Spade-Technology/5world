import { Button } from "antd";

import Image from "next/image";

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
    <section className="flex flex-col items-center bg-gradient-to-r from-vdao-light to-vdao-dark py-24">
      <h1 className="text-center text-5xl font-medium text-white">
        Ready to Join?
      </h1>
      <div className="mt-6 w-full max-w-3xl text-center font-body text-2xl text-white">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi turpis
        mi, faucibus vitae elementum id, tristique at lectus.
      </div>
      <Button type="primary" className="mt-8">
        Apply Now
      </Button>
    </section>
  );
}

export function HomePartnersComponent() {
  return (
    <section className="text-vdao-dark">
      <div className="mx-auto flex max-w-[1440px]">
        <div className="mx-auto mt-24 w-1/2 max-w-[1280px] ">
          <h1 className="mb-6 w-full text-left text-5xl font-medium">
            Our Partners
          </h1>
          <div className="max-w-sm font-body text-2xl font-medium text-vdao-dark">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit morbi turpis
            mi.
          </div>
        </div>
        <div className="mx-auto mt-28 grid w-full scale-75 grid-flow-col grid-cols-3 grid-rows-3 gap-20 opacity-70">
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
    <section className="mt-36 bg-vdao-dark text-vdao-light">
      <div className="mx-auto flex max-w-[1440px] flex-col ">
        <div className="mx-auto mt-24 w-full max-w-[1280px] ">
          <h1 className="mb-6 w-full text-left text-5xl font-medium">
            Community
          </h1>
          <span className="text-2xl font-medium text-white">
            The VDAO Community is:
          </span>
        </div>
        <div className="flex">
          <Image src={CommunityHero} alt="VDAO" className="w-1/3" />
          <div className="grid w-full grid-flow-col grid-cols-2 grid-rows-2">
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
    <section className="mx-auto my-36 flex max-w-[1440px] flex-col">
      <div className="mx-auto w-full max-w-[1280px]">
        <h1 className="mb-6 w-full text-left text-5xl font-medium">
          Get Involved
        </h1>
        <span className="text-2xl font-medium text-vdao-dark">
          Support VDAOs mission in 3 ways:
        </span>
      </div>
      <div className="flex">
        <Image src={VDAOGetInvolved} alt="VDAO" height={750} width={750} />
        <div className="flex w-full justify-center">
          <div className=" flex max-w-xs flex-col gap-16">
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

export function HomeObjectivesComponent() {
  return (
    <section className="mx-auto mt-36 flex max-w-[1440px] flex-col">
      <h1 className="w-full text-center text-5xl font-medium">
        Core Objectives
      </h1>
      <div className="mx-auto mt-16 flex max-w-[1280px] gap-10">
        <div className="flex w-full flex-col gap-5">
          <Image src={InnovateIcon} alt="VDAO" height={100} />
          <h1 className="text-3xl font-medium">Innovate</h1>
          <div className="w-full border-y-[1px] border-vdao-dark" />
          <span className="text-vdao-dark">
            We provide grants to researchers, research initiatives and
            individuals working in and around the field of regenerative
            agriculture.
          </span>
        </div>
        <div className="flex w-full flex-col gap-5">
          <Image src={FundRaiseIcon} alt="VDAO" height={100} />
          <h1 className="text-3xl font-medium">Fundraise</h1>
          <div className="w-full border-y-[1px] border-vdao-dark" />
          <span className="text-vdao-dark">
            We provide opportunities for individuals and institutions to donate
            to meaningful research initiatives and R&D that will regenerate the
            world's ecosystems.
          </span>
        </div>
        <div className="flex w-full flex-col gap-5">
          <Image src={CreateIcon} alt="VDAO" height={100} />
          <h1 className="text-3xl font-medium">Create</h1>
          <div className="w-full border-y-[1px] border-vdao-dark" />
          <span className="text-vdao-dark">
            We are thought leaders within regenerative agriculture
            conversations, producing content that clearly communicates our
            vision, mission and the impact of the projects we support.{" "}
          </span>
        </div>
        <div className="flex w-full flex-col gap-5">
          <Image src={ImagineIcon} alt="VDAO" height={100} />
          <h1 className="text-3xl font-medium">Imagine</h1>
          <div className="w-full border-y-[1px] border-vdao-dark" />
          <span className="text-vdao-dark">
            Our art and our vision helps others to experience how the world
            might look and feel once VDAO’s core mission is achieved.
          </span>
        </div>
      </div>
    </section>
  );
}

export function HomeIntroComponent() {
  return (
    <section className="mx-auto mt-36 flex max-w-[1440px] ">
      <Image src={IntroHero} alt="VDAO" className="-mt-14 w-1/2" />
      <div className="flex flex-col">
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
    <section className="mx-auto flex max-w-[1440px] flex-col">
      <div className="mx-auto mt-28 flex flex-col">
        <h1 className="text-center text-7xl font-medium">
          Re:imagine the future
        </h1>
        <h4 className="mt-5 text-center font-body text-2xl font-medium">
          A dao to restore ecosystems from the soil up.
        </h4>
        <Button type="primary" className="mx-auto mt-10">
          Join Us
        </Button>
      </div>
      <Image src={WelcomeHero} alt="VDAO" className="-mt-16" />
    </section>
  );
}
