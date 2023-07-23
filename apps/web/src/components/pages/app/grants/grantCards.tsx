import Image from 'next/image'
import ProfileCard from '~/components/misc/profileCard'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'
import { GrantDetails, GrantStatus } from './cardDetails'
import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import grantImage from 'public/illustrations/grants/image5.svg'
import { useRouter } from 'next/router'
import Pagination from '~/components/misc/pageNation'
import { useAccount, useToken } from 'wagmi'
import { currentChainId } from '~/config/contracts'
import { useVote } from '~/hooks/web3/useStewards'

type CardProps = {
  grant: any
  details: any
  setViewDetails: Dispatch<SetStateAction<boolean>>
  setRequestId: Dispatch<SetStateAction<number>>
  id: number
}

type Props = {
  setViewDetails: Dispatch<SetStateAction<boolean>>
  setRequestId: Dispatch<SetStateAction<number>>
}

type GrantProps = {
  grant: any
}

const GrantCards = ({ setViewDetails, setRequestId }: Props) => {
  const [grant, setGrant] = useState({})
  const router = useRouter()
  const { address } = useAccount()
  const [pageCount, setPageCount] = useState(1)
  const [pageNumbers, setPageNumbers] = useState<any>([])
  const [updatedRounds, setUpdatedRounds] = useState<any>([])

  const [requestCount, setRequestCount] = useState(1)
  const [requestNumbers, setRequestNumbers] = useState<any>([])
  const [updatedRequest, setUpdatedRequest] = useState<any>([])

  const itemsPerPage = 3
  const requestPerPage = 4

  /** The following two useEffects are for Pagination functionality. */
  useEffect(() => {
    if (GrantDetails.length) {
      let pageCountArr = []
      let count = 0
      for (let i = 0; i < GrantDetails.length; i++) {
        if ((i + 1) % itemsPerPage === 0) {
          count = count + 1
          pageCountArr.push(count)
        }
      }

      if (GrantDetails.length % itemsPerPage !== 0) {
        pageCountArr.push(count + 1)
      }

      setPageNumbers(pageCountArr)
    }
  }, [GrantDetails.length])

  useEffect(() => {
    if (pageCount) {
      let updatedRoundsArr = []
      const startBlog = itemsPerPage * (pageCount - 1)
      const endBlog = (pageCount - 1) * itemsPerPage + itemsPerPage <= GrantDetails.length ? (pageCount - 1) * itemsPerPage + itemsPerPage : GrantDetails.length

      for (let i = startBlog; i < endBlog; i++) {
        updatedRoundsArr.push(GrantDetails[i])
      }

      setUpdatedRounds(updatedRoundsArr)
    }
  }, [pageCount])

  useEffect(() => {
    const request = grant?.requests
    if (request?.length) {
      let pageCountArr = []
      let count = 0
      for (let i = 0; i < request?.length; i++) {
        if ((i + 1) % requestPerPage === 0) {
          count = count + 1
          pageCountArr.push(count)
        }
      }

      if (request?.length % requestPerPage !== 0) {
        pageCountArr.push(count + 1)
      }

      setRequestNumbers(pageCountArr)
    }
  }, [GrantDetails.length, grant?.requests, address])

  useEffect(() => {
    const request = grant?.requests
    if (requestCount) {
      let updatedRequestArr = []
      const startRequest = requestPerPage * (requestCount - 1)
      const endRequest = (requestCount - 1) * requestPerPage + requestPerPage <= request?.length ? (requestCount - 1) * requestPerPage + requestPerPage : request?.length

      for (let i = startRequest; i < endRequest; i++) {
        updatedRequestArr.push(request[i])
      }

      setUpdatedRequest(updatedRequestArr)
    }
  }, [requestCount, requestNumbers, address])

  useEffect(() => {
    if (router.query.id) {
      const id: number = parseFloat(router.query.id)
      const details = GrantDetails.filter(grant => {
        return id === grant.id
      })
      setGrant(details[0])
    } else {
      setGrant('')
    }
  }, [router, GrantDetails])

  return (
    <div className='mx-auto w-screen max-w-[1140px] bg-vdao-deep'>
      <div className='mx-auto max-w-[1280px] pb-[120px] font-body'>
        {grant ? (
          <CurrentRound grant={grant} />
        ) : (
          updatedRounds.map((grant: any, idx: number) => {
            return <CurrentRound grant={grant} key={idx} />
          })
        )}
        {!grant && <Pagination web3 pageNumbers={pageNumbers} pageCount={pageCount} setPageCount={setPageCount} />}

        {grant && (
          <div>
            <div id='currentGrants' className='mx-6 mt-20 flex max-w-[1280px] justify-between font-heading text-[32px] font-medium text-vdao-light md:mx-auto md:text-[46px]'>
              <div>Current Grants</div>
              <div className='cursor-pointer text-white underline underline-offset-4 opacity-75' onClick={() => router.push('/app/grants')}>
                Past Rounds
              </div>
            </div>
            <div className='font-heading text-xl font-medium text-vdao-light'>your available voting power: {grant?.votingPower ? grant?.votingPower : '0'}</div>
            <div className='mx-6 mt-5 grid grid-cols-1 gap-5 md:mx-0 md:grid-cols-2'>
              {updatedRequest &&
                updatedRequest?.map((details: any, idx: number) => {
                  return <Card grant={grant} details={details} setViewDetails={setViewDetails} setRequestId={setRequestId} key={idx} id={idx} />
                })}
            </div>
          </div>
        )}

        {grant?.requests && <Pagination web3 pageNumbers={requestNumbers} pageCount={requestCount} setPageCount={setRequestCount} />}
      </div>
    </div>
  )
}

export const CurrentRound = ({ grant }: GrantProps) => {
  const router = useRouter()

  const { data } = useToken({ chainId: currentChainId, address: grant?.tokenAddress })
  // console.log({data})

  return (
    <div className=' mt-10 w-full rounded-[40px] bg-vdao-dark pl-10 pt-10 pr-5 text-white'>
      <div className='flex gap-3 font-heading text-3xl font-medium'>
        {grant.title}
        <div className='my-auto rounded-[20px] border-[1px] border-vdao-light px-9 py-1 font-body text-lg text-vdao-light'> {grant?.status && GrantStatus[grant?.status]} </div>
      </div>

      <div className='flex justify-between'>
        <div className='mt-5 mb-10 flex flex-col justify-between'>
          <div className='font-heading text-[26px] font-medium text-vdao-light'>Rules</div>
          <div className='mt-5 text-lg font-normal '>
            {grant?.rules}
            {/* {grant?.rules?.map((rule: any, idx: number) => {
              return (
                <div key={idx}>
                  {rule}
                  {idx !== grant.rules.length - 1 && <br />}
                  <br />
                </div>
              )
            })} */}
          </div>
          <div className='flex gap-10'>
            <div
              className='mt-5 cursor-pointer text-lg font-bold underline underline-offset-2'
              onClick={() => {
                // if (grant.id === grantID) {
                //   setGrantID(null)
                // } else {
                router.push(`/app/grants?id=${grant.id}`)
                //   setGrantID(grant.id)
                // }
              }}
            >
              View all rounds
            </div>
            <div className='mt-5 flex gap-1 text-lg'>
              Proposed by <span className='font-medium text-vdao-light underline underline-offset-2'>{grant?.proposedBy}</span>
            </div>
            <div className='mt-5 flex gap-1 text-lg'>Matching Amount: {grant?.matchingAmount ? grant?.matchingAmount : '0.00'}</div>
          </div>
        </div>
        <Image src={grantImage} alt='grantImage' />
      </div>
    </div>
  )
}

export const Card = ({ details, setViewDetails, grant, id, setRequestId }: CardProps) => {
  const router = useRouter()
  const [disableBtn, setDisableBtn] = useState(false)
  const currentTimeStamp = Math.floor(Date.now() / 1000)
  const [votes, setVotes] = useState('')
  const { vote } = useVote()
  const { address } = useAccount()

  const votesHandler = () => {
    const candidateAddress = ''
    if (votes && address && candidateAddress) {
      vote({ voterAddress: address, candidateAddress: candidateAddress, amount: parseFloat(votes), message: '' })
    }
  }

  useEffect(() => {
    const grant = GrantDetails[Number(router.query.id)]
    console.log('currentTimeStamp', currentTimeStamp, grant?.roundStartBlock, grant?.roundEndBlock)

    if (grant && currentTimeStamp > grant?.roundStartBlock! && currentTimeStamp < grant?.roundEndBlock!) {
      setDisableBtn(false)
    } else {
      setDisableBtn(true)
    }
  }, [currentTimeStamp, GrantDetails])

  return (
    <div className='rounded-[20px] bg-white'>
      <Image src={details.image} width={700} alt='image' />
      <div className='px-[50px] py-10'>
        <div className='font-heading text-[30px] font-medium'>{details.title}</div>

        <div className='flex justify-between'>
          <div>
            <ProfileCard icon={grant?.picture} name={grant?.proposedBy} address={grant?.address} />
          </div>
          {details?.lastUpdated && <div className='my-auto text-lg font-bold'>Last Update: {new Date(details?.lastUpdated * 1000).toDateString()}</div>}
        </div>

        <div className='pt-[30px] text-lg font-normal'>{details.description}</div>

        <PrimaryButton
          text='View Detail'
          className='mt-[30px] text-xl font-medium'
          onClick={() => {
            setViewDetails(true)
            setRequestId(id)
          }}
        />

        <div className='pt-11 text-xl font-medium'>Delegate token</div>

        <div className='flex gap-[10px] pt-[18px] pb-[14px]'>
          {/* <input text='60' className='border-[1px] border-vdao-dark pt-[5px] font-heading text-xl' /> */}
          <input
            placeholder='60'
            className='max-h-10 w-[82px] rounded-md border-[1px] border-vdao-dark px-2 text-center font-heading text-xl font-medium text-vdao-dark outline-none'
            value={votes}
            onChange={evt => setVotes(evt.target.value)}
          />
          <PrimaryButton text='Vote' disabled={disableBtn} className={`font-heading text-xl`} onClick={votesHandler} />
        </div>
      </div>
    </div>
  )
}

export default GrantCards
