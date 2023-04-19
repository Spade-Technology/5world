type Props = {
  title?: JSX.Element;
  description?: JSX.Element;
  invertColors?: boolean;
};

const Description = (props: Props) => {
  /** Common Styles for mobile and web */
  const containerClass =
    "flex justify-items-end gap-8 text-lg px-6 py-16 flex-col font-normal";
  const titleClass = "flex-1 text-5xl";
  const descriptionClass = "flex-1 text-lg px-0.5";

  return (
    <div
      className={`${containerClass} md:flex-row md:gap-14 md:px-20 ${
        props.invertColors ? "bg-vdao-deep text-white" : ""
      }`}
    >
      <div
        className={`${titleClass} md:text-8xl ${
          props.invertColors ? "text-vdao-light" : ""
        }`}
      >
        {props.title}
      </div>
      <div className={`${descriptionClass} md:pt-32`}>
        {" "}
        {props.description}{" "}
      </div>
    </div>
  );
};

export default Description;
