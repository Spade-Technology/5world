import { use, useState } from 'react'
import { useAccount } from 'wagmi'
import Page from '~/components/layout/page'
import PodCards from '~/components/pages/app/pods/podCards'
import PodsProfile from '~/components/pages/app/pods/podsProfile'
import CreateNewPod from '~/components/pages/app/pods/popups/createNewPod'
import RegenPod from '~/components/pages/app/pods/popups/regenPod'
import { pod_type, usePodReads } from '~/hooks/web3/usePod'

const Pods = () => {
  const [openCreatePod, setOpenCreatePod] = useState(false)
  const [openedPod, setOpenedPod] = useState<pod_type | undefined>(undefined)
  const [pid, setPid] = useState(0)
  const { address } = useAccount()

  const { data, refetch, isLoading } = usePodReads({
    createdBy: address || '',
    include: { members: true, admins: true, proposals: true },
  })

  return (
    <>
      <Page>
        <PodsProfile setOpenCreatePod={setOpenCreatePod} />

        <PodCards setOpenedPod={setOpenedPod} data={data} isLoading={isLoading} />

        {openCreatePod && <CreateNewPod show={openCreatePod} close={() => setOpenCreatePod(false)} refetch={refetch} />}

        {openedPod && <RegenPod pod={openedPod} close={() => setOpenedPod(undefined)} />}
      </Page>
    </>
  )
}

export default Pods
