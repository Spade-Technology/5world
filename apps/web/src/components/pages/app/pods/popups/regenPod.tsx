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
import { usePodRead, usePodReads } from '~/hooks/web3/usePod'
import { useAccount } from 'wagmi'
import { Pod } from '@prisma/client'
import { Dispatch, SetStateAction, useState } from 'react'
import ManageMembers from './manageMembers'

type RegenPodProps = {
  show: boolean
  close: any
  pid: number
  data: any
  setShowManageMembers: Dispatch<SetStateAction<boolean>>
}

const RegenPod = ({ pid, show, close, data, setShowManageMembers }: RegenPodProps) => {
  const { address } = useAccount()

  // const { data } = usePodRead(0, { admins: true, discussions: true, members: true, proposals: true })
  const podData = data && data?.filter((pod: Pod) => pod.id === pid)[0]!

  console.log('Regen Pod info : ', podData)
  return (
    <CustomModal show={show} close={close} heading='Regen Pod' modalMarginTop='my-[50px]'>
      <div className='grid grid-cols-1 gap-10 py-[30px] font-body text-lg font-normal text-vdao-dark md:grid-cols-2 md:gap-[106px] md:py-10'>
        <div>
          <div className='flex flex-col justify-between gap-5 md:flex-row md:gap-7'>
            <Image
              src={podData?.picture ? podData.picture : PodImage}
              height={120}
              width={120}
              alt='PodImage'
              className='my-auto align-top'
            />

            <div className='text-lg font-normal'>
              {podData
                ? podData.description
                : `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet elementum urna, in volutpat risus.
              Quisque nec tempus diam, sit amet luctus mi. Quisque auctor tortor ut nunc finibus, et venenatis lacus
              eleifend. Fusce commodo, ipsum sit amet mollis tincidunt.`}
            </div>
          </div>
          <div className='pt-[27px] md:pt-0'>
            <PodInfoBox
              invertColors
              proposals={21}
              discussions={data && data?.discussions! ? data.discussions?.length! : '0'}
              members={data ? data.length : 0}
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

          <ProfileCard Icon={Icon1} />

          <div className='flex justify-start gap-[30px] pt-[30px] md:pt-10'>
            <div className='text-[22px] font-bold'>Manager</div>
            <div className='text-lg font-normal'>{data ? data.length : '0'} members</div>
          </div>

          <div className='grid grid-cols-2 pt-5'>
            {data?.map((pod: Pod, idx: number) => {
              return (
                <ProfileCard
                  Icon={('data:image/png;base64,' + pod.picture) as any}
                  Name={pod.name}
                  Address={pod.updatedById ? pod.updatedById : pod.createdById}
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

export default RegenPod
