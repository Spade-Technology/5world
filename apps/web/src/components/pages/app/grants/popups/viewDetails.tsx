import { erc20ABI } from '@wagmi/core'
import { Tooltip } from 'antd'
import Image from 'next/image'
import ETHIcon from 'public/icons/grants/ethIcon.svg'
import LinkIcon from 'public/icons/grants/linkIcon.svg'
import TwitterIcon from 'public/icons/grants/twitterIcon.svg'
import Image1 from 'public/illustrations/grants/stretchedImage1.svg'
import { useState } from 'react'
import { formatUnits } from 'viem'
import { useAccount, useContractReads, useNetwork } from 'wagmi'
import RoundImplementation from '~/abi/RoundImplementation.json'
import CustomModal from '~/components/misc/customModal'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'
import { shortenAddress } from '~/utils/helpers'
import { TeamDetails } from './team'

import Link from 'next/link'

type Props = {
  show: boolean
  close: any
  requestId: number
  grant: any

  addToCart: Function
}
const ViewDetails = ({ show, close, requestId, grant, addToCart }: Props) => {
  const { address } = useAccount()

  const [estimatedAmt, setEstimatedAmt] = useState(0)
  const [votes, setVotes] = useState('')
  const { chain } = useNetwork()

  const { data } = useContractReads({
    contracts: [
      { abi: RoundImplementation as any, address: grant?.address, functionName: 'proposals', args: [requestId] },
      { abi: RoundImplementation as any, address: grant?.address, functionName: 'getTotalQuadraticVotes', args: [] },
      { abi: erc20ABI, address: grant?.token, functionName: 'decimals' },
      { abi: erc20ABI, address: grant?.token, functionName: 'symbol' },
    ],
  })

  const forVotes: bigint = BigInt((data?.[0]?.result?.[4] as any) || 1) ** 2n
  const claimed: boolean = (data?.[0]?.result?.[5] as any) || false
  const quadraticVotes: bigint = (data?.[1]?.result as any) || 1n
  const decimals: bigint = (data?.[2]?.result as any) || 18n
  const symbol: string = (data?.[3]?.result as any) || 'ETH'

  const matchedAmount = (BigInt(grant.amount) * forVotes) / quadraticVotes
  const humanReadable = formatUnits(matchedAmount, Number(decimals))
  const percent = (Number(matchedAmount) / Number(grant.amount)) * 100

  return (
    <CustomModal show={show} close={close} padding='p-0' removeCloseIcon>
      <Image src={grant?.requests[requestId - 1]?.theme || Image1} height={100} width={800} alt='Image1' className='h-96 w-full object-cover' />

      <div className='grid grid-cols-1 gap-[73px] py-[27px] px-[24px] font-body text-lg font-normal text-vdao-dark md:grid-cols-3 md:py-10 md:px-[50px]'>
        <div className='col-span-2'>
          <div className='flex gap-5'>
            <div className=' border-b-[1px] border-b-vdao-dark pb-5 font-heading text-[26px] font-medium md:text-[30px]'>{grant?.requests[requestId - 1]?.name} </div>
            <Link href={chain?.blockExplorers?.default.url + '/address/' + grant?.address} passHref target='_blank'>
              <div className='font-bold text-black opacity-30'>#{requestId - 1}</div>
            </Link>
          </div>

          {grant?.requests && (
            <div className='grid grid-cols-1 gap-5 pt-5 font-medium md:grid-cols-2 md:gap-0 md:pt-10'>
              <div className='flex gap-[10px] '>
                <Image src={LinkIcon} alt='link' />
                <div>{grant?.requests[requestId - 1]?.socials.website}</div>
              </div>
              <div className='flex gap-[10px]'>
                <Image src={ETHIcon} alt='eth' />
                <div>{shortenAddress(grant?.requests[requestId - 1]?.address)}</div>
              </div>
              <div className='flex gap-[10px] md:pt-5'>
                <Image src={TwitterIcon} alt='twitter' />
                <div> {grant?.requests[requestId - 1]?.socials.twitter}</div>
              </div>
            </div>
          )}
          {quadraticVotes > 1n && (
            <>
              <div className='pt-10 text-[22px] font-bold'>{claimed ? 'funding claimed' : 'Estimated funding amount'} </div>
              <div className='pt-[10px] text-[22px] font-medium text-vdao-light md:text-[26px] '>
                {matchedAmount ? humanReadable.toString() : '0.00'} {symbol} ({percent.toFixed(2)}%)
              </div>
            </>
          )}

          <div className='pt-[30px] text-[22px] font-bold md:pt-10'>Delegate your vote</div>

          <div className='flex gap-5 pt-[22px]'>
            <input
              placeholder='60'
              className='max-h-10 w-[82px] rounded-md border-[1px] border-vdao-dark px-2 text-center font-heading text-xl font-medium text-vdao-dark outline-none'
              value={votes}
              onChange={evt => setVotes(evt.target.value)}
            />
            <Tooltip
              color='white'
              title={<div className='text-black'>{grant.state !== 3n ? 'voting is only enabled during the review phase (after the application phase)' : 'Vote now !'}</div>}
              placement='top'
            >
              <div>
                <PrimaryButton text='Add To Cart' disabled={grant.state !== 3n} onClick={() => addToCart(grant?.requests[requestId - 1], votes)} className='font-heading text-xl font-medium' />
              </div>
            </Tooltip>
          </div>

          <div className='pt-[30px] md:pt-[60px]'>{grant?.requests[requestId - 1]?.description}</div>
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

export default ViewDetails
