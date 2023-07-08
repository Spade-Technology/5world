import { useState } from 'react'
import CustomModal from '~/components/misc/customModal'
import ProfileCard from '~/components/misc/profileCard'
import Image from 'next/image'
import { SupporterDetails } from './details'
import { useProposalRead } from '~/hooks/web3/useProposal'
import { monthNames } from '~/utils/date'
import DummyIcon from 'public/icons/pods/icon1.svg'
import { DropdownPrimaryButton } from '~/styles/shared/buttons/PrimaryButton'
import ViewsIcon from 'public/icons/proposal/viewsIcon.svg'
import LikedIcon from 'public/icons/proposal/liked.svg'
import DisLikedIcon from 'public/icons/proposal/disLiked.svg'
import AbstainIcon from 'public/icons/proposal/abstain.svg'
import PolygonIcon from 'public/icons/stewards/polygon.svg'
import TenderlyIcon from 'public/icons/proposal/tenderly.svg'

type ViewProposalProps = {
  show: boolean
  close: any
  proposalID: number
}

const ViewProposal = ({ show, close, proposalID }: ViewProposalProps) => {
  const [actions, setActions] = useState(false)
  const { data: proposal } = useProposalRead(proposalID)
  const [dropDownOn, setDropDownOn] = useState(false)
  const [btnStatus, setBtnStatus] = useState('Votes')

  return (
    <CustomModal show={show} close={close} externalStyle={'w-full custom-scrollbar md:mx-20 lg:mx-10 xl:mx-auto '}>
      <div className='pb-[30px] font-body text-lg font-normal text-vdao-dark'>
        <div className='font-bold'>
          {proposal?.createdAt ? 'Posted ' + monthNames[proposal.createdAt.getUTCMonth()] + ' ' + proposal.createdAt.getDate() + ', ' + proposal.createdAt.getFullYear() : 'at Unavailable'}
        </div>

        <div className='grid grid-cols-1 gap-[73px] py-[10px] md:py-5 lg:grid-cols-3'>
          <div className='col-span-2'>
            <div className='font-heading text-[26px] font-medium leading-9 md:text-[30px]'>{proposal ? proposal.title : 'No title'}</div>
            <div className='grid grid-cols-2 pt-[10px] md:grid-cols-4 md:pt-5'>
              <ProfileCard icon={proposal ? proposal.picture : DummyIcon} name={proposal ? proposal.name : 'Unnamed'} address={proposal?.authorId} />
              <div className={`mt-6 h-fit w-fit cursor-pointer rounded-[20px] border-[1px] border-vdao-dark px-7 text-lg  font-medium text-vdao-light lg:ml-5`}>Active</div>
            </div>

            <div className='flex justify-between'>
              <div className={` mt-[25px] flex flex-col gap-3 md:mt-11 md:flex-row md:gap-5`}>
                <div>
                  <div className=' flex gap-1 font-medium text-vdao-dark md:text-[22px]'>
                    12M
                    <Image src={ViewsIcon} alt='ViewsIcon' />
                  </div>
                  <div className={` pt-1`}>Votes For</div>
                </div>

                <div>
                  <div className='flex gap-1 font-medium text-vdao-dark md:text-[22px]'>
                    8M
                    <Image src={ViewsIcon} alt='ViewsIcon' />
                  </div>
                  <div className={`pt-1`}>Votes Against</div>
                </div>

                <div>
                  <div className='flex gap-1 font-medium text-vdao-dark md:text-[22px]'>
                    2M
                    <Image src={ViewsIcon} alt='ViewsIcon' />
                  </div>
                  <div className={` pt-1`}>Votes Abstained</div>
                </div>
              </div>
              <div className={` mt-[25px] md:mt-11 `}>
                <div className='relative'>
                  <DropdownPrimaryButton
                    text={btnStatus}
                    className='h-fit w-full text-center'
                    onClick={() => setDropDownOn(!dropDownOn)}
                    icon={btnStatus === 'Vote for proposal' ? LikedIcon : btnStatus === 'Vote against proposal' ? DisLikedIcon : btnStatus === 'Abstain' ? AbstainIcon : PolygonIcon}
                    dropDown
                  />
                  {/* {dropDownOn && (
                  )} */}
                  <div style={{transition: '0.2s ease-in', height: dropDownOn ? '120px' : '0px'}} className={`float-right overflow-hidden mx-auto mt-1 flex  max-w-[1130px] flex-col justify-end gap-[1px]`}>
                    <DropdownPrimaryButton
                      text='Vote for proposal'
                      className='w-full hover:bg-green-200'
                      onClick={() => {
                        setBtnStatus('Vote for proposal')
                        setDropDownOn(false)
                      }}
                      icon={LikedIcon}
                    />
                    <DropdownPrimaryButton
                      text='Vote against proposal'
                      className='w-full hover:bg-green-200'
                      icon={DisLikedIcon}
                      onClick={() => {
                        setBtnStatus('Vote against proposal')
                        setDropDownOn(false)
                      }}
                    />
                    <DropdownPrimaryButton
                      text='Abstain'
                      className='w-full hover:bg-green-200'
                      icon={AbstainIcon}
                      onClick={() => {
                        setBtnStatus('Abstain')
                        setDropDownOn(false)
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className=' flex gap-10 border-b-[1px] border-b-vdao-dark pb-2 pt-10 font-body font-bold'>
              <div className={` ${!actions && 'text-vdao-light'} cursor-pointer justify-start`} onClick={() => setActions(false)}>
                Proposal Detail
              </div>
              <div className={` ${actions && 'text-vdao-light'} cursor-pointer justify-start`} onClick={() => setActions(true)}>
                Actions
              </div>
            </div>

            {actions ? <ActionDetails /> : <ProposalDetails />}
          </div>

          <div>
            <div className='text-xl font-bold'>Supporters</div>
            <div className='pt-5 pr-[60px]'>
              {SupporterDetails.map((details, idx) => {
                return (
                  <div className='flex justify-between pt-5' key={idx}>
                    <div className='flex gap-3'>
                      <Image src={details.icon} height={40} width={40} alt='icon' />
                      <div className='my-auto text-sm'>{details.name}</div>
                    </div>
                    <div className='my-auto text-sm font-bold'>{details.percentage}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </CustomModal>
  )
}

const ProposalDetails = () => {
  return (
    <div className='pt-11 font-body text-lg font-normal leading-[22px] text-black'>
      The Governance Facilitator(s) and the Protocol Engineering Core Unit have placed an urgent out-of-schedule executive proposal into the voting system. MKR Holders should vote for this proposal if
      they support the following alterations to the Maker Protocol.
      <br />
      <br />
      If you are new to voting in the Maker Protocol, please see the voting guide to learn how voting works, and this wallet setup guide to set up your wallet to vote.
      <br />
      <br />
      Executive Summary
      <br />
      If this executive proposal passes, the following changes will occur within the Maker Protocol:
      <br />
      <br />
      Urgent Parameter Changes to MATIC-A, LINK-A, YFI-A, renBTC-A, and MANA-A Vaults, as detailed below.
      <br />
      Voting for this executive proposal will place your MKR in support of the changes and additions outlined above.
      <br />
      <br />
      Unless otherwise noted, the changes and additions listed above are subject to the GSM Pause Delay. This means that if this executive proposal passes, the changes and additions listed above will
      only become active in the Maker Protocol after the GSM Pause Delay has expired. The GSM Pause Delay is currently set to 48 hours.
      <br />
      <br />
      If this executive proposal does not pass within 30 days, then it will expire and can no longer have any effect on the Maker Protocol.
      <br />
      <br />
      Urgent Collateral Parameter Proposal Details
      <br />
      As per this successful urgent signal request, the following parameter changes will take place if this out-of-schedule executive proposal passes. To read more on the process for urgent responses,
      please see MIP24: Emergency Response.
      <br />
      <br />
      MATIC-A Changes
      <br />
      Reduce the MATIC-A Maximum Debt Ceiling (line) by 10 million DAI from 20 million DAI to 10 million DAI.
      <br />
      <br />
      LINK-A Changes
      <br />
      Reduce the LINK-A Maximum Debt Ceiling (line) by 20 million DAI from 25 million DAI to 5 million DAI.
      <br />
      <br />
      YFI-A Changes
      <br />
      Reduce the YFI-A Maximum Debt Ceiling (line) by 7 million DAI from 10 million DAI to 3 million DAI.
      <br />
      <br />
      renBTC-A Changes
      <br />
      Reduce the renBTC-A Maximum Debt Ceiling (line) by 10 million DAI from 10 million DAI to 0.
      <br />
      <br />
      MANA-A Changes
      <br />
      Reduce the MANA-A Maximum Debt Ceiling (line) by 7 million DAI from 10 million DAI to 3 million DAI.
      <br />
      Increase the MANA-A Stability Fee by 42.5% from 7.5% to 50%.
      <br />
      Increase the MANA-A Liquidation Penalty (chop) by 17% from 13% to 30%.
      <br />
      <br />
      Review
      <br />
      Community debate on these topics can be found on the MakerDAO Governance forum. Please review any linked threads to inform your position before voting.
      <br />
      <br />
      Additionally, these changes may have been discussed further in recent Governance calls. Video for these calls is available to review.
      <br />
      <br />
      Resources
      <br />
      Additional information about the Governance process can be found in the Governance section of the MakerDAO community portal.
      <br />
      <br />
      To participate in future Governance calls, please join us every Thursday at 17:00 UTC.
      <br />
      <br />
      To add current and upcoming votes to your calendar, please see the MakerDAO Public Events Calendar.
    </div>
  )
}

const ActionDetails = () => {
  return (
    <div className='pt-2 font-body text-lg text-black'>
      <DropdownPrimaryButton text='' icon={TenderlyIcon} className='my-5' />
      Action 0:
      <br />
      Calling Approve on 0x1234.....7890 using parameters:
      <br />
      <br />
      Spender: 0x00000000000000000000000
      <br />
      Amount: 1234567890
      <br />
      Calldata:
      <br />
      0x0000000000000000000000000000000000000000 000000000000000000000000000000000000000000 000000000000000000000000000000000000000000 0000000000000000000000000000000000000
      <br />
      <br />
      Action 2:
      <br />
      Calling Approve on 0x1234.....7890 using parameters:
      <br />
      <br />
      Spender: 0x00000000000000000000000
      <br />
      Amount: 1234567890
      <br />
      Calldata:
      <br />
      0x0000000000000000000000000000000000000000 000000000000000000000000000000000000000000 000000000000000000000000000000000000000000 0000000000000000000000000000000000000
      <br />
      <br />
      Action 3:
      <br />
      Calling Approve on 0x1234.....7890 using parameters:
      <br />
      <br />
      Spender: 0x00000000000000000000000
      <br />
      Amount: 1234567890
      <br />
      Calldata:
      <br />
      0x0000000000000000000000000000000000000000 000000000000000000000000000000000000000000 000000000000000000000000000000000000000000 0000000000000000000000000000000000000
      <br />
      <br />
      Action 4:
      <br />
      Calling Approve on 0x1234.....7890 using parameters:
      <br />
      <br />
      Spender: 0x00000000000000000000000
      <br />
      Amount: 1234567890
      <br />
      Calldata:
      <br />
      0x0000000000000000000000000000000000000000 000000000000000000000000000000000000000000 000000000000000000000000000000000000000000 0000000000000000000000000000000000000
    </div>
  )
}

export default ViewProposal
