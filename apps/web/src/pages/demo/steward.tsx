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
  const {
    createPod,
    mutation: { isLoading },
  } = useCreatePod()
  const { data, refetch, isFetching } = usePodReads({ createdBy: address || '' })

  return (
    <>
      <Page>
        <div className='mx-auto flex flex-col gap-3 text-center'>
          <span> IF YOU'RE NOT LOGGED IN YOU ARE GOING TO GET UNAUTHORIZED</span>

          <Button
            disabled={isLoading}
            onClick={() => {
              if (address)
                createPod(
                  { name: 'test', description: 'test', members: [address], admins: [address], picture: IMAGE_BASE_64 },
                  {
                    onSuccess(data, variables, context) {
                      refetch()
                    },
                  },
                )
            }}
          >
            Create Pod
          </Button>

          <div>
            <span>Your Pods {isFetching ? '(Loading...)' : ''}</span>
            <br />

            {data?.map(pod => (
              <div className='mx-auto flex w-full text-center'>
                <div className='mx-auto flex gap-2 text-xl text-white'>
                  Image: <img src={('data:image/png;base64,' + pod.picture) as any} /> || PodId: {pod.id} || PodName:{' '}
                  {pod.name} || PodDescription: {pod.description}
                  <br />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Page>
    </>
  )
}

export default Pods
