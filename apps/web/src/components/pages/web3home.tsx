import Image from "next/image";
import MainHero from "/public/illustrations/web3/PNG/VDAO-web3-hero.png";
import ProfilePic from "public/icons/blog/createdByLogo.svg";
import {
  expenditureData,
  latestDonationData,
  membersData,
  onlineMembersData,
} from "./mockData";

export function StatisticsHomeComponent() {
  return (
    <section className=" mb-28 w-[100%] rounded-2xl bg-vdao-dark py-10 px-5 lg:py-12 lg:pr-16 lg:pl-12">
      <div className="items-start justify-between md:flex">
        <img
          src="/illustrations/home/SVG/Group 293 (2).svg"
          alt=""
          className="h-auto w-full md:w-7/12"
        />
        <div>
          <div className="satoshi mt-14 text-xl font-bold text-white md:mt-0 md:text-2xl">
            Latest
          </div>
          <div className=" mt-7 flex w-full flex-col gap-5 lg:mt-0 lg:w-72">
            {" "}
            {latestDonationData.map(({ title, text, amount }, index) => {
              return (
                <div key={index} className="flex justify-between">
                  <div>
                    <div className="satoshi text-lg font-medium leading-6 text-vdao-light">
                      {title}
                    </div>
                    <div className="satoshi text-sm font-normal leading-5 text-white">
                      {text}
                    </div>
                  </div>
                  <div>
                    <div className="satoshi text-sm font-medium leading-5 text-[#f8f2ff]">
                      {amount}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <article className="mt-12 flex flex-col justify-end gap-5 md:flex-row md:gap-10">
        {expenditureData.map(({ title, amount, percent }, index) => {
          return (
            <div className="rounded-2xl bg-white p-5 md:p-8">
              <div className="satoshi text-xl font-bold leading-6 text-vdao-dark md:text-2xl lg:leading-5">
                {" "}
                {title}
              </div>
              <div className="mt-4 flex items-start ">
                <div className="satoshi mr-2 text-2xl font-bold leading-6 text-vdao-dark md:text-3xl lg:mr-2.5 lg:leading-8">
                  {amount}
                </div>
                <div className="satoshi mr-2 text-xl font-medium leading-5 text-vdao-dark lg:mr-5">
                  USD
                </div>
                <div
                  className={`satoshi flex items-center gap-2.5 rounded-2xl bg-vdao-light py-1.5 px-2 text-sm font-bold leading-5 text-vdao-dark lg:mr-5 lg:text-xl ${
                    index > 0 && "bg-vdao-pink"
                  }`}
                >
                  {percent}
                  <img
                    src="/illustrations/home/SVG/Arrow 6.svg"
                    alt=""
                    className={` ${index > 0 && "rotate-180"} h-4 w-auto`}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </article>
      <div className="mt-14 flex flex-col justify-between md:flex-row">
        <img
          src="/illustrations/home/SVG/Group 299.svg"
          alt=""
          className="h-auto w-full md:w-7/12"
        />
        <img
          src="/illustrations/home/SVG/Group 301.svg"
          alt=""
          className="mt-14 h-auto w-full md:mt-0 md:w-3/12"
        />
      </div>
    </section>
  );
}

export function NewMembersComponent() {
  return (
    <section className="w-[100%] justify-between rounded-2xl bg-vdao-dark px-5 py-10 md:flex md:px-10 md:pt-14 md:pb-10 lg:mb-0 lg:block lg:w-[32%]">
      {/* NEW MEMBERS */}
      <div>
        <div className="flex items-center gap-2.5">
          <div className="satoshi text-xl font-bold text-white">
            New Members
          </div>
          <div className="satoshi text-lg font-normal text-white">
            {membersData.length}
          </div>
        </div>
        <div className="">
          {membersData.map(({ img, name, category, date, time }, index) => {
            return (
              <div className="mt-5 flex items-center justify-between md:w-80 lg:w-auto">
                <div className="mr-6 flex items-center">
                  <img
                    src={img}
                    alt=""
                    className="mr-4 rounded-full md:h-10 md:w-10 lg:mr-2.5"
                  />
                  <div>
                    <div className="satoshi text-lg font-medium leading-5 text-vdao-light">
                      {name}
                    </div>
                    <div className="satoshi text-sm font-normal leading-5 text-white">
                      {category}
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="satoshi flex justify-end text-sm font-medium leading-5 text-[#F8F2FF]">
                    {date}
                  </div>
                  <div className="satoshi flex justify-end text-sm font-normal leading-5 text-[#F8F2FF]">
                    {time}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ONLINE MEMBERS */}
      <div>
        <div className=" mt-10 flex items-center gap-2.5 md:mt-0 lg:mt-10 lg:mt-14">
          <div className="satoshi text-xl font-bold text-white">Online</div>
          <div className="satoshi text-lg font-normal text-white">
            {onlineMembersData.length}
          </div>
        </div>

        <article className="mt-8 grid grid-cols-4 gap-5 md:w-80 lg:w-auto">
          {onlineMembersData.map(({ name, img }, index) => {
            return (
              <div className=" overflow-hidden">
                <img
                  src={img}
                  alt=""
                  className="mx-auto h-10 w-10 rounded-full"
                />
                <div className="satoshi text-center text-lg font-normal text-white">
                  {name}
                </div>
              </div>
            );
          })}
        </article>
      </div>
    </section>
  );
}

export function ProfileHomeComponent() {
  return (
    <section className="flex w-full flex-col rounded-2xl bg-vdao-dark pr-3.5 pt-5 pl-5 md:pt-10 md:pl-5 md:pr-8 md:pb-20 lg:w-[65%]">
      {/* View Profile Button */}
      <div className="satoshi ml-auto cursor-pointer text-sm font-bold text-white underline md:text-base">
        View Profile
      </div>

      {/* User Info */}
      <div className="flex flex-col md:gap-5 lg:mx-8">
        <div className="flex gap-3">
          <Image
            src={ProfilePic}
            alt="Profile Picture"
            className="h-14 w-14 rounded-full"
          />
          <div className="flex flex-col">
            <span className="satoshi text-2xl font-bold leading-8 text-vdao-light">
              Kris Millar
            </span>
            <span className="satoshi text-base font-normal leading-6 ">
              0xd12512....92C
            </span>
          </div>
        </div>

        {/* Description */}
        <span className="satoshi mt-5 mr-7 text-base leading-6 md:mr-0 md:w-9/12">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          ultrices velit a nulla placerat, vitae accumsan mauris euismod. Nam
          semper dignissim est a sollicitudin. Vestibulum non ipsum tellus.
          Vivamus a eros nec sapien vestibulum.
        </span>

        {/* Guild & Pod */}
        <div className="mt-12 inline-grid grid-cols-[max-content_auto] gap-5 md:gap-6">
          <span className="satoshi text-lg font-bold md:text-base">Guild</span>
          <span className="satoshi text-lg font-bold text-vdao-light md:text-base">
            DAO Operation Guild
          </span>
          <span className="satoshi text-lg font-bold md:text-base">Pod</span>
          <span className="satoshi text-lg font-bold text-vdao-light md:text-base">
            Regen Pod
          </span>
        </div>

        {/* Statistics */}
        <div className="my-10 grid  grid-cols-2 items-start gap-10 md:grid-cols-4 lg:mb-0 lg:gap-5">
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
              <span className="satoshi mt-2 text-center text-lg font-bold md:text-base">
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
