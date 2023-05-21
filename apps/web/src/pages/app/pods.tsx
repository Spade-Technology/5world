import { useState } from 'react'
import { useAccount } from 'wagmi'
import Page from '~/components/layout/page'
import PodCards from '~/components/pages/app/pods/podCards'
import PodsProfile from '~/components/pages/app/pods/podsProfile'
import CreateNewPod from '~/components/pages/app/pods/popups/createNewPod'
import RegenPod from '~/components/pages/app/pods/popups/regenPod'
import { usePodReads } from '~/hooks/web3/usePod'

const Pods = () => {
  const [openCreatePod, setOpenCreatePod] = useState(false)
  const [openRegenDetails, setOpenRegen] = useState(false)
  const { address } = useAccount()

  const { data, refetch, isFetching } = usePodReads({ createdBy: address || '' })

  return (
    <>
      <Page>
        <PodsProfile setOpenCreatePod={setOpenCreatePod} />

        <PodCards setOpenRegen={setOpenRegen} data={data} />

        {openCreatePod && <CreateNewPod show={openCreatePod} close={() => setOpenCreatePod(false)} />}

        {openRegenDetails && <RegenPod show={openRegenDetails} close={() => setOpenRegen(false)} data={data} />}
      </Page>
    </>
  )
}

export default Pods
