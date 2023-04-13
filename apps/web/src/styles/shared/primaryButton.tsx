type ButtonProps = {
  text: string;
  className?: string;
};

const PrimaryButton = (props: ButtonProps) => {
  return (
    <div
      className={`w-fit cursor-pointer rounded-md px-9  bg-vdao-light text-vdao-dark  ${props.className}`}
    >
      {props.text}
    </div>
  );
};

export default PrimaryButton;
