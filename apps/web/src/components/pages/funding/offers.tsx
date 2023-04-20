import Image from "next/image";

import RestrictedImage from "public/illustrations/getFunding/restrictedFunding.svg";
import GrantsImage from "public/illustrations/getFunding/grants.svg";
import CommunityImage from "public/illustrations/getFunding/community.svg";

const Offers = () => {
  const offersInfo = [
    {
      img: RestrictedImage,
      content: "Unrestricted funding opportunities",
    },
    {
      img: GrantsImage,
      content: "Fully community led grants allocation",
    },
    {
      img: CommunityImage,
      content:
        "Become a member of VDAO and join our decentralised global community.",
    },
  ];

  return (
    <div className="mx-auto max-w-[1280px] py-5 px-6 md:py-36 md:px-0 ">
      <div className="font-heading text-3xl md:text-center md:text-5xl">
        What’s on Offer?
      </div>
      <div className="flex flex-col justify-between gap-14 pt-8 md:flex-row md:gap-8 md:px-24 md:pt-16">
        {offersInfo.map((offer, idx) => {
          return (
            <div className="flex-1" key={idx}>
              <Image src={offer.img} alt="image" className="mx-auto" />
              <div className="mx-auto w-full pt-5 text-center text-lg">
                {offer.content}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Offers;
