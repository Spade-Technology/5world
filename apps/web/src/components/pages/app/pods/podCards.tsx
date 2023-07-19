import Image from 'next/image'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'
import PodImage from 'public/illustrations/pods/podImage.svg'
import { Dispatch, SetStateAction } from 'react'
import PodInfoBox from './popups/infoBox'
import { pod_type } from '~/hooks/web3/usePod'
import { Skeleton } from 'antd'
import ProfileCard from '~/components/misc/profileCard'

type PodCardProps = {
  setOpenedPod: Dispatch<SetStateAction<boolean>>
  data: pod_type[] | undefined
  isLoading: boolean
  setPod: Dispatch<SetStateAction<pod_type | undefined>>
}

type CardProps = {
  setOpenedPod: Dispatch<SetStateAction<boolean>>
  pod: pod_type
  setPod: Dispatch<SetStateAction<pod_type | undefined>>
}

const PodCards = ({ setPod, setOpenedPod, data, isLoading }: PodCardProps) => {
  return (
    <div className='w-full bg-vdao-deep px-6'>
      <div className='mx-auto w-full max-w-[1140px] pb-[120px]'>
        <div id='currentPods' className='max-w-[1280px] font-heading text-[32px] font-medium text-vdao-light md:mx-auto md:text-[46px]'>
          Current Pods
        </div>

        <div className='mt-5 grid grid-cols-1 gap-5 md:grid-cols-2'>
          {isLoading ? (
            <>
              <Skeleton.Avatar shape='square' style={{ height: '400px', width: '100%' }} className='col-span-2' active />
              <Skeleton.Avatar shape='square' style={{ height: '400px', width: '100%' }} className='col-span-2' active />
              <Skeleton.Avatar shape='square' style={{ height: '400px', width: '100%' }} className='col-span-2' active />
            </>
          ) : data && data.length > 0 ? (
            data?.map((pod, idx) => {
              return <Card setOpenedPod={setOpenedPod} pod={pod} setPod={setPod} />
            })
          ) : (
            <div className='text-white'>There are no pods available. Please do create a pod...!!</div>
          )}
        </div>
      </div>
    </div>
  )
}

export const Card = ({ setOpenedPod, pod, setPod }: CardProps) => {
  return (
    <div id='#currentPods' className='rounded-[20px] bg-vdao-dark py-10 px-5 text-white lg:py-[50px] lg:px-10'>
      <div className='flex flex-col gap-[10px] md:flex-row lg:gap-[25px]'>
        <Image src={pod.picture ? pod.picture : PodImage} alt='' height={120} width={120} className='rounded-[5px] align-top' />
        <div>
          <div className='font-heading text-3xl font-medium'> {pod.name}</div>
          <div className='pt-[10px] font-body text-lg font-normal leading-[22px]'>
            {/* {pod.description
              ? pod.description
              : `
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ultrices vehicula ullamcorper...
              `} */}
            {pod?.description?.length > 95 ? (
              <div className='break-all'>
                {pod?.description.substring(0, 95)}{' '}
                <span
                  onClick={() => {
                    setOpenedPod(true)
                    setPod(pod)
                  }}
                  className=' cursor-pointer text-base text-gray-200 '
                >
                  ...Read more
                </span>
              </div>
            ) : pod?.description.length < 95 ? (
              pod?.description
            ) : (
              'No Description available'
            )}
          </div>
          <div>
            <PrimaryButton
              text='View Detail'
              className='mt-5'
              onClick={() => {
                setOpenedPod(true)
                setPod(pod)
              }}
            />
          </div>
        </div>
      </div>

      <PodInfoBox
        invertColors={false}
        proposals={pod && pod.proposals ? pod.proposals.length : 0}
        discussions={pod && pod.discussions ? pod.discussions.length : 0}
        members={pod && pod.members ? pod.members.length : 0}
      />

      <div className='flex flex-col justify-between gap-[30px] pt-5 md:flex-row md:pt-10 '>
        <div>
          <div className=' flex-1 font-heading text-xl font-medium'> Manager </div>
          <ProfileCard icon={pod?.admins[0] ? pod.admins[0]?.picture : ''} address={pod.admins[0] ? pod.admins[0]?.address : ''} name={pod?.admins[0] ? pod.admins[0]?.name : ''} />
        </div>

        <div className='w-full max-w-[240px]'>
          <div className='font-heading text-xl font-medium'> Members </div>
          <div className='mt-[15px] flex flex-wrap gap-2.5'>
            {pod?.members?.map(member => (
              <Image src={member.picture || ''} height={44} width={44} alt='' className='rounded-full bg-vdao-deep' />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PodCards
