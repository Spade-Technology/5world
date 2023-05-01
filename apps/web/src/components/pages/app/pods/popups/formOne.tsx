import PodImage from "public/illustrations/pods/podImage.svg";
import Image from "next/image";
import PrimaryButton from "~/styles/shared/buttons/primaryButton";
import { Dispatch, SetStateAction } from "react";

type FormProps = {
  setNextForm: Dispatch<SetStateAction<boolean>>;
};

const FormOne = ({ setNextForm }: FormProps) => {
  return (
    <div className="grid grid-cols-1 gap-[30px] pt-[30px] pb-[14px] font-body text-lg font-normal text-vdao-dark md:max-h-[760px] md:grid-cols-2 md:gap-[106px] md:pb-[34px] md:pt-10">
      <div>
        <div className="text-[22px] font-bold">Pod Name</div>

        <div className="pt-[5px]">You cannot change it after this step.</div>
        <input className="mt-[17px] h-10 w-full max-w-[424px] rounded-[10px] border-[1px] border-vdao-dark px-5 outline-none md:mt-5" />

        <div className="pt-[40px] text-[22px] font-bold md:pt-[60px]">
          Pod Profile Image
        </div>

        <div className="pt-[5px]">Upload a profile image for your pod.</div>

        <div className="flex flex-col gap-5 pt-8 text-center  align-middle md:flex-row md:gap-10">
          <Image src={PodImage} alt="PodImage" className="mx-auto" />
          <div className="md:pt-5">
            <div className="mx-auto w-fit cursor-pointer rounded-[5px] bg-vdao-pink py-[5px] px-[35px] font-heading text-xl font-medium">
              Upload Image
            </div>
            <div className="pt-[5px] text-sm md:pt-5">
              800 X 800px png or jpeg
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="text-[22px] font-bold">Pod Description</div>

        <div className="pt-[5px]">Your pod description goes here.</div>
        <textarea
          className="mt-5 h-[373px] w-full max-w-[510px] truncate break-words rounded-[10px] border-[1px] border-vdao-dark p-[30px] outline-none placeholder:text-opacity-80"
          placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet elementum urna, in volutpat risus. Quisque nec tempus diam, sit amet luctus mi. Quisque auctor tortor ut nunc finibus, et venenatis lacus eleifend. Fusce commodo, ipsum sit amet mollis tincidunt."
        />

        <div className="pt-[20px] md:pt-[90px]">
          <PrimaryButton
            text="Next"
            className="float-right py-[5px] px-[35px] text-lg font-medium"
            onClick={() => setNextForm(true)}
          />
        </div>
      </div>
    </div>
  );
};

export default FormOne;
