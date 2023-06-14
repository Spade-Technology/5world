import { Dispatch, SetStateAction } from 'react'
import { useAccount } from 'wagmi'
import ProfileCard from '~/components/misc/profileCard'
import { useUserReads } from '~/hooks/web3/useUser'
import { abiItem } from '~/server/api/routers/etherscan'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'
import { shortenAddress } from '~/utils/helpers'

type PreviewProps = {
  setNextForm: Dispatch<SetStateAction<boolean>>
  setShowPreview: Dispatch<SetStateAction<boolean>>
  submit: any
  title: string
  description: string
  callData: string
  targets: string
  values: any
}

const Preview = ({ values, targets, title, description, callData, setNextForm, setShowPreview, submit }: PreviewProps) => {
  const { address } = useAccount()
  const { data } = useUserReads({ search: address })

  console.log({ data })
  return (
    <div className='pb-[14px] font-body text-lg font-normal text-vdao-dark md:max-h-[751px] md:pb-6 '>
      <div className=' w-fit rounded-[20px] bg-vdao-dark py-[7px] px-8 font-heading font-medium text-vdao-light md:px-[38px] md:text-xl'>Preview your proposal</div>

      <div className='pt-5 font-heading text-[26px] font-medium md:pt-9 md:text-[30px]'>{title}</div>
      <div className='pt-5'>{data && data[0] && <ProfileCard icon={data[0]?.picture} name={data[0]?.name ? data[0]?.name : 'UnNamed'} address={data[0]?.address} />}</div>

      <div className='grid grid-cols-1 gap-10 pt-[30px] md:grid-cols-2 md:gap-[70px] md:pt-10'>
        <div>
          <div className='text-[22px] font-bold md:text-lg'>Description</div>
          <div className='pt-4 md:pt-5'>
            {description}
            {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet elementum urna, in volutpat risus.
            Quisque nec tempus diam, sit amet luctus mi. Quisque auctor tortor ut nunc finibus, et venenatis lacus
            eleifend.
            <br />
            <br />
            Fusce commodo, ipsum sit amet mollis tincidunt, ipsum nibh bibendum arcu, in egestas lectus justo eget
            massa. Nam quis aliquet erat, in dignissim purus. In viverra orci sit amet ex vestibulum aliquet. Sed luctus
            aliquet ullamcorper. Praesent non turpis at leo luctus semper. Suspendisse eget dapibus lorem. Vivamus eu
            arcu et metus congue vulputate ut quis mi. Nam quis dolor non orci luctus iaculis quis at nisi. */}
          </div>
        </div>
        <div>
          <div className='text-[22px] font-bold md:text-lg'>Actions</div>
          <div className='mt-[30px] rounded-[10px] border-[1px] border-vdao-dark py-8 px-5 md:mt-5 md:p-[30px]'>
            <div>Calldatas:</div>
            <div className='text-[#909090]'>{callData ? shortenAddress(callData) : 'No calldatas'}</div>

            <div className='pt-6'>Target:</div>
            <div className='text-[#909090]'>{targets ? shortenAddress(targets) : 'No target'}</div>

            <div className='pt-6'>Value:</div>
            <div className='text-[#909090]'>{values && values?.spender ? 'spender : ' + shortenAddress(values?.spender) : ''} </div>
            <div className='text-[#909090]'>{values && values?.to ? 'to : ' + shortenAddress(values?.to) : ''} </div>
          </div>

          <div className='float-right flex gap-5 pt-5 md:pt-[77px]'>
            <div
              className='cursor-pointer rounded-[5px] border-[1px] border-vdao-dark py-[5px] px-[35px] font-heading text-lg font-medium'
              onClick={() => {
                setNextForm(true)
                setShowPreview(false)
              }}
            >
              Previous
            </div>
            <PrimaryButton text='Submit' className=' py-[5px] px-[35px] font-heading text-lg font-medium' onClick={() => submit()} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Preview
