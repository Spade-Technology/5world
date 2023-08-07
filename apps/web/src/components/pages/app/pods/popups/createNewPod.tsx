import CustomModal from '~/components/misc/customModal'
import FormOne from './formOne'
import { useState } from 'react'
import FormTwo from './formTwo'
import { useAccount } from 'wagmi'
import { useCreatePod } from '~/hooks/web3/usePod'
import { notification } from 'antd'

type CreatePodProps = {
  show: boolean
  close: any
  refetch: any
}

const CreateNewPod = ({ show, close, refetch }: CreatePodProps) => {
  const [nextFrom, setNextForm] = useState(false)
  console.log({ nextFrom })
  const [podName, setPodName] = useState('')
  const [podImage, setPodImage] = useState({ image: '', name: '' })
  const [description, setDescription] = useState('')
  const [managerAddr, setManagerAddr] = useState('')
  const [membersInfo, setMembersInfo] = useState<any>('')
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
      const memberAddr: any = []
      if (membersInfo && membersInfo.length > 0) {
        membersInfo.map((info: any) => {
          memberAddr.push(info.address)
        })
      } else {
        memberAddr.push(address)
      }

      createPod(
        { name: podName, description: description, picture: podImage.image, members: memberAddr, admins: [managerAddr] },
        {
          onSuccess(data, variables, context) {
            notification.success({
              message: 'Sucessful',
              description: 'Created a new pod !',
            })
            refetch()
          },
          onError(e) {
            console.error(e)
            notification.error({
              message: 'Failed',
              description: 'Failed to create a new pod.',
            })
          },
        },
      )
      setPodName('')
      setDescription('')
      setPodImage({ image: '', name: '' })
      setNextForm(false)
      close()
    } else {
      setError(true)
    }
  }

  return (
    <CustomModal show={show} close={close} externalStyle={'w-full custom-scrollbar lg:!px-10 md:!px-5 md:mx-10 xl:mx-auto '} heading='Create New Pod' modalMarginTop='my-[40px]'>
      {!nextFrom ? (
        <FormOne setNextForm={setNextForm} podName={podName} setPodName={setPodName} description={description} setDescription={setDescription} podImage={podImage} setPodImage={setPodImage} />
      ) : (
        <FormTwo setNextForm={setNextForm} managerAddr={managerAddr} setManagerAddr={setManagerAddr} membersInfo={membersInfo} setMembersInfo={setMembersInfo} createPodHanlder={createPodHanlder} />
      )}
    </CustomModal>
  )
}

export default CreateNewPod
