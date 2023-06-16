import Image from 'next/image'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'
import ProfilePic from 'public/icons/blog/createdByLogo.svg'
import WhiteButton from '~/styles/shared/buttons/whiteButton'
import { useAccount } from 'wagmi'
import { useStewardRead, useStewardReads, useVote } from '~/hooks/web3/useStewards'
import { Address } from 'viem'
import { JoinedAtFormat, shortenAddress, shortenText } from '~/utils/helpers'
import { Null_Address } from '~/utils/config'
import { monthNames } from '~/utils/date'
import { Dispatch, SetStateAction, useState } from 'react'
import { Skeleton } from 'antd'
import { useUserReads } from '~/hooks/web3/useUser'
import { User } from '@prisma/client'
import InfoIcon from 'public/icons/stewards/infoIcon.svg'

type Props = {
  setOpenProfile: Dispatch<SetStateAction<User | undefined>>
}

type CardProps = {
  setOpenProfile: Dispatch<SetStateAction<User | undefined>>
  data: any
}

const ElectionCards = ({ setOpenProfile }: Props) => {
  const { address } = useAccount()
  const { data, isLoading } = useUserReads({})

  return (
    <div className='mx-auto w-screen bg-vdao-deep'>
      <div className='mx-auto max-w-[1280px] pb-[120px]'>
        <div className='mx-6 max-w-[1280px] font-heading text-[32px] font-medium text-vdao-light md:mx-auto md:text-[46px]'>Candidates</div>

        <div className='mx-6 mt-5 grid grid-cols-1 gap-5 md:mx-0 md:grid-cols-2'>
          {isLoading ? (
            <>
              <Skeleton.Avatar shape='square' style={{ height: '400px', width: '100%' }} className='col-span-2' active />
              <Skeleton.Avatar shape='square' style={{ height: '400px', width: '100%' }} className='col-span-2' active />
              <Skeleton.Avatar shape='square' style={{ height: '400px', width: '100%' }} className='col-span-2' active />
            </>
          ) : (
            data && data.length > 0 && data?.map(steward => <Card data={steward} setOpenProfile={setOpenProfile} />)
          )}
        </div>
      </div>
    </div>
  )
}

export const Card = ({ data, setOpenProfile }: CardProps) => {
  console.log({ data })
  const [votes, setVotes] = useState('')
  const { vote } = useVote()
  const { address } = useAccount()
  const votesHandler = () => {
    if (votes && address && data.address) {
      vote({ voterAddress: address, candidateAddress: data.address, amount: parseFloat(votes), message: '' })
    }
  }
  return (
    <div className='rounded-[20px] bg-vdao-dark text-white'>
      <div className='float-right cursor-pointer pt-5 pr-5 text-sm font-semibold underline underline-offset-2 md:pt-[30px] md:pr-[30px]' onClick={() => setOpenProfile(data)}>
        View Profile
      </div>

      <div className='p-5 md:p-10'>
        <div className='flex w-full'>
          <Image src={data?.picture ? data?.picture : ProfilePic} alt='' width={60} height={64.2} className='h-[64.2px] w-[60px] rounded-full' />

          <div className='pl-[10px] md:pl-[15px]'>
            <div className='font-body text-[26px] font-semibold text-vdao-light'>{data?.name ? shortenText(data.name) : 'Unnamed'}</div>
            <div className='flex flex-col font-body text-lg md:flex-row md:gap-5'>
              <div className='font-light'>{data?.address ? shortenAddress(data.address) : shortenAddress(Null_Address)}</div>
              <div className='font-semibold'>
                {
                  // JoinedAtFormat(data?.JoinedAt ? data?.JoinedAt : "")
                  data?.JoinedAt ? 'Joined ' + monthNames[data.JoinedAt.getUTCMonth()] + ' ' + data.JoinedAt.getDate() + ', ' + data.JoinedAt.getFullYear() : 'at Unavailable'
                }
              </div>
            </div>
          </div>
        </div>

        {data.guild && <div className='mt-[18px] w-fit rounded-3xl border-[3px] py-[7px] px-[25px] text-xl font-medium'>{data.guild.name}</div>}

        <div className='h-24 w-full pt-5 text-lg font-normal md:pt-[30px]'>
          {data?.description ? data.description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ultrice ullamcorper.'}
        </div>

        <div className='mt-[25px] flex justify-between rounded-[20px] bg-white px-5 py-8 md:mt-11 md:px-10'>
          <div>
            <div className='text-[28px] font-semibold text-vdao-light md:text-[32px]'> 0 </div>
            <div className='text-sm font-semibold text-vdao-dark md:text-lg'>
              Delegated <br /> Votes
            </div>
          </div>

          <div>
            <div className='text-[28px] font-semibold text-vdao-light md:text-[32px]'> 0% </div>
            <div className='text-sm font-semibold text-vdao-dark md:text-lg'>
              Volting <br /> Weight
            </div>
          </div>

          <div>
            <div className='text-[28px] font-semibold text-vdao-light md:text-[32px]'> 0 </div>
            <div className='text-sm font-semibold text-vdao-dark md:text-lg'>
              Praise <br /> Score
            </div>
          </div>
          {/* <Image src={InfoIcon} alt='InfoIcon' /> */}
        </div>

        <div className='flex flex-col justify-between pt-[30px] md:flex-row md:pt-10'>
          <div className='py-[5px] text-xl font-medium md:pl-[30px]'>Delegate your vote</div>

          <div className='flex gap-[10px]'>
            <input
              placeholder='60'
              className=' max-h-9 w-fit max-w-[100px] rounded-md border-none px-7 font-heading text-xl text-vdao-dark outline-none'
              value={votes}
              onChange={evt => setVotes(evt.target.value)}
            />

            <PrimaryButton text='Vote' className='py-[5px] font-heading text-xl' onClick={votesHandler} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ElectionCards
