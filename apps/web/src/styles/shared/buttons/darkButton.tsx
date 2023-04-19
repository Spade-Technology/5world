type ButtonProps = {
  text: string;
  className?: string;
};

const DarkButton = (props: ButtonProps) => {
  return (
    <div
      className={`w-fit cursor-pointer rounded-md bg-vdao-dark px-9 text-white ${props.className}`}
    >
      {props.text}
    </div>
  );
};

export default DarkButton;
