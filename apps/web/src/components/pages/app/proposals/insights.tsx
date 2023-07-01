import Image from 'next/image'
import { recentProsposalInfo } from './proposalDetails'
import FilterIcon from 'public/icons/stewards/filter.svg'
import PolygonIcon from 'public/icons/stewards/polygon.svg'
import CorrectIcon from 'public/icons/stewards/CorrectIcon.svg'
import { useState } from 'react'

type InsightBoxProps = {
  title: string
  value: string
}

const Insights = () => {
  return (
    <div className='mx-auto w-full max-w-[1140px] bg-vdao-deep pb-[120px]'>
      <div className='clash pb-9 text-[26px] font-medium text-white md:pb-10 md:text-3xl'>Proposals Insights</div>

      <div className='grid grid-cols-12 justify-between gap-5'>
        {[
          { title: 'Proposals Insights', amount: '68' },
          { title: 'Proposal Creators', amount: '12' },
          { title: 'Lifetime Voters', amount: '351' },
          { title: 'Voter Acceptance Rate', amount: '95.6%' },
        ].map(({ title, amount }) => {
          return (
            <div className='col-span-12 flex flex-col gap-5 rounded-2xl bg-vdao-dark px-[30px] py-5 pt-5 md:col-span-6 md:px-7  md:pb-10 lg:col-span-3'>
              <div className='satoshi text-lg font-medium leading-5 text-white'>{title}</div>
              <div className='satoshi text-[32px] font-bold leading-8 text-vdao-light'>{amount}</div>
            </div>
          )
        })}
      </div>
      <RecentProposals />
    </div>
  )
}

const RecentProposals = () => {
  const [filter, setFilter] = useState(false)
  const [filterType, setFilterType] = useState('')
  const [sortby, setSortBy] = useState(false)
  const [sortbyType, setSortByType] = useState('')
  return (
    <article className='relative mt-5 flex w-full flex-col rounded-2xl bg-vdao-dark px-[30px] py-5 pt-5 md:px-7 md:pb-10'>
      <div className='flex justify-between'>
        <div className='font-body text-lg font-bold text-white'>History</div>
        <div className='flex gap-5'>
          <div
            className='flex cursor-pointer gap-2 rounded-md bg-white py-1 px-3'
            onClick={() => {
              setSortBy(!sortby)
              setFilter(false)
            }}
          >
            Sort by: Latest to oldest
            <Image src={PolygonIcon} alt='Polygon' />
          </div>
          <Image
            src={FilterIcon}
            alt='filter'
            className='cursor-pointer'
            onClick={() => {
              setFilter(!filter)
              setSortBy(false)
            }}
          />
        </div>
      </div>
      {sortby && (
        <div className='absolute right-6 top-16 w-[230px] items-end rounded-[5px] bg-white p-4'>
          <div className='flex cursor-pointer justify-between gap-2'>
            <div className=' text-sm font-medium' onClick={() => setSortByType('oldest')}>
              Latest to oldest
            </div>
            {sortbyType === 'oldest' && <Image src={CorrectIcon} alt='correct' />}
          </div>
          <div className='mt-2 flex cursor-pointer justify-between gap-2'>
            <div className='text-sm font-medium' onClick={() => setSortByType('latest')}>
              Oldest to latest
            </div>
            {sortbyType === 'latest' && <Image src={CorrectIcon} alt='correct' />}
          </div>
          <div className='mt-2 flex cursor-pointer justify-between gap-2'>
            <div className='text-sm font-medium' onClick={() => setSortByType('highVotes')}>
              Votes: low to high
            </div>
            {sortbyType === 'highVotes' && <Image src={CorrectIcon} alt='correct' />}
          </div>
          <div className='mt-2 flex cursor-pointer justify-between gap-2'>
            <div className='text-sm font-medium' onClick={() => setSortByType('lowVotes')}>
              Votes: high to low
            </div>
            {sortbyType === 'lowVotes' && <Image src={CorrectIcon} alt='correct' />}
          </div>
          <div className='mt-2 flex cursor-pointer justify-between gap-2'>
            <div className='text-sm font-medium' onClick={() => setSortByType('highAcceptance')}>
              Acceptance: low to high
            </div>
            {sortbyType === 'highAcceptance' && <Image src={CorrectIcon} alt='correct' />}
          </div>
          <div className='mt-2 flex cursor-pointer justify-between gap-2'>
            <div className='text-sm font-medium' onClick={() => setSortByType('lowAcceptance')}>
              Acceptance: high to low
            </div>
            {sortbyType === 'lowAcceptance' && <Image src={CorrectIcon} alt='correct' />}
          </div>
        </div>
      )}
      {filter && (
        <div className='absolute right-6 top-16 w-[120px] items-end rounded-[5px] bg-white p-4'>
          <div className='flex cursor-pointer justify-between gap-2'>
            <div className=' text-sm font-medium' onClick={() => setFilterType('active')}>
              Active
            </div>
            {filterType === 'active' && <Image src={CorrectIcon} alt='correct' />}
          </div>
          <div className='mt-2 flex cursor-pointer justify-between gap-2'>
            <div className='text-sm font-medium' onClick={() => setFilterType('closed')}>
              Closed
            </div>
            {filterType === 'closed' && <Image src={CorrectIcon} alt='correct' />}
          </div>
        </div>
      )}

      <div className='mt-5 flex flex-col gap-2.5'>
        <div className='grid grid-cols-12 justify-between '>
          <div className='satoshi col-span-7 text-sm font-normal text-white md:col-span-5'>{'Proposal'}</div>
          <div className='satoshi hidden text-sm font-normal text-white md:col-span-2 md:block'>{'Start Date'}</div>
          <div className='satoshi hidden text-sm font-normal text-white md:col-span-2 md:block'>{'End Date'}</div>
          <div className='satoshi hidden text-sm font-normal text-white md:col-span-1 md:block'>{'Votes'}</div>
          <div className='satoshi hidden text-sm font-normal text-white md:col-span-1 md:block'>{'Acceptance'}</div>
          <div className='satoshi col-span-5 flex justify-end text-sm font-normal text-white md:col-span-1'>{'Status'}</div>
        </div>
        {recentProsposalInfo.map(({ proposal, startDate, endDate, votes, acceptance, status }, index) => {
          return (
            <div key={index} className=' grid grid-cols-12'>
              <div className='satoshi col-span-7 text-sm font-bold text-white md:col-span-5'>{proposal}</div>
              <div className='satoshi hidden text-sm font-bold text-white md:col-span-2 md:block'>{startDate}</div>
              <div className='satoshi hidden text-sm font-bold text-white md:col-span-2 md:block'>{endDate}</div>
              <div className='satoshi hidden text-sm font-bold text-white md:col-span-1 md:block'>{votes}</div>
              <div className='satoshi hidden text-sm font-bold text-white md:col-span-1 md:block'>{acceptance}</div>
              <div className={`satoshi ${status !== 'Active' ? 'text-[#909090]' : 'text-vdao-light'} col-span-5 flex justify-end text-sm font-bold md:col-span-1`}>{status}</div>
            </div>
          )
        })}
      </div>
    </article>
  )
}

export default Insights
