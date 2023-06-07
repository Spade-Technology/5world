import { recentProsposalInfo } from './proposalDetails'

type InsightBoxProps = {
  title: string
  value: string
}

const Insights = () => {
  return (
    <div className='mx-auto w-screen bg-vdao-deep'>
      <div className='mx-auto max-w-[1280px] pb-[120px]'>
        <div className='mx-6 max-w-[1280px] font-heading text-[32px] font-medium text-vdao-light md:mx-auto  md:text-[46px]'>
          Proposal Insights
        </div>

        <div className='mx-6 mt-[28px] grid grid-cols-1 gap-5 md:mx-auto md:mt-11 md:grid-cols-4'>
          <InsightBox title='Total Proposals' value='68' />
          <InsightBox title='Proposal Creators' value='72' />
          <InsightBox title='Lifetime Voters' value='351' />
          <InsightBox title='Voter Acceptance Rate' value='68' />
        </div>

        <RecentProposals />
      </div>
    </div>
  )
}

const InsightBox = ({ title, value }: InsightBoxProps) => {
  return (
    <div className='rounded-[20px] bg-vdao-dark py-5 px-[30px] font-body'>
      <div className='text-lg font-bold text-white'>{title}</div>
      <div className='text-[32px] font-bold text-vdao-light'> {value} </div>
    </div>
  )
}

const RecentProposals = () => {
  return (
    <div className='mx-6 mt-5 rounded-[20px] bg-vdao-dark py-5 px-[30px] font-body text-white md:mx-auto'>
      <div className='text-lg font-bold'>Recent Proposals</div>
      <div className='flex justify-between gap-[34px] overflow-x-scroll pt-[30px] pb-5 text-sm font-bold md:gap-[60px]'>
        <div className='grid-rows-7 col-start-1 col-end-3 grid min-w-[212px] gap-[10px]'>
          <div className='font-normal opacity-80'>Proposals</div>
          {recentProsposalInfo.map((proposal, idx) => {
            return <div key={idx}>{proposal.proposal}</div>
          })}
        </div>

        <div className='grid-rows-7 grid min-w-[95px] gap-[10px]'>
          <div className='my-auto font-normal opacity-80'>Start Date</div>
          {recentProsposalInfo.map((proposal, idx) => {
            return (
              <div className='my-auto' key={idx}>
                {proposal.startDate}
              </div>
            )
          })}
        </div>

        <div className='grid-rows-7 grid min-w-[95px] gap-[10px] '>
          <div className='my-auto font-normal opacity-80'>End Date</div>
          {recentProsposalInfo.map((proposal, idx) => {
            return (
              <div className='my-auto' key={idx}>
                {proposal.endDate}
              </div>
            )
          })}
        </div>

        <div className='grid-rows-7 grid gap-[10px]'>
          <div className='font-normal opacity-80'>Votes</div>
          {recentProsposalInfo.map((proposal, idx) => {
            return (
              <div className='my-auto' key={idx}>
                {proposal.votes}
              </div>
            )
          })}
        </div>

        <div className='grid-rows-7 grid min-w-[73px] gap-[10px]'>
          <div className='font-normal opacity-80'>Acceptance</div>
          {recentProsposalInfo.map((proposal, idx) => {
            return (
              <div className='my-auto' key={idx}>
                {proposal.acceptance}
              </div>
            )
          })}
        </div>

        <div className='grid-rows-7 grid gap-[10px] '>
          <div className='font-normal opacity-80'>Status</div>
          {recentProsposalInfo.map((proposal, idx) => {
            return (
              <div
                className={`${proposal.status === 'Active' ? 'text-vdao-light' : 'text-[#909090]'} my-auto"`}
                key={idx}
              >
                {proposal.status}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Insights
