import CustomModal from "~/components/misc/customModal";
import ProfilePic from "public/icons/blog/createdByLogo.svg";
import Image from "next/image";
import { useState } from "react";
import PrimaryButton from "~/styles/shared/buttons/primaryButton";

type PopupProps = {
  show: boolean;
  close: any;
};

const ProfilePopup = ({ show, close }: PopupProps) => {
  const [showActivity, setShowActivity] = useState(false);
  return (
    <CustomModal show={show} close={close}>
      <div className="pl-[10px]">
        <div className="flex flex-col md:flex-row justify-between">
            <div>
          <div className="flex w-full">
            <Image
              src={ProfilePic}
              alt=""
              className="h-[64.2px] w-[60px] md:h-[128.4px] md:w-[123.41px] rounded-full"
            />

            <div className="pl-[10px] md:pl-[15px]">
              <div className="font-body text-[26px] md:text-[36px] font-semibold text-vdao-light">
                {" "}
                Kris Millar{" "}
              </div>
              <div className="flex flex-col font-body text-lg md:flex-row md:gap-5">
                <div className="md:text-[22px] font-medium">0xd12512....92C</div>
                <div className="font-bold">Joined May 05, 2023</div>
              </div>
            </div>
          </div>

          <div className="mt-[30px] w-fit rounded-3xl border-[3px] border-vdao-light md:py-[7px] px-5 md:px-[25px] text-lg md:text-xl font-medium">
            DAO Operation Guild
          </div>
          </div>

          <PrimaryButton
            text="Delegate"
            className="float-right mt-[30px] md:mt-[46px] h-fit py-[5px] px-[35px] font-heading text-xl font-medium"
          />
        </div>

        <div className="flex gap-[10px] pb-5 border-b-[1px] border-b-vdao-dark pt-[44px] font-body text-[22px] font-bold">
          <div
            className={` ${
              !showActivity && "text-vdao-light"
            } cursor-pointer justify-start`}
            onClick={() => setShowActivity(false)}
          >
            Statement
          </div>
          <div
            className={` ${
              showActivity && "text-vdao-light"
            } cursor-pointer justify-start`}
            onClick={() => setShowActivity(true)}
          >
            Activity
          </div>
        </div>

        {showActivity ? <Activity /> : <Statements />}
      </div>
    </CustomModal>
  );
};

const Statements = () => {
  return (
    <div className="max-w-[771px] pt-5 md:pt-[30px] font-body text-lg font-normal">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet
      elementum urna, in volutpat risus. Quisque nec tempus diam, sit amet
      luctus mi. Quisque auctor tortor ut nunc finibus, et venenatis lacus
      eleifend. Fusce commodo, ipsum sit amet mollis tincidunt, ipsum nibh
      bibendum arcu, in egestas lectus justo eget massa. Nam quis aliquet erat,
      in dignissim purus.
      <br />
      <br />
      In viverra orci sit amet ex vestibulum aliquet. Sed luctus aliquet
      ullamcorper. Praesent non turpis at leo luctus semper. Suspendisse eget
      dapibus lorem. Vivamus eu arcu et metus congue vulputate ut quis mi. Nam
      quis dolor non orci luctus iaculis quis at nisi.
    </div>
  );
};

const Activity = () => {
  return (
    <div className="flex gap-[72px] p-5 md:py-[50px] text-sm">
      <div className="flex flex-col justify-start gap-5 font-normal">
        <div>Donation to VDAO Treasury</div>
        <div>Operational Proposal created</div>
        <div>Operational Proposal created</div>
        <div>Grants Round created</div>
      </div>

      <div className="flex flex-col justify-start  gap-5 font-bold">
        <div className="float-right">1.0 ETH</div>
        <div>1 days ago</div>
        <div>5 days ago</div>
        <div>7 days ago</div>
      </div>
    </div>
  );
};

export default ProfilePopup;
