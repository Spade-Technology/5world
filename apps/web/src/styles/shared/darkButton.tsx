type ButtonProps = {
    text: string;
    className?: string;
  };
  
  const DarkButton = (props: ButtonProps) => {
    return (
      <div
        className={`w-fit cursor-pointer rounded-md px-9 bg-vdao-dark text-white ${props.className}`}
      >
        {props.text}
      </div>
    );
  };
  
  export default DarkButton;
  