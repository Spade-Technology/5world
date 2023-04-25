import homeStyle from "./homeStyle.module.scss";
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

export function HomeCTAComponent() {
  return (
    <section className={homeStyle.cta}>
      <div className={homeStyle.title}>Ready to Join?</div>
      <div className={` ${homeStyle.text}`}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi turpis
        mi, faucibus vitae elementum id, tristique at lectus.
      </div>
      <div className={` ${homeStyle.button}`}> Apply Now</div>
    </section>
  );
}

export function HomePartnersComponent() {
  return (
    <article className={homeStyle.partners}>
      <div>
        <div className={homeStyle.title}>Our Partners</div>
        <div className={homeStyle.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit morbi turpis
          mi.
        </div>
      </div>
      <section className={homeStyle.cardList}>
        {cardList.map(({ img }, index) => {
          return (
            <Image
              key={index}
              src={img}
              alt="VDAO"
              className={homeStyle.card}
            />
          );
        })}
      </section>
    </article>
  );
}

export function HomeCommunityComponent() {
  return (
    <section className={homeStyle.community}>
      <div className={homeStyle.title}>Community</div>
      <div className={homeStyle.text}>The VDAO Community is:</div>
      <article className={homeStyle.communityList}>
        {communityTexts.map(({ title, text }, index) => {
          return (
            <div key={index} className={homeStyle.communityText}>
              <div className={homeStyle.title}>{title}</div>
              <div className={homeStyle.text}>{text}</div>
            </div>
          );
        })}
      </article>
      <Image src={CommunityHero} alt="VDAO" className={homeStyle.img} />
    </section>
  );
}

export function HomeGetInvolvedComponent() {
  return (
    <section className={homeStyle.getInvolved}>
      <div className={homeStyle.title}>Get Involved</div>
      <div className={homeStyle.flex}>
        <div>
          <div className={homeStyle.text}>Support VDAOs mission in 3 ways:</div>
          <Image src={VDAOGetInvolved} alt="VDAO" className={homeStyle.img} />
        </div>
        <section className={homeStyle.involveds}>
          {getInvolvedTexts.map(({ title, text, btn }, index) => {
            return (
              <div key={index} className={homeStyle.involved}>
                <div className={homeStyle.title}>{title}</div>
                <div className={homeStyle.text}>{text}</div>
                <div className={homeStyle.btn}>{btn}</div>
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
  <div className={homeStyle.objectivesComponent}>
    <Image
      src={icon}
      alt="VDAO"
      style={{ width: `${styles.width}px` }}
      className={` ${homeStyle.img}`}
    />
    <section className={` ${homeStyle.title}`}>{title}</section>
    <div className="">{description}</div>
  </div>
);

export function HomeObjectivesComponent() {
  const b: number = 0;
  return (
    <article className={homeStyle.objectives}>
      <div className={homeStyle.title}>Core Objectives</div>
      <section>
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
    <article className={homeStyle.intro}>
      <section>
        <div className={homeStyle.title}>Introduction</div>
        <div>
          VDAO funds regenerative agriculture research and development (R&D)
          projects worldwide.
        </div>
        <div>
          Regenerative land management uses techniques and practices to restore
          soil, biodiversity, ecosystems, and water quality; techniques used in
          farming for centuries, but recently replaced by chemical, industrial
          alternatives.
        </div>
        <div>
          VDAO empowers us to dream of fully regenerated planet. Using
          cutting-edge Web3 tech, it connects artists, land stewards, funders,
          scientists, researchers, and innovators to collaborate for planetary
          regeneration.
        </div>
      </section>
      <img
        src={"/media/VDAO-introduction 1.svg"}
        alt="VDAO"
        className={` hidden sm:block ${homeStyle.img}`}
      />
      <img
        src={"/media/illustraion02 (1).svg"}
        alt="VDAO"
        className={` sm:hidden ${homeStyle.img}`}
      />
    </article>
    // <section className="mx-auto mt-36 flex max-w-[1440px] flex-col-reverse overflow-hidden px-6 md:flex-row md:px-8 xl:px-0 ">
    //   <Image
    //     src={IntroHero}
    //     alt="VDAO"
    //     className="my-auto h-1/2 w-1/2 -translate-x-16 scale-150 md:-mt-14 md:translate-x-0 md:scale-100 "
    //   />
    //   <div className="z-10 flex w-full flex-col">
    //     <h1 className="text-5xl font-medium ">Introduction</h1>

    //   </div>
    // </section>
  );
}

export function HomeWelcomeComponent() {
  return (
      <div className={`mx-auto ${homeStyle.title}`}>Re:imagine the future</div>
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
      <div className={`mx-auto ${homeStyle.button}`}>Join Us</div>
      <Image src={WelcomeHero} alt="VDAO" className={homeStyle.img} />
    </header>
  );
}
