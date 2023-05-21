import CustomModal from '~/components/misc/customModal'
import FormOne from './formOne'
import { useState } from 'react'
import FormTwo from './formTwo'
import { useAccount } from 'wagmi'
import { useCreatePod, usePodReads } from '~/hooks/web3/usePod'

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

  /** Here !, tell TypeScript that even though something looks like it could be null, it can trust you that it's not */
  // const data = useUserRead(address?.toString()!, { podsAsAdmin: true })

  const { address } = useAccount()
  const {
    createPod,
    mutation: { isLoading },
  } = useCreatePod()
  const { data, refetch, isFetching } = usePodReads({ createdBy: address || '' })

  const createPodHanlder = () => {
    if (address) {
      createPod(
        { name: podName, description: description, members: [address], admins: [address], picture: '' },
        {
          onSuccess(data, variables, context) {
            refetch()
          },
        },
      )
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
