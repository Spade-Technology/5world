import Image from "next/image";
import Ellipse from "public/icons/customModal/vdao-ellipse.svg";

type EllipseProps = {
  text: string;
  className?: string
};


const EllipseComponent = ({ text, className }: EllipseProps) => {
  return (
    <div className={`flex ${className}`}>
      <Image src={Ellipse} alt="ellipse" />
      <div className="pl-3">{text}</div>
    </div>
  );
};

export default EllipseComponent;
