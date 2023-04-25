import Image from "next/image";
import { useState } from "react";
import PrimaryButton from "~/styles/shared/buttons/primaryButton";
import ETHIcon from "public/icons/donate/eth-icon.svg";
import PolygonIcon from "public/icons/donate/polygon.svg";
import HowItWorks from "~/components/misc/howItWorks";

type Props = {
  className?: string;
};

const DonateNow = (props: Props) => {
  const [radio, setRadio] = useState("");

  return (
    <div
      className={
        "mx-6 rounded-2xl bg-white p-14 font-body text-vdao-dark md:mx-20 " +
        props.className
      }
    >
      <div className="font-heading text-3xl font-medium">Donate With</div>

      <div className="flex flex-col gap-[70px] pt-[30px] md:flex-row">
        <div className="flex-1">
          <form className="flex flex-col border-b-2 border-b-black pb-3 md:flex-row">
            <div className="my-auto flex flex-1">
              <input
                type="radio"
                id="crypto"
                className="h-5 w-5 cursor-pointer accent-vdao-light"
                value="Cryptocurrency"
                name="donate"
              />
              <label
                htmlFor="crypto"
                className="relative -top-1  pl-[15px] font-heading text-lg font-medium"
              >
                Cryptocurrency
              </label>
            </div>

            <div className="flex flex-1 ">
              <input
                type="radio"
                id="credit"
                className="h-5 w-5 cursor-pointer accent-vdao-light"
                value="Credit Card"
                onChange={(evt) => setRadio(evt.target.value)}
                name="donate"
              />
              <label
                htmlFor="crypto"
                className="relative -top-1 pl-[15px] font-heading text-lg font-medium"
              >
                Credit Card
              </label>
            </div>
          </form>

          <div className="mt-[30px] grid grid-cols-2 rounded-md border-[1px] border-solid  border-black ring-black md:w-[353px]">
            <div className="flex rounded-md  rounded-r-none border-r-[1px]   border-r-black bg-vdao-lightpurple py-[10px] px-[15px]">
              <div className="mx-auto flex flex-1">
                <Image src={ETHIcon} alt="ETHIcon" />
                <span className="px-[10px] text-lg font-medium text-vdao-dark">
                  ETH
                </span>
              </div>
              <Image
                src={PolygonIcon}
                alt="PolygonIcon"
                className="float-right"
              />
            </div>
            <input className="rounded-md px-2 text-center text-lg font-medium outline-none" />
          </div>

          <PrimaryButton
            text="Donate Now"
            className="my-5 py-[5px] px-[35px] font-heading text-[20px] font-medium"
          />

          <div className="flex gap-5">
            <div>
              <input
                type="checkbox"
                className="mt-2 cursor-pointer accent-vdao-light"
              />
            </div>
            <div>
              <div className="text-lg font-normal">Make it anonymous</div>
              <div className="text-sm font-normal">
                By checking this, we won’t consider your profile information as
                a doner for this donation and won’t show it on public pages.{" "}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 md:mr-[49px] ">
          <div className="text-[22px] font-bold ">How to donate</div>
          <div className="text-lg font-normal text-black">
            You can contribute directly to the DAO treasury in $ETH, $USDC,
            $USDT and $DAI.
          </div>

          <div className="pt-[35px] text-[22px] font-bold">
            How will the funds be used?
          </div>
          <div className="text-lg font-normal text-black">
            95% of all donations will be distributed via quarterly quadratic
            funding rounds that align with the DAOs core vision and mission to
            regenerate planet earth.
            <br />
            <br />
            5% of all donations received by the treasury will be allocated to
            the DAO operations budget.
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default DonateNow;
