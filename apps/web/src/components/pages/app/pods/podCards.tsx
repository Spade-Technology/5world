import Image from "next/image";
import PrimaryButton from "~/styles/shared/buttons/primaryButton";
import PodImage from "public/illustrations/pods/podImage.svg";
import Icon1 from "public/icons/pods/icon1.svg";
import Icon2 from "public/icons/pods/icon2.svg";
import Icon3 from "public/icons/pods/icon3.svg";
import Icon4 from "public/icons/pods/icon4.svg";
import Icon5 from "public/icons/pods/icon5.svg";
import Icon6 from "public/icons/pods/icon6.svg";
import Icon7 from "public/icons/pods/icon7.svg";
import Icon8 from "public/icons/pods/icon8.svg";

const PodCards = () => {
  return (
    <div className="mx-auto w-screen bg-vdao-deep">
      <div className="mx-auto max-w-[1280px] pb-[120px]">
        <div className="mx-6 max-w-[1280px] font-heading text-[32px] font-medium text-vdao-light md:mx-auto md:text-[46px]">
          Current Pods
        </div>

        <div className="mx-6 mt-5 grid grid-cols-1 gap-5 md:mx-0 md:grid-cols-2">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  );
};

export const Card = () => {
  return (
    <div className="rounded-[20px] bg-vdao-dark py-10 px-5 text-white md:py-[50px] md:px-10">
      <div className="flex flex-col gap-[10px] md:flex-row md:gap-[25px]">
        <Image
          src={PodImage}
          alt=""
          height={120}
          width={120}
          className="align-top"
        />

        <div>
          <div className="font-heading text-3xl font-medium"> Regen Pod</div>
          <div className="pt-[10px] font-body text-lg font-normal">
            {" "}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
            ultrices vehicula ullamcorper...
          </div>
          <div>
            <PrimaryButton
              text="View Detail"
              className="mt-5 py-[5px] px-[35px] font-heading text-xl font-medium"
            />
          </div>
        </div>
      </div>

      <div className="mt-[25px] flex justify-between rounded-[20px] bg-white px-5 py-8 md:mt-11 md:px-10">
        <div>
          <div className="text-[28px] font-semibold text-vdao-light md:text-[32px]">
            {" "}
            21{" "}
          </div>
          <div className="text-sm font-semibold text-vdao-dark md:text-lg">
            {" "}
            Proposals
          </div>
        </div>

        <div>
          <div className="text-[28px] font-semibold text-vdao-light md:text-[32px]">
            {" "}
            354
          </div>
          <div className="text-sm font-semibold text-vdao-dark md:text-lg">
            {" "}
            Discussions
          </div>
        </div>

        <div>
          <div className="text-[28px] font-semibold text-vdao-light md:text-[32px]">
            {" "}
            7
          </div>
          <div className="text-sm font-semibold text-vdao-dark md:text-lg">
            Members
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[30px] pt-5 md:flex-row md:gap-[60px] md:pt-10">
        <div>
          <div className="font-heading text-xl font-medium"> Manager </div>
          <div className="flex w-full pt-[14px]">
            <div>
              <Image src={Icon1} alt="" className="rounded-full" />
            </div>

            <div className="pl-[10px] md:pl-[16px]">
              <div className="font-body text-lg font-semibold">CyberGod01</div>
              <div className="font-body text-sm">0xd12512....92C</div>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="font-heading text-xl font-medium"> Members </div>
          <div className="grid grid-cols-5 gap-[10px] pt-[15px]">
            <div>
              <Image src={Icon2} alt="" className="rounded-full" />
            </div>
            <div>
              <Image src={Icon3} alt="" className="rounded-full" />
            </div>
            <div>
              <Image src={Icon4} alt="" className="rounded-full" />
            </div>
            <div>
              <Image src={Icon5} alt="" className="rounded-full" />
            </div>
            <div>
              <Image src={Icon6} alt="" className="rounded-full" />
            </div>
            <div>
              <Image src={Icon7} alt="" className="rounded-full" />
            </div>
            <div>
              <Image src={Icon8} alt="" className="rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodCards;
