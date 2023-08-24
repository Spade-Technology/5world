import Image from 'next/image'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useState } from 'react'
import { useAccount } from 'wagmi'
import ProfileCard from '~/components/misc/profileCard'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'
import { CurrentRound } from './grantSearch'

import { writeContract } from '@wagmi/core'
import { encodePacked } from 'viem'
import RoundImplementation from '~/abi/RoundImplementation.json'
import { Spin, Tooltip } from 'antd'
import { Button } from '~/components/ui/button'

type CardProps = {
  details: any
  setViewDetails: Dispatch<SetStateAction<boolean>>
  setRequestId: Dispatch<SetStateAction<number>>
  addToCart: Function
  state: bigint
  loading: boolean
}

type Props = {
  setViewDetails: Dispatch<SetStateAction<boolean>>
  grant: any
  votingPowerEnabled: boolean
  votingPower: any
  setRequestId: Dispatch<SetStateAction<number>>
  addToCart: Function
  cart: any[]
  removeFromCart: Function
  votesHandler: () => {}
  loading: boolean
  voted: any
}

type GrantProps = {
  grant: any
}

const formatter = Intl.NumberFormat('en', { notation: 'compact', compactDisplay: 'short' })

const GrantItem = ({ setViewDetails, grant, votingPowerEnabled, votingPower, setRequestId, voted, addToCart, cart, removeFromCart, votesHandler, loading }: Props) => {
  const router = useRouter()

  return (
    <div className='mx-auto w-screen max-w-[1140px] bg-vdao-deep'>
      <div className='mx-auto max-w-[1280px] pb-[120px] font-body'>
        {grant ? (
          <div>
            <CurrentRound grant={grant} />
            <div className='flex flex-col'>
              {cart.length > 0 && (grant.state === 3n || voted) && (
                <>
                  <div className='mx-6 mt-20 flex max-w-[1280px] flex-col justify-between font-heading text-[32px] font-medium text-vdao-light md:mx-auto md:flex-row md:text-[46px]'>Your Cart</div>
                  {cart.map((el: any) => {
                    return (
                      <div className='mt-8 flex '>
                        <Image src={el.image} height={64} width={64} alt='image' className='h-16 w-16 rounded-full' />
                        <div className='ml-4'>
                          <div className='font-heading text-[20px] font-medium text-white'>{el.name}</div>
                          <div className='font-body text-[16px] font-normal text-white'>{el.description}</div>
                        </div>

                        <div className='my-auto ml-auto font-heading text-2xl font-medium text-white'>Voting Power: {formatter.format(Number(el.temporaryVotes / 10n ** 18n))} V</div>

                        <div className='my-auto ml-8 cursor-pointer font-heading text-2xl font-medium' onClick={() => removeFromCart(el.proposalId)}>
                          X
                        </div>
                      </div>
                    )
                  })}

                  <div className='mt-16 flex gap-8'>
                    <div className='my-auto mr-auto font-heading text-2xl font-medium text-white'>
                      Total Votes: {formatter.format(Number(cart.reduce((acc, el) => acc + el.temporaryVotes, 0n) / 10n ** 18n))} V
                    </div>
                    <PrimaryButton loading={loading} disabled={votingPower < cart.reduce((acc, el) => acc + el.temporaryVotes, 0n)} onClick={votesHandler}>
                      Vote !
                    </PrimaryButton>
                    {votingPower < cart.reduce((acc, el) => acc + el.temporaryVotes, 0n) && <div className='my-auto font-heading text-lg font-medium text-red-500'>Insufficient Voting Power</div>}
                  </div>
                </>
              )}
            </div>
            <div id='currentGrants' className='mx-6 mt-20 flex max-w-[1280px] flex-col justify-between font-heading text-[32px] font-medium text-vdao-light md:mx-auto md:flex-row md:text-[46px]'>
              <div>
                Grant Requests
                {votingPowerEnabled && <div className='font-heading text-xl font-medium text-vdao-light'>your available voting power: {votingPower}</div>}
              </div>
              <div className='cursor-pointer text-white underline underline-offset-4 opacity-75' onClick={() => router.push('/app/grants')}>
                Past Rounds
              </div>
            </div>
            <div className='mx-6 mt-5 grid grid-cols-1 gap-5 md:mx-0 md:grid-cols-2'>
              {grant?.requests && grant?.requests.length > 0 ? (
                grant?.requests?.map((details: any, idx: number) => {
                  return <Card details={details} setViewDetails={setViewDetails} key={idx} setRequestId={setRequestId} state={grant.state} addToCart={addToCart} loading={loading} />
                })
              ) : (
                <div className='flex h-52 w-full items-center justify-center text-xl font-medium text-vdao-light md:col-span-2'>No requests yet</div>
              )}
            </div>
          </div>
        ) : (
          <div className='flex h-96 w-full items-center justify-center'>
            <Spin size='large' />
          </div>
        )}
      </div>
    </div>
  )
}

export const Card = ({ details, setViewDetails, setRequestId, state, addToCart, loading }: CardProps) => {
  const { address } = useAccount()
  const [votes, setVotes] = useState('')

  return (
    <div className='rounded-[20px] bg-white'>
      <Image
        src={details.image}
        height={300}
        width={700}
        alt='image'
        style={{
          borderRadius: '20px 20px 0 0',
          maxHeight: '300px',
        }}
      />
      <div className='px-[50px] py-10'>
        <div className='font-heading text-[30px] font-medium'>{details.name}</div>

        <div className='flex justify-between'>
          <div>
            <ProfileCard address={details?.user?.address} name={details?.user?.name} icon={details?.user?.picture} />
          </div>
        </div>

        <div className='pt-[30px] text-lg font-normal'>{details.description}</div>

        {/* <div className='pt-11 text-xl font-medium'>Delegate your vote</div> */}

        <div className='mt-[30px] flex justify-end gap-[10px] pt-[18px] pb-[14px]'>
          <input
            placeholder='60'
            className='max-h-10 w-[100px] rounded-md border-[1px] border-vdao-dark px-2 text-center font-heading text-xl font-medium text-vdao-dark outline-none'
            value={votes}
            onChange={evt => setVotes(evt.target.value)}
          />
          <Tooltip
            color='white'
            title={<div className='text-black'>{state !== 3n ? 'voting is only enabled during the review phase (after the application phase)' : 'Vote now !'}</div>}
            placement='top'
          >
            <div>
              <PrimaryButton loading={loading} text='Add To Cart' className={`font-heading text-xl`} disabled={state !== 3n} onClick={() => addToCart(details, votes)} />
            </div>
          </Tooltip>
        </div>

        <PrimaryButton
          text='View Detail'
          className='] w-full py-[5px] px-[35px] text-xl font-medium'
          onClick={() => {
            setRequestId(Number(details.proposalId))
            setViewDetails(true)
          }}
        />
      </div>
    </div>
  )
}

export default GrantItem
