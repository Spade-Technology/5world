import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import CustomModal from '~/components/misc/customModal'
import { PraiseInfo, VotesInfo } from './votesNscoresInfo'
import { useUserRead, useUserReads } from '~/hooks/web3/useUser'
import { useAccount } from 'wagmi'
import Pagination from '~/components/misc/pageNation'

type Props = {
  show: boolean
  close: Dispatch<SetStateAction<boolean>>
}

const VotesNscores = ({ show, close }: Props) => {
  const [pageCount, setPageCount] = useState(1)
  const [pageNumbers, setPageNumbers] = useState<any>([])
  const [updatedInfo, setUpdatedInfo] = useState<any>([])
  const [delegated, setDelegated] = useState(true)
  const itemsPerPage = 10
  const { address } = useAccount()
  const { data } = useUserRead({
    address: address!,
    include: {
      stewardVotesAsCandidate: true,
      stewardVotesAsVoter: true,
    },
  })

  console.log('data', data)

  /** The following two useEffects are for Pagination functionality. */
  useEffect(() => {
    const info = delegated ? VotesInfo : PraiseInfo
    if (info) {
      let pageCountArr = []
      let count = 0
      for (let i = 0; i < info?.length; i++) {
        if ((i + 1) % itemsPerPage === 0) {
          count = count + 1
          pageCountArr.push(count)
        }
      }

      if (info.length % itemsPerPage !== 0) {
        pageCountArr.push(count + 1)
      }

      setPageNumbers(pageCountArr)
    }
  }, [delegated, VotesInfo])

  useEffect(() => {
    const info = delegated ? VotesInfo : PraiseInfo
    if (pageCount && info) {
      let updatedArr = []
      const startBlog = itemsPerPage * (pageCount - 1)
      const endBlog = (pageCount - 1) * itemsPerPage + itemsPerPage <= info.length ? (pageCount - 1) * itemsPerPage + itemsPerPage : info.length

      for (let i = startBlog; i < endBlog; i++) {
        updatedArr.push(info[i])
      }

      setUpdatedInfo(updatedArr)
    }
  }, [pageCount, delegated, VotesInfo])

  return (
    <CustomModal show={show} close={close} externalStyle='w-full md:w-fit'>
      <div className='w-[431px] font-body text-lg font-normal'>
        <div className='flex gap-5 border-b-[1px] border-b-vdao-dark pb-2 font-semibold'>
          <div onClick={() => setDelegated(true)} className={` cursor-pointer ${delegated ? 'text-vdao-light' : ''}`}>
            Delegated Votes
          </div>
          <div onClick={() => setDelegated(false)} className={` cursor-pointer ${!delegated ? 'text-vdao-light' : ''}`}>
            Praise Score
          </div>
        </div>

        <div className='px-12 py-6 text-sm'>
          {updatedInfo &&
            updatedInfo.map((info: any, idx: number) => {
              return (
                <div className='flex justify-between py-[10px]' key={idx}>
                  <div>{info?.address}</div>
                  <div className='font-semibold'>{delegated ? info.name : info.score}</div>
                </div>
              )
            })}
          <div></div>
          <div></div>
        </div>
        <Pagination pageNumbers={pageNumbers} pageCount={pageCount} setPageCount={setPageCount} outerClass='justify-center' innerClass='py-0' />
      </div>
    </CustomModal>
  )
}

export default VotesNscores
