import Image from 'next/image'
import MainHero from '/public/illustrations/web3/PNG/VDAO-web3-hero.png'
import StaticProfilePic from 'public/illustrations/home/SVG/image 10 (1).svg'
import ProfilePic from 'public/icons/blog/createdByLogo.svg'
import { expenditureData, horizontalBarchart, latestDonationData, membersData, onlineMembersData, verticalBarchartDesktop, LinearChart, verticalBarchartMobile } from '../../mockData'
import { Section } from '../../../layout/section'
import dynamic from 'next/dynamic'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import { useUserReads } from '~/hooks/web3/useUser'
import { useAccount } from 'wagmi'
import { Skeleton } from 'antd'

import { shortenAddress, shortenText } from '~/utils/helpers'
import { Null_Address } from '~/utils/config'
import { monthNames } from '~/utils/date'
import { useSession } from 'next-auth/react'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'
import { User } from '@prisma/client'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

type ProfileProps = {
  setOpenProfile: Dispatch<SetStateAction<boolean>>
  setNewMembersArr: any
  data: User
}
type NewMembersProps = {
  newMembersArr: any
}

export function StatisticsHomeComponent() {
  const [period, setPeriod] = useState({ value: 'week', state: false })
  return (
    <Section className=' col-span-12 mb-28 w-[100%] rounded-2xl bg-vdao-dark py-10 lg:py-12 lg:pr-16 lg:pl-12'>
      <div className='pr-5 lg:pr-10'>
        <div className='items-start justify-between md:flex'>
          <div className='mt-[53] w-full md:w-7/12'>
            <div className='mb-[55px] flex items-start justify-between pl-5 text-white md:ml-6 md:items-center md:pl-0'>
              <div className='leading-0 font-body text-[22px] font-bold text-white'>Treasury</div>
              <div className=' mx-auto flex flex-col gap-[0px] md:ml-0 md:mr-0 md:flex-row md:items-center md:gap-10'>
                <div className='flex items-center'>
                  <div className='mr-2.5 h-[15px] w-[15px] rounded-full bg-vdao-light'></div>
                  <div className='font-body text-sm font-normal leading-10 text-white md:mt-0 lg:leading-[18.9px]'>USDC</div>
                </div>
                <div className=' flex items-center'>
                  <div className='mr-2.5 h-[15px] w-[15px] rounded-full bg-vdao-pink'></div>
                  <div className='font-body text-sm font-normal text-white'>ETH</div>
                </div>
              </div>
              <div className='relative flex h-fit cursor-pointer items-center gap-2.5 rounded-[10px] bg-white py-[6px] px-[15px]'>
                <div onClick={() => setPeriod({ ...period, state: !period.state })} className='font-body  font-bold capitalize  text-vdao-dark md:text-sm'>
                  {period.value}
                </div>
                <FaChevronDown onClick={() => setPeriod({ ...period, state: !period.state })} className='text-[15px] text-vdao-light' />
                <div className={`absolute  left-0 z-50 w-full overflow-hidden rounded-[10px] bg-white ease-[1s] ${period.state ? 'top-[110%] block opacity-100' : 'top-[130%] hidden opacity-0'}`}>
                  {['week', 'month', 'year'].map((text, index) => {
                    return (
                      <div
                        onClick={() => setPeriod({ value: text, state: false })}
                        key={index}
                        className='py-[6px] px-[15px] font-body text-sm font-bold capitalize  text-vdao-dark ease-in  hover:bg-[rgba(0,0,0,.1)]'
                      >
                        {text}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            <Chart options={LinearChart.options} series={LinearChart.series} type='line' width={'100%'} height={'333px'} />
          </div>
          <div className='pl-5 lg:pl-0'>
            <div className='mt-[60px] font-body text-[22px] font-bold text-white md:mt-0 md:text-2xl'>Latest</div>
            <div className=' mt-[32px] flex w-full flex-col gap-5 md:gap-[43px] lg:mt-[30px] lg:w-72'>
              {' '}
              {latestDonationData.map(({ title, text, amount }, index) => {
                return (
                  <div key={index} className='flex justify-between'>
                    <div>
                      <div className='font-body text-lg font-bold leading-6 text-vdao-light'>{title}</div>
                      <div className='font-body text-sm font-normal leading-5 text-white'>{text}</div>
                    </div>
                    <div>
                      <div className='font-body text-sm font-bold leading-5 text-[#f8f2ff]'>{amount}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <article className='mt-12 flex flex-col gap-5 px-2.5 md:pl-0 lg:flex-row lg:justify-end lg:gap-10'>
          {expenditureData.map(({ title, amount, percent }, index) => {
            return (
              <div className='mx-auto w-fit max-w-[322px] rounded-2xl bg-white p-5 md:max-w-fit md:p-8 lg:mx-0'>
                <div className='font-body text-[22px] font-medium leading-6 text-vdao-dark md:text-2xl md:font-bold lg:leading-5'> {title}</div>
                <div className='mt-4 flex items-start '>
                  <div className='mr-2 font-body text-[26px] font-medium leading-6 text-vdao-dark md:text-3xl md:font-bold lg:mr-2.5 lg:leading-8'>{amount}</div>
                  <div className='mr-2 font-heading text-xl font-medium leading-5 text-vdao-dark md:font-body md:font-bold lg:mr-5'>USD</div>
                  <div
                    className={`flex w-[100px] items-center justify-center rounded-2xl bg-vdao-light py-1.5 font-inter text-sm font-bold leading-5 text-vdao-dark md:px-2 lg:mr-5 lg:font-body lg:text-xl ${
                      index > 0 && 'bg-vdao-pink'
                    }`}
                  >
                    <div className=''>{percent}</div>
                    <img src='/illustrations/home/SVG/Arrow 6.svg' alt='' className={` ${index > 0 && 'rotate-180'} ml-1 w-[13px]`} />
                  </div>
                </div>
              </div>
            )
          })}
        </article>
        <div className=' mt-[60px] flex flex-col items-end justify-between md:flex-row'>
          <div className='w-full md:w-7/12'>
            <div className='mb-[35px] flex justify-between pl-5 text-white md:ml-5 md:items-center md:justify-start lg:pl-0'>
              <div className='font-body text-xl font-bold text-white md:mt-0 md:mr-28 md:text-[22px]'>New User</div>
              <div className='flex flex-col gap-[14px] md:flex-row'>
                <div className=' flex items-center'>
                  <div className='mr-2.5 h-[15px] w-[15px] rounded-full bg-vdao-light'></div>
                  <div className='leading-0 font-body text-sm font-normal text-white md:mt-0'>Join Member</div>
                </div>
                <div className=' flex items-center'>
                  <div className='mr-2.5 h-[15px] w-[15px] rounded-full bg-[#33A1AA]'></div>
                  <div className='leading-0 font-body text-sm font-normal text-white md:mt-0'>Invested</div>
                </div>
              </div>
            </div>

            <Chart options={verticalBarchartDesktop.options} series={verticalBarchartDesktop.series} type='bar' class width={'100%'} height={'333px'} />
          </div>
          <div className='mt-[60px] w-full  md:mt-0 md:w-3/12'>
            <div className='mb-[30px] flex items-center pl-5 text-white md:mb-[35px] lg:pl-0'>
              <div className='font-body text-xl font-bold text-white md:text-[22px]'>Weekly Purchases</div>
            </div>
            <Chart options={horizontalBarchart.options} series={horizontalBarchart.series} type='bar' class width={'100%'} height={'353px'} />
          </div>
        </div>
      </div>
    </Section>
  )
}

export function NewMembersComponent({ newMembersArr }: NewMembersProps) {
  return (
    <Section className=' col-span-12 w-full justify-between rounded-2xl bg-vdao-dark px-5 py-10 md:flex md:px-10 md:pt-14 md:pb-10 lg:col-span-5 lg:mb-0 lg:block'>
      {/* NEW MEMBERS */}
      <div className='lg:px-10'>
        <div className='flex items-center gap-2.5'>
          <div className='font-body text-[22px] font-bold text-white'>New Members</div>
          <div className='font-body text-lg font-normal text-white'>{newMembersArr ? newMembersArr.length : 0}</div>
        </div>
        <div className=''>
          {newMembersArr?.map((member: any, index: number) => {
            return (
              <div className='mt-5 flex items-center justify-between md:w-80 lg:w-auto' key={index}>
                <div className='mr-6 flex items-center'>
                  <Image src={member && member.picture ? member.picture : StaticProfilePic} alt='' height={10} width={10} className='mr-4 h-10 w-10 rounded-full lg:mr-2.5' />
                  <div>
                    <div className='font-body text-lg font-medium leading-5 text-vdao-light'>{member.name ? shortenText(member.name) : 'Unnamed'}</div>
                    <div className='font-body text-sm font-normal leading-5 text-white'>{member.role ? member.role : 'Guest'}</div>
                  </div>
                </div>
                <div className=''>
                  <div className='flex justify-end font-body text-sm font-bold leading-5 text-[#F8F2FF]'>
                    {member?.JoinedAt ? monthNames[member.JoinedAt.getUTCMonth()] + ' ' + member.JoinedAt.getDate() + ', ' + member.JoinedAt.getFullYear() : 'Unavailable'}
                  </div>
                  <div className='flex justify-end font-body text-sm font-normal leading-5 text-[#F8F2FF]'>
                    {member?.JoinedAt
                      ? member.JoinedAt.getHours() > 12
                        ? member.JoinedAt.getHours() - 12 + ':' + member.JoinedAt.getMinutes() + ':' + member.JoinedAt.getSeconds() + ' PM'
                        : member.JoinedAt.getHours() + ':' + member.JoinedAt.getMinutes() + ':' + member.JoinedAt.getSeconds() + ' AM'
                      : 'at Unavailable'}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ONLINE MEMBERS */}
      <div className='lg:px-10'>
        <div className=' mt-10 flex items-center gap-2.5 md:mt-0 lg:mt-10'>
          <div className='font-body text-[22px] font-bold text-white'>Online</div>
          <div className='font-body text-lg font-normal text-white'>{0}</div>
        </div>

        <article className='mt-8 flex flex-wrap gap-[30px] md:w-80 md:gap-5 lg:w-auto'>
          {onlineMembersData.map(({ name, img }, index) => {
            return (
              <div className='w-[50px] overflow-hidden md:w-20 md:w-20'>
                <img src={img} alt='' className='mx-auto h-10 w-10 rounded-full' />
                <div className='w-[50px] text-center font-body text-sm font-normal text-white md:w-20'>{name}</div>
              </div>
            )
          })}
        </article>
      </div>
    </Section>
  )
}

export function ProfileHomeComponent({ setOpenProfile, setNewMembersArr, data }: ProfileProps) {
  const { address, isConnecting, isDisconnected } = useAccount()

  const { data: newData } = useUserReads({})
  const { data: siwe } = useSession()

  let skeletonActive = !data

  const [praiseScore, setPraiseScore] = useState(0)
  const date = new Date()

  useEffect(() => {
    if (newData) {
      const newDataArr: any = []
      newData.map(member => {
        const joinedAt = member.JoinedAt
        if (
          joinedAt.getFullYear() === date.getFullYear() &&
          ((joinedAt.getMonth() + 1 === date.getMonth() && joinedAt.getDate() <= date.getDate()) || (joinedAt.getMonth() === date.getMonth() - 1 && joinedAt.getDate() >= date.getDate()))
        ) {
          newDataArr.push(member)
        }
      })
      setNewMembersArr(newDataArr)
    } else {
      setNewMembersArr([])
    }
  }, [newData])

  useEffect(() => {
    if (data) {
      let score = 0
      data?.stewardVotesAsCandidate?.map((votes: any) => {
        score = score + parseFloat(votes.token)
      })
      setPraiseScore(score)
    } else {
      setPraiseScore(0)
    }
  })

  return (
    <Section className='col-span-12 flex w-full flex-col rounded-2xl bg-vdao-dark pr-3.5 pt-5 pl-5 md:pt-10 md:pl-5 md:pr-8 md:pb-20 lg:col-span-7'>
      {/* View Profile Button */}
      <div className='ml-auto cursor-pointer font-body text-sm font-bold text-white underline md:text-base lg:pr-10' onClick={() => setOpenProfile(true)}>
        View Profile
      </div>

      {/* User Info */}
      <div className='flex h-full flex-col md:gap-5 lg:mx-8'>
        <Skeleton active={skeletonActive} paragraph={{ rows: 1 }} avatar className='!w-1/2' loading={skeletonActive}>
          <div className={'flex gap-3 ' + (skeletonActive && 'opacity-0')}>
            <Image src={data?.picture ? data.picture : ProfilePic} alt='Profile Picture' height={14} width={14} className='h-14 w-14 rounded-full' />
            <div className='flex flex-col'>
              <span className='satoshi text-2xl font-bold leading-8 text-vdao-light'>{data?.name ? shortenText(data.name) : 'Unknown'}</span>
              <span className='satoshi text-base font-normal leading-6 '>{data?.address ? shortenAddress(data?.address) : shortenAddress(Null_Address)}</span>

              <div className='mt-2 rounded-[20px] border-2 border-vdao-light px-3 text-center text-xl text-vdao-light md:hidden'>Visitor </div>
            </div>
          </div>
        </Skeleton>

        {/* Description */}
        <div className='mt-5 mr-7 font-body text-lg leading-6 md:mr-0 md:w-full'>
          <Skeleton active={skeletonActive} paragraph={{ rows: 1 }} title={false} className='mt-5 mr-7 font-body text-lg leading-6 md:mr-0 md:w-9/12' loading={skeletonActive}>
            <span>
              {data?.description?.length > 250 ? (
                <div onClick={() => setOpenProfile(true)} className=''>
                  {data?.description.substring(0, 250)} <span className=' cursor-pointer text-base text-gray-200 '>...Read more</span>
                </div>
              ) : data?.description .length < 250 ? (
                data?.description
              ) : (
                'No Description available'
              )}
            </span>
          </Skeleton>
        </div>
        {/* Guild & Pod */}
        <Skeleton className='mt-auto inline-grid grid-cols-[max-content_auto] gap-5 md:gap-6' active={skeletonActive} title={false} paragraph={{ rows: 2 }} loading={skeletonActive}>
          <div className='mt-auto inline-grid grid-cols-[max-content_auto] gap-5 md:gap-6'>
            <span className='font-body text-lg font-bold md:text-base'>Guild</span>
            <span className='font-body text-lg font-bold text-vdao-light md:text-base'>{data?.guild?.name ? data.guild.name : 'No Guild '}</span>
            <span className='font-body text-lg font-bold md:text-base'>Pod</span>
            <span className='font-body text-lg font-bold text-vdao-light md:text-base'>{data?.podsAsAdmin[0]?.name ? data?.podsAsAdmin[0]?.name : 'No pod'}</span>
          </div>
        </Skeleton>
        {/* Statistics */}
        <div className='my-10 grid w-full grid-cols-2 items-start gap-10 md:grid-cols-3 lg:mb-0 lg:gap-5'>
          {[
            {
              name: 'Votes Delegated',
              value: '0',
            },
            {
              name: 'Proposals Created',
              value: data?.proposals ? data.proposals.length : '0',
            },
            {
              name: 'Praise Score',
              value: praiseScore,
            },
            // {
            //   name: 'Discussions',
            //   value: '0',
            // },
          ].map(stat => (
            <div className='flex flex-col items-center justify-center' key={stat.name}>
              <div className='flex h-32 w-32 items-center justify-center rounded-full border-[3px] border-vdao-light font-body text-[32px] font-bold text-white'>
                <Skeleton active={skeletonActive} paragraph={{ rows: 1, width: '100%' }} title={false} loading={skeletonActive} className='!w-1/2'>
                  {stat.value}
                </Skeleton>
              </div>
              <span className='mt-2 text-center font-body text-lg font-bold'>{stat.name}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

export function WelcomeComponent() {
  return (
    <Section className='relative mx-auto flex max-w-[1680px] flex-col-reverse items-center overflow-hidden md:h-auto md:flex-col md:pt-16'>
      <Image src={MainHero} alt='VDAO Web3 Hero' className='mb-24 translate-x-[40%] scale-[200%] md:mb-0 md:-translate-x-0 md:scale-100' />
      <div
        className='z-10 w-[342px] text-center font-heading text-[44px] font-medium leading-[48px]
                     text-white md:absolute md:w-[702px] md:text-[80px] md:leading-[95px]'
      >
        Welcome to VDAO
      </div>
    </Section>
  )
}

export function SelfDelegate() {
  return (
    <Section className='mx-auto max-w-[937px]  px-6 pb-6'>
      <div className='my-auto mt-5 flex flex-col justify-between gap-5 rounded-[20px] bg-vdao-dark px-6 py-5 text-lg font-light text-white md:flex-row md:px-12'>
        <div className='max-w-[523px]'>To be able to interact with the dao, you need to have delegates, you can also self-delegate your VDAO tokens.</div>
        <PrimaryButton text='Self delegate' className='my-auto' />
      </div>
    </Section>
  )
}
