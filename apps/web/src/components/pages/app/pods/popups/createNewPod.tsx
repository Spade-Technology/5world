import CustomModal from '~/components/misc/customModal'
import FormOne from './formOne'
import { useState } from 'react'
import FormTwo from './formTwo'
import { useAccount } from 'wagmi'
import { pod_type, useCreatePod, usePodReads } from '~/hooks/web3/usePod'
import { notification } from 'antd'

type CreatePodProps = {
  show: boolean
  close: any
  refetch: any
  data: pod_type[]
}

const CreateNewPod = ({ show, close, refetch, data }: CreatePodProps) => {
  const [nextFrom, setNextForm] = useState(false)
  const [podName, setPodName] = useState('')
  const [podImage, setPodImage] = useState({ image: '', name: '' })
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

  const createPodHanlder = () => {
    if (address) {
      createPod(
        { name: podName, description: description, members: [address], admins: [address], picture: podImage.image },
        {
          onSuccess(data, variables, context) {
            notification.success({
              message: 'Sucessful',
              description: 'Created a new pod...!',
            })
            refetch()
          },
          onError() {
            notification.error({
              message: 'Failed',
              description: 'Try again! Failed to create a new pod.',
            })
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
          podImage={podImage}
          setPodImage={setPodImage}
        />
      ) : (
        <FormTwo
          setNextForm={setNextForm}
          managerAddr={managerAddr}
          setManagerAddr={setManagerAddr}
          memberAddr={memberAddr}
          setMemberAddr={setMemberAddr}
          createPodHanlder={createPodHanlder}
          data={data}
        />
      )}
    </CustomModal>
  )
}

export default CreateNewPod
