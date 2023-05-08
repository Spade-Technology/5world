import CustomModal from "~/components/misc/customModal";
import FormOne from "./formOne";
import { useState } from "react";
import FormTwo from "./formTwo";
import Preview from "./preview";

type CreateProposalProps = {
  show: boolean;
  close: any;
};

const CreateNewProposal = ({ show, close }: CreateProposalProps) => {
  const [nextFrom, setNextForm] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  return (
    <CustomModal
      show={show}
      close={close}
      heading={` ${showPreview ? "" : "Create New Proposal"}`}
      modalMarginTop="my-[40px]"
    >
      {!nextFrom && !showPreview ? (
        <FormOne setNextForm={setNextForm} />
      ) : nextFrom ? (
        <FormTwo setNextForm={setNextForm} setShowPreview={setShowPreview} />
      ) : (
        <Preview
          setNextForm={setNextForm}
          setShowPreview={setShowPreview}
          close={close}
        />
      )}{" "}
    </CustomModal>
  );
};

export default CreateNewProposal;
