import { User } from '@prisma/client'
import { Skeleton } from 'antd'
import Image from 'next/image'
import { useEffect } from 'react'
import ProfilePic from 'public/icons/blog/createdByLogo.svg'
import InfoIcon from 'public/icons/stewards/infoIcon.svg'
import { Dispatch, SetStateAction, useState } from 'react'
import { useAccount } from 'wagmi'
import { useElectionReads, useVote } from '~/hooks/web3/useStewards'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'
import { Null_Address } from '~/utils/config'
import { monthNames } from '~/utils/date'
import { shortenAddress, shortenText } from '~/utils/helpers'

type Props = {
  setOpenProfile: Dispatch<SetStateAction<User | undefined>>
  setOpenVotesNscores: Dispatch<SetStateAction<boolean>>
}

type CardProps = {
  setOpenProfile: Dispatch<SetStateAction<User | undefined>>
  data: any
  setOpenVotesNscores: Dispatch<SetStateAction<boolean>>
}

const ElectionCards = ({ setOpenProfile, setOpenVotesNscores }: Props) => {
  const [debouncedInput, setDebouncedInput] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [searchedCandidates, setSearchedCandidates] = useState([])
  const { address } = useAccount()
  const { data, isLoading } = useElectionReads({})

  // USEFFECT FOR SEARCHING CANDIDATES
  useEffect(() => {
    const filteredCards: any = data?.filter(item => {
      return [searchValue]?.some(el => Object.values(item).join('').toLowerCase().includes(el.toLocaleLowerCase()))
    })
    setSearchedCandidates(filteredCards)
    console.log(String(searchValue)?.split(''))
  }, [debouncedInput])

  // USEFFECT THAT DELAYS SEACH FUNCTION
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedInput(searchValue)
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [searchValue, 500])

  return (
    <div className='mx-auto w-full max-w-[1188px] px-6 pb-[120px] md:px-10 xl:px-6'>
      <div className='flex flex-col justify-between md:flex-row'>
        <div className='max-w-[1280px] font-heading text-[32px] font-medium text-vdao-light md:text-[46px]'>Candidates</div>

        <div className='mt-5 flex h-[43px] w-full items-center gap-[18px] overflow-hidden rounded-xl bg-vdao-dark px-3 md:max-w-[409px] '>
          <div className='h-7 w-7 bg-[url(/icons/stewards/search.svg)] bg-contain bg-center bg-no-repeat '></div>{' '}
          <input
            type='text'
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            className='h-full w-full bg-transparent  font-body text-lg font-medium text-vdao-light outline-none '
            placeholder='Search username'
          />
        </div>
      </div>

      <div className='mt-5 grid grid-cols-1 gap-5 md:grid-cols-2'>
        {isLoading ? (
          <>
            <Skeleton.Avatar shape='square' style={{ height: '400px', width: '100%' }} className='col-span-2' active />
            <Skeleton.Avatar shape='square' style={{ height: '400px', width: '100%' }} className='col-span-2' active />
            <Skeleton.Avatar shape='square' style={{ height: '400px', width: '100%' }} className='col-span-2' active />
          </>
        ) : data && !debouncedInput ? (
          data.length > 0 && !debouncedInput && data?.map(steward => <Card data={steward} setOpenProfile={setOpenProfile} setOpenVotesNscores={setOpenVotesNscores} />)
        ) : (
          debouncedInput && searchedCandidates?.map(steward => <Card data={steward} setOpenProfile={setOpenProfile} setOpenVotesNscores={setOpenVotesNscores} />)
        )}
      </div>

      {/* RESULT NOT FOUND */}
      {debouncedInput && searchedCandidates.length === 0 ?
      <section className='my-10 w-full'>
        <img src='/logo/svg/notFound.svg' className='bg-no-repeate mx-auto w-full max-w-[377px] md:h-[380px]' />

        <div className='mt-5 text-center font-heading text-[68px] leading-[75px] text-vdao-light md:mt-0 '>No Results Found</div>
        <div className='mx-auto max-w-[399px] text-center font-body text-[24px] text-white '>We couldn’t find what you searched for. Try searching again.</div>
      </section> : ''
      }
    </div>
  )
}

export const Card = ({ data, setOpenProfile, setOpenVotesNscores }: CardProps) => {
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

      <div className='p-5 lg:p-10'>
        <div className='flex w-full'>
          <Image src={data?.picture ? data?.picture : ProfilePic} alt='' width={60} height={64.2} className='h-[64.2px] w-[60px] rounded-full' />

          <div className='pl-[10px] md:pl-[15px]'>
            <div className='font-body text-[26px] font-bold text-vdao-light'>{data?.name ? shortenText(data.name) : 'Unnamed'}</div>
            <div className='flex flex-col font-body text-lg lg:flex-row lg:gap-5'>
              <div className='font-light'>{data?.address ? shortenAddress(data.address) : shortenAddress(Null_Address)}</div>
              <div className='font-semibold'>
                {
                  // JoinedAtFormat(data?.JoinedAt ? data?.JoinedAt : "")
                  data?.JoinedAt ? 'Joined ' + monthNames[data.JoinedAt.getUTCMonth()]?.name + ' ' + data.JoinedAt.getDate() + ', ' + data.JoinedAt.getFullYear() : 'at Unavailable'
                }
              </div>
            </div>
          </div>
        </div>
        {data.guild && <div className='mt-[18px] w-fit rounded-3xl border-[3px] py-[7px] px-[25px] text-xl font-medium'>{data.guild.name}</div>}
        <div className='w-full pt-5 font-body text-lg font-normal leading-[26p] md:pt-[32px] md:text-[22px]'>
          {/* {data?.description ? data.description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ultrice ullamcorper.'} */}
          {data?.description?.length > 130 ? (
            <div className=''>
              {data?.description.substring(0, 130)}{' '}
              <span onClick={() => setOpenProfile(data)} className=' cursor-pointer text-base text-gray-200 '>
                ...Read more
              </span>
            </div>
          ) : data?.description.length < 0 ? (
            'No Description available'
          ) : (
            data?.description.length < 130 && data?.description
          )}
        </div>
        {console.log(data?.description)}
        <div className='relative mt-[25px] flex justify-between rounded-[20px] bg-white px-5 py-8 md:mt-11 md:px-10'>
          <Image src={InfoIcon} alt='InfoIcon' className='absolute right-4 top-4 cursor-pointer' onClick={() => setOpenVotesNscores(true)} />
          <div>
            <div className='text-[28px] font-semibold text-vdao-light md:text-[32px]'> 0 </div>
            <div className='text-sm font-semibold text-vdao-dark md:text-lg'>
              Delegated <br /> Votes
            </div>
          </div>

          <div>
            <div className='text-[28px] font-semibold text-vdao-light md:text-[32px]'> 0% </div>
            <div className='text-sm font-semibold text-vdao-dark md:text-lg'>
              Voting <br /> Weight
            </div>
          </div>

          <div>
            <div className='text-[28px] font-semibold text-vdao-light md:text-[32px]'> 0 </div>
            <div className='text-sm font-semibold text-vdao-dark md:text-lg'>
              Praise <br /> Score
            </div>
          </div>
        </div>
        <div className='flex flex-col justify-between gap-5 pt-[30px] lg:flex-row lg:items-center lg:gap-0 lg:pt-10'>
          <div className='text-start text-xl font-medium md:w-2/3'>Delegate your vote</div>
          <div className='flex w-full gap-[10px]'>
            <input
              placeholder='60'
              className='max-h-10 w-[100px] rounded-md border-none px-2 text-center font-heading text-xl font-medium text-vdao-dark outline-none lg:w-full'
              value={votes}
              onChange={evt => setVotes(evt.target.value)}
            />

            <PrimaryButton text='Vote' className='' onClick={votesHandler} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ElectionCards
