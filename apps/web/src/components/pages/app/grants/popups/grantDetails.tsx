import Image from 'next/image'
import ETHIcon from 'public/icons/grants/ethIcon.svg'
import LinkIcon from 'public/icons/grants/linkIcon.svg'
import TwitterIcon from 'public/icons/grants/twitterIcon.svg'
import GitCoinImage from 'public/illustrations/grants/gitCoing.svg'
import Image1 from 'public/illustrations/grants/stretchedImage1.svg'
import { useState } from 'react'
import CustomModal from '~/components/misc/customModal'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'
import WhiteButton from '~/styles/shared/buttons/whiteButton'
import { TeamDetails } from './team'

type Props = {
  show: boolean
  close: any
}
const GrantDetails = ({ show, close }: Props) => {
  const [showActivity, setShowActivity] = useState(false)

  return (
    <CustomModal show={show} close={close} padding='p-0' removeCloseIcon>
      <Image src={Image1} alt='Image1' />

      <div className='grid grid-cols-1 gap-[73px] py-[27px] px-[24px] font-body text-lg font-normal text-vdao-dark md:grid-cols-3 md:py-10 md:px-[50px]'>
        <div className='col-span-2'>
          <div className=' border-b-[1px] border-b-vdao-dark pb-5 font-heading text-[26px] font-medium md:text-[30px]'>
            Grant Title Goes Here
          </div>

          <div className='grid grid-cols-1 gap-5 pt-5 font-medium md:grid-cols-2 md:gap-0 md:pt-10'>
            <div className='flex gap-[10px] '>
              <Image src={LinkIcon} alt='link' />
              <div>http://grantexample.world</div>
            </div>
            <div className='flex gap-[10px]'>
              <Image src={ETHIcon} alt='eth' />
              <div>0xd12512....92C</div>
            </div>
            <div className='flex gap-[10px] md:pt-5'>
              <Image src={TwitterIcon} alt='twitter' />
              <div> @grantexample</div>
            </div>
          </div>

          <div className='pt-10 text-[22px] font-bold'>Estimated funding received</div>
          <div className='pt-[10px] text-[22px] font-medium text-vdao-light md:text-[26px] '>$42,000</div>

          <div className='pt-[30px] text-[22px] font-bold md:pt-10'>Delegate your vote</div>

          <div className='flex gap-5 pt-[22px]'>
            <WhiteButton
              text='60'
              className='border-[1px] border-vdao-dark py-[9px] px-[27px] font-heading text-xl font-medium'
            />

            <PrimaryButton text='Vote' className='py-[9\px] font-heading text-xl font-medium' />
          </div>

          <div className='pt-[30px] md:pt-[60px]'>
            The Governance Facilitator(s) and the Protocol Engineering Core Unit have placed an urgent out-of-schedule
            executive proposal into the voting system. MKR Holders should vote for this proposal if they support the
            following alterations to the Maker Protocol.
            <br />
            <br />
            If you are new to voting in the Maker Protocol, please see the voting guide to learn how voting works, and
            this wallet setup guide to set up your wallet to vote.
            <br />
            <br />
            Executive Summary
            <br />
            If this executive proposal passes, the following changes will occur within the Maker Protocol:
            <br />
            <br />
            Urgent Parameter Changes to MATIC-A, LINK-A, YFI-A, renBTC-A, and MANA-A Vaults, as detailed below.
            <br />
            Voting for this executive proposal will place your MKR in support of the changes and additions outlined
            above.
          </div>

          <Image src={GitCoinImage} alt='GitCoin' className='pt-[30px] md:pt-16' />

          <div className='pt-10'>
            Unless otherwise noted, the changes and additions listed above are subject to the GSM Pause Delay. This
            means that if this executive proposal passes, the changes and additions listed above will only become active
            in the Maker Protocol after the GSM Pause Delay has expired. The GSM Pause Delay is currently set to 48
            hours.
            <br /> <br />
            If this executive proposal does not pass within 30 days, then it will expire and can no longer have any
            effect on the Maker Protocol.
            <br /> <br />
            Urgent Collateral Parameter Proposal Details <br />
            As per this successful urgent signal request, the following parameter changes will take place if this
            out-of-schedule executive proposal passes. To read more on the process for urgent responses, please see
            MIP24: Emergency Response.
          </div>

          <div className='pt-[68px]'>
            {/* <div className="font-bold text-vdao-light underline underline-offset-8">
              {" "}
              Activity{" "}
            </div> */}
            <div className='flex gap-[30px] border-b-[1px] border-b-vdao-dark pb-5 pt-[44px] font-body text-[22px] font-bold'>
              <div
                className={` ${!showActivity && 'text-vdao-light'} cursor-pointer justify-start`}
                onClick={() => setShowActivity(false)}
              >
                Detail
              </div>
              <div
                className={` ${showActivity && 'text-vdao-light'} cursor-pointer justify-start`}
                onClick={() => setShowActivity(true)}
              >
                Activity
              </div>
              <div
                // className={` ${
                //   showActivity && "text-vdao-light"
                // } cursor-pointer justify-start`}
                onClick={() => setShowActivity(true)}
              >
                Team
              </div>
            </div>

            <div className='pt-7'>
              {TeamDetails.map((details, idx) => {
                return (
                  <div className='flex justify-between pt-5'>
                    <div className='flex justify-between' key={idx}>
                      <div className='flex gap-3'>
                        <Image src={details.icon} height={40} width={40} alt='icon' />
                        <div className='my-auto text-sm'>{details.name}</div>
                      </div>
                    </div>

                    <div className='my-auto flex gap-[15px] text-sm'>
                      <div>Contributed</div>
                      <div className='font-bold'>{details.contributed}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div>
          <div className='text-[22px] font-bold'> Team </div>
          <div className='pt-5 pr-[60px]'>
            {TeamDetails.map((details, idx) => {
              return (
                <div className='flex justify-between pt-5' key={idx}>
                  <div className='flex gap-3'>
                    <Image src={details.icon} height={40} width={40} alt='icon' />
                    <div className='my-auto text-sm'>{details.name}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </CustomModal>
  )
}

export default GrantDetails
