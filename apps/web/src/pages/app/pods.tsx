import { useState } from 'react'
import Footer from '~/components/layout/footer'
import Header from '~/components/layout/header'
import CreateNewPod from '~/components/pages/app/pods/popups/createNewPod'
import PodCards from '~/components/pages/app/pods/podCards'
import PodsProfile from '~/components/pages/app/pods/podsProfile'
import RegenPod from '~/components/pages/app/pods/popups/regenPod'
import Page from '~/components/layout/page'

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
