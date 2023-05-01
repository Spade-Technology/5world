type InfoBoxProps = {
  invertColors: boolean;
  proposals: number;
  discussions: number;
  members: number;
};
const PodInfoBox = ({
  invertColors,
  proposals,
  discussions,
  members,
}: InfoBoxProps) => {
  return (
    <div
      className={`${
        invertColors ? " bg-vdao-dark" : "bg-white"
      } mt-[25px] flex justify-between rounded-[20px]  px-5 py-8 md:mt-11 md:px-10`}
    >
      <div>
        <div className="text-[28px] font-semibold text-vdao-light md:text-[32px]">
          {" "}
          {proposals}{" "}
        </div>
        <div
          className={`${
            invertColors ? "text-white" : "text-vdao-dark"
          } pt-[10px] text-sm font-semibold md:text-lg`}
        >
          {" "}
          Proposals
        </div>
      </div>

      <div>
        <div className="text-[28px] font-semibold text-vdao-light md:text-[32px]">
          {discussions}
        </div>
        <div
          className={`${
            invertColors ? "text-white" : "text-vdao-dark"
          } pt-[10px] text-sm font-semibold md:text-lg`}
        >
          {" "}
          Discussions
        </div>
      </div>

      <div>
        <div className="text-[28px] font-semibold text-vdao-light md:text-[32px]">
          {members}
        </div>
        <div
          className={`${
            invertColors ? "text-white" : "text-vdao-dark"
          } pt-[10px] text-sm font-semibold md:text-lg`}
        >
          Members
        </div>
      </div>
    </div>
  );
};

export default PodInfoBox;
