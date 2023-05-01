import Image from "next/image";
import CloseIcon from "public/icons/customModal/closeIcon.svg";

type ModalProps = {
  show: boolean;
  close: any;
  children: any;
  heading?: string;
  modalMarginTop?: string;
};

const CustomModal = ({
  show,
  close,
  children,
  heading,
  modalMarginTop,
}: ModalProps) => {
  return (
    <div
      className={`${
        show ? "block" : "hidden"
      } fixed top-0 left-0 z-50 mx-auto h-full w-full overflow-auto backdrop-brightness-50`}
      //   onClick={() => setClickedOutside(true)}
    >
      <div
        className={`${
          modalMarginTop ? modalMarginTop : "my-[100px]"
        } overflow-auto mx-auto h-auto  max-w-[370px] rounded-[20px] bg-white p-6 md:max-w-[1140px] md:p-[30px] md:pl-[50px]`}
        // onClick={() => setClickedOutside(false)}
      >
        <div className="flex justify-between">
          <div className="pt-5 font-heading text-[26px] md:text-3xl font-medium text-vdao-dark">
            {heading ? heading : ""}
          </div>
          <Image
            src={CloseIcon}
            alt="close"
            className="float-right cursor-pointer"
            onClick={() => {
              close();
            }}
          />
        </div>

        {children}
      </div>
    </div>
  );
};

export default CustomModal;
