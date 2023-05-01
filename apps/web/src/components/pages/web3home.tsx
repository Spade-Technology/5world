import Image from "next/image";
import MainHero from "/public/illustrations/web3/PNG/VDAO-web3-hero.png";
import ProfilePic from "public/icons/blog/createdByLogo.svg";
import { membersData } from "./mockData";

export function StatisticsHomeComponent() {
  return (
    <section className="h-96 rounded-2xl bg-vdao-dark p-8 lg:col-span-3"></section>
  );
}

export function NewMembersComponent() {
  return (
    <section className="rounded-2xl bg-vdao-dark md:px-10 md:pt-12">
      <div className="flex items-center gap-2.5">
        <div className="satoshi font-bold text-white md:text-xl">
          New Members
        </div>
        <div className="satoshi text-lg font-normal text-white">
          {membersData.length}
        </div>
      </div>
      <div className="">
        {membersData.map(({ img, name, category, date, time }, index) => {
          return <div>{name}</div>;
        })}
      </div>
    </section>
  );
}

export function ProfileHomeComponent() {
  return (
    <section className="flex flex-col rounded-2xl bg-vdao-dark md:pt-10 md:pl-16 md:pr-8 md:pb-20 lg:w-8/12">
      {/* View Profile Button */}
      <div className="satoshi ml-auto cursor-pointer text-base font-bold text-white underline">
        View Profile
      </div>

      {/* User Info */}
      <div className="flex flex-col gap-5 lg:mx-8">
        <div className="flex gap-3">
          <Image
            src={ProfilePic}
            alt="Profile Picture"
            className="h-14 w-14 rounded-full"
          />
          <div className="flex flex-col">
            <span className="satoshi text-2xl font-bold text-vdao-light">
              Kris Millar
            </span>
            <span className="satoshi text-base">0xd12512....92C</span>
          </div>
        </div>

        {/* Description */}
        <span className="satoshi w-9/12 text-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          ultrices velit a nulla placerat, vitae accumsan mauris euismod. Nam
          semper dignissim est a sollicitudin. Vestibulum non ipsum tellus.
          Vivamus a eros nec sapien vestibulum.
        </span>

        {/* Guild & Pod */}
        <div className="mt-12 inline-grid grid-cols-[max-content_auto] gap-6">
          <span className="satoshi text-base font-bold">Guild</span>
          <span className="satoshi text-base font-bold text-vdao-light">
            DAO Operation Guild
          </span>
          <span className="satoshi text-base font-bold">Pod</span>
          <span className="satoshi text-base font-bold text-vdao-light">
            Regen Pod
          </span>
        </div>

        {/* Statistics */}
        <div className="mt-10 flex justify-between md:mr-10 lg:mr-14">
          {[
            {
              name: "Votes Delegated",
              value: "251",
            },
            {
              name: "Proposals Created",
              value: "31",
            },
            {
              name: "Praise Score",
              value: "98",
            },
            {
              name: "Discussions",
              value: "126",
            },
          ].map((stat) => (
            <div
              className="flex flex-col items-center justify-center"
              key={stat.name}
            >
              <div className="satoshi flex h-32 w-32 items-center justify-center rounded-full border-[3px] border-vdao-light text-3xl font-bold text-white">
                {stat.value}
              </div>
              <span className="satoshi mt-2 text-base text-lg font-bold">
                {stat.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WelcomeComponent() {
  return (
    <section className="relative mx-auto flex max-w-[1680px] flex-col-reverse items-center overflow-hidden md:h-auto md:flex-col md:pt-16">
      <Image
        src={MainHero}
        alt="VDAO Web3 Hero"
        className="mb-24 translate-x-[40%] scale-[200%] md:mb-0 md:-translate-x-0 md:scale-100"
      />
      <h1 className="z-10 text-center text-5xl font-medium text-white md:absolute md:text-7xl">
        Welcome to <br /> VDAO
      </h1>
    </section>
  );
}
