import Image from "next/image";
import MainHero from "/public/illustrations/web3/PNG/VDAO-web3-hero.png";

import ProfilePic from "public/icons/blog/createdByLogo.svg";

export function StatisticsHomeComponent() {
  return (
    <section className="h-96 rounded-2xl bg-vdao-dark p-8 lg:col-span-3"></section>
  );
}

export function NewMembersComponent() {
  return (
    <section className="rounded-2xl bg-vdao-dark p-8 lg:col-span-1"></section>
  );
}

export function ProfileHomeComponent() {
  return (
    <section className="flex flex-col rounded-2xl bg-vdao-dark p-5 lg:col-span-2 lg:p-8">
      {/* View Profile Button */}
      <div className="ml-auto cursor-pointer text-base font-bold text-white underline">
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
            <span className="text-2xl font-bold text-vdao-light">
              Kris Millar
            </span>
            <span className="text-base">0xd12512....92C</span>
          </div>
        </div>

        {/* Description */}
        <span className="w-10/12 text-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          ultrices velit a nulla placerat, vitae accumsan mauris euismod. Nam
          semper dignissim est a sollicitudin. Vestibulum non ipsum tellus.
          Vivamus a eros nec sapien vestibulum.
        </span>

        {/* Guild & Pod */}
        <div className="mt-12 inline-grid grid-cols-[max-content_auto] gap-5">
          <span className="text-base font-bold">Guild</span>
          <span className="text-base font-bold text-vdao-light">
            DAO Operation Guild
          </span>
          <span className="text-base font-bold">Pod</span>
          <span className="text-base font-bold text-vdao-light">Regen Pod</span>
        </div>

        {/* Statistics */}
        <div className="mt-10 grid grid-cols-2 gap-10 lg:grid-cols-4">
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
              <div className="flex h-32 w-32 items-center justify-center rounded-full border-[3px] border-vdao-light text-3xl font-bold text-white">
                {stat.value}
              </div>
              <span className="mt-2 text-base font-bold">{stat.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WelcomeComponent() {
  return (
    <section className="relative mx-auto flex max-w-[1680px] flex-col items-center pt-16">
      <Image src={MainHero} alt="VDAO Web3 Hero" className="" />
      <h1 className="absolute text-center text-7xl font-medium text-white">
        Welcome to <br /> VDAO
      </h1>
    </section>
  );
}
