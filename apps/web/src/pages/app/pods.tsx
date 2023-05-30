import { use, useState } from 'react'
import { useAccount } from 'wagmi'
import Page from '~/components/layout/page'
import PodCards from '~/components/pages/app/pods/podCards'
import PodsProfile from '~/components/pages/app/pods/podsProfile'
import CreateNewPod from '~/components/pages/app/pods/popups/createNewPod'
import ManageMembers from '~/components/pages/app/pods/popups/manageMembers'
import RegenPod from '~/components/pages/app/pods/popups/regenPod'
import { usePodReads } from '~/hooks/web3/usePod'

const Pods = () => {
  const [openCreatePod, setOpenCreatePod] = useState(false)
  const [openRegenDetails, setOpenRegen] = useState(false)
  const [showManageMembers, setShowManageMembers] = useState(false)
  const [pid, setPid] = useState(0)
  const { address } = useAccount()
  const [managerAddr, setManagerAddr] = useState('')
  const [memberAddr, setMemberAddr] = useState('')

  const { data, refetch, isFetching } = usePodReads({ createdBy: address || '' })

  return (
    <>
      <Page>
        <PodsProfile setOpenCreatePod={setOpenCreatePod} />

        <PodCards setOpenRegen={setOpenRegen} data={data} setPid={setPid} />

        {openCreatePod && <CreateNewPod show={openCreatePod} close={() => setOpenCreatePod(false)} refetch={refetch} />}

        {openRegenDetails && (
          <RegenPod show={openRegenDetails} close={() => setOpenRegen(false)} pid={pid} data={data} setShowManageMembers={setShowManageMembers} />
        )}

        {showManageMembers && (
          <ManageMembers
            show={showManageMembers}
            managerAddr={managerAddr}
            memberAddr={memberAddr}
            setMemberAddr={setMemberAddr}
            setManagerAddr={setManagerAddr}
            setShowManageMembers={setShowManageMembers}
            setOpenRegen={setOpenRegen}
          />
        )}
      </Page>
    </>
  )
}

export default Pods
