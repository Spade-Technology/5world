import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import PageNation from '~/components/misc/pageNation'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'
// import { proposalDetails } from './proposalDetails'
import ProfileCard from '~/components/misc/profileCard'
import { useProposalReads } from '~/hooks/web3/useProposal'
import { monthNames } from '~/utils/date'
import DummyIcon from 'public/icons/pods/icon1.svg'

type ProposalProps = {
  setViewProposal: Dispatch<SetStateAction<boolean>>
  setProposalID: Dispatch<SetStateAction<number>>
}

type CardProps = {
  proposal: any
  setViewProposal: Dispatch<SetStateAction<boolean>>
  setProposalID: Dispatch<SetStateAction<number>>
}

const ProposalCards = ({ setProposalID, setViewProposal }: ProposalProps) => {
  const [pageCount, setPageCount] = useState(1)
  const [pageNumbers, setPageNumbers] = useState<any>([])
  const [updatedproposals, setUpdatedProposals] = useState<any>([])
  const [proposalsType, setProposalsType] = useState('')
  const { data } = useProposalReads({ include: { author: true, pod: true } })
  const [updatedData, setUpdatedData] = useState<any>([])
  const itemsPerPage = 3

  useEffect(() => {
    const timer = setTimeout(() => {
      setProposalsType('all')
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    if (proposalsType === 'closed') {
      const newData = data?.filter((proposal: any, idx: any) => {
        return proposal?.vetoed
      })
      setUpdatedData(newData)
    } else if (proposalsType === 'active') {
      const newData = data?.filter((proposal: any, idx: any) => {
        return !proposal?.canceled && !proposal?.executed && !proposal?.vetoed
      })
      setUpdatedData(newData)
    } else {
      setUpdatedData(data)
    }
  }, [data, proposalsType])

  /** The following two useEffects are for Pagenation functionality. */
  useEffect(() => {
    if (updatedData) {
      let pageCountArr = []
      let count = 0
      for (let i = 0; i < updatedData?.length; i++) {
        if ((i + 1) % itemsPerPage === 0) {
          count = count + 1
          pageCountArr.push(count)
        }
      }

      if (updatedData.length % itemsPerPage !== 0) {
        pageCountArr.push(count + 1)
      }

      setPageNumbers(pageCountArr)
    } else {
      setPageNumbers([])
    }
  }, [updatedData])

  useEffect(() => {
    if (pageCount && updatedData) {
      let updatedBlogsArr = []
      const startBlog = itemsPerPage * (pageCount - 1)
      const endBlog = (pageCount - 1) * itemsPerPage + 3 <= updatedData.length ? (pageCount - 1) * itemsPerPage + 3 : updatedData.length

      for (let i = startBlog; i < endBlog; i++) {
        updatedBlogsArr.push(updatedData[i])
      }

      setUpdatedProposals(updatedBlogsArr)
    } else {
      setUpdatedProposals([])
    }
  }, [pageCount, updatedData])

  return (
    <div className='mx-auto w-full bg-vdao-deep px-6 pt-[63px]'>
      <div className='mx-auto w-full max-w-[1140px] pb-[120px]'>
        <div id='allProposals' className='max-w-[1280px] font-heading text-[32px] font-medium text-vdao-light md:mx-auto md:text-[46px]'>
          Proposals
        </div>

        <div className='mt-5 grid max-w-[450px] grid-cols-3 rounded-[100px] border-[1px] border-vdao-light font-heading text-xl text-vdao-light'>
          {['all', 'active', 'closed'].map(item => {
            return (
              <div
                onClick={() => setProposalsType(item)}
                className={`relative cursor-pointer rounded-[100px]  py-2 text-center font-medium duration-300 ${proposalsType === item ? 'bg-vdao-light text-vdao-dark opacity-100' : ''}`}
              >
                {item}
              </div>
            )
          })}
        </div>

        <div className='mt-[15px]  md:mx-0 '>
          {updatedproposals && updatedproposals.length > 0 ? (
            updatedproposals?.map((proposal: any, idx: number) => {
              return <Card proposal={proposal} key={idx} setViewProposal={setViewProposal} setProposalID={setProposalID} />
            })
          ) : (
            <div className=''>
              <div className='text-3xl text-white'>No proposals available</div>
            </div>
          )}
        </div>

        <PageNation pageNumbers={pageNumbers} pageCount={pageCount} setPageCount={setPageCount} web3 />
      </div>
    </div>
  )
}

export const Card = ({ proposal, setViewProposal, setProposalID }: CardProps) => {
  const proposalStatus = proposal?.canceled ? 'Canceled' : proposal?.executed ? 'Executed' : proposal?.vetoed ? 'Vetoed' : 'Active'

  return (
    <div className='mt-[20px] overflow-hidden rounded-[20px] bg-white px-5 py-10 font-body text-vdao-dark md:mt-[30px] md:p-8 lg:p-[50px]'>
      <div className='flex flex-col justify-between md:flex-row'>
        <div className='w-full flex-1 md:max-w-[412px]'>
          <div className='text-lg font-semibold'>
            {proposal?.createdAt ? 'Posted ' + monthNames[proposal.createdAt.getUTCMonth()]?.name + ' ' + proposal.createdAt.getDate() + ', ' + proposal.createdAt.getFullYear() : 'at Unavailable'}
          </div>
          <div className='overflow-hidden overflow-ellipsis break-all pt-[10px] text-3xl font-medium'>{proposal?.title}</div>

          <ProfileCard icon={proposal?.author?.picture ? proposal?.author?.picture : DummyIcon} name={proposal?.author?.name} address={proposal?.author?.address} />

          <div className={`mt-[30px] w-fit cursor-pointer rounded-[20px] border-[1px] border-vdao-dark px-9 py-[5px] text-lg font-medium text-vdao-light`}>{proposalStatus}</div>
        </div>
        <div className='md:w-1/3'>
          <div className='overflow-hidden overflow-ellipsis pt-7 text-lg font-normal md:pt-9'>{proposal.description}</div>
          <PrimaryButton
            text='View Detail'
            spanClass='!text-center !justify-center '
            className='mt-[30px]'
            onClick={() => {
              setProposalID(proposal?.id)
              setViewProposal(proposal)
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default ProposalCards
