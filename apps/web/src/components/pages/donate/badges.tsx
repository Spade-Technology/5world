import GoldBadge from "public/illustrations/donate/goldBadge.svg";
import SilverBadge from "public/illustrations/donate/silverBadge.svg";
import BronzeBadge from "public/illustrations/donate/bronzeBadge.svg";
import Image from "next/image";

const Badges = () => {
  return (
    <div className="max-w-[1280px] px-16 pt-[42px] pb-[60px] font-body text-white md:px-0 md:pb-[120px] md:pt-[5.64px]">
      <div className="xl:px-O flex flex-col gap-10 px-0 md:flex-row md:gap-[120px] md:px-12">
        <div className="flex-1">
          <Image src={GoldBadge} alt="GoldBadge" className="mx-auto" />
          <div className="border-b-2 border-b-white pt-4 pb-[20px] text-center font-heading text-3xl font-medium md:pt-[71px]">
            Gold Badge
          </div>
          <div className="py-5 text-center text-base font-normal md:py-4">
            Donors who contribute more
            <br /> than $150k will receive a gold
            <br /> Proof of Virtue badge (POV) on
            <br /> the Ethereum network.
          </div>
        </div>
        <div className="flex-1">
          <Image src={SilverBadge} alt="SilverBadge" className="mx-auto" />
          <div className="border-b-2 border-b-white pt-4 pb-[20px] text-center font-heading text-3xl font-medium md:pt-[71px]">
            Silver Badge
          </div>
          <div className="py-5 text-center text-base font-normal md:py-4">
            Donors who contribute $75-
            <br />
            $150k will receive a silver Proof
            <br /> of Virtue badge(POV) on the
            <br /> Ethereum network.
          </div>
        </div>
        <div className="flex-1">
          <Image src={BronzeBadge} alt="BronzeBadge" className="mx-auto" />
          <div className="border-b-2 border-b-white pt-4 pb-[20px] text-center font-heading text-3xl font-medium md:pt-[71px]">
            Bronze Badge
          </div>
          <div className="py-5 text-center text-base font-normal md:py-4">
            Donors who contribute $25-50k
            <br /> will receive a bronze Proof of
            <br /> Virtue badge(POV) on the
            <br /> Ethereum network.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Badges;
