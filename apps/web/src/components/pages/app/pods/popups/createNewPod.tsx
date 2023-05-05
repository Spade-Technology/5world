import CustomModal from "~/components/misc/customModal";
import FormOne from "./formOne";
import { useState } from "react";
import FormTwo from "./formTwo";

type CreatePodProps = {
  show: boolean;
  close: any;
};

const CreateNewPod = ({ show, close }: CreatePodProps) => {
  const [nextFrom, setNextForm] = useState(false);
  return (
    <CustomModal show={show} close={close} heading="Create New Pod"  modalMarginTop="my-[40px]">
      {!nextFrom ? <FormOne setNextForm={setNextForm} /> : <FormTwo setNextForm={setNextForm} close={close} />}
    </CustomModal>
  );
};

export default CreateNewPod;
