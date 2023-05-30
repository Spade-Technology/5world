import { Dispatch, SetStateAction } from 'react'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'
import Icon1 from 'public/icons/pods/icon1.svg'
import Icon2 from 'public/icons/pods/icon2.svg'
import Icon3 from 'public/icons/pods/icon3.svg'
import Icon4 from 'public/icons/pods/icon4.svg'
import Icon5 from 'public/icons/pods/icon5.svg'
import Icon6 from 'public/icons/pods/icon6.svg'
import Icon7 from 'public/icons/pods/icon7.svg'
import Icon8 from 'public/icons/pods/icon8.svg'
import ProfileCard from '~/components/misc/profileCard'
import CustomModal from '~/components/misc/customModal'

type ManageMembersProps = {
  show: boolean
  managerAddr: string
  setManagerAddr: Dispatch<SetStateAction<string>>
  memberAddr: string
  setMemberAddr: Dispatch<SetStateAction<string>>
  setShowManageMembers: Dispatch<SetStateAction<boolean>>
  setOpenRegen: Dispatch<SetStateAction<boolean>>
}

const ManageMembers = ({
  show,
  managerAddr,
  memberAddr,
  setManagerAddr,
  setMemberAddr,
  setShowManageMembers,
  setOpenRegen,
}: ManageMembersProps) => {
  return (
    <CustomModal
      show={show}
      close={() => setShowManageMembers(false)}
      heading='Create New Pod'
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

        <div className='md:pr-5'>
          <div className='flex justify-between'>
            <div className='text-[22px] font-bold'>Members</div>
            {/* <div className='my-auto text-sm font-bold underline'>Manage Memberships</div> */}
          </div>

          <ProfileCard Icon={Icon1} />

          <div className='flex justify-start gap-[30px] pt-[30px] md:pt-10'>
            <div className='text-[22px] font-bold'>Manager</div>
            <div className='text-lg font-normal'>7 members</div>
          </div>

          <div className='grid grid-cols-2 pt-5 '>
            <ProfileCard Icon={Icon2} Name='Lostpoet' />
            <ProfileCard Icon={Icon3} Name='NinjaSam' />
            <ProfileCard Icon={Icon4} Name='BearXYZ' />
            <ProfileCard Icon={Icon5} Name='CyberGod01' />
            <ProfileCard Icon={Icon6} Name='Lostpoet' />
            <ProfileCard Icon={Icon7} Name='NinjaSam' />
            <ProfileCard Icon={Icon8} Name='BearXYZ' />
          </div>

          <div className='float-right flex gap-2 pt-20 pb-[30px] md:gap-5 md:pt-36 '>
            <div
              className='cursor-pointer rounded-[5px] border-[1px] border-vdao-dark py-[5px] px-[35px] font-heading text-lg font-medium'
              onClick={() => {
                setShowManageMembers(false)
                setOpenRegen(true)
              }}
            >
              Previous
            </div>
            <PrimaryButton
              text='Confirm'
              className=' py-[5px] px-[35px] font-heading text-lg font-medium'
              onClick={() => {
                setShowManageMembers(false)
                setOpenRegen(true)
              }}
            />
          </div>
        </div>
      </div>
    </CustomModal>
  )
}

export default ManageMembers
