import { useState } from 'react'
import Page from '~/components/layout/page'
import PodCards from '~/components/pages/app/pods/podCards'
import PodsProfile from '~/components/pages/app/pods/podsProfile'
import CreateNewPod from '~/components/pages/app/pods/popups/createNewPod'
import RegenPod from '~/components/pages/app/pods/popups/regenPod'

const Pods = () => {
  const [openCreatePod, setOpenCreatePod] = useState(false)
  const [openRegenDetails, setOpenRegen] = useState(false)

  return (
    <>
      <Page>
        <PodsProfile setOpenCreatePod={setOpenCreatePod} />

        <PodCards setOpenRegen={setOpenRegen} />

        {openCreatePod && <CreateNewPod show={openCreatePod} close={() => setOpenCreatePod(false)} />}

        {openRegenDetails && <RegenPod show={openRegenDetails} close={() => setOpenRegen(false)} />}
      </Page>
    </>
  )
}

export default Pods
