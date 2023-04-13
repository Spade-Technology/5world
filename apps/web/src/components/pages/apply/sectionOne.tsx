import Image from "next/image";
import applyImage from "public/illustrations/apply/PNG/VDAO-apply-graphic.png";

const SectionOne = () => {
  /** styles for both mobile and web */
  const containerClass = "flex flex-col-reverse mx-10";
  return (
    <div className={`${containerClass} md:flex-row md:gap-36 md:px-20`}>
      <div className="flex-1 md:py-20">
        <div className="pt-14 text-3xl font-medium md:pt-12">Head</div>
        <div className="pt-5 text-lg font-normal md:pt-4">
          e.g. analytical skills for developing strategies and processes across
          all aspects of DAO operations and governance. Critical thinking and
          applied reasoning skills to engage in meaningful thought leadership
          both inside and outside the DAO community.
        </div>

        <div className="pt-14 text-3xl font-medium md:pt-12">Heart</div>
        <div className="pt-5 text-lg font-normal md:pt-4">
          e.g creative skills to develop a unique DAO culture and communication
          style. Capacity to develop art that honours the DAO’s core mission and
          vision. People skills to manage conflict and foster positive
          engagement and stakeholder relations both internally and externally.
        </div>

        <div className="pt-14 text-3xl font-medium md:pt-12">Hands</div>
        <div className="pt-5 text-lg font-normal md:pt-4">
          e.g. technical skills to manage day-to-day DAO operations, identify
          and fix bugs, and implement future upgrades. Practical skills to
          manage the day-to-day community and to facilitate online and offline
          events both internally and externally.
        </div>
      </div>
      
      <div className="flex-1 md:pt-36">
        <Image
          src={applyImage}
          alt="VDAO-header"
          width={310}
          height={292}
          className=" md:w-full"
        />
      </div>
    </div>
  );
};

export default SectionOne;
