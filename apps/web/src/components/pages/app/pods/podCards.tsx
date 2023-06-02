import Image from 'next/image'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'
import PodImage from 'public/illustrations/pods/podImage.svg'
import Icon1 from 'public/icons/pods/icon1.svg'
import Icon2 from 'public/icons/pods/icon2.svg'
import Icon3 from 'public/icons/pods/icon3.svg'
import Icon4 from 'public/icons/pods/icon4.svg'
import Icon5 from 'public/icons/pods/icon5.svg'
import Icon6 from 'public/icons/pods/icon6.svg'
import Icon7 from 'public/icons/pods/icon7.svg'
import Icon8 from 'public/icons/pods/icon8.svg'
import { Dispatch, SetStateAction } from 'react'
import PodInfoBox from './popups/infoBox'
import { useAccount } from 'wagmi'
import { Pod } from '@prisma/client'
import { pod_type } from '~/hooks/web3/usePod'
import { shortenAddress } from '~/utils/helpers'
import SkeletonNode from 'antd/es/skeleton/Node'
import { Skeleton } from 'antd'
// import { usePodReads } from '~/hooks/web3/usePod'

type PodCardProps = {
  setOpenedPod: Dispatch<SetStateAction<pod_type | undefined>>
  data: pod_type[] | undefined
  isLoading: boolean
}

type CardProps = {
  setOpenedPod: Dispatch<SetStateAction<pod_type | undefined>>
  pod: pod_type
}

const PodCards = ({ setOpenedPod, data, isLoading }: PodCardProps) => {
  return (
    <div className='mx-auto w-screen bg-vdao-deep'>
      <div className='mx-auto max-w-[1280px] pb-[120px]'>
        <div
          id='currentPods'
          className='mx-6 max-w-[1280px] font-heading text-[32px] font-medium text-vdao-light md:mx-auto md:text-[46px]'
        >
          Current Pods
        </div>

        <div className='mx-6 mt-5 grid grid-cols-1 gap-5 md:mx-0 md:grid-cols-2'>
          {isLoading ? (
            <>
              <Skeleton.Avatar
                shape='square'
                style={{ height: '400px', width: '100%' }}
                className='col-span-2'
                active
              />
              <Skeleton.Avatar
                shape='square'
                style={{ height: '400px', width: '100%' }}
                className='col-span-2'
                active
              />
              <Skeleton.Avatar
                shape='square'
                style={{ height: '400px', width: '100%' }}
                className='col-span-2'
                active
              />
            </>
          ) : data && data.length > 0 ? (
            data?.map((pod, idx) => {
              return <Card setOpenedPod={setOpenedPod} pod={pod} />
            })
          ) : (
            <div className='text-white'>There are no pods available. Please do create a pod...!!</div>
          )}
        </div>
      </div>
    </div>
  )
}

export const Card = ({ setOpenedPod, pod }: CardProps) => {
  return (
    <div className='rounded-[20px] bg-vdao-dark py-10 px-5 text-white md:py-[50px] md:px-10'>
      <div className='flex flex-col gap-[10px] md:flex-row md:gap-[25px]'>
        <Image src={pod.picture ? pod.picture : PodImage} alt='' height={120} width={120} className='align-top' />
        <div>
          <div className='font-heading text-3xl font-medium'> {pod.name}</div>
          <div className='pt-[10px] font-body text-lg font-normal'>
            {pod.description
              ? pod.description
              : `
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ultrices vehicula ullamcorper...
              `}
          </div>
          <div>
            <PrimaryButton
              text='View Detail'
              className='mt-5 py-[5px] px-[35px] font-heading text-xl font-medium'
              onClick={() => {
                setOpenedPod(pod)
              }}
            />
          </div>
        </div>
      </div>

      <PodInfoBox
        invertColors={false}
        proposals={0}
        discussions={pod && pod.discussions ? pod.discussions.length : 0}
        members={pod.members}
      />

      <div className='flex flex-col gap-[30px] pt-5 md:flex-row md:gap-[60px] md:pt-10'>
        <div>
          <div className='font-heading text-xl font-medium'> Manager </div>
          {pod?.admins && (
            <div className='flex w-full pt-[14px]'>
              <div>
                {pod.admins[0]?.picture ? (
                  <Image src={pod.admins[0]?.picture || ''} alt='' className='rounded-full' />
                ) : (
                  <div
                    className='rounded-full'
                    style={{
                      background: 'linear-gradient(221.35deg, #36DFAE 0%, #28B6A5 36.46%, #1D555C 100%)',
                      width: '44px',
                      height: '44px',
                    }}
                  />
                )}
              </div>

              <div className='!w-1/3 pl-[10px] md:pl-[16px]'>
                <div className='font-body text-lg font-semibold'>{pod.admins[0]?.name}</div>
                <div className='font-body text-sm'>{shortenAddress(pod.admins[0]?.address || '0x')}</div>
              </div>
            </div>
          )}
        </div>

        <div className='flex-1'>
          <div className='font-heading text-xl font-medium'> Members </div>
          <div className='grid grid-cols-5 gap-[10px] pt-[15px]'>
            {pod?.members?.map(member => (
              <div>
                {member.picture ? (
                  <Image src={member.picture || ''} alt='' className='rounded-full' />
                ) : (
                  <div
                    className='rounded-full'
                    style={{
                      background: 'linear-gradient(221.35deg, #36DFAE 0%, #28B6A5 36.46%, #1D555C 100%)',
                      width: '44px',
                      height: '44px',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PodCards
