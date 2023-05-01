type ButtonProps = {
  text: string;
  className?: string;
};

const PrimaryButton = (props: ButtonProps) => {
  return (
    <div
      className={`clash w-fit cursor-pointer rounded-md bg-vdao-light px-9 py-1.5 text-xl font-medium text-vdao-dark md:px-7  ${props.className}`}
    >
      {props.text}
    </div>
  );
};

export default PrimaryButton;
