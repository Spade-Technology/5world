import Image from 'next/image'
import DummyIcon from 'public/icons/pods/icon1.svg'
import { useEffect, useState } from 'react'
import CustomModal from '~/components/misc/customModal'
import ProfileCard from '~/components/misc/profileCard'
import { useProposalAction, useProposalRead } from '~/hooks/web3/useProposal'
import { monthNames } from '~/utils/date'
import { shortenAddress, shortenText } from '~/utils/helpers'

import AbstainIcon from 'public/icons/proposal/abstain.svg'
import DisLikedIcon from 'public/icons/proposal/disLiked.svg'
import LikedIcon from 'public/icons/proposal/liked.svg'
import TenderlyIcon from 'public/icons/proposal/tenderly.svg'
import ViewsIcon from 'public/icons/proposal/viewsIcon.svg'
import PolygonIcon from 'public/icons/stewards/polygon.svg'
import { Address } from 'viem'
import { useAccount, useBlockNumber, useContractRead, useNetwork } from 'wagmi'
import VDAOImplementation from '~/abi/VDAOImplementation.json'
import { Skeleton } from '~/components/ui/skeleton'
import { DropdownPrimaryButton } from '~/styles/shared/buttons/primaryButton'
import { api } from '~/utils/api'

import { getPublicClient } from '@wagmi/core'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Link from 'next/link'
import { currentChainId, currentContracts } from '~/config/contracts'

dayjs.extend(relativeTime)
const formatter = Intl.NumberFormat('en', { notation: 'compact' })

type ViewProposalProps = {
  show: boolean
  close: any
  proposalID: number
}

const ViewProposal = ({ show, close, proposalID }: ViewProposalProps) => {
  const [actions, setActions] = useState(false)
  const { address } = useAccount()
  const { data: proposal, isLoading: isProposalLoading } = useProposalRead(proposalID, { author: true })
  const [dropDownOn, setDropDownOn] = useState(false)
  const [disableVoting, setDisableVoting] = useState(false)

  const [btnStatus, setBtnStatus] = useState('Votes')
  const { voteFor, voteAgainst, voteAbstain, isLoading } = useProposalAction(proposalID)

  const [supporters_raw, setSupporters] = useState<any[]>([])
  const { data: supporters } = api.user.getUsers.useQuery({ addresses: supporters_raw.map(el => el.voter) }, { enabled: !!supporters_raw.length })

  console.log({ supporters_raw })
  const { data: block } = useBlockNumber({ watch: true })

  const { data: proposalState } = useContractRead({
    abi: VDAOImplementation,
    address: currentContracts.proxiedVDao as Address,
    functionName: 'state',
    args: [proposalID],
  })

  enum ProposalState {
    Pending,
    Active,
    Canceled,
    Vetoed,
    Defeated,
    Succeeded,
    Queued,
    Expired,
    Executed,
  }

  const proposalStatus = ProposalState[proposalState as number]

  const { chain } = useNetwork()

  useEffect(() => {
    const isSupporter = supporters_raw.find(supporter => supporter.voter === address)
    if (isSupporter) {
      setDisableVoting(true)
      supporters_raw.map(supporter => {
        if (supporter.support === 1) {
          setBtnStatus('Voted for proposal')
        } else if (supporter.support === 0) {
          setBtnStatus('Voted against proposal')
        } else {
          setBtnStatus('Voted for abstain')
        }
      })
    } else {
      setBtnStatus('Votes')
      setDisableVoting(false)
    }
  }, [isProposalLoading, supporters_raw])

  const votesHandler = (type: string) => {
    if (type === 'for') {
      try {
        voteFor()
        setBtnStatus('Vote for proposal')
        setDropDownOn(false)
      } catch (error) {
        setBtnStatus('Votes')
      }
    } else if (type === 'against') {
      try {
        voteAgainst()
        setBtnStatus('Vote against proposal')
        setDropDownOn(false)
      } catch (error) {
        setBtnStatus('Votes')
      }
    } else if (type === 'abstain') {
      try {
        voteAbstain()
        setBtnStatus('Abstain')
        setDropDownOn(false)
      } catch (error) {
        setBtnStatus('Votes')
      }
    }
  }

  async function updateSupporters() {
    setBtnStatus('Votes...')
    setDisableVoting(true)
    const publicClient = getPublicClient({ chainId: currentChainId })

    const args = {
      proposalId: proposalID,
    } as any

    const filter = await publicClient.createContractEventFilter({
      abi: VDAOImplementation,
      address: currentContracts.proxiedVDao as Address,
      eventName: 'VoteCast',
      args,
      fromBlock: proposal.startBlock,
    })

    const logs = await publicClient.getFilterLogs({ filter }).catch(() => [])

    setSupporters(logs.map(log => (log as any).args))
  }

  useEffect(() => {
    if (proposal) updateSupporters()
  }, [proposal])

  return (
    <CustomModal show={show} close={close} externalStyle={'w-full custom-scrollbar md:mx-10 xl:mx-auto '}>
      {!proposal ? (
        <div className='pb-[30px] font-body text-lg font-normal text-vdao-dark'>
          <Skeleton className=' h-4 w-[200px]' />
          <div className='grid grid-cols-1 gap-[73px] py-[10px] md:py-5 lg:grid-cols-3'>
            <div className='col-span-2'>
              <Skeleton className='h-8 w-[250px] leading-9' />
              <div className='flex gap-10 pt-[10px] md:grid-cols-4 md:pt-10'>
                <Skeleton className='h-11 w-11 rounded-full' />
                <Skeleton className='h-11 w-40' />
                <Skeleton className='h-8 w-24 rounded-3xl' />
              </div>

              <div className='flex justify-between'>
                <div className={` mt-[25px] flex flex-col gap-3 md:mt-11 md:flex-row md:gap-5`}>
                  <div className='flex flex-col gap-4'>
                    <Skeleton className='h-4 w-40' />
                    <Skeleton className='h-8 w-40' />
                  </div>
                  <div className='flex flex-col gap-4'>
                    <Skeleton className='h-4 w-40' />
                    <Skeleton className='h-8 w-40' />
                  </div>
                  <div className='flex flex-col gap-4'>
                    <Skeleton className='h-4 w-40' />
                    <Skeleton className='h-8 w-40' />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=' flex gap-10 border-b-[1px] border-b-vdao-dark pb-2 pt-10 font-body font-bold'>
            <Skeleton className='h-4 w-40' />
            <Skeleton className='h-4 w-40' />
          </div>
          <div className='flex flex-col gap-4 py-10'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-full' />
          </div>
        </div>
      ) : (
        <div className='pb-[30px] font-body text-lg font-normal text-vdao-dark'>
          <div className='font-bold'>
            <div className='flex gap-5'>
              {proposal?.createdAt ? 'Posted ' + monthNames[proposal.createdAt.getUTCMonth()]?.name + ' ' + proposal.createdAt.getDate() + ', ' + proposal.createdAt.getFullYear() : 'at Unavailable'}{' '}
              <Link href={chain?.blockExplorers?.default.url + '/address/' + currentContracts.proxiedVDao + '#writeProxyContract'} passHref target='_blank'>
                <div className='font-bold text-black opacity-30'>#{proposal?.id}</div>
              </Link>
            </div>
            <div>
              {proposal && block
                ? block > proposal?.startBlock
                  ? block < proposal?.endBlock
                    ? 'ends ' + dayjs(dayjs().valueOf() + currentContracts.blockTime * Number(proposal?.endBlock - block) * 1000).fromNow() + ' (' + (proposal?.endBlock - block) + ' blocks left)'
                    : 'ended ' + dayjs(dayjs().valueOf() - currentContracts.blockTime * Number(block - proposal?.endBlock) * 1000).fromNow() + ' (' + (block - proposal?.endBlock) + ' blocks ago)'
                  : 'will start ' +
                    dayjs(dayjs().valueOf() + currentContracts.blockTime * Number(proposal?.startBlock - block) * 1000 + 1).fromNow() +
                    ' (' +
                    (proposal?.startBlock - block) +
                    ' blocks left)'
                : ''}
            </div>
          </div>

          <div className='grid grid-cols-1 gap-[73px] py-[10px] md:py-5 lg:grid-cols-3 lg:gap-10 xl:gap-[100px]'>
            <div className={supporters_raw.length > 0 ? 'col-span-2' : 'col-span-3'}>
              <div className='flex items-center gap-5'>
                <div className='font-heading text-[26px] font-medium leading-9 md:text-[30px]'>{proposal?.title ? shortenText(proposal.title) : 'No title'}</div>
                {proposal.grant && <div className={`h-fit cursor-pointer text-lg font-medium text-vdao-light`}>grant proposal</div>}
              </div>
              <div className='grid grid-cols-2 pt-[10px] md:grid-cols-3 md:pt-5'>
                <ProfileCard icon={proposal ? proposal.picture : DummyIcon} name={proposal ? proposal?.author?.name : 'Unnamed'} address={proposal?.authorId} />
                <div className={`mt-6 h-fit w-fit cursor-pointer rounded-[20px] border-[1px] border-vdao-dark px-7 text-lg  font-medium text-vdao-light lg:ml-5`}>{proposalStatus}</div>
              </div>

              <div className='flex justify-between'>
                <div className={` mt-[25px] flex flex-col gap-3 md:mt-11 md:flex-row md:gap-5`}>
                  <div>
                    <div className=' flex gap-1 font-medium text-vdao-dark md:text-[22px]'>
                      {proposal ? (BigInt(proposal?.forVotes) / 10n ** 18n).toString() : 0}
                      <Image src={ViewsIcon} alt='ViewsIcon' />
                    </div>
                    <div className={` pt-1`}>Votes For</div>
                  </div>

                  <div>
                    <div className='flex gap-1 font-medium text-vdao-dark md:text-[22px]'>
                      {proposal ? (BigInt(proposal?.againstVotes) / 10n ** 18n).toString() : 0}
                      <Image src={ViewsIcon} alt='ViewsIcon' />
                    </div>
                    <div className={`pt-1`}>Votes Against</div>
                  </div>

                  <div>
                    <div className='flex gap-1 font-medium text-vdao-dark md:text-[22px]'>
                      {proposal ? (BigInt(proposal?.abstainVotes) / 10n ** 18n).toString() : 0}
                      <Image src={ViewsIcon} alt='ViewsIcon' />
                    </div>
                    <div className={` pt-1`}>Votes Abstained</div>
                  </div>
                </div>

                <div className={` mt-[25px] md:mt-11 `}>
                  <div className='relative w-[280px]'>
                    <DropdownPrimaryButton
                      text={btnStatus}
                      className='h-fit w-full !px-2.5 text-center'
                      onClick={() => {
                        console.log('proposal kjb')
                        setDropDownOn(!dropDownOn)
                      }}
                      disabled={proposalStatus !== 'Active' || disableVoting}
                      icon={btnStatus === 'Vote for proposal' ? LikedIcon : btnStatus === 'Vote against proposal' ? DisLikedIcon : btnStatus === 'Abstain' ? AbstainIcon : PolygonIcon}
                      dropDown
                      loading={isLoading}
                    />

                    <div
                      className={`float-right mx-auto flex w-full flex-col  justify-end gap-[1px] overflow-hidden rounded-md bg-vdao-light duration-200 ${
                        dropDownOn ? 'visible mt-1 opacity-100' : 'invisible mt-5 opacity-0 '
                      }  absolute top-[100%] left-0 `}
                    >
                      <DropdownPrimaryButton text='Vote for proposal' className='w-full !px-2.5 hover:bg-green-200' onClick={() => votesHandler('for')} icon={LikedIcon} />
                      <DropdownPrimaryButton text='Vote against proposal' className='w-full !px-2.5 hover:bg-green-200' icon={DisLikedIcon} onClick={() => votesHandler('against')} />
                      <DropdownPrimaryButton text='Abstain' className='w-full !px-2.5 hover:bg-green-200' icon={AbstainIcon} onClick={() => votesHandler('abstain')} />
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
              {actions ? <ActionDetails proposal={proposal} /> : <ProposalDetails proposal={proposal} />}
            </div>

            {supporters_raw.length > 0 && (
              <div>
                <div className='text-xl font-bold'>Supporters</div>
                <div className='pt-5 pr-[60px]'>
                  {supporters_raw.map((el, idx) => {
                    el = {
                      ...el,
                      ...supporters?.find(supporter => supporter.address === el.voter),
                    }

                    const supportColor = el.support === 1 ? 'text-green-500' : el.support === 0 ? 'text-red-500' : 'text-gray-500'
                    const supportText = el.support === 1 ? 'is for the proposal' : el.support === 0 ? 'is against the proposal' : 'abstained'

                    return (
                      <div className='flex justify-between pt-5' key={idx}>
                        <div className='flex'>
                          <Image src={el?.picture || DummyIcon} height={40} width={40} alt='icon' />
                        </div>
                        <div className='flex flex-col'>
                          <div className='ml-auto text-sm'>
                            {el?.name || shortenAddress(el?.voter)} <span className={'text-sm ' + supportColor}>{supportText}</span>
                          </div>
                          <div className='my-auto ml-auto text-xs font-bold'>{formatter.format(el.votes)}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
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
          <DropdownPrimaryButton text='' icon={TenderlyIcon} className='my-5' onClick={() => simulateProposal(idx)} />
          <br />
          <div className='font-bold'>
            Calling {spell} Using {proposal?.spellValues[idx].toString()} Wei
          </div>
          <br />
          <div className=' font-bold'>and Calldata:</div>
          <div className='break-all'>{proposal?.spellCalldatas[idx]}</div>
          <br />
          <br />
        </div>
      ))}
    </div>
  )
}

export default ViewProposal
