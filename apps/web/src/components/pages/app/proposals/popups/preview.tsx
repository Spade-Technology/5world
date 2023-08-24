import { Dispatch, SetStateAction } from 'react'
import { useAccount } from 'wagmi'
import ProfileCard from '~/components/misc/profileCard'
import { useUserReads } from '~/hooks/web3/useUser'
import { abiItem } from '~/server/api/routers/etherscan'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'
import { shortenAddress } from '~/utils/helpers'
import { Spell } from './createProposal'
import { Slider, Typography } from 'antd'

type PreviewProps = {
  setNextForm: Dispatch<SetStateAction<boolean>>
  setShowPreview: (preview: boolean) => void
  submit: any
  title: string
  description: string
  callDatas: string[]
  spells: Spell[]
  loading: boolean
}

const Preview = ({ title, description, callDatas, setNextForm, setShowPreview, submit, loading }: PreviewProps) => {
  const { address } = useAccount()
  const { data } = useUserReads({ search: address })

  return (
    <div className='max-w-screen overflow-hidden pb-[14px] font-body text-lg font-normal text-vdao-dark md:max-h-[751px] md:pb-6'>
      <div className=' w-fit rounded-[20px] bg-vdao-dark py-[7px] px-8 font-heading font-medium text-vdao-light md:px-[38px] md:text-xl'>Preview your proposal</div>

      <div className='pt-5 font-heading text-[26px] font-medium md:pt-9 md:text-[30px]'>{title}</div>
      <div className='pt-5'>{data && data[0] && <ProfileCard icon={data[0]?.picture} name={data[0]?.name ? data[0]?.name : 'UnNamed'} address={data[0]?.address} />}</div>

      <div className='grid grid-cols-1 gap-10 pt-[30px] md:grid-cols-2 md:gap-[70px] md:pt-10'>
        <div>
          <div className='text-[22px] font-bold md:text-lg'>Description</div>
          <div className='pt-4 md:pt-5'>{description}</div>
        </div>
        <div>
          <div>Calldata:</div>

          <Typography.Paragraph
            className='text-[#909090]'
            ellipsis={{
              rows: 3,
              expandable: true,
            }}
          >
            {callDatas ? callDatas.join('  --  ') : 'No calldatas'}
          </Typography.Paragraph>

          <div className='float-right flex gap-5 pt-5 md:pt-[77px]'>
            <div
              className='flex cursor-pointer items-center rounded-[5px] border-[1px] border-vdao-dark py-[5px] px-[35px] font-heading text-xl font-medium'
              onClick={() => {
                setNextForm(true)
                setShowPreview(false)
              }}
            >
              Previous
            </div>
            <PrimaryButton loading={loading} text='Submit' className='px-[35px] font-heading text-lg font-medium' onClick={submit} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Preview
