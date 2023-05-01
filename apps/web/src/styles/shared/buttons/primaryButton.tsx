type ButtonProps = {
  text: string;
  className?: string;
  onClick?: any;
};

const PrimaryButton = (props: ButtonProps) => {
  return (
    <div
      className={`w-fit cursor-pointer rounded-md bg-vdao-light px-9 text-vdao-dark  ${props.className}`}
      onClick={() => props.onClick && props.onClick()}
    >
      {props.text}
    </div>
  );
};

export default PrimaryButton;
