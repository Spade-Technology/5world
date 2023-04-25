type ButtonProps = {
  text: string;
  className?: string;
};

const PrimaryButton = (props: ButtonProps) => {
  return (
    <div
      className={`w-fit cursor-pointer rounded-md bg-vdao-light px-9 text-vdao-dark  ${props.className}`}
    >
      {props.text}
    </div>
  );
};

export default PrimaryButton;
