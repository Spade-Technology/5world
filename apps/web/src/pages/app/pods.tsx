import { use, useState } from 'react'
import { useAccount, useBalance } from 'wagmi'
import Page from '~/components/layout/page'
import PodCards from '~/components/pages/app/pods/podCards'
import PodsProfile from '~/components/pages/app/pods/podsProfile'
import CreateNewPod from '~/components/pages/app/pods/popups/createNewPod'
import ManageMembers from '~/components/pages/app/pods/popups/manageMembers'
import PodModal from '~/components/pages/app/pods/popups/regenPod'
import RegenPod from '~/components/pages/app/pods/popups/regenPod'
import { pod_type, usePodReads } from '~/hooks/web3/usePod'

const Pods = () => {
  const [openCreatePod, setOpenCreatePod] = useState(false)
  const [showManageMembers, setShowManageMembers] = useState(false)
  const [openedPod, setOpenedPod] = useState<pod_type | undefined>(undefined)
  const [pid, setPid] = useState(0)
  const { address } = useAccount()
  const [managerAddr, setManagerAddr] = useState('')
  const [memberAddr, setMemberAddr] = useState('')

  const { data, refetch, isLoading } = usePodReads({
    createdBy: address || '',
    include: { members: true, admins: true, proposals: true },
  })
const { data: balance } = useBalance({})
  console.log("pods data: ", data)
  console.log("pods show", openedPod, showManageMembers)

  return (
    <>
      <Page>
        <PodsProfile setOpenCreatePod={setOpenCreatePod} />

        <PodCards setOpenedPod={setOpenedPod} setPid={setPid} data={data} isLoading={isLoading} />

        {openCreatePod && <CreateNewPod show={openCreatePod} close={() => setOpenCreatePod(false)} refetch={refetch} data={data} />}

        {!!openedPod && (
          <PodModal close={() => setOpenedPod(undefined)} pod={openedPod} setShowManageMembers={setShowManageMembers}  />
        )}

        {showManageMembers && (
          <ManageMembers
            show={showManageMembers}
            managerAddr={managerAddr}
            memberAddr={memberAddr}
            setMemberAddr={setMemberAddr}
            setManagerAddr={setManagerAddr}
            setShowManageMembers={setShowManageMembers}
            pid={pid}
            setOpenedPod={setOpenedPod}
            // setOpenedPod={() => setOpenedPod(undefined)}
            data={data}
          />
        )}
      </Page>
    </>
  )
}

export default Pods
