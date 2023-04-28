import React from "react";
import {
  expenditureData,
  latestDonationData,
  membersData,
  onlineMembersData,
  pieChartData,
} from "./mockData";
import Image from "next/image";

// WEB3 HOMEPAGE IMAGE URL/PATH
const imagePath = "/illustrations/web3/home/svg/";

export const HomeWelcomeComponent = () => {
  return (
    <div
      className={`relative left-[calc(-32*100vw/390)] mt-[calc(59*100vw/390)] h-[calc(400*100vw/390)] w-[calc(728*100vw/390)] bg-[url(/illustrations/web3/home/svg/web3-landing-night.svg)] bg-cover bg-center bg-center bg-no-repeat md:left-0 md:mt-[5.556vw] md:h-[54.167vw] md:w-[99.792vw]`}
    >
      <div className="clash ml-[calc(56*(100vw/390))] w-[calc(342*(100vw/390))]  text-center text-[calc(44*(100vw/390))] font-medium leading-[calc(48*(100vw/390))] text-white md:mx-auto md:w-[48.75vw] md:text-[5.556vw] md:leading-[6.597vw]">
        Welcome to VDAO
      </div>
    </div>
  );
};

export const HomeDashboardComponentOne = () => {
  return (
    <div
      className={`relative mx-auto w-[calc(342*(100vw/390))]  rounded-[calc(20*(100vw/390))] bg-vdao-dark   pt-[calc(20*(100vw/390))] pr-[calc(14*(100vw/390))]  pl-[calc(20*(100vw/390))] md:top-[-2.083vw]   md:mr-[0px] md:ml-[10.417vw] md:w-[calc(753*(100vw/1440))] md:rounded-[1.389vw] md:pt-[2.083vw] md:pr-[2.083vw] md:pb-[6.042vw] md:pl-[4.167vw]`}
    >
      <div className="satoshi fomt-bold flex cursor-pointer justify-end text-[calc(14*(100vw/390))] leading-[calc(18.96*(100vw/390))] text-white underline md:text-[0.972vw] md:leading-[1.319vw]">
        View Profile
      </div>
      <div className="flex items-center">
        <Image
          height={"0"}
          width={"0"}
          src={`${imagePath + "image 9.svg"}`}
          alt=""
          className={`satoshi mr-[calc(13*(100vw/390))] h-[calc(57.78*(100vw/390))] w-[calc(54*(100vw/390))] rounded-[100%] md:mr-[0.903vw] md:h-[4.013vw] md:w-[3.75vw]`}
        />
        <div>
          <div
            className={`satoshi text-[calc(26*(100vw/390))] font-bold leading-[calc(30*(100vw/390))] text-vdao-light md:text-[1.806vw] md:leading-[2.083vw]`}
          >
            Kris Millar
          </div>
          <div
            className={`satoshi text-[calc(18*(100vw/390))] font-normal leading-[calc(24.3*(100vw/390))] text-white md:text-[1.25vw] md:leading-[1.667vw]`}
          >
            0xd12512....92C
          </div>
        </div>
      </div>
      <div
        className={`satoshi mt-[calc(18.38*(100vw/390))] w-[calc(281*(100vw/390))] text-[calc(18*(100vw/390))] font-normal leading-[calc(20*(100vw/390))] text-white md:mt-[1.389vw] md:w-[36.389vw] md:text-[calc(18*100vw/1440)] md:leading-[1.528vw]`}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        ultrices velit a nulla placerat, vitae accumsan mauris euismod. Nam
        semper dignissim est a sollicitudin. Vestibulum non ipsum tellus.
        Vivamus a eros nec sapien vestibulum.
      </div>
      <div className="mt-[calc(50*(100vw/390))] flex w-[calc(249*(100vw/390))] justify-between md:mt-[3.333vw] md:w-[17.292vw]">
        <div
          className={`satoshi text-[calc(18*(100vw/390))] font-bold text-white md:text-[calc(18*100vw/1440)]`}
        >
          Guild
        </div>
        <div
          className={`satoshi text-[calc(18*(100vw/390))] font-bold text-vdao-light md:text-[1.25vw]`}
        >
          DAO Operation Guild
        </div>
      </div>
      <div className="mt-[calc(20*(100vw/390))] flex w-[calc(163*(100vw/390))] justify-between md:mt-[1.389vw] md:w-[11.319vw]">
        <div
          className={`satoshi text-[calc(18*(100vw/390))] font-bold text-white md:text-[calc(18*100vw/1440)]`}
        >
          Pod
        </div>
        <div
          className={`satoshi text-[calc(18*(100vw/390))] font-bold text-vdao-light md:text-[1.25vw]`}
        >
          Regen Pod
        </div>
      </div>
      <div className="mt-[calc(40*(100vw/390))] flex w-[calc(274*(100vw/390))] flex-wrap justify-between md:mt-[1.389vw]  md:w-[41.467vw] md:gap-0 ">
        {pieChartData.map(({ num, title }, index) => {
          return (
            <div key={index}>
              <div
                className={` mx-auto w-[calc(120*(100vw/390))] text-center md:h-[8.331vw] md:w-[8.331vw]`}
              >
                <Image
                  height={"0"}
                  width={"0"}
                  src="/illustrations/web3/home/svg/Ellipse.svg"
                  alt="vda0"
                  className={`h-[calc(120*(100vw/390))] w-[calc(120*(100vw/390))] md:h-[8.331vw] md:w-[8.331vw]`}
                />
                <div
                  className={` satoshi relative top-[calc(-87*(100vw/390))] text-center text-[calc(32*(100vw/390))] font-bold text-white md:top-[-5.417vw] md:text-[2.222vw]`}
                >
                  {num}
                </div>
              </div>
              <div
                className={`satoshi relative top-[calc(-40*(100vw/390))] mx-auto w-[calc(90*(100vw/390))] text-center text-[calc(18*(100vw/390))] font-bold leading-[calc(20*(100vw/390))] text-white md:top-0 md:mt-[0.556vw] md:w-[6.806vw] md:text-[1.25vw] md:leading-[1.386vw]`}
              >
                {title}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const HomeDashboardComponentTwo = () => {
  return (
    <div
      className={` relative mt-[calc(20*100vw/390)] ml-[calc(24*100vw/390)] w-[calc(342*100vw/390)] rounded-[calc(20*100vw/390)] bg-vdao-dark  py-[calc(40*100vw/390)] pr-[calc(22*100vw/390)] pl-[calc(26*100vw/390)] md:top-[calc(-30*100vw/1440)] md:ml-[calc(30*100vw/1440)] md:mt-0 md:w-[calc(357*100vw/1440)] md:rounded-[calc(20*100vw/1440)] md:pt-[calc(50*100vw/1440)] md:pr-[calc(42*100vw/1440)]  md:pb-[calc(63*100vw/1440)] md:pl-[calc(40*100vw/1440)]`}
    >
      <div className="flex items-center">
        <div className="satoshi text-[calc(22*(100vw/390))] font-bold text-white md:text-[calc(22*100vw/1440)]">
          New Members
        </div>
        <div className="satoshi ml-[calc(20*100vw/390)] text-[calc(18*(100vw/390))] font-normal text-white md:ml-[calc(18*100vw/1440)] md:text-[calc(18*100vw/1440)]">
          4
        </div>
      </div>
      <section className=" flex flex-col ">
        {membersData.map(({ img, name, category, date, time }, index) => {
          return (
            <div className="mt-[calc(20*(100vw/390))] flex items-center justify-between md:mt-[calc(20*100vw/1440)]">
              <div className="flex items-center gap-[calc(16*(100vw/390))] md:gap-[calc(16*100vw/1440)]">
                <Image
                  height={"0"}
                  width={"0"}
                  src={img}
                  alt=""
                  className="h-[calc(40*(100vw/390))] w-[calc(40*(100vw/390))] rounded-full md:h-[calc(40*100vw/1440)] md:w-[calc(40*100vw/1440)]"
                />
                <div>
                  <div className="satoshi text-[calc(18*(100vw/390))] font-bold leading-[calc(24.3*(100vw/390))] text-vdao-light md:text-[calc(18*100vw/1440)] md:leading-[calc(24*100vw/1440)]">
                    {name}
                  </div>
                  <div className="satoshi text-[calc(14*(100vw/390))] font-normal leading-[calc(18.9*(100vw/390))] text-white md:text-[calc(14*100vw/1440)] md:leading-[calc(19*100vw/1440)]">
                    {category}
                  </div>
                </div>
              </div>
              <div>
                <div className="satoshi text-[calc(14*(100vw/390))] font-bold leading-[calc(18.9*(100vw/390))] text-white md:text-[calc(14*100vw/1440)] md:leading-[calc(19*100vw/1440)]">
                  {date}
                </div>
                <div className="satoshi tex-[calc(14*(100vw/390))] font-normal leading-[calc(18.9*(100vw/390))] text-white md:text-[calc(14*100vw/1440)] md:leading-[calc(19*100vw/1440)]">
                  {time}
                </div>
              </div>
            </div>
          );
        })}
      </section>
      <div className="mt-[calc(39*(100vw/390))] flex items-center md:mt-[calc(40*100vw/1440)]">
        <div className="satoshi text-[calc(22*(100vw/390))] font-bold text-white md:text-[calc(22*100vw/1440)]">
          Online
        </div>
        <div className="satoshi ml-[calc(22*(100vw/390))] text-[calc(14*(100vw/390))] font-normal text-white md:ml-[calc(18*100vw/1440)] md:text-[calc(18*100vw/1440)]">
          58
        </div>
      </div>
      <section className="mt-[calc(20*(100vw/390))] flex w-[calc(290*(100vw/390))] flex-wrap gap-[calc(30*(100vw/390))] md:mt-[calc(30*100vw/1440)] md:w-[calc(255*100vw/1440)] md:justify-between md:gap-[calc(20*100vw/1440)]">
        {onlineMembersData.map(({ img, name }, index) => {
          return (
            <div className="w-[calc(50*(100vw/390))] md:mr-[calc(5*100vw/1440)] md:w-[calc(40*100vw/1440)]">
              <Image
                height={"0"}
                width={"0"}
                src={img}
                alt=""
                className="h-[calc(40*(100vw/390))] w-[calc(40*(100vw/390))] rounded-[100%] md:mb-[calc(5*100vw/1440)] md:h-[calc(40*100vw/1440)] md:w-[calc(40*100vw/1440)]"
              />
              <div className="satoshi text-center text-[calc(14*(100vw/390))] font-normal leading-[calc(18.9*(100vw/390))] text-white md:text-[calc(14*100vw/1440)] md:leading-[130%]">
                {name}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export const HomeDashboardComponentThree = () => {
  return (
    <div
      className={`relative mt-[calc(20*100vw/390)] ml-[calc(24*100vw/390)] mb-[calc(40*100vw/390)] w-[calc(342*100vw/390)] rounded-[calc(20*100vw/390)] bg-vdao-dark py-[calc(40*100vw/390)] px-[calc(20*100vw/390)] md:mt-[0px] md:ml-[calc(150*100vw/1440)] md:mb-[calc(120*100vw/1440)] md:w-[calc(1140*100vw/1440)] md:rounded-[calc(20*100vw/1440)] md:pt-[calc(50*100vw/1440)] md:pb-[calc(50*100vw/1440)]  md:pl-[calc(60*100vw/1440)] md:pr-[calc(88*100vw/1440)]`}
    >
      <div className="md:flex">
        <Image
          height={"0"}
          width={"0"}
          src={`${imagePath + "Group 293 (1).svg"}`}
          alt=""
          className="hidden md:block md:h-[calc(347*100vw/1440)]  md:w-[calc(627*100vw/1440)]"
        />
        <Image
          height={"0"}
          width={"0"}
          src={`${imagePath + "Group 622.svg"}`}
          alt=""
          className=" mb-[calc(60*100vw/390)] h-[calc(345*100vw/390)] w-[calc(302*100vw/390)] md:hidden"
        />
        <div className="md:ml-[calc(86*100vw/1440)]">
          <div className="satoshi text-[calc(22*100vw/390)] font-bold text-white md:text-[calc(22*100vw/1440)]">
            Latest
          </div>
          <section className="mt-[calc(30*100vw/390)] flex flex-col gap-[calc(20*100vw/390)] md:mt-[calc(20*100vw/1440)] md:gap-[calc(30*100vw/1440)] ">
            {latestDonationData.map(({ title, text, amount }, index) => {
              return (
                <div key={index} className="md:w-[calc(273*100vw/1440)] ">
                  <div className="flex items-center justify-between">
                    <div className="satoshi text-[calc(18*100vw/390)] font-bold  leading-[calc(24.3*100vw/390)]  text-vdao-light md:text-[calc(18*100vw/1440)] md:leading-[calc(24.3*100vw/1440)]">
                      {title}
                    </div>
                    <div className="satoshi text-[calc(14*100vw/390)] font-bold text-white md:text-[calc(14*100vw/1440)] ">
                      {amount}
                    </div>
                  </div>
                  <div className="satoshi text-[calc(14*100vw/390)] font-normal text-white md:text-[calc(14*100vw/1440)] ">
                    {text}
                  </div>
                </div>
              );
            })}
          </section>
        </div>
      </div>
      <article className="mt-[calc(60*100vw/390)] flex flex-col justify-end gap-[calc(20*100vw/390)] md:mt-[calc(50*100vw/1440)] md:flex-row md:gap-[calc(30*100vw/1440)]">
        {expenditureData.map(({ title, amount, percent }, index) => {
          return (
            <div className="rounded-[calc(20*100vw/390)] bg-white p-[calc(20*100vw/390)] md:rounded-[calc(30*100vw/1440)] md:pt-[calc(30*100vw/1440)] md:pb-[calc(40*100vw/1440)] md:pr-[calc(34*100vw/1440)] md:pl-[calc(20*100vw/1440)]">
              <div className="satoshi text-[calc(22*100vw/390)] font-bold text-vdao-dark md:text-[calc(22*100vw/1440)]">
                {title}
              </div>
              <div className="flex items-start">
                <div className="satoshi mr-[calc(9*100vw/390)] text-[calc(26*100vw/390)] font-medium text-vdao-dark md:mr-[calc(10*100vw/1440)] md:text-[calc(32*100vw/1440)]">
                  {amount}
                </div>
                <div className="satoshi text-[calc(20*100vw/390)] font-medium text-vdao-dark md:text-[calc(22*100vw/1440)]">
                  USD
                </div>
                <div
                  className={`ml-[calc(9*100vw/390)] flex cursor-pointer items-center rounded-[calc(20*100vw/390)] py-[calc(5.6*100vw/390)] px-[calc(10*100vw/390)]  md:ml-[calc(21*100vw/1440)] md:rounded-[calc(22*100vw/1440)] md:py-[calc(6*100vw/1440)] md:px-[calc(15*100vw/1440)] ${
                    title === "Expenses" ? "bg-vdao-pink" : "bg-vdao-light"
                  }`}
                >
                  <div className="satoshi text-[calc(14*100vw/390)] font-bold text-vdao-dark md:text-[calc(18*100vw/1440)]">
                    {percent}
                  </div>
                  <Image
                    height={"0"}
                    width={"0"}
                    src={`${imagePath + "Arrow 6.svg"}`}
                    alt=""
                    className={`ml-[calc(4*100vw/390)] h-[auto] w-[calc(13.3*100vw/390)] md:ml-[calc(10*100vw/1440)]  md:h-[calc(16*100vw/1440)] md:w-[calc(21*100vw/1440)] ${
                      title === "Expenses" ? "rotate-[180deg]" : ""
                    }`}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </article>
      <div className="mt-[calc(60*100vw/390)] justify-between md:mt-[calc(102*100vw/1440)] md:flex">
        <Image
          height={"0"}
          width={"0"}
          src={`${imagePath + "Group 757.svg"}`}
          alt=""
          className={`h-[calc(331*100vw/390)] w-[calc(315*100vw/390)] md:hidden`}
        />
        <Image
          height={"0"}
          width={"0"}
          src={`${imagePath + "Group 299.svg"}`}
          alt=""
          className={`hidden md:block md:h-[calc(333*100vw/1440)] md:w-[calc(613*100vw/1440)]`}
        />
        <Image
          height={"0"}
          width={"0"}
          src={`${imagePath + "Group 301.svg"}`}
          alt=""
          className={`mt-[calc(60*100vw/390)] h-[calc(333*100vw/390)] w-[calc(265*100vw/390)] md:mt-0 md:h-[calc(333*100vw/1440)] md:w-[calc(265*100vw/1440)]`}
        />
      </div>
    </div>
  );
};
