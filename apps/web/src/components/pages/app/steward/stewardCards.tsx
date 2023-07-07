import { User } from '@prisma/client'
import { Skeleton } from 'antd'
import Image from 'next/image'
import ProfilePic from 'public/icons/blog/createdByLogo.svg'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useDelegate, useStewardReads } from '~/hooks/web3/useStewards'
import { useUserReads } from '~/hooks/web3/useUser'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'
import { Null_Address } from '~/utils/config'
import { monthNames } from '~/utils/date'
import { shortenAddress, shortenText } from '~/utils/helpers'

type Props = {
  setOpenProfile: Dispatch<SetStateAction<User | undefined>>
}

type CardProps = {
  setOpenProfile: Dispatch<SetStateAction<User | undefined>>
  user: User
}

const StewardCards = ({ setOpenProfile }: Props) => {
  const { data: users, isLoading } = useStewardReads({})

  console.log('stewards data', users)

  return (
    <div className='mx-auto w-full bg-vdao-deep px-6 md:px-0'>
      <div className='mx-auto w-full max-w-[1140px] pb-[120px]  pt-[0px] md:w-11/12'>
        <div className='flex flex-col justify-between md:flex-row'>
          <div className='font-heading text-[32px] font-medium text-vdao-light md:text-[46px]'>Current Stewards</div>

          <div className='mt-5 flex h-[43px] w-full items-center gap-[18px] overflow-hidden rounded-xl bg-vdao-dark px-3 md:max-w-[409px] '>
            <div className='h-7 w-7 bg-[url(/icons/stewards/search.svg)] bg-contain bg-center bg-no-repeat '></div>{' '}
            <input type='text' className='h-full w-full bg-transparent  font-body text-lg font-medium text-vdao-light outline-none ' placeholder='Search username' />
          </div>
        </div>
        <div className=' mt-5 grid grid-cols-1 gap-5 md:mt-[35px] md:grid-cols-2'>
          {isLoading ? (
            <>
              <Skeleton.Avatar shape='square' style={{ height: '400px', width: '100%' }} className='col-span-2' active />
              <Skeleton.Avatar shape='square' style={{ height: '400px', width: '100%' }} className='col-span-2' active />
              <Skeleton.Avatar shape='square' style={{ height: '400px', width: '100%' }} className='col-span-2' active />
            </>
          ) : (
            users && users.map(user => <Card setOpenProfile={setOpenProfile} user={user} />)
          )}
        </div>
      </div>
    </div>
  )
}

export const Card = ({ setOpenProfile, user }: CardProps) => {
  const { delegate } = useDelegate()

  const { data: userInfo } = useUserReads({
    search: user.address,
    include: {
      podsAsAdmin: true,
      podsAsMember: true,
      proposals: true,
      guild: true,
      stewardVotesAsCandidate: true,
      stewardVotesAsVoter: true,
    },
  })

  const [praiseScore, setPraiseScore] = useState(0)
  const [readMore, setReadMore] = useState(false)

  useEffect(() => {
    if (userInfo) {
      let score = 0
      userInfo[0]?.stewardVotesAsCandidate?.map((votes: any) => {
        score = score + parseFloat(votes.token)
      })
      setPraiseScore(score)
    } else {
      setPraiseScore(0)
    }
  })

  return (
    <div className='rounded-[20px] bg-vdao-dark text-white'>
      <div className='float-right cursor-pointer pt-5 pr-5 text-sm font-semibold underline underline-offset-2 md:pt-[30px] md:pr-[30px]' onClick={() => setOpenProfile(user)}>
        View Profile
      </div>

      <div className='p-5 lg:p-10'>
        <div className='flex w-full md:items-center lg:items-start'>
          <Image src={ProfilePic} alt='' className='h-[64.2px] w-[60px] rounded-full' />

          <div className='pl-2.5 md:pl-[15px]'>
            <div className='font-body text-[26px] font-bold leading-[30px] text-vdao-light'> {user && user.name ? shortenText(user.name) : 'Unnamed'} </div>
            <div className='flex flex-col font-body text-lg lg:flex-row lg:gap-5'>
              <div className='font-light'>{user && user.address ? shortenAddress(user.address) : shortenAddress(Null_Address)}</div>
              <div className='font-bold'>
                {user?.JoinedAt ? 'Joined ' + monthNames[user.JoinedAt.getUTCMonth()] + ' ' + user.JoinedAt.getDate() + ', ' + user.JoinedAt.getFullYear() : 'at Unavailable'}
              </div>
            </div>
          </div>
        </div>

        <div className='mt-[18px] w-fit rounded-3xl border-[3px] py-[7px] px-[25px] text-xl font-medium'>DAO Operation Guild</div>

        <div onClick={() => setReadMore(!readMore)} className=' cursor-default  pt-5 text-lg font-normal leading-[22px] md:pt-[30px]'>
          {user?.description
            ? `${user.description.length < 150 ? user.description : user.description.length > 150 && readMore ? user.description : `${user.description.substring(0, 150)}...`}`
            : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ultrice ullamcorper.'}{' '}
        </div>

        <div className='mt-[25px] flex justify-between rounded-[20px] bg-white px-5 py-8 md:mt-11 lg:px-10'>
          {[
            { num: '0', text: ' Delegated Votes' },
            { num: '0%', text: 'Voting  Weight' },
            { num: `${praiseScore ? praiseScore : '0'}`, text: 'Praise Score' },
          ].map(({ num, text }) => {
            return (
              <div>
                <div className='font-body text-[28px] font-bold text-vdao-light md:text-center lg:text-start lg:text-[32px]'> {num} </div>
                <div className='font-body text-sm font-bold leading-5 text-vdao-dark md:text-base lg:text-lg'>{text}</div>
              </div>
            )
          })}
        </div>

        <div className='flex items-center gap-[30px] pt-[30px] md:pt-10'>
          <PrimaryButton text='Delegate' className='py-[5px] text-xl' onClick={() => delegate({ delegatee: user.address })} />
          <div className='font-heading text-xl font-medium'> Activity </div>
        </div>
      </div>
    </div>
  )
}

export default StewardCards
