import DarkButton from "~/styles/shared/buttons/darkButton";

const MailingListComponent = () => {
  return (
    <div className={`flex flex-col bg-[#f8f2ff] md:flex-row`}>
      <div>
        <div
          className={`clash mt-[15.385vw] ml-[6.154vw] w-[50.769vw] text-[8.205vw] font-medium leading-[9.744vw] text-vdao-dark md:mt-[6.944vw] md:ml-[10.556vw] md:w-auto md:text-[3.194vw] md:leading-[3.611vw]`}
        >
          Join Our Mailing List
        </div>
        <div
          className={`satoshi mt-[8.205vw] ml-[6.923vw] w-[85.285vw] text-[5.641vw] font-normal leading-[6.667vw] text-vdao-dark md:mt-[2.431vw] md:mb-[6.25vw] md:ml-[10.556vw] md:w-[30.486vw] md:text-[1.806vw] md:leading-[2.083vw]`}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit morbi turpis
          mi.
        </div>
      </div>
      <div className="sm:flex">
        <input
          placeholder="Enter your email"
          className={`inter text-[rgba(29,85,92,0.5)]bg-white mt-[8.205vw] ml-[6.154vw] h-[10.256vw] w-[87.692vw] rounded-[1.282vw] border-[0.256vw] border-solid py-[2.564vw] px-[4.872vw] font-normal outline-none duration-300 ease-in-out focus:shadow-[0px_0px_1.282vw_0.513vw_rgb(29,85,92,0.4)] md:mt-[13.542vw] md:mr-[0.069vw] md:ml-[9.653vw] md:h-[2.778vw] md:w-[25.694vw] md:rounded-[0.347vw] md:border-[0.069vw] md:py-[0.625vw] md:px-[1.319vw] md:text-[1.111vw] md:focus:shadow-[0px_0px_0.347vw_0.139vw_rgb(29,85,92,0.4)]`}
        />
        <DarkButton
          text="Subscribe"
          className={`clash  mt-[5.641vw] mb-[15.897vw] ml-[6.154vw] w-fit cursor-pointer rounded-[1.282vw] bg-vdao-dark py-[1.282vw] px-[8.974vw] text-center text-[5.128vw] font-medium text-vdao-dark md:mt-[13.542vw] md:ml-[1.389vw] md:rounded-[0.347vw] md:py-[0.347vw] md:px-[2.431vw] md:text-[1.389vw]`}
        />
      </div>
    </div>
  );
};

export default MailingListComponent;
