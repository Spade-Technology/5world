import Description from "~/components/misc/description";

export const GetFundingDescription = () => {
  return (
    <Description
      title={
        <p>
          Get <br /> Funding
        </p>
      }
      description={
        <p>
          VDAO welcomes all funding proposals that align with its vision and
          mission of regenerating our planet through systems thinking, research,
          and innovation.
        </p>
      }
    />
  );
};

export default GetFundingDescription;
