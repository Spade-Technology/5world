import Image from 'next/image'
import ProfileCard from '~/components/misc/profileCard'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'
import WhiteButton from '~/styles/shared/buttons/whiteButton'
import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import grantImage from 'public/illustrations/grants/image5.svg'
import { useRouter } from 'next/router'
import Pagination from '~/components/misc/pageNation'

import { GrantDetails } from './cardDetails'
import { api } from '~/utils/api'
import { useBlockNumber, useToken } from 'wagmi'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { currentChainId, currentContracts } from '~/config/contracts'
import { formatUnits } from 'viem'

dayjs.extend(relativeTime)

type CardProps = {
  details: any
  setViewDetails: Dispatch<SetStateAction<boolean>>
}

type Props = {
  setViewDetails: Dispatch<SetStateAction<boolean>>
}

type GrantProps = {
  grant: any
}

const GrantSearch = ({ setViewDetails }: Props) => {
  const { data: grants } = api.grant.getGrants.useQuery()

  return (
    <div className='mx-auto w-screen max-w-[1140px] bg-vdao-deep'>
      <div className='mx-auto max-w-[1280px] pb-[120px] font-body'>
        {grants && grants.map((grant: any, idx: number) => <CurrentRound grant={grant} key={idx} />)}
        {/* <Pagination web3 pageNumbers={pageNumbers} pageCount={pageCount} setPageCount={setPageCount} /> */}
      </div>
    </div>
  )
}

export const CurrentRound = ({ grant }: GrantProps) => {
  const router = useRouter()
  const { data: currentBlock } = useBlockNumber()

  const { data: token } = useToken({ address: grant.token, chainId: currentChainId, enabled: grant.token !== '0x0000000000000000000000000000000000000000' })

  const statusHumanReadable = ['Pending', 'Application Active', 'Application Review', 'Active', 'Completed', 'Funds Allocated', 'Canceled', 'Defeated', 'Succeeded', 'Queued', 'Expired', 'Executed'][
    grant.state
  ]

  const timeUntilHumanReadable = () => {
    if (!currentBlock || !grant) return ''
    const relativeBlock =
      grant.applicationsStartBlock > currentBlock
        ? grant.applicationsStartBlock
        : grant.applicationsEndBlock > currentBlock
        ? grant.applicationsEndBlock
        : grant.roundStartBlock > currentBlock
        ? grant.roundStartBlock
        : grant.roundEndBlock > currentBlock
        ? grant.roundEndBlock
        : grant.roundEndBlock

    const time = dayjs(dayjs().valueOf() + currentContracts.blockTime * Number(relativeBlock - currentBlock) * 1000).fromNow()

    const contextString =
      grant.applicationsStartBlock > currentBlock
        ? 'Applications Starts'
        : grant.applicationsEndBlock > currentBlock
        ? 'Applications Ends'
        : grant.roundStartBlock > currentBlock
        ? 'Round Starts'
        : grant.roundEndBlock > currentBlock
        ? 'Round Ends'
        : 'Round Endded'

    return (
      <div className='font-small font-heading text-[14px] text-vdao-light'>
        {contextString} {time} ({grant.roundEndBlock > currentBlock ? Number(relativeBlock - currentBlock) : Number(currentBlock - relativeBlock)} blocks
        {grant.roundEndBlock > currentBlock ? ' ago' : ''})
      </div>
    )
  }

  return (
    <div className='mb-10 flex w-full flex-col-reverse md:flex-row rounded-[40px] bg-vdao-dark '>
      <div className='my-10 w-full rounded-[40px] bg-vdao-dark pl-10 pr-5 text-white'>
        <div className='flex gap-3 flex-col md:flex-row font-heading text-3xl font-medium'>
          {grant.title}
          <div className='my-auto rounded-[20px] w-fit border-[1px] border-vdao-light px-9 py-1 font-body text-lg text-vdao-light'> {statusHumanReadable}</div>
          {timeUntilHumanReadable()}
        </div>

        <div className='flex justify-between '>
          <div className='mt-5'>
            <div className='font-heading text-[26px] font-medium text-vdao-light'>Rules</div>
            <div className='mt-5 text-lg font-normal '>{grant?.rules}</div>
            <div className='flex flex-col md:flex-row gap-10'>
              <div className='mt-5 cursor-pointer text-lg font-bold underline underline-offset-2' onClick={() => router.push(`/app/grants/${grant.id}`)}>
                View Grant Details
              </div>
              <div className='mt-5 flex gap-1 text-lg'>
                Matching Amount: {grant?.amount ? formatUnits(grant?.amount, token?.decimals || 18) : '0.00'} {token?.symbol || 'ETH'}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Image src={grant.theme || grantImage} alt='grantImage' width={300} height={300} className='mr-10 p-4 w-full md:w-80' />
    </div>
  )
}

export default GrantSearch
