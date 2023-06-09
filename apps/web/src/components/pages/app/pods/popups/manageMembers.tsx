import { Dispatch, SetStateAction, useState } from 'react'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'
import ProfileCard from '~/components/misc/profileCard'
import CustomModal from '~/components/misc/customModal'
import { pod_type } from '~/hooks/web3/usePod'
import { useUserReads } from '~/hooks/web3/useUser'
import { Pod } from '@prisma/client'

type ManageMembersProps = {
  show: boolean
  pid: number
  managerAddr: string
  setManagerAddr: Dispatch<SetStateAction<string>>
  memberAddr: string
  setMemberAddr: Dispatch<SetStateAction<string>>
  setShowManageMembers: Dispatch<SetStateAction<boolean>>
  setOpenedPod: Dispatch<SetStateAction<pod_type | undefined>>
  data: any
}

const ManageMembers = ({
  show,
  managerAddr,
  memberAddr,
  setManagerAddr,
  setMemberAddr,
  setShowManageMembers,
  setOpenedPod,
  pid,
  data,
}: ManageMembersProps) => {
  const { data: managerData } = useUserReads({})
  const [removeOn, setRemoveOn] = useState(false)
  console.log('manage data', data)
  return (
    <CustomModal
      show={show}
      close={() => setShowManageMembers(false)}
      heading='Manage Members'
      modalMarginTop='my-[40px]'
    >
      <div className='grid grid-cols-1 gap-11 pt-10 font-body text-lg font-normal text-vdao-dark md:grid-cols-2 md:gap-[106px]'>
        <div>
          <div className='text-[22px] font-bold'>Assign Pod Manager</div>

          <div className='pt-[5px]'>Add manager address below.</div>

          <input
            className='mt-[17px] h-10 w-full max-w-[424px] rounded-[10px] border-[1px] border-vdao-dark px-5 outline-none md:mt-5'
            onChange={evt => setManagerAddr(evt.target.value)}
            value={managerAddr}
          />

          <div className='mt-5 w-fit cursor-pointer rounded-[5px] bg-vdao-pink py-[5px] px-[35px] font-heading text-xl font-medium'>
            Add Manager
          </div>

          <div className='pt-11 text-[22px] font-bold'>Add Pod Members</div>

          <div className='pt-[5px]'>Add member address below.</div>

          <input
            className='mt-5 h-10 w-full max-w-[424px] rounded-[10px] border-[1px] border-vdao-dark px-5 outline-none'
            onChange={evt => setMemberAddr(evt.target.value)}
            value={memberAddr}
          />

          <div className='mt-5 w-fit cursor-pointer rounded-[5px] bg-vdao-pink py-[5px] px-[35px] font-heading text-xl font-medium'>
            Add Member
          </div>
        </div>

        {/* <div className='md:pr-5'>
          <div className='flex justify-between'>
            <div className='text-[22px] font-bold'>Members</div>
          </div>

          <ProfileCard icon={Icon1} />

          <div className='flex justify-start gap-[30px] pt-[30px] md:pt-10'>
            <div className='text-[22px] font-bold'>Manager</div>
            <div className='text-lg font-normal'>7 members</div>
          </div>

          <div className='grid grid-cols-2 pt-5 '>
            <ProfileCard icon={Icon2} name='Lostpoet' />
            <ProfileCard icon={Icon3} name='NinjaSam' />
            <ProfileCard icon={Icon4} name='BearXYZ' />
            <ProfileCard icon={Icon5} name='CyberGod01' />
            <ProfileCard icon={Icon6} name='Lostpoet' />
            <ProfileCard icon={Icon7} name='NinjaSam' />
            <ProfileCard icon={Icon8} name='BearXYZ' />
          </div>

          <div className='float-right flex gap-2 pt-20 pb-[30px] md:gap-5 md:pt-36 '>
            <div
              className='cursor-pointer rounded-[5px] border-[1px] border-vdao-dark py-[5px] px-[35px] font-heading text-lg font-medium'
              onClick={() => {
                setShowManageMembers(false)
                setOpenedPod(pod)
              }}
            >
              Previous
            </div>
            <PrimaryButton
              text='Save'
              className=' py-[5px] px-[35px] font-heading text-lg font-medium'
              onClick={() => {
                setShowManageMembers(false)
                setOpenedPod(pod)
              }}
            />
          </div>
        </div> */}

        <div className='md:pr-5'>
          <div className='flex justify-between'>
            <div className='text-[22px] font-bold'>Manager</div>
          </div>

          <ProfileCard
            icon={data && data[0]?.admins[0]?.picture ? data[0]?.admins[0]?.picture : ''}
            name={data && data[0]?.admins[0]?.name ? data[0]?.admins[0]?.name : ''}
            address={data && data[0]?.admins[0]?.address ? data[0]?.admins[0]?.address : ''}
          />

          <div className='flex justify-start gap-[30px] pt-[30px] md:pt-10'>
            <div className='text-[22px] font-bold'>Members</div>
            <div className='text-lg font-normal'>{data && data[0]?.members ? data[0].members.length : 0}</div>
            {/* {!removeOn && (
              <div className='my-auto text-sm font-bold underline' onClick={() => setRemoveOn(true)}>
                Remove Members
              </div>
            )} */}
          </div>

          <div className='grid grid-cols-2 pt-5 '>
            {managerData &&
              managerData.map((member, idx) => {
                return (
                  <>
                    {/* {removeOn && <input type='radio' className='h-10 w-10'  />} */}
                    <ProfileCard icon={member.picture} name={member.name} address={member.address} edit={true} />
                  </>
                )
              })}
          </div>

          <div className='flex justify-start gap-5 pt-6'>
            <div
              className={`w-fit cursor-pointer rounded-md bg-vdao-pink py-[5px] px-9 font-heading text-xl font-medium text-vdao-dark`}
              onClick={() => setRemoveOn(false)}
            >
              {' '}
              Remove{' '}
            </div>

            <div
              className={`w-fit cursor-pointer rounded-md border-[1px] border-vdao-pink py-[5px] px-9 font-heading text-xl font-medium text-vdao-dark`}
              onClick={() => setRemoveOn(false)}
            >
              {' '}
              Cancel{' '}
            </div>
          </div>

          <div className='float-right flex gap-2 pt-20 pb-[30px] md:gap-5 md:pt-36 '>
            <PrimaryButton
              text='Save'
              className=' py-[5px] px-[35px] font-heading text-lg font-medium'
              onClick={() => {
                console.log('pid', pid)
                const podInfo =
                  data &&
                  data.filter((podInfo: Pod) => {
                    return podInfo.id === pid
                  })
                console.log('pid info', podInfo)
                setOpenedPod(podInfo[0])
                setShowManageMembers(false)
              }}
            />
          </div>
        </div>
      </div>
    </CustomModal>
  )
}

export default ManageMembers
