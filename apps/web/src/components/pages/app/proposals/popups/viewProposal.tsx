import { useEffect, useState } from 'react'
import CustomModal from '~/components/misc/customModal'
import ProfileCard from '~/components/misc/profileCard'
import Image from 'next/image'
import { SupporterDetails } from './details'
import { useProposalRead } from '~/hooks/web3/useProposal'
import { monthNames } from '~/utils/date'
import DummyIcon from 'public/icons/pods/icon1.svg'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'
import ViewsIcon from 'public/icons/proposal/viewsIcon.svg'
import LikedIcon from 'public/icons/proposal/liked.svg'
import DisLikedIcon from 'public/icons/proposal/disLiked.svg'
import AbstainIcon from 'public/icons/proposal/abstain.svg'
import PolygonIcon from 'public/icons/stewards/polygon.svg'
import TenderlyIcon from 'public/icons/proposal/tenderly.svg'
import { api } from '~/utils/api'
import { useRouter } from 'next/router'

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

  console.log(proposal)

  return (
    <CustomModal show={show} close={close}>
      <div className='pb-[30px] font-body text-lg font-normal text-vdao-dark'>
        <div className='font-bold'>
          {proposal?.createdAt ? 'Posted ' + monthNames[proposal.createdAt.getUTCMonth()] + ' ' + proposal.createdAt.getDate() + ', ' + proposal.createdAt.getFullYear() : 'at Unavailable'}
        </div>

        <div className='grid grid-cols-1 gap-[73px] py-[10px] md:grid-cols-3 md:py-5'>
          <div className='col-span-2'>
            <div className='font-heading text-[26px] font-medium md:text-[30px]'>{proposal ? proposal.title : 'No title'}</div>
            <div className='grid grid-cols-2 pt-[10px] md:grid-cols-4 md:pt-5'>
              <ProfileCard icon={proposal ? proposal.picture : DummyIcon} name={proposal ? proposal.name : 'Unnamed'} address={proposal?.authorId} />
              <div className={`mt-6 h-fit w-fit cursor-pointer rounded-[20px] border-[1px] border-vdao-dark px-7  text-lg font-medium text-vdao-light`}>Active</div>
            </div>

            <div className='flex justify-between'>
              <div className={` mt-[25px] flex flex-col gap-3 md:mt-11 md:flex-row md:gap-5`}>
                <div>
                  <div className=' flex gap-1 font-medium text-vdao-dark md:text-[22px]'>
                    {proposal?.forVotes.toString()}
                    <Image src={ViewsIcon} alt='ViewsIcon' />
                  </div>
                  <div className={` pt-1`}>Votes For</div>
                </div>

                <div>
                  <div className='flex gap-1 font-medium text-vdao-dark md:text-[22px]'>
                    {proposal?.againstVotes.toString()}
                    <Image src={ViewsIcon} alt='ViewsIcon' />
                  </div>
                  <div className={`pt-1`}>Votes Against</div>
                </div>

                <div>
                  <div className='flex gap-1 font-medium text-vdao-dark md:text-[22px]'>
                    {proposal?.abstainVotes.toString()}
                    <Image src={ViewsIcon} alt='ViewsIcon' />
                  </div>
                  <div className={` pt-1`}>Votes Abstained</div>
                </div>
              </div>
              <div className={` mt-[25px] md:mt-11 `}>
                <div className='relative'>
                  <PrimaryButton
                    text={btnStatus}
                    className='h-fit w-full text-center'
                    onClick={() => setDropDownOn(!dropDownOn)}
                    icon={btnStatus === 'Vote for proposal' ? LikedIcon : btnStatus === 'Vote against proposal' ? DisLikedIcon : btnStatus === 'Abstain' ? AbstainIcon : PolygonIcon}
                    dropDown
                  />
                  {dropDownOn && (
                    <div className='float-right mx-auto mt-1 flex  max-w-[1130px] flex-col justify-end gap-[1px]'>
                      <PrimaryButton
                        text='Vote for proposal'
                        className='w-full hover:bg-green-200'
                        onClick={() => {
                          setBtnStatus('Vote for proposal')
                          setDropDownOn(false)
                        }}
                        icon={LikedIcon}
                      />
                      <PrimaryButton
                        text='Vote against proposal'
                        className='w-full hover:bg-green-200'
                        icon={DisLikedIcon}
                        onClick={() => {
                          setBtnStatus('Vote against proposal')
                          setDropDownOn(false)
                        }}
                      />
                      <PrimaryButton
                        text='Abstain'
                        className='w-full hover:bg-green-200'
                        icon={AbstainIcon}
                        onClick={() => {
                          setBtnStatus('Abstain')
                          setDropDownOn(false)
                        }}
                      />
                    </div>
                  )}
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

            {actions ? <ActionDetails proposal={proposal} /> : <ProposalDetails proposal={proposal} />}
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

const ProposalDetails = ({ proposal }: { proposal: any }) => {
  return <div className='pt-11 font-body text-lg text-black'>{proposal?.description}</div>
}

const ActionDetails = ({ proposal }: { proposal: any }) => {
  const { mutate, data } = api.tenderly.simulateProposal.useMutation()

  const simulateProposal = async (spellId: number) => {
    const res = await mutate({ id: proposal?.id, spell: spellId })
    console.log(res)
  }

  useEffect(() => {
    data && window.open(data, '_blank')
  }, [data])

  return (
    <div className='pt-2 font-body text-lg text-black'>
      {proposal?.spells.map((spell: any, idx: number) => (
        <div className='!text-black'>
          <div>Action {idx + 1}:</div>
          <PrimaryButton text='' icon={TenderlyIcon} className='my-5' onClick={() => simulateProposal(idx)} />
          <br />
          <div className='font-bold'>
            Calling {spell} Using {proposal?.spellValues[idx].toString()} Wei
          </div>
          <br />
          <div className='font-bold'>and Calldata:</div>
          <div>{proposal?.spellCalldatas[idx]}</div>
          <br />
          <br />
        </div>
      ))}
    </div>
  )
}

export default ViewProposal
