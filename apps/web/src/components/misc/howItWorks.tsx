import Image from "next/image";
import groupImage from "public/illustrations/nftCollections/groupImage.svg";
import PurpleButton from "~/styles/shared/buttons/purpleButton";

type HowItWorksProps = {
  contents?: any;
  className?: string;
};

const HowItWorks = (props: HowItWorksProps) => {
  return (
    <div
      className={`mx-auto max-w-[1280px] bg-vdao-deep px-6 py-20 text-white md:pt-[140px] md:pb-[70px] ${props.className}`}
    >
      {props.contents?.map((contents: any, idx: number) => {
        return (
          <div
            className={`flex flex-col gap-10 md:flex-row md:gap-[22px] ${
              idx == 0 ? "" : "pt-[30px]"
            }`}
            key={idx}
          >
            <div className="flex-1" key={idx}>
              <span className="mr-5 font-heading text-4xl font-medium underline underline-offset-8 md:float-left md:ml-[348px]">
                {contents?.heading}
              </span>
            </div>
            <div className="flex-1">
              {contents?.image && <Image src={groupImage} alt="group-image" />}
              {contents?.content && (
                <div className=" font-body text-lg font-normal md:pr-28">
                  {contents?.content}
                </div>
              )}

              {contents?.button && (
                <PurpleButton
                  text={contents?.button}
                  className="mt-[38px] py-[5px] font-heading text-xl font-medium"
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HowItWorks;
