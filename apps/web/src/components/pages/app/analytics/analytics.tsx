import Image from 'next/image'
import React, { useState } from 'react'
import { Section } from '~/components/layout/section'
import dynamic from 'next/dynamic'
import { LinearChart } from '../../mockData'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export function ProposalComponent() {
  const data = [
    {
      proposal: 'The Longevist: A collection of the top longevity research',
      startDate: 'Feb 12, 2023',
      endDate: 'Feb 28, 2023',
      votes: '51',
      acceptance: '87.4%',
      status: 'Closed',
    },
    {
      proposal: 'Enable shielded voting for Snapshot proposal',
      startDate: 'Feb 14, 2023',
      endDate: 'Mar 01, 2023',
      votes: '68',
      acceptance: '95.1%',
      status: 'Closed',
    },
    {
      proposal: 'Proposal to Realign Working Group Structures',
      startDate: 'Feb 16, 2023',
      endDate: 'Mar 04, 2023',
      votes: '57',
      acceptance: '92.1%',
      status: 'Closed',
    },
    {
      proposal: 'Governance Amendment #2',
      startDate: 'Feb 18, 2023',
      endDate: 'Mar 06, 2023',
      votes: '21',
      acceptance: '96.7%',
      status: 'Closed',
    },
    {
      proposal: 'Proposal to Accept Funds',
      startDate: 'Feb 22, 2023',
      endDate: 'Mar 08, 2023',
      votes: '15',
      acceptance: '84.5%',
      status: 'Active',
    },
    {
      proposal: 'Institutional Genesis Raise',
      startDate: 'Feb 23, 2023',
      endDate: 'Mar 12, 2023',
      votes: '35',
      acceptance: '82.9%',
      status: 'Active',
    },
  ]
  return (
    <div className='mt-28 pb-28'>
      <div className='clash pb-9 text-[26px] font-medium text-white md:pb-10 md:text-3xl'>Proposals Insights</div>

      <div className='flex flex-wrap justify-between gap-5 md:gap-0'>
        {[
          { title: 'Proposals Insights', amount: '68' },
          { title: 'Proposal Creators', amount: '12' },
          { title: 'Lifetime Voters', amount: '351' },
          { title: 'Voter Acceptance Rate', amount: '95.6%' },
        ].map(({ title, amount }) => {
          return (
            <div className='flex w-full flex-col gap-5 rounded-2xl bg-vdao-dark px-[30px] py-5 pt-5 md:w-[23%] md:px-7 md:pb-10'>
              <div className='satoshi text-lg font-medium leading-5 text-white'>{title}</div>
              <div className='satoshi text-[32px] font-bold leading-8 text-vdao-light'>{amount}</div>
            </div>
          )
        })}

        {/* RECENT PROPOSALS */}
        <article className='mt-5 flex w-full flex-col rounded-2xl bg-vdao-dark px-[30px] py-5 pt-5 md:px-7 md:pb-10'>
          <div className='satoshi text-lg font-bold text-white'>Proposals Insights</div>
          <div className='satoshi text-sm font-normal text-white'>Recent Proposals</div>

          <Section className='mt-10 flex flex-col gap-2.5'>
            <div className='grid grid-cols-12 justify-between '>
              <div className='satoshi col-span-7 text-sm font-normal text-white md:col-span-5'>{'Proposal'}</div>
              <div className='satoshi hidden text-sm font-normal text-white md:col-span-2 md:block'>{'Start Date'}</div>
              <div className='satoshi hidden text-sm font-normal text-white md:col-span-2 md:block'>{'End Date'}</div>
              <div className='satoshi hidden text-sm font-normal text-white md:col-span-1 md:block'>{'Votes'}</div>
              <div className='satoshi hidden text-sm font-normal text-white md:col-span-1 md:block'>{'Acceptance'}</div>
              <div className='satoshi col-span-5 flex justify-end text-sm font-normal text-white md:col-span-1'>{'Status'}</div>
            </div>
            {data.map(({ proposal, startDate, endDate, votes, acceptance, status }, index) => {
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
          </Section>
        </article>
      </div>
    </div>
  )
}

export function MembershipComponent() {
  const [duration, setDuration] = useState('1y')

  const data = [
    {
      token: 'Ethereum',
      symbol: 'ETH',
      balance: '100',
      usdValue: '170,535',
      percentage: '11.5%',
    },
    {
      token: 'USD Coin',
      symbol: 'USDC',
      balance: '1,621,524',
      usdValue: '1,621,524',
      percentage: '65.5%',
    },
    {
      token: 'USDT',
      symbol: 'USDT',
      balance: '506,981',
      usdValue: '506,981',
      percentage: '23.0%',
    },
  ]

  return (
    <div className=''>
      <div className='clash pb-9 text-[26px] font-medium text-white md:pb-10 md:text-3xl'>Membership & Treasury</div>

      <div className='flex flex-wrap justify-between gap-5 md:gap-0'>
        {[
          { title: 'Members', amount: '291' },
          { title: 'Membership Value', amount: '$ 350' },
          { title: 'Treasury Holdings', amount: '$ 3.5m' },
          { title: 'Liquid Holdings', amount: '$ 1.9m' },
        ].map(({ title, amount }, index) => {
          return (
            <div className='flex w-full flex-col gap-5 rounded-2xl bg-vdao-dark px-[30px] py-5 pt-5 md:w-[23%] md:px-7 md:pb-10'>
              <div className='satoshi text-lg font-medium leading-5 text-white'>{title}</div>
              <div className='satoshi text-[32px] font-bold leading-8 text-vdao-light'>{amount}</div>
            </div>
          )
        })}

        {/* TREASURY AND MEMBER'S GROWTH */}
        {[
          {
            title: 'Members Growth',
            period: ['7d', '1m', '6m', '1y'],
            percent: '121.15% Last 1 Year',
          },
          {
            title: 'Treasury Growth',
            period: ['7d', '1m', '6m', '1y'],
            percent: '121.15% Last 1 Year',
          },
        ].map(({ title, period, percent }, index) => {
          return (
            <div key={index} className='mt-5 flex w-full flex-col rounded-2xl bg-vdao-dark px-7 pt-5 pb-10 md:w-[48.5%]'>
              <div className='flex items-center justify-between'>
                <div className='satoshi text-lg font-bold leading-[22px] text-white'>{title}</div>
                <div className='flex gap-5'>
                  {period.map(time => {
                    return (
                      <div onClick={() => setDuration(time)} className={`satoshi cursor-pointer text-sm font-normal leading-5 ${duration !== time ? 'text-white' : 'text-vdao-light'}`}>
                        {time}
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className='satoshi text-sm font-normal leading-5 text-white'>{percent}</div>
              <Chart options={LinearChart.options} series={LinearChart.series} type='line' width={'100%'} height={'333px'} />
            </div>
          )
        })}

        {/* TREASURY HOLDINGS */}
        <article className='mt-5 flex w-full flex-col rounded-2xl bg-vdao-dark px-7 pt-5 pb-10 md:w-[75%]'>
          <div className='satoshi text-lg font-bold text-white'>Treasury Holdings</div>
          <div className='satoshi text-sm font-normal text-white'>All tokens in treasury accounts</div>
          <Section className='mt-10 flex flex-col gap-2.5'>
            <div className='grid grid-cols-12 justify-between '>
              <div className='satoshi col-span-4 text-sm font-normal text-white md:col-span-3'>{'Token'}</div>
              <div className='satoshi col-span-4 text-sm font-normal text-white md:col-span-2'>{'Symbol'}</div>
              <div className='satoshi col-span-4 text-sm font-normal text-white md:col-span-2'>{'Balance'}</div>
              <div className='satoshi hidden text-sm font-normal text-white md:col-span-2 md:block'>{'USD Value'}</div>
              <div className='satoshi hidden text-sm font-normal text-white md:col-span-2 md:block'>{'Percentage'}</div>
            </div>
            {data.map(({ token, symbol, balance, usdValue, percentage }, index) => {
              return (
                <div key={index} className='justify- grid grid-cols-12 '>
                  <div className='satoshi col-span-4 text-sm font-bold text-white md:col-span-3'>{token}</div>
                  <div className='satoshi col-span-4 text-sm font-bold text-white md:col-span-2'>{symbol}</div>
                  <div className='satoshi col-span-4 text-sm font-bold text-white md:col-span-2'>{balance}</div>
                  <div className='satoshi hidden text-sm font-bold text-white md:col-span-2 md:block'>{usdValue}</div>
                  <div className='satoshi hidden text-sm font-bold text-white md:col-span-2 md:block'>{percentage}</div>
                </div>
              )
            })}
          </Section>

          <div className='mt-5  h-[5px] w-4/12 rounded-[10px] bg-[#D9D9D9] md:hidden'></div>
        </article>

        {/* INFLOW AND OUTFLOW */}
        <div className='mt-5 flex w-full flex-col gap-5 md:w-[23%]'>
          {[
            { title: 'Inflow (30d)', amount: '$ 2.3m' },
            { title: 'Outflow (30d)', amount: '$ 1.9m' },
          ].map(({ title, amount }, index) => {
            return (
              <div className='flex w-full flex-col gap-5 rounded-2xl bg-vdao-dark py-5 px-[30px] pt-5 md:px-7 md:pb-10'>
                <div className='satoshi text-lg font-medium leading-5 text-white'>{title}</div>
                <div className='satoshi text-[32px] font-bold leading-8 text-vdao-light'>{amount}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export function TitleComponent() {
  return <div className='clash pb-10 text-[44px] font-medium text-vdao-light md:pt-20 md:pb-28 md:text-7xl'>Analytics</div>
}
