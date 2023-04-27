import Image, { StaticImageData } from "next/image";

import CommunityHero from "public/illustrations/home/PNG/VDAO-home-community.png";
import WelcomeHero from "public/illustrations/home/PNG/VDAO-home-hero.png";

import CreateIcon from "public/icons/home/VDAO-icon-home-create.svg";
import FundRaiseIcon from "public/icons/home/VDAO-icon-home-fundraise.svg";
import ImagineIcon from "public/icons/home/VDAO-icon-home-imagine.svg";
import InnovateIcon from "public/icons/home/VDAO-icon-home-innovate.svg";

import VDAOGetInvolved from "public/illustrations/home/PNG/VDAO-get-involved.png";

import Calc from "~/styles/widthCalculator";
import { cardList, communityTexts, getInvolvedTexts } from "./mockData";
import { Button } from "antd";

export function HomeCTAComponent() {
  return (
    <section
      style={{
        background: `linear-gradient( 95.36deg, #36dfae -2.08%,
          #28b6a5
          29.9%, #1d555c
          101.99% )`,
      }}
      className={`
          mt-[21.659vw] pt-[15.385vw]
        pb-[16.410vw] md:mt-0 md:pt-[7.5vw] md:pb-[7.083vw]`}
    >
      <div
        className={`clash   text-center  text-[9.231vw] font-medium  text-white md:text-[3.194vw]`}
      >
        Ready to Join?
      </div>
      <div
        className={`satoshi mx-auto mt-[5.128vw]  w-[87.692vw] text-center text-[5.641vw] font-medium  leading-[6.667vw] text-white  md:mt-[1.736vw] md:w-[51.458vw]  md:text-[1.806vw] md:leading-[2.083vw]`}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi turpis
        mi, faucibus vitae elementum id, tristique at lectus.
      </div>
      <div
        className={`clash mx-auto mt-[10.256vw] w-fit cursor-pointer rounded-[1.282vw] bg-vdao-light py-[1.282vw] px-[8.974vw] text-center text-[5.128vw] font-medium text-vdao-dark md:mt-[4.301vw] md:rounded-[0.347vw] md:py-[0.347vw] md:px-[2.431vw] md:text-[1.389vw]`}
      >
        {" "}
        Apply Now
      </div>
    </section>
  );
}

export function HomePartnersComponent() {
  return (
    <article
      className={`ml-[6.154vw] md:mt-[6.994vw] md:mr-[10.278vw] md:mb-[6.154vw] md:ml-[10.625vw] md:flex md:flex-wrap md:justify-between`}
    >
      <div className="md:w-[28.264vw]">
        <div
          className={`clash  mt-[20.513vw] text-[8.205vw]  font-medium  text-vdao-dark md:mt-[0vw] md:text-[3.194vw]`}
        >
          Our Partners
        </div>
        <div
          className={`satoshi mt-[4.103vw] w-[86.667vw]  text-[5.641vw] font-medium leading-[6.667vw]  text-vdao-dark  md:mt-[1.736vw] md:w-auto  md:text-[1.806vw] md:leading-[2.083vw]`}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit morbi turpis
          mi.
        </div>
      </div>
      <section
        className={`mt-[10.256vw] flex flex-wrap gap-[8.974vw] md:mt-[6.458vw] md:w-[45.764vw] md:gap-[3.661vw]`}
      >
        {cardList.map(({ img }, index) => {
          return (
            <Image
              key={index}
              src={img}
              alt="VDAO"
              className={`h-[9.231vw] w-[34.872vw] object-contain md:h-[2.639vw] md:w-[11.319vw]`}
            />
          );
        })}
      </section>
    </article>
  );
}

export function HomeCommunityComponent() {
  return (
    <section
      className={`bg-vdao-dark pt-[15.385vw] md:relative md:mt-[10vw] md:pt-[6.944vw] md:pb-[13.819vw] md:pl-[10.709vw]`}
    >
      <div
        className={`clash  ml-[6.154vw] text-[8.205vw]  font-medium  text-vdao-light md:ml-[0vw] md:text-[3.194vw]`}
      >
        Community
      </div>
      <div
        className={`satoshi ml-[6.154vw] mt-[4.103vw]  text-[5.641vw] font-medium  text-white  md:mt-[1.042vw] md:ml-[0px]  md:text-[1.806vw] `}
      >
        The VDAO Community is:
      </div>
      <article
        className={`md:mt-[4.167vw] md:ml-[19.847vw] md:flex md:flex-wrap`}
      >
        {communityTexts.map(({ title, text }, index) => {
          return (
            <div
              key={index}
              className={`ml-[6.154vw]  ${
                (index + 1) % 2 === 0 ? "md:ml-[8.056vw]" : "md:ml-0"
              } ${index > 1 && "md:mt-[2.778vw]"}`}
            >
              <div
                className={`clash mt-[12.821vw]  text-[6.667vw] font-medium  text-vdao-light md:mt-0 md:text-[1.806vw]`}
              >
                {title}
              </div>
              <div
                className={`satoshi mt-[3.846vw] w-[87.692vw]   text-[4.615vw] font-normal  text-white  md:mt-[1.042vw]  ${
                  index === 3
                    ? "md:w-[23.954vw]"
                    : index === 0
                    ? "md:w-[25.352vw]"
                    : "md:w-[25.486vw]"
                } md:text-[1.250vw] md:leading-[1.528vw]`}
              >
                {text}
              </div>
            </div>
          );
        })}
      </article>
      <Image
        src={CommunityHero}
        alt="VDAO"
        className={`h-[125.54vw] w-[118.718vw] md:absolute md:bottom-0 md:left-0 md:h-[41.389vw] md:w-[43.958vw]`}
      />
    </section>
  );
}

export function HomeGetInvolvedComponent() {
  return (
    <section className="">
      <div
        className={`clash ml-[6.154vw] mt-[20.513vw]  text-[8.205vw] font-medium  text-vdao-dark  md:mt-[9.722vw] md:ml-[10.417vw]  md:text-[3.194vw]`}
      >
        Get Involved
      </div>
      <div
        className={`md:mt-[1.736vw] md:ml-[3.472vw] md:flex md:w-[75.903vw] md:justify-between`}
      >
        <div>
          <div
            className={`satoshi ml-[6.154vw] mt-[5.385vw]  w-[64.872vw] text-[5.641vw] font-medium leading-[6.667vw]  text-vdao-dark  md:ml-[6.944vw] md:mt-[0] md:w-[32.361vw]  md:text-[1.806vw] md:leading-[0px]`}
          >
            Support VDAOs mission in 3 ways:
          </div>
          <Image
            src={VDAOGetInvolved}
            alt="VDAO"
            className={`mt-[12.308vw] mb-[10.256vw] h-[100vw] w-[100vw] md:mt-[5.556vw] md:h-[44.444vw] md:w-[44.444vw]`}
          />
        </div>
        <section className="">
          {getInvolvedTexts.map(({ title, text, btn }, index) => {
            return (
              <div key={index} className={`ml-[6.154vw] md:ml-0`}>
                <div
                  className={`clash mb-[5.385vw]  text-[6.667vw] font-medium  text-vdao-dark  md:mb-[1.181vw] md:text-start  md:text-[2.083vw]`}
                >
                  {title}
                </div>
                <div
                  className={`satoshi mb-[7.692vw] w-[77.692vw] text-[4.615vw] font-normal leading-[5.641vw] text-vdao-dark md:mb-[2.083vw] md:w-[22.222vw] md:text-[1.250vw] md:leading-[1.528vw]`}
                >
                  {text}
                </div>
                <div
                  className={`clash mt-[8.974vw] mb-[16.410vw] w-fit cursor-pointer rounded-[1.282vw] bg-vdao-light py-[1.282vw] px-[8.974vw] text-center text-[5.128vw] font-medium text-vdao-dark md:mt-[0vw] md:mb-[4.444vw] md:w-fit md:rounded-[0.347vw] md:py-[0.347vw] md:px-[2.431vw] md:text-[1.389vw]`}
                >
                  {btn}
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </section>
  );
}

const ObjectiveSubComponent = ({
  icon,
  title,
  description,
  styles,
}: {
  icon: StaticImageData;
  title: string;
  description: string;
  styles: any;
}) => (
  <div className={`md:mt-[4.514vw]`}>
    <Image
      src={icon}
      alt="VDAO"
      className={`mx-auto mt-[10.513vw] h-[25.641vw] w-auto md:mx-0 md:mt-[2.847vw] md:h-[6.994vw]`}
    />
    <div
      className={`clash  ml-[15.385vw] mt-[5.128vw] w-[69.231vw] border-b-[0.128vw] border-solid  border-vdao-dark pb-[5.128vw] text-center  text-[7.692vw] font-medium  text-vdao-dark md:mt-[1.528vw] md:ml-0 md:w-[17.361vw] md:border-b-[0.035vw]  md:pb-[1.389vw] md:text-start md:text-[2.083vw]`}
    >
      {title}
    </div>
    <div className="inter ml-[15.385vw] mt-[3.846vw] w-[69.231vw] text-center text-[4.103vw] font-normal text-vdao-dark md:ml-[0vw] md:w-[17.361vw] md:text-start md:text-[1.250vw]">
      {description}
    </div>
  </div>
);

export function HomeObjectivesComponent() {
  return (
    <article className="">
      <div
        className={`clash ml-[6.154vw] mt-[20.513vw]  text-[8.205vw] font-medium  text-vdao-dark  md:mt-[12.361vw] md:text-center  md:text-[3.194vw] `}
      >
        Core Objectives
      </div>
      <section className="md:ml-[10.417vw] md:flex md:w-[77.778vw] md:justify-between">
        <ObjectiveSubComponent
          styles={{}}
          icon={InnovateIcon}
          title="Innovate"
          description="We provide grants to researchers, research initiatives and individuals working in and around the field of regenerative agriculture."
        />
        <ObjectiveSubComponent
          icon={FundRaiseIcon}
          styles={{ width: Calc(122.07) }}
          title="Fundraise"
          description="We provide opportunities for individuals and institutions to donate to meaningful research initiatives and R&D that will regenerate the world's ecosystems."
        />
        <ObjectiveSubComponent
          styles={{ width: Calc(123.67) }}
          icon={CreateIcon}
          title="Create"
          description="We are thought leaders within regenerative agriculture conversations, producing content that clearly communicates our vision, mission and the impact of the projects we support."
        />{" "}
        <ObjectiveSubComponent
          styles={{ width: Calc(136.92) }}
          icon={ImagineIcon}
          title="Imagine"
          description="Our art and our vision helps others to experience how the world might look and feel once VDAO’s core mission is achieved."
        />
      </section>
    </article>
  );
}

export function HomeIntroComponent() {
  return (
    <article className="items-center md:flex md:w-[89.792vw] md:flex-row-reverse md:justify-between">
      <section>
        <div
          className={`clash ml-[6.154vw]  text-[8.205vw] font-medium  text-vdao-dark md:ml-[1.928vw] md:mt-[6.528vw]  md:text-[3.194vw] `}
        >
          Introduction
        </div>
        <div
          className={`satoshi ml-[6.154vw] mt-[5.385vw] w-[87.223vw] text-[4.615vw] font-normal leading-[5.641vw]    text-vdao-dark md:ml-[2.431vw] md:mt-[1.458vw] md:w-[35.694vw]  md:text-[1.250vw] md:leading-[1.528vw]`}
        >
          VDAO funds regenerative agriculture research and development (R&D)
          projects worldwide.
        </div>
        <div
          className={`satoshi ml-[6.154vw] mt-[5.385vw] w-[87.223vw] text-[4.615vw] font-normal leading-[5.641vw]    text-vdao-dark md:ml-[2.431vw] md:mt-[1.458vw] md:w-[35.694vw]  md:text-[1.250vw] md:leading-[1.528vw]`}
        >
          Regenerative land management uses techniques and practices to restore
          soil, biodiversity, ecosystems, and water quality; techniques used in
          farming for centuries, but recently replaced by chemical, industrial
          alternatives.
        </div>
        <div
          className={`satoshi ml-[6.154vw] mt-[5.385vw] w-[87.223vw] text-[4.615vw] font-normal leading-[5.641vw]    text-vdao-dark md:ml-[2.431vw] md:mt-[1.458vw] md:w-[35.694vw]  md:text-[1.250vw] md:leading-[1.528vw]`}
        >
          VDAO empowers us to dream of fully regenerated planet. Using
          cutting-edge Web3 tech, it connects artists, land stewards, funders,
          scientists, researchers, and innovators to collaborate for planetary
          regeneration.
        </div>
      </section>
      <img
        src={"/media/VDAO-introduction 1.svg"}
        alt="VDAO"
        className={` mt-[7.986vw] hidden h-[23.681vw] w-[46.528vw] object-contain sm:block`}
      />
      <img
        src={"/media/illustraion02 (1).svg"}
        alt="VDAO"
        className={` mt-[5.128vw] mb-[8.462vw] h-[57.692vw] w-[100vw] sm:hidden`}
      />
    </article>
  );
}

export function HomeWelcomeComponent() {
  return (
    <header>
      <div
        className={`clash mx-auto mt-[29.744vw] text-center text-[11.282vw]  font-medium leading-[11.28vw]    text-vdao-dark text-vdao-dark md:mt-[8.264vw]  md:text-[5.556vw] md:leading-none `}
      >
        Re:imagine the future
      </div>
      <div
        className={`satoshi mx-auto mt-[5.128vw] w-[76.923vw] text-center text-[5.641vw]  font-medium leading-[6.667vw] text-vdao-dark    text-vdao-dark md:mt-[1.389vw] md:w-auto  md:text-[1.806vw] md:leading-none `}
      >
        {" "}
        A dao to restore ecosystems from the soil up.
      </div>
      <div
        className={`clash mx-auto mt-[10.256vw] w-fit cursor-pointer rounded-[1.282vw] bg-vdao-light py-[1.282vw] px-[8.974vw] text-center text-[5.128vw] font-medium text-vdao-dark md:mt-[2.778vw] md:rounded-[0.347vw] md:py-[0.347vw] md:px-[2.431vw] md:text-[1.389vw]`}
      >
        Join Us
      </div>
      <Image
        src={WelcomeHero}
        alt="VDAO"
        className={`mt-[6.923vw] mb-[8.462vw] h-[86.154vw] w-[190.769vw] object-cover md:mt-[1.875vw] md:mb-[2.292vw] md:h-[50.139vw] md:w-[110.903vw]`}
      />
    </header>
  );
}
