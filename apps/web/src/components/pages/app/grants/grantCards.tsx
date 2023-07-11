import Image from 'next/image'
import ProfileCard from '~/components/misc/profileCard'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'
import WhiteButton from '~/styles/shared/buttons/whiteButton'
import { GrantDetails, CardDetails } from './cardDetails'
import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import grantImage from 'public/illustrations/grants/image5.svg'
import { useRouter } from 'next/router'
import Pagination from '~/components/misc/pageNation'

type CardProps = {
  details: any
  setViewDetails: Dispatch<SetStateAction<boolean>>
}

type Props = {
  setViewDetails: Dispatch<SetStateAction<boolean>>
}

type GrantProps = {
  grant: any
}

const GrantCards = ({ setViewDetails }: Props) => {
  const [grant, setGrant] = useState({})
  const router = useRouter()
  console.log('routerInfo', router, router.query, typeof parseFloat(router.query.id))

  const [pageCount, setPageCount] = useState(1)
  const [pageNumbers, setPageNumbers] = useState<any>([])
  const [updatedRounds, setUpdatedRounds] = useState<any>([])

  const itemsPerPage = 3

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
      const endBlog = (pageCount - 1) * itemsPerPage + 3 <= GrantDetails.length ? (pageCount - 1) * itemsPerPage + 3 : GrantDetails.length

      for (let i = startBlog; i < endBlog; i++) {
        updatedRoundsArr.push(GrantDetails[i])
      }

      setUpdatedRounds(updatedRoundsArr)
    }
  }, [pageCount])

  useEffect(() => {
    if (router.query.id) {
      const id: number = parseFloat(router.query.id)
      const details = GrantDetails.filter(grant => {
        return id === grant.id
      })
      console.log('details', details[0])
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
          updatedRounds.map((grant:any, idx:number) => {
            return <CurrentRound grant={grant} key={idx} />
          })
        )}
      <Pagination web3 pageNumbers={pageNumbers} pageCount={pageCount} setPageCount={setPageCount} />

        {grant && (
          <div>
            <div id='currentGrants' className='mx-6 mt-20 flex max-w-[1280px] justify-between font-heading text-[32px] font-medium text-vdao-light md:mx-auto md:text-[46px]'>
              <div>Current Grants</div>
              <div className='text-white underline underline-offset-4 opacity-75 cursor-pointer' onClick={() => router.push('/app/grants')}>
                Past Rounds
              </div>
            </div>
            <div className='font-heading text-xl font-medium text-vdao-light'>your available voting power: {grant?.votingPower}</div>
            <div className='mx-6 mt-5 grid grid-cols-1 gap-5 md:mx-0 md:grid-cols-2'>
              {grant?.currentGrants &&
                grant?.currentGrants?.map((details: any, idx: number) => {
                  return <Card details={details} setViewDetails={setViewDetails} key={idx} />
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export const CurrentRound = ({ grant }: GrantProps) => {
  const router = useRouter()
  return (
    <div className=' mt-10 w-full rounded-[40px] bg-vdao-dark pl-10 pt-10 pr-5 text-white'>
      <div className='flex gap-3 font-heading text-3xl font-medium'>
        {grant.title}
        <div className='my-auto rounded-[20px] border-[1px] border-vdao-light px-9 py-1 font-body text-lg text-vdao-light'> {grant.status} </div>
      </div>

      <div className='flex justify-between'>
        <div className='mt-5'>
          <div className='font-heading text-[26px] font-medium text-vdao-light'>Rules</div>
          <div className='mt-5 text-lg font-normal '>
            {grant?.rules?.map((rule: any, idx: number) => {
              return (
                <div key={idx}>
                  {rule}
                  {idx !== grant.rules.length - 1 && <br />}
                  <br />
                </div>
              )
            })}
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
              Proposed by <span className='font-medium text-vdao-light underline underline-offset-2'>Brieyla</span>
            </div>
          </div>
        </div>
        <Image src={grantImage} alt='grantImage' />
      </div>
    </div>
  )
}

export const Card = ({ details, setViewDetails }: CardProps) => {
  return (
    <div className='rounded-[20px] bg-white'>
      <Image src={details.image} width={700} alt='image' />
      <div className='px-[50px] py-10'>
        <div className='font-heading text-[30px] font-medium'>{details.title}</div>

        <div className='flex justify-between'>
          <div>
            <ProfileCard />
          </div>

          <div className='my-auto text-lg font-bold'>Last Update: {details.lastUpdated}</div>
        </div>

        <div className='pt-[30px] text-lg font-normal'>{details.description}</div>

        <PrimaryButton text='View Detail' className='mt-[30px] py-[5px] px-[35px] text-xl font-medium' onClick={() => setViewDetails(true)} />

        <div className='pt-11 text-xl font-medium'>Delegate your vote</div>

        <div className='flex gap-[10px] pt-[18px] pb-[14px]'>
          <WhiteButton text='60' className='border-[1px] border-vdao-dark py-[5px] font-heading text-xl' />

          <PrimaryButton text='Vote' className='py-[5px] font-heading text-xl' />
        </div>
      </div>
    </div>
  )
}

export default GrantCards
