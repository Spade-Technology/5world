import Image from 'next/image'
import React, { useState } from 'react'
import { Section } from '~/components/layout/section'
import dynamic from 'next/dynamic'
import { LinearChart } from '../../mockData'
import Insights from '../proposals/insights'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export function ProposalComponent() {
  return <Insights />
}

export function MembershipComponent() {
  const [duration, setDuration] = useState<any>({ treasury: '7d', members: '7d' })

  const charts = LinearChart()

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
    <div className='md:pb-[120px]'>
      <div className='clash pb-9 text-[26px] font-medium text-white md:pb-10 md:text-3xl'>Membership & Treasury</div>

      <div className='flex flex-wrap justify-between gap-5 md:gap-0'>
        {[
          { title: 'Members', amount: '291' },
          { title: 'Membership Value', amount: '$ 350' },
          { title: 'Treasury Holdings', amount: '$ 3.5m' },
          { title: 'Liquid Holdings', amount: '$ 1.9m' },
        ].map(({ title, amount }) => {
          return (
            <div className='flex w-full flex-col gap-5 rounded-2xl bg-vdao-dark px-[30px] py-5 pt-5 md:w-[48%] md:px-7 md:pb-10 lg:w-[23%] md:mt-5 lg:mt-0'>
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
            type: 'members',
          },
          {
            title: 'Treasury Growth',
            period: ['7d', '1m', '6m', '1y'],
            percent: '121.15% Last 1 Year',
            type: 'treasury',
          },
        ].map(({ title, period, percent, type }, index) => {
          return (
            <div key={index} className='mt-5 flex w-full flex-col rounded-2xl bg-vdao-dark pr-7 pt-5 pb-10 md:w-[48.5%]'>
              <div className='flex items-center justify-between pl-7'>
                <div className='satoshi text-lg font-bold leading-[22px] text-white'>{title}</div>
                <div className='flex gap-5'>
                  {period.map(time => {
                    return (
                      <div
                        onClick={() => setDuration({ ...duration, [type]: time })}
                        className={`satoshi cursor-pointer text-sm font-normal leading-5 ${duration[type] !== time ? 'text-white' : 'text-vdao-light'}`}
                      >
                        {time}
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className='satoshi pl-7 text-sm font-normal leading-5 text-white'>{percent}</div>
              <Chart options={LinearChart(duration[type]).options} series={LinearChart(duration[type]).series} type='line' width={'100%'} height={'333px'} />
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
