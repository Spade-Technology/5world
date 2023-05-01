import CustomModal from "~/components/misc/customModal";
import FormOne from "./formOne";
import { useState } from "react";
import FormTwo from "./formTwo";

type CreateProposalProps = {
  show: boolean;
  close: any;
};

const CreateNewProposal = ({ show, close }: CreateProposalProps) => {
  const [nextFrom, setNextForm] = useState(false);
  return (
    <CustomModal show={show} close={close} heading="Create New Proposal"  modalMarginTop="my-[40px]">
      {!nextFrom ? <FormOne setNextForm={setNextForm} /> : <FormTwo setNextForm={setNextForm} close={close} />}
    </CustomModal>
  );
};

export default CreateNewProposal;
