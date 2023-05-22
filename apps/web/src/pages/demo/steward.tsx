import { useState } from 'react'
import Footer from '~/components/layout/footer'
import Header from '~/components/layout/header'
import CreateNewPod from '~/components/pages/app/pods/popups/createNewPod'
import PodCards from '~/components/pages/app/pods/podCards'
import PodsProfile from '~/components/pages/app/pods/podsProfile'
import RegenPod from '~/components/pages/app/pods/popups/regenPod'
import Page from '~/components/layout/page'
import { useCreatePod, usePodReads } from '~/hooks/web3/usePod'
import { useAccount } from 'wagmi'
import { Button } from 'antd'

const Pods = () => {
  const { address } = useAccount()

  return (
    <>
      <Page>
        <div className='mx-auto flex flex-col gap-3 text-center'>
          <span> IF YOU'RE NOT LOGGED IN YOU ARE GOING TO GET UNAUTHORIZED</span>
        </div>
      </Page>
    </>
  )
}

export default Pods
