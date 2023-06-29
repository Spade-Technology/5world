import CustomModal from '~/components/misc/customModal'
import ProfilePic from 'public/icons/blog/createdByLogo.svg'
import Image from 'next/image'
import { useState } from 'react'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'
import { useDelegate, useStewardRead } from '~/hooks/web3/useStewards'
import { useAccount } from 'wagmi'
import { shortenAddress, shortenText } from '~/utils/helpers'
import { Guild, User } from '@prisma/client'
import { monthNames } from '~/utils/date'
import { Null_Address } from '~/utils/config'

type PopupProps = {
  profile: User & { guild?: Guild }
  close: any
}

const ProfilePopup = ({ profile, close }: PopupProps) => {
  const [showActivity, setShowActivity] = useState(false)
  const { delegate } = useDelegate()
  const { address, isConnecting, isDisconnected } = useAccount()

  /** Here !, tell TypeScript that even though something looks like it could be null, it can trust you that it's not */
  const { data } = useStewardRead(address!)

  return (
    <CustomModal show={!!profile} close={close} externalStyle={'md:w-full custom-scrollbar md:mx-10 lg:mx-auto '}>
      {!!profile && (
        <div className='pl-[10px]'>
          <div className='flex flex-col justify-between md:flex-row'>
            <div>
              <div className='flex w-full'>
                <Image src={ProfilePic} alt='' className='h-[64.2px] w-[60px] rounded-full md:h-[128.4px] md:w-[123.41px]' />
                <div className='pl-[10px] md:pl-[30px]'>
                  <div className='font-body text-[26px] font-bold capitalize text-vdao-light md:text-[36px]'>{shortenText(profile?.name ? profile?.name : 'Unnamed')}</div>
                  <div className='flex flex-col font-body text-lg lg:flex-row lg:gap-5'>
                    <div className='font-medium md:text-[22px]'>{profile?.address ? shortenAddress(profile?.address!) : shortenAddress(Null_Address)}</div>
                    <div className='font-bold'>
                      {profile?.JoinedAt ? 'Joined ' + monthNames[profile.JoinedAt.getUTCMonth()] + ' ' + profile.JoinedAt.getDate() + ', ' + profile.JoinedAt.getFullYear() : 'at Unavailable'}
                    </div>
                  </div>
                </div>
              </div>

              {profile.guild && (
                <div className='mt-[30px] w-fit rounded-3xl border-[3px] border-vdao-light px-5 text-lg font-medium md:ml-36 md:mt-[0px] md:py-[7px] md:px-[25px] md:text-xl'>{profile.guild.name}</div>
              )}
            </div>

            <PrimaryButton
              onClick={() => delegate({ delegatee: profile.address })}
              text='Delegate'
              className='float-right mt-[30px] h-fit py-[5px] px-[35px] font-heading text-xl font-medium md:mt-[46px]'
            />
          </div>

          <div className='flex gap-[10px] border-b-[1px] border-b-vdao-dark pb-5 pt-[44px] font-body text-[22px] font-bold'>
            <div className={` ${!showActivity && 'text-vdao-light'} cursor-pointer justify-start`} onClick={() => setShowActivity(false)}>
              Statement
            </div>
            <div className={` ${showActivity && 'text-vdao-light'} cursor-pointer justify-start`} onClick={() => setShowActivity(true)}>
              Activity
            </div>
          </div>

          {showActivity ? <Activity /> : <Statements />}
        </div>
      )}
    </CustomModal>
  )
}

const Statements = () => {
  return (
    <div className='max-w-[771px] pt-5 font-body text-lg font-normal md:pt-[30px]'>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet elementum urna, in volutpat risus. Quisque nec tempus diam, sit amet luctus mi. Quisque auctor tortor ut nunc finibus, et
      venenatis lacus eleifend. Fusce commodo, ipsum sit amet mollis tincidunt, ipsum nibh bibendum arcu, in egestas lectus justo eget massa. Nam quis aliquet erat, in dignissim purus.
      <br />
      <br />
      In viverra orci sit amet ex vestibulum aliquet. Sed luctus aliquet ullamcorper. Praesent non turpis at leo luctus semper. Suspendisse eget dapibus lorem. Vivamus eu arcu et metus congue
      vulputate ut quis mi. Nam quis dolor non orci luctus iaculis quis at nisi.
    </div>
  )
}

const Activity = () => {
  return (
    <div className='flex gap-[72px] p-5 text-sm md:py-[50px]'>
      <div className='flex flex-col justify-start gap-5 font-normal'>
        <div>Donation to VDAO Treasury</div>
        <div>Operational Proposal created</div>
        <div>Operational Proposal created</div>
        <div>Grants Round created</div>
      </div>

      <div className='flex flex-col justify-start  gap-5 font-bold'>
        <div className='float-right'>1.0 ETH</div>
        <div>1 days ago</div>
        <div>5 days ago</div>
        <div>7 days ago</div>
      </div>
    </div>
  )
}

export default ProfilePopup
