import CustomModal from '~/components/misc/customModal'
import ProfileCard from '~/components/misc/profileCard'
import PodImage from 'public/illustrations/pods/podImage.svg'
import Icon1 from 'public/icons/pods/icon1.svg'
import Icon2 from 'public/icons/pods/icon2.svg'
import Icon3 from 'public/icons/pods/icon3.svg'
import Icon4 from 'public/icons/pods/icon4.svg'
import Icon5 from 'public/icons/pods/icon5.svg'
import Icon6 from 'public/icons/pods/icon6.svg'
import Icon7 from 'public/icons/pods/icon7.svg'
import Icon8 from 'public/icons/pods/icon8.svg'
import PodInfoBox from './infoBox'
import Image from 'next/image'
import { pod_type, usePodRead, usePodReads } from '~/hooks/web3/usePod'
import { useAccount } from 'wagmi'
import { Pod, User } from '@prisma/client'

type PodModalProps = {
  pod: pod_type | undefined
  close: any
}

const PodModal = ({ pod, close }: PodModalProps) => {
  return (
    <CustomModal show={!!pod} close={close} heading={pod?.name} modalMarginTop='my-[50px]'>
      <div className='grid grid-cols-1 gap-10 py-[30px] font-body text-lg font-normal text-vdao-dark md:grid-cols-2 md:gap-[106px] md:py-10'>
        <div>
          <div className='flex flex-col justify-between gap-5 md:flex-row md:gap-7'>
            <Image
              src={pod?.picture ? pod.picture : PodImage}
              height={120}
              width={120}
              alt='PodImage'
              className='my-auto align-top'
            />

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
              proposals={0}
              discussions={pod && pod.discussions ? pod.discussions.length : 0}
              members={pod?.members}
            />
          </div>
        </div>

        <div className='pr-5'>
          <div className='flex justify-between'>
            <div className='text-[22px] font-bold'>Managers</div>
            <div className='my-auto text-sm font-bold underline'>Manage Memberships</div>
          </div>

          <div>
            {pod?.admins?.map((user: User, idx: number) => (
              <ProfileCard
                icon={('data:image/png;base64,' + user.picture) as any}
                name={user.name || 'Unknown'}
                address={user.address}
                key={idx}
              />
            ))}
          </div>
          <div className='flex justify-start gap-[30px] pt-[30px] md:pt-10'>
            <div className='text-[22px] font-bold'>Members</div>
            <div className='text-lg font-normal'>{pod ? pod?.members?.length : '0'} members</div>
          </div>

          <div className='grid grid-cols-2 pt-5'>
            {pod?.members?.map((user: User, idx: number) => {
              return (
                <ProfileCard
                  icon={('data:image/png;base64,' + user.picture) as any}
                  name={user.name || 'Unknown'}
                  address={user.address}
                  key={idx}
                />
              )
            })}
          </div>
        </div>
      </div>
    </CustomModal>
  )
}

export default PodModal
