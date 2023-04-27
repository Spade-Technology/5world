import React from "react";
import { pieChartData } from "./mockData";

const imagePath = "/illustrations/web3/home/svg/";

export const HomeWelcomeComponent = () => {
  return (
    <div
      className={` lex justify-center bg-[url(/illustrations/web3/home/svg/web3-landing-night.svg)] bg-cover bg-center md:mt-[5.556vw] md:h-[54.167vw] md:w-[99.792vw]`}
    >
      <div className="clash mx-auto text-center font-medium text-white md:w-[48.75vw] md:text-[5.556vw] md:leading-[6.597vw]">
        Welcome to VDAO
      </div>
    </div>
  );
};

export const HomeDashboardComponentOne = () => {
  return (
    <div
      className={`relative bg-vdao-dark md:top-[-2.083vw] md:ml-[10.417vw] md:w-[52.292vw] md:rounded-[1.389vw] md:pt-[2.083vw] md:pr-[2.083vw] md:pb-[6.042vw] md:pl-[4.167vw]`}
    >
      <div className="satoshi fomt-bold flex cursor-pointer text-white underline md:justify-end md:text-[0.972vw] md:leading-[1.319vw]">
        View Profile
      </div>
      <div className="flex items-center">
        <img
          src={`${imagePath + "image 9.svg"}`}
          alt=""
          className={`satoshi rounded-[100%] font-normal md:mr-[0.903vw] md:h-[4.013vw] md:w-[3.75vw]`}
        />
        <div>
          <div
            className={`satoshi font-bold text-vdao-light md:text-[1.806vw] md:leading-[2.083vw]`}
          >
            Kris Millar
          </div>
          <div
            className={`satoshi font-normal text-white md:text-[1.25vw] md:leading-[1.667vw]`}
          >
            0xd12512....92C
          </div>
        </div>
      </div>
      <div
        className={`satoshi font-normal text-white md:mt-[1.389vw] md:w-[36.389vw] md:text-[1.25vw] md:leading-[1.528vw]`}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        ultrices velit a nulla placerat, vitae accumsan mauris euismod. Nam
        semper dignissim est a sollicitudin. Vestibulum non ipsum tellus.
        Vivamus a eros nec sapien vestibulum.
      </div>
      <div className="flex md:mt-[3.333vw] md:w-[17.292vw] md:justify-between">
        <div className={`satoshi font-bold text-white`}>Guild</div>
        <div className={`satoshi font-bold text-vdao-light md:text-[1.25vw]`}>
          DAO Operation Guild
        </div>
      </div>
      <div className="flex md:mt-[1.389vw] md:w-[11.319vw] md:justify-between">
        <div className={`satoshi font-bold text-white`}>Pod</div>
        <div className={`satoshi font-bold text-vdao-light md:text-[1.25vw]`}>
          Regen Pod
        </div>
      </div>
      <div className="flex flex-wrap justify-between md:mt-[1.389vw] md:w-[41.467vw]">
        {pieChartData.map(({ num, title }, index) => {
          return (
            <div key={index}>
              <div
                className={`mx-auto text-center md:h-[8.331vw] md:w-[8.331vw]`}
              >
                <img
                  src="/illustrations/web3/home/svg/Ellipse.svg"
                  alt="vda0"
                  className={`md:h-[8.331vw] md:w-[8.331vw]`}
                />
                <div
                  className={` satoshi md: relative top-[-5.417vw] text-center font-bold text-white md:text-[2.222vw]`}
                >
                  {" "}
                  {num}
                </div>
              </div>
              <div
                className={`satoshi mx-auto text-center font-bold text-white md:mt-[0.556vw] md:w-[6.806vw] md:text-[1.25vw] md:leading-[1.386vw]`}
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
      className={`relative bg-vdao-dark md:top-[-2.083vw] md:ml-[10.417vw] md:w-[52.292vw] md:rounded-[1.389vw] md:pt-[2.083vw] md:pr-[2.083vw] md:pb-[6.042vw] md:pl-[4.167vw]`}
    ></div>
  );
};
