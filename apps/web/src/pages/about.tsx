import { Button, Input } from "antd";
import { type NextPage } from "next";
import Footer from "~/components/layout/footer";
import Header from "~/components/layout/header";
import { MailingListComponent } from "~/components/misc/mailinglist";

import CoreValueBeaverHero from "public/illustrations/about/PNG/VDAO-about-beaver.png";
import VisionPersionImage from "public/illustrations/about/PNG/VDAO-about-person.png";

import Image from "next/image";

const Home: NextPage = () => {
  return (
    <>
      <Header />

      <div className="w-full text-vdao-dark">
        <section className="mx-auto my-16  flex w-full max-w-[1280px] flex-col">
          <h1 className="mb-6 w-1/2 text-left text-8xl font-medium">
            About Us
          </h1>
          <div className="ml-auto mr-24 w-2/6 font-body text-2xl font-medium text-vdao-dark">
            Global ecosystem regeneration is a positive sum game: the more
            effort we put in, the more we benefit.
            <br />
            <br />
            Regardless of our political views, lifestyle or opinions, we can all
            agree that regenerating degraded ecosystems is both neccessary and
            worthwhile.
          </div>
        </section>

        <section className="my-36 bg-vdao-deep py-24 text-vdao-light">
          <div className="mx-auto flex max-w-[1440px] flex-col ">
            <div className="mx-auto w-full max-w-[1280px] ">
              <h1 className="mb-6 w-full text-left text-5xl font-medium">
                Our Core Value
              </h1>
            </div>
            <div className="mt-12 flex">
              <Image
                src={CoreValueBeaverHero}
                alt="VDAO"
                className="mt-auto -mb-32 h-full w-1/3"
              />
              <div className="grid w-full grid-flow-col grid-cols-2 grid-rows-2  gap-10">
                <div className="flex max-w-[340px] flex-col gap-4">
                  <h1 className="text-2xl font-medium">Faireness & Caring</h1>
                  <span className="text-lg font-normal">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque eget eleifend nisi. Vestibulum euismod, augue
                    at tempor.
                  </span>
                </div>
                <div className="flex max-w-[340px] flex-col gap-4">
                  <h1 className="text-2xl font-medium">Generous Listening</h1>
                  <span className="text-lg font-normal">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque eget eleifend nisi. Vestibulum euismod, augue
                    at tempor.
                    <br />
                    <br />
                    Healthy community relations are supported via our
                    comprehensive Code of Conduct.
                  </span>
                </div>
                <div className="flex max-w-[340px] flex-col gap-4">
                  <h1 className="text-2xl font-medium">Trust & Respect</h1>
                  <span className="text-lg font-normal">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque eget eleifend nisi. Vestibulum euismod, augue
                    at tempor.
                  </span>
                </div>
                <div className="flex max-w-[340px] flex-col gap-4">
                  <h1 className="text-2xl font-medium">Straight Talk</h1>
                  <span className="text-lg font-normal">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque eget eleifend nisi. Vestibulum euismod, augue
                    at tempor.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="my-36 flex py-24 text-vdao-dark">
          <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-20">
            <div className="flex">
              <h1 className="mb-6 w-full text-center text-5xl font-medium underline">
                Vision
              </h1>
              <div className="mr-auto w-full text-lg">
                <div className="max-w-[410px]">
                  Historically, regenerative agriculture projects have been
                  under-researched and under-funded. By supporting research
                  initiatives and real-world R&D, VDAO is building an innovation
                  network to restore global ecosystem health from the soil up.
                </div>
              </div>
            </div>
            <div className="flex">
              <h1 className="mb-6 w-full text-center text-5xl font-medium underline">
                Mission
              </h1>
              <div className="mr-auto w-full text-lg">
                <div className="max-w-[410px]">
                  Traditional industrial/chemical agricultural systems have
                  reached the limits of what they can offer us without damaging
                  the eco-systems we all depend upon. Our need for viable
                  alternatives has never been more clear.
                  <br />
                  <br />
                  VDAO is a novel Web3 coordination platform where individuals,
                  institutions and skilled professionals can come together to
                  fund regenerative agriculture R&D, creating a decentralised,
                  open-source network of collective intelligence that will
                  regenerate our planet.
                </div>
              </div>
            </div>
          </div>
          <Image
            src={VisionPersionImage}
            alt="VDAO"
            className="mt-auto h-1/6 w-1/6 scale-150"
          />
        </section>

        <section className="mx-auto my-36 flex max-w-[1280px] flex-col">
          <div className="flex w-full">
            <h1 className="mb-6 w-full text-left text-5xl font-medium">
              Our Core Team
            </h1>
            <div className="ml-auto max-w-md text-2xl font-medium text-vdao-dark">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
              turpis mi, faucibus vitae elementum id, tristique at lectus.
            </div>
          </div>
          <div className="mt-20 flex">
            <div className="flex w-full justify-center">
              <div className="flex flex-row gap-16">
                <div className="flex flex-col">
                  <div className="h-72 w-72 bg-vdao-lightpurple  opacity-70"></div>
                  <h1 className="mt-5 font-body text-2xl font-medium text-vdao-dark">
                    Full Name
                  </h1>
                  <h1 className=" mt-2 font-body text-xl font-normal text-vdao-dark">
                    Title
                  </h1>
                </div>
                <div className="flex flex-col">
                  <div className="h-72 w-72 bg-vdao-lightpurple  opacity-70"></div>
                  <h1 className="mt-5 font-body text-2xl font-medium text-vdao-dark">
                    Full Name
                  </h1>
                  <h1 className=" mt-2 font-body text-xl font-normal text-vdao-dark">
                    Title
                  </h1>
                </div>
                <div className="flex flex-col">
                  <div className="h-72 w-72 bg-vdao-lightpurple  opacity-70"></div>
                  <h1 className="mt-5 font-body text-2xl font-medium text-vdao-dark">
                    Full Name
                  </h1>
                  <h1 className=" mt-2 font-body text-xl font-normal text-vdao-dark">
                    Title
                  </h1>
                </div>
                <div className="flex flex-col">
                  <div className="h-72 w-72 bg-vdao-lightpurple  opacity-70"></div>
                  <h1 className="mt-5 font-body text-2xl font-medium text-vdao-dark">
                    Full Name
                  </h1>
                  <h1 className=" mt-2 font-body text-xl font-normal text-vdao-dark">
                    Title
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto mt-20 flex w-full">
            <h1 className="mb-6 w-full text-left text-5xl font-medium">
              Our Core Team
            </h1>
          </div>
          <div className="flex">
            <div className="flex w-full justify-center">
              <div className="flex flex-row gap-16">
                <div className="flex flex-col">
                  <div className="h-72 w-72 bg-vdao-lightpurple  opacity-70"></div>
                  <h1 className="mt-5 font-body text-2xl font-medium text-vdao-dark">
                    Full Name
                  </h1>
                  <h1 className=" mt-2 font-body text-xl font-normal text-vdao-dark">
                    Title
                  </h1>
                </div>
                <div className="flex flex-col">
                  <div className="h-72 w-72 bg-vdao-lightpurple  opacity-70"></div>
                  <h1 className="mt-5 font-body text-2xl font-medium text-vdao-dark">
                    Full Name
                  </h1>
                  <h1 className=" mt-2 font-body text-xl font-normal text-vdao-dark">
                    Title
                  </h1>
                </div>
                <div className="flex flex-col">
                  <div className="h-72 w-72 bg-vdao-lightpurple  opacity-70"></div>
                  <h1 className="mt-5 font-body text-2xl font-medium text-vdao-dark">
                    Full Name
                  </h1>
                  <h1 className=" mt-2 font-body text-xl font-normal text-vdao-dark">
                    Title
                  </h1>
                </div>
                <div className="flex flex-col">
                  <div className="h-72 w-72 bg-vdao-lightpurple  opacity-70"></div>
                  <h1 className="mt-5 font-body text-2xl font-medium text-vdao-dark">
                    Full Name
                  </h1>
                  <h1 className=" mt-2 font-body text-xl font-normal text-vdao-dark">
                    Title
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto mt-20 flex w-full">
            <h1 className="mb-6 w-full text-left text-5xl font-medium">
              Our Core Team
            </h1>
          </div>
          <div className="flex">
            <div className="flex w-full justify-center">
              <div className="flex flex-row gap-16">
                <div className="flex flex-col">
                  <div className="h-72 w-72 bg-vdao-lightpurple  opacity-70"></div>
                  <h1 className="mt-5 font-body text-2xl font-medium text-vdao-dark">
                    Full Name
                  </h1>
                  <h1 className=" mt-2 font-body text-xl font-normal text-vdao-dark">
                    Title
                  </h1>
                </div>
                <div className="flex flex-col">
                  <div className="h-72 w-72 bg-vdao-lightpurple  opacity-70"></div>
                  <h1 className="mt-5 font-body text-2xl font-medium text-vdao-dark">
                    Full Name
                  </h1>
                  <h1 className=" mt-2 font-body text-xl font-normal text-vdao-dark">
                    Title
                  </h1>
                </div>
                <div className="flex flex-col">
                  <div className="h-72 w-72 bg-vdao-lightpurple  opacity-70"></div>
                  <h1 className="mt-5 font-body text-2xl font-medium text-vdao-dark">
                    Full Name
                  </h1>
                  <h1 className=" mt-2 font-body text-xl font-normal text-vdao-dark">
                    Title
                  </h1>
                </div>
                <div className="flex flex-col">
                  <div className="h-72 w-72 bg-vdao-lightpurple  opacity-70"></div>
                  <h1 className="mt-5 font-body text-2xl font-medium text-vdao-dark">
                    Full Name
                  </h1>
                  <h1 className=" mt-2 font-body text-xl font-normal text-vdao-dark">
                    Title
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </section>

        <MailingListComponent />
      </div>

      <Footer />
    </>
  );
};

export default Home;
