import Image from "next/image";
import Icon1 from "public/icons/pods/icon1.svg";


type CardProps = {
  Icon?: any;
  Name?: string;
  Address?: string;
};

const ProfileCard = ({ Icon, Name, Address }: CardProps) => {
  return (
    <div className="flex w-full pt-[14px]">
      <div>
        <Image src={Icon ? Icon : Icon1} alt="" className="rounded-full" />
      </div>

      <div className="pl-[10px] md:pl-[16px]">
        <div className="font-body text-lg font-semibold">
          {Name ? Name : "CyberGod01"}
        </div>
        <div className="font-body text-sm">
          {Address ? Address : "0xd12512....92C"}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
