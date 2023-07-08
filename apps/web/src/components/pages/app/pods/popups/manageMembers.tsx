import CustomModal from '~/components/misc/customModal'
import { pod_type, useEditPod } from '~/hooks/web3/usePod'
import FormTwo from './formTwo'
import { useAccount } from 'wagmi'
import { useState } from 'react'

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

  const { mutate: editPod } = useEditPod({})

  const editPodHanlder = () => {
    if (address) {
      const memberAddr: any = []
      if (membersInfo && membersInfo.length > 0) {
        membersInfo.map((info: any) => {
          memberAddr.push(info.address)
        })
      } else {
        memberAddr.push(address)
      }
      editPod({ members: memberAddr })

      close()
    } else {
      setError(true)
    }
  }
  return (
    <CustomModal show={show} close={close} heading='Manage Members' modalMarginTop='my-[40px]'>
      <FormTwo managerAddr={managerAddr} setManagerAddr={setManagerAddr} membersInfo={membersInfo} setMembersInfo={setMembersInfo} createPodHanlder={editPodHanlder} pod={pod} />
    </CustomModal>
  )
}

export default ManageMembers
