import DarkButton from "~/styles/shared/buttons/darkButton";

const Subscription = () => {
  const containerClass = "flex px-6 py-14 flex-col";
  return (
    <div
      className={` ${containerClass} bg-vdao-lightpurple md:flex-row md:px-40 md:py-24`}
    >
      <div className="flex-1">
        <div className="font-heading text-5xl font-medium">
          Join Our
          <br /> Mailing List
        </div>
        <div className="pt-8 pr-32 text-2xl font-normal md:pt-9">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit morbi turpis
          mi.
        </div>
      </div>

      <div className="flex flex-1 justify-end flex-col pt-8 md:flex-row md:pt-24">
        <input
          placeholder="Enter your email"
          className="h-10 w-full rounded-md pl-5 text-vdao-dark outline-none outline-vdao-dark placeholder:text-vdao-dark placeholder:opacity-50"
        />
        <DarkButton
          text="Subscribe"
          className="mt-6 h-10 py-2 font-heading md:mt-0 md:ml-5"
        />
      </div>
    </div>
  );
};

export default Subscription;
