import CustomModal from '~/components/misc/customModal'
import FormOne from './formOne'
import { useState } from 'react'
import FormTwo from './formTwo'
import { useAccount } from 'wagmi'
import { useCreatePod } from '~/hooks/web3/usePod'

type CreatePodProps = {
  show: boolean
  close: any
}

const CreateNewPod = ({ show, close }: CreatePodProps) => {
  const [nextFrom, setNextForm] = useState(false)
  const [podName, setPodName] = useState('')
  const [description, setDescription] = useState('')
  const [managerAddr, setManagerAddr] = useState('')
  const [memberAddr, setMemberAddr] = useState('')
  const [error, setError] = useState(false)

  const { address, isConnecting, isDisconnected } = useAccount()

  /** Here !, tell TypeScript that even though something looks like it could be null, it can trust you that it's not */
  // const data = useUserRead(address?.toString()!, { podsAsAdmin: true })
  const { createPod } = useCreatePod()

  const createPodHanlder = () => {
    if (managerAddr && memberAddr && podName && description) {
      createPod({ name: podName, description: description, members: [memberAddr], admins: [managerAddr], picture: '' })
      close()
    } else {
      setError(true)
    }
  }

  return (
    <CustomModal show={show} close={close} heading='Create New Pod' modalMarginTop='my-[40px]'>
      {!nextFrom ? (
        <FormOne
          setNextForm={setNextForm}
          podName={podName}
          setPodName={setPodName}
          description={description}
          setDescription={setDescription}
        />
      ) : (
        <FormTwo
          setNextForm={setNextForm}
          managerAddr={managerAddr}
          setManagerAddr={setManagerAddr}
          memberAddr={memberAddr}
          setMemberAddr={setMemberAddr}
          createPodHanlder={createPodHanlder}
        />
      )}
    </CustomModal>
  )
}

export default CreateNewPod
