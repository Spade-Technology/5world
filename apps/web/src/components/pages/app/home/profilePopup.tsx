import CustomModal from '~/components/misc/customModal'
import ProfilePic from 'public/icons/blog/createdByLogo.svg'
import Image from 'next/image'
import { useState } from 'react'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'
import { useAccount } from 'wagmi'
import { useUserRead } from '~/hooks/web3/useUser'
import { shortenAddress } from '~/utils/helpers'

type PopupProps = {
  show: boolean
  close: any
}

type StatementProps = {
  description: string
}

const ProfilePopup = ({ show, close }: PopupProps) => {
  const [showActivity, setShowActivity] = useState(false)
  const { address, isConnecting, isDisconnected } = useAccount()

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  /** Here !, tell TypeScript that even though something looks like it could be null, it can trust you that it's not */
  const { data } = useUserRead({
    address: address!,
    include: {
      guild: true,
    },
  })

  console.log('userData', data)
  return (
    <CustomModal show={show} close={close}>
      <div className='pl-[10px]'>
        <div className='flex flex-col justify-between md:flex-row'>
          <div>
            <div className='flex w-full'>
              <Image
                src={data?.picture ? data?.picture : ProfilePic}
                alt=''
                className='h-[64.2px] w-[60px] rounded-full md:h-[128.4px] md:w-[123.41px]'
              />

              <div className='pl-[10px] md:pl-[15px]'>
                <div className='font-body text-[26px] font-semibold text-vdao-light md:text-[36px]'>
                  {' '}
                  {data?.name!
                    ? data?.name?.length > 15
                      ? data.name?.slice(0, 15) + '...'
                      : data.name
                    : 'Kris Miller'}{' '}
                </div>
                <div className='flex flex-col font-body text-lg md:flex-row md:gap-5'>
                  <div className='font-medium md:text-[22px]'>
                    {data?.address ? shortenAddress(data?.address!) : '0xd12512....92C'}{' '}
                  </div>
                  <div className='font-bold'>
                    {' '}
                    {data?.JoinedAt
                      ? 'Joined ' +
                        monthNames[data.JoinedAt.getUTCMonth()] +
                        ' ' +
                        data.JoinedAt.getDate() +
                        ', ' +
                        data.JoinedAt.getFullYear()
                      : 'May 05, 2023'}
                  </div>
                </div>
              </div>
            </div>

            {/* {data?.guild && ( */}
            <div className='mt-[30px] w-fit rounded-3xl border-[3px] border-vdao-light px-5 text-lg font-medium md:ml-36 md:mt-[0px] md:py-[7px] md:px-[25px] md:text-xl'>
              {data?.guild?.name ? data?.guild?.name : 'No DAO Operation Guild'}
            </div>
            {/* )} */}
          </div>

          {data?.stewardApplicationBlock && (
            <PrimaryButton
              text='Delegate'
              className='float-right mt-[30px] h-fit py-[5px] px-[35px] font-heading text-xl font-medium md:mt-[46px]'
            />
          )}
        </div>

        <div className='flex gap-[10px] border-b-[1px] border-b-vdao-dark pb-5 pt-[44px] font-body text-[22px] font-bold'>
          <div
            className={` ${!showActivity && 'text-vdao-light'} cursor-pointer justify-start`}
            onClick={() => setShowActivity(false)}
          >
            Statement
          </div>
          <div
            className={` ${showActivity && 'text-vdao-light'} cursor-pointer justify-start`}
            onClick={() => setShowActivity(true)}
          >
            Activity
          </div>
        </div>

        {showActivity ? <Activity /> : <Statements description={data?.description ? data.description : ''} />}
      </div>
    </CustomModal>
  )
}

const Statements = ({ description }: StatementProps) => {
  return (
    <div className='max-w-[771px] pt-5 font-body text-lg font-normal md:pt-[30px]'>
      {description ? (
        description
      ) : (
        <div>
          {' '}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet elementum urna, in volutpat risus.
          Quisque nec tempus diam, sit amet luctus mi. Quisque auctor tortor ut nunc finibus, et venenatis lacus
          eleifend. Fusce commodo, ipsum sit amet mollis tincidunt, ipsum nibh bibendum arcu, in egestas lectus justo
          eget massa. Nam quis aliquet erat, in dignissim purus.
          <br />
          <br />
          In viverra orci sit amet ex vestibulum aliquet. Sed luctus aliquet ullamcorper. Praesent non turpis at leo
          luctus semper. Suspendisse eget dapibus lorem. Vivamus eu arcu et metus congue vulputate ut quis mi. Nam quis
          dolor non orci luctus iaculis quis at nisi.
        </div>
      )}
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
