import { User } from '@prisma/client'
import Image from 'next/image'
import PodImage from 'public/illustrations/pods/podImage.svg'
import { Dispatch, SetStateAction } from 'react'
import CustomModal from '~/components/misc/customModal'
import ProfileCard from '~/components/misc/profileCard'
import { pod_type } from '~/hooks/web3/usePod'
import PodInfoBox from './infoBox'

type PodModalProps = {
  pod: pod_type | undefined
  close: any
  setShowManageMembers: Dispatch<SetStateAction<boolean>>
}

const PodModal = ({ pod, close, setShowManageMembers }: PodModalProps) => {
  return (
    <CustomModal show={!!pod} close={close} heading={pod?.name} modalMarginTop='my-[50px]'>
      <div className='grid grid-cols-1 gap-10 py-[30px] font-body text-lg font-normal text-vdao-dark md:grid-cols-2 md:gap-[106px] md:py-10'>
        <div>
          <div className='flex flex-col justify-between gap-5 md:flex-row md:gap-7'>
            <Image src={pod?.picture ? pod.picture : PodImage} height={120} width={120} alt='PodImage' className='my-auto align-top' />

            <div className='text-lg font-normal'>
              {pod
                ? pod.description
                : `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet elementum urna, in volutpat risus.
              Quisque nec tempus diam, sit amet luctus mi. Quisque auctor tortor ut nunc finibus, et venenatis lacus
              eleifend. Fusce commodo, ipsum sit amet mollis tincidunt.`}
            </div>
          </div>
          <div className='pt-[27px] md:pt-0'>
            <PodInfoBox
              invertColors={false}
              proposals={pod && pod.proposals ? pod.proposals.length : 0}
              discussions={pod && pod.discussions ? pod.discussions.length : 0}
              members={pod && pod.members ? pod.members.length : 0}
            />
          </div>
        </div>

        <div className='pr-5'>
          <div className='flex justify-between'>
            <div className='text-[22px] font-bold'>Members</div>
            <div
              className='my-auto cursor-pointer text-sm font-bold underline'
              onClick={() => {
                close()
                setShowManageMembers(true)
              }}
            >
              Manage Memberships
            </div>
          </div>

          <div>
            {pod?.admins?.map((user: User, idx: number) => (
              <ProfileCard icon={user?.picture ? user.picture : PodImage} name={user.name || 'Unknown'} address={user.address} key={idx} />
            ))}
          </div>
          <div className='flex justify-start gap-[30px] pt-[30px] md:pt-10'>
            <div className='text-[22px] font-bold'>Members</div>
            <div className='text-lg font-normal'>{pod ? pod?.members?.length : '0'} members</div>
          </div>

          <div className='grid grid-cols-2 pt-5'>
            {pod?.members?.map((user: User, idx: number) => {
              return <ProfileCard icon={user?.picture ? user.picture : PodImage} name={user.name || 'Unknown'} address={user.address} key={idx} />
            })}
          </div>
        </div>
      </div>
    </CustomModal>
  )
}

export default PodModal
