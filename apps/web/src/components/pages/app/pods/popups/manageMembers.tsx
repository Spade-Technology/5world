import { Dispatch, SetStateAction, useState } from 'react'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'
import ProfileCard from '~/components/misc/profileCard'
import CustomModal from '~/components/misc/customModal'
import { pod_type } from '~/hooks/web3/usePod'
import { useUserReads } from '~/hooks/web3/useUser'
import { Pod } from '@prisma/client'
import { Select } from 'antd'
import FormTwo from './formTwo'
import { useAccount } from 'wagmi'

type ManageMembersProps = {
  show: boolean
  close: any
  pod: pod_type | undefined
}

const ManageMembers = ({ show, close, pod }: ManageMembersProps) => {
  const { address } = useAccount()
  const [managerAddr, setManagerAddr] = useState<any>([])
  const [membersInfo, setMembersInfo] = useState<any>([])
  const [error, setError] = useState(false)

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

      // console.log("podImage.image", typeof(podImage.image))
      // createPod(
      //   { name: podName, description: description, picture: "", members: memberAddr, admins: [managerAddr] },
      //   {
      //     onSuccess(data, variables, context) {
      //       notification.success({
      //         message: 'Sucessful',
      //         description: 'Created a new pod...!',
      //       })
      //       refetch()
      //     },
      //     onError() {
      //       notification.error({
      //         message: 'Failed',
      //         description: 'Try again! Failed to create a new pod.',
      //       })
      //     },
      //   },
      // )
      close()
    } else {
      setError(true)
    }
  }
  return (
    <CustomModal show={show} close={close} heading='Manage Members' modalMarginTop='my-[40px]'>
      <FormTwo managerAddr={managerAddr} setManagerAddr={setManagerAddr} membersInfo={membersInfo} setMembersInfo={setMembersInfo} createPodHanlder={createPodHanlder} pod={pod} />
    </CustomModal>
  )
}

export default ManageMembers
