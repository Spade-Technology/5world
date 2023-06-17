import Image from 'next/image'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'
import PodImage from 'public/illustrations/pods/podImage.svg'
import { Dispatch, SetStateAction } from 'react'
import PodInfoBox from './popups/infoBox'
import { pod_type } from '~/hooks/web3/usePod'
import { shortenAddress, shortenText } from '~/utils/helpers'
import { Skeleton } from 'antd'
import ProfileCard from '~/components/misc/profileCard'
// import { usePodReads } from '~/hooks/web3/usePod'

type PodCardProps = {
  setOpenedPod: Dispatch<SetStateAction<pod_type | undefined>>
  data: pod_type[] | undefined
  isLoading: boolean
  setPid: Dispatch<SetStateAction<number>>
}

type CardProps = {
  setOpenedPod: Dispatch<SetStateAction<pod_type | undefined>>
  pod: pod_type
  setPid: Dispatch<SetStateAction<number>>
}

const PodCards = ({ setPid, setOpenedPod, data, isLoading }: PodCardProps) => {
  return (
    <div className='mx-auto w-screen bg-vdao-deep'>
      <div className='mx-auto max-w-[1280px] pb-[120px]'>
        <div id='currentPods' className='mx-6 max-w-[1280px] font-heading text-[32px] font-medium text-vdao-light md:mx-auto md:text-[46px]'>
          Current Pods
        </div>

        <div className='mx-6 mt-5 grid grid-cols-1 gap-5 md:mx-0 md:grid-cols-2'>
          {isLoading ? (
            <>
              <Skeleton.Avatar shape='square' style={{ height: '400px', width: '100%' }} className='col-span-2' active />
              <Skeleton.Avatar shape='square' style={{ height: '400px', width: '100%' }} className='col-span-2' active />
              <Skeleton.Avatar shape='square' style={{ height: '400px', width: '100%' }} className='col-span-2' active />
            </>
          ) : data && data.length > 0 ? (
            data?.map((pod, idx) => {
              return <Card setOpenedPod={setOpenedPod} pod={pod} setPid={setPid} />
            })
          ) : (
            <div className='text-white'>There are no pods available. Please do create a pod...!!</div>
          )}
        </div>
      </div>
    </div>
  )
}

export const Card = ({ setOpenedPod, pod, setPid }: CardProps) => {
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
                setPid(pod.id)
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

      <div className='flex flex-col gap-[30px] pt-5 md:flex-row md:gap-[60px] md:pt-10 '>
        <div>
          <div className=' flex-1 font-heading text-xl font-medium'> Manager </div>
          {/* {pod?.admins && (
            <div className='flex w-full pt-[14px]'>
              <div>
                {pod.admins[0]?.picture ? (
                  <Image src={pod.admins[0]?.picture || ''} height={44} width={44} alt='' className='rounded-full' />
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
                <div className='font-body text-lg font-semibold'>{pod.admins[0]?.name ? shortenText(pod.admins[0]?.name) : 'Unnamed'}</div>
                <div className='font-body text-sm'>{shortenAddress(pod.admins[0]?.address || '0x')}</div>
              </div>
            </div>
          )} */}
          <ProfileCard icon={pod?.admins[0] ? pod.admins[0]?.picture : ''} address={pod.admins[0] ? pod.admins[0]?.address : ''} name={pod?.admins[0] ? pod.admins[0]?.name : ''} />
        </div>

        <div>
          <div className='font-heading text-xl font-medium'> Members </div>

          {pod?.members?.map(member => (
            <>
              <div className='grid grid-cols-6 gap-2 pt-[14px]'>
                <Image src={member.picture || ''} height={44} width={44} alt='' className='rounded-full' />
                {/* <div>
                {member.picture ? (
                  <Image src={member.picture || ''} height={44} width={44} alt='' className='rounded-full' />
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
                <div className='font-body text-lg font-semibold'>{member.name ? shortenText(member.name) : 'Unnamed'}</div>
                <div className='font-body text-sm'>{shortenAddress(member.address || '0x')}</div>
              </div> */}
              </div>
            </>
          ))}
          {/* <ProfileCard icon={pod?.members[0] ? pod.members[0]?.picture : ''} address={pod.members[0] ? pod.members[0]?.address : ''} name={pod?.members[0] ? pod.members[0]?.name : ''} /> */}
        </div>
      </div>
    </div>
  )
}

export default PodCards
