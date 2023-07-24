import Image from 'next/image'
import { useRouter } from 'next/router'
import ETHIcon from 'public/icons/grants/ethIcon.svg'
import LinkIcon from 'public/icons/grants/linkIcon.svg'
import TwitterIcon from 'public/icons/grants/twitterIcon.svg'
import GitCoinImage from 'public/illustrations/grants/gitCoing.svg'
import Image1 from 'public/illustrations/grants/stretchedImage1.svg'
import RoundImplementation from '~/abi/RoundImplementation.json'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import CustomModal from '~/components/misc/customModal'
import { useVote } from '~/hooks/web3/useStewards'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'
import { TeamDetails } from './team'
import { shortenAddress } from '~/utils/helpers'
import { writeContract } from '@wagmi/core'
import { encodePacked } from 'viem'

type Props = {
  show: boolean
  close: any
  requestId: number
  grant: any
}
const ViewDetails = ({ show, close, requestId, grant }: Props) => {
  const [showActivity, setShowActivity] = useState(false)
  // const estimatedAmount = (quadrativVotes/total Votes) * matching amount
  const [votes, setVotes] = useState('')

  const { address } = useAccount()

  const [estimatedAmt, setEstimatedAmt] = useState(0)

  const votesHandler = async () => {
    if (votes && address) {
      await writeContract({
        abi: RoundImplementation,
        address: grant?.address,
        functionName: 'vote',
        args: [[encodePacked(['uint256', 'uint256'], [BigInt(requestId), BigInt(votes)])]],
      })
    }
  }

  return (
    <CustomModal show={show} close={close} padding='p-0' removeCloseIcon>
      <Image src={grant?.requests[requestId]?.theme || Image1} height={100} width={800} alt='Image1' className='h-96 w-full object-cover' />

      <div className='grid grid-cols-1 gap-[73px] py-[27px] px-[24px] font-body text-lg font-normal text-vdao-dark md:grid-cols-3 md:py-10 md:px-[50px]'>
        <div className='col-span-2'>
          <div className='flex gap-5'>
            <div className=' border-b-[1px] border-b-vdao-dark pb-5 font-heading text-[26px] font-medium md:text-[30px]'>{grant?.requests[requestId]?.name} </div>
            <div className='font-bold text-black opacity-30'>#{requestId}</div>
          </div>

          {grant?.requests && (
            <div className='grid grid-cols-1 gap-5 pt-5 font-medium md:grid-cols-2 md:gap-0 md:pt-10'>
              <div className='flex gap-[10px] '>
                <Image src={LinkIcon} alt='link' />
                <div>{grant?.requests[requestId]?.socials.website}</div>
              </div>
              <div className='flex gap-[10px]'>
                <Image src={ETHIcon} alt='eth' />
                <div>{shortenAddress(grant?.requests[requestId]?.address)}</div>
              </div>
              <div className='flex gap-[10px] md:pt-5'>
                <Image src={TwitterIcon} alt='twitter' />
                <div> {grant?.requests[requestId]?.socials.twitter}</div>
              </div>
            </div>
          )}

          <div className='pt-10 text-[22px] font-bold'>Estimated funding received</div>
          <div className='pt-[10px] text-[22px] font-medium text-vdao-light md:text-[26px] '>${estimatedAmt ? estimatedAmt : '0.00'}</div>

          <div className='pt-[30px] text-[22px] font-bold md:pt-10'>Delegate your vote</div>

          <div className='flex gap-5 pt-[22px]'>
            <input
              placeholder='60'
              className='max-h-10 w-[82px] rounded-md border-[1px] border-vdao-dark px-2 text-center font-heading text-xl font-medium text-vdao-dark outline-none'
              value={votes}
              onChange={evt => setVotes(evt.target.value)}
            />
            <PrimaryButton text='Vote' onClick={votesHandler} className='font-heading text-xl font-medium' />
          </div>

          <div className='pt-[30px] md:pt-[60px]'>{grant?.requests[requestId]?.description}</div>
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
