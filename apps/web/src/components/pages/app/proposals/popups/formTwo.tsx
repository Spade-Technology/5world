import { Dispatch, SetStateAction } from "react";
import PrimaryButton from "~/styles/shared/buttons/primaryButton";
import Image from "next/image";
import EllipseComponent from "~/components/misc/ellipseLine";

type FormProps = {
  setNextForm: Dispatch<SetStateAction<boolean>>;
  setShowPreview: Dispatch<SetStateAction<boolean>>;
};

const FormTwo = ({ setNextForm, setShowPreview }: FormProps) => {
  return (
    <div className="grid grid-cols-1 gap-10 pt-[30px] pb-[24px] font-body text-lg font-normal text-vdao-dark md:grid-cols-2 md:gap-[106px] md:pt-10">
      <div>
        <div className="text-[22px] font-bold">Add Actions</div>

        <div className="pt-[5px]">
          Add up to 10 actions to be executed if the proposal passes.
        </div>

        <input
          className="mt-5 h-10 w-full max-w-[424px] rounded-[10px] border-[1px] border-vdao-dark px-5 py-2 outline-none"
          placeholder="Ox8f12id9f2a51e33d30c4181f2978"
        />

        <div className="mt-5 w-fit cursor-pointer rounded-[5px] bg-vdao-pink py-[5px] px-[35px] font-heading text-xl font-medium">
          Verify
        </div>

        <EllipseComponent
          className="py-[14px] text-sm font-normal md:py-5"
          text="Verified Contract found on Etherscan. ABI automatically imported."
        />

        <div className="mt-[30px] cursor-pointer rounded-[10px] border-[1px] border-vdao-dark py-9 px-[61px] text-center md:mt-10">
          <div className="text-[26px] font-medium">
            Drag and drop your ABI file
          </div>
          <div className="pt-[10px] text-sm font-normal">
            Or click to browse your files.
          </div>
        </div>

        <EllipseComponent
          className="py-[10px] text-sm font-normal md:py-5"
          text="ABI file uploaded"
        />
      </div>

      <div className="pr-5">
        <div className="text-[22px] font-bold">Contract Method</div>

        <input
          className="mt-5 h-10 w-full max-w-[424px] rounded-[10px] border-[1px] border-vdao-dark px-5 py-2 outline-none"
          placeholder="mockFunctionNonPayable"
        />

        <div className="pt-[40px] text-[22px] font-bold md:pt-[60px]">
          Added Actions
        </div>
        <div className="flex justify-start gap-[17px] pt-[10px] md:pt-5">
          <div className="text-lg font-bold text-vdao-light">Action name 1</div>
          <div className="my-auto text-sm font-bold underline">
            Remove action
          </div>
        </div>

        <div className="float-right flex gap-5 pt-6 md:pt-48 ">
          <div
            className="cursor-pointer rounded-[5px] border-[1px] border-vdao-dark py-[5px] px-[35px] font-heading text-lg font-medium"
            onClick={() => {
              setNextForm(false);
            }}
          >
            Previous
          </div>
          <PrimaryButton
            text="Confirm"
            className=" py-[5px] px-[35px] font-heading text-lg font-medium"
            onClick={() => {
              setNextForm(false);
              setShowPreview(true);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FormTwo;
