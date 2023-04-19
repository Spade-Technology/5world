import Image from "next/image";
import { useState } from "react";
import PrimaryButton from "~/styles/shared/buttons/primaryButton";
import ETHIcon from "public/icons/donate/eth-icon.svg";
import PolygonIcon from "public/icons/donate/polygon.svg"

const DonateNow = () => {
  const [radio, setRadio] = useState("");
  console.log("radio", radio);
  return (
    <div className="mx-6 rounded-[20px] bg-white p-[50px] font-body text-vdao-dark md:mx-20">
      <div className="font-heading text-3xl font-medium">Donate With</div>

      <div className="flex flex-col gap-[70px] pt-[30px] md:flex-row">
        <div className="flex-1">
          <form className="flex border-b-2 border-b-black pb-3">
            <div className="my-auto flex flex-1">
              <input
                type="radio"
                id="crypto"
                className="h-5 w-5"
                value="Cryptocurrency"
                name="donate"
              />
              <label
                htmlFor="crypto"
                className="relative -top-1  pl-[15px] font-heading text-lg font-bold"
              >
                Cryptocurrency
              </label>
            </div>

            <div className="flex flex-1 ">
              <input
                type="radio"
                id="credit"
                className="h-5 w-5"
                value="Credit Card"
                onChange={(evt) => setRadio(evt.target.value)}
                name="donate"
              />
              <label
                htmlFor="crypto"
                className="relative -top-1 pl-[15px] font-heading text-lg font-bold"
              >
                Credit Card
              </label>
            </div>
          </form>

          <div className="mt-[30px] flex w-[353px] rounded-md border-[1px] border-solid border-black">
            <div className="flex flex-1 border-r-[1px] border-r-black bg-vdao-lightpurple py-[10px] px-[15px]">
              <Image src={ETHIcon} alt="ETHIcon" />
              <div className="px-[10px] text-lg font-medium text-vdao-dark">
                ETH
              </div>
              <Image src={PolygonIcon} alt="PolygonIcon"  className="ml-4"/>
            </div>
            <input className="flex-1 outline-none text-center px-2 text-lg font-medium" />
          </div>

          <PrimaryButton
            text="Donate Now"
            className="my-5 py-[5px] px-[35px] font-heading text-[20px] font-medium"
          />

          <div className="flex">
            <input type="" />

          </div>
        </div>

        <div className="mr-[49px] flex-1">
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
