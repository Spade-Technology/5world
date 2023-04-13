type Props = {
  title?: string;
  description?: string;
};

const Description = (props: Props) => {
  /** Common Styles for mobile and web */
  const containerClass =
    "flex justify-items-end gap-8 text-lg px-10 py-16 flex-col font-normal";
  const titleClass = "flex-1 text-5xl";
  const descriptionClass = "flex-1 text-lg px-0.5";

  return (
    <div className={`${containerClass} md:gap-14 md:flex-row md:px-20`}>
      <div className={`${titleClass} md:text-8xl`}>{props.title}</div>
      <div className={`${descriptionClass} md:pt-32`}>
        {" "}
        {props.description}{" "}
      </div>
    </div>
  );
};

export default Description;
