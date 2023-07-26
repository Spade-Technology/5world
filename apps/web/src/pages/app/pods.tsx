import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useAccount, useBalance } from 'wagmi'
import Page from '~/components/layout/page'
import { EnforceAuth } from '~/components/misc/enforceAuth'
import PodCards from '~/components/pages/app/pods/podCards'
import PodsProfile from '~/components/pages/app/pods/podsProfile'
import CreateNewPod from '~/components/pages/app/pods/popups/createNewPod'
import ManageMembers from '~/components/pages/app/pods/popups/manageMembers'
import PodModal from '~/components/pages/app/pods/popups/regenPod'
import { pod_type, usePodReads } from '~/hooks/web3/usePod'

const Pods = () => {
  const [openCreatePod, setOpenCreatePod] = useState(false)
  const [showManageMembers, setShowManageMembers] = useState(false)
  const [pod, setPod] = useState<pod_type | undefined>(undefined)
  const [openedPod, setOpenedPod] = useState<boolean>(false)
  const { address } = useAccount()
  const [managerAddr, setManagerAddr] = useState('')
  const [memberAddr, setMemberAddr] = useState('')

  const { data, refetch, isLoading } = usePodReads({
    createdBy: address || '',
    include: { members: true, admins: true, proposals: true },
  })
  const { data: balance } = useBalance({})
  const { data: siwe } = useSession()

  return (
    <>
      <Page>
        <PodsProfile setOpenCreatePod={setOpenCreatePod} />

        <EnforceAuth>
          <PodCards setOpenedPod={setOpenedPod} setPod={setPod} data={data} isLoading={isLoading} />

          {<CreateNewPod show={openCreatePod} close={() => setOpenCreatePod(false)} refetch={refetch} />}

          {!!openedPod && <PodModal close={() => setOpenedPod(false)} pod={pod} setShowManageMembers={setShowManageMembers} />}

          {/* {showManageMembers && ( */}
          <ManageMembers
            show={showManageMembers}
            // managerAddr={managerAddr}
            // memberAddr={memberAddr}
            // setMemberAddr={setMemberAddr}
            // setManagerAddr={setManagerAddr}
            close={() => setShowManageMembers(false)}
            pod={pod}
          />
          {/* )} */}
        </EnforceAuth>
      </Page>
    </>
  )
}

export default Pods
