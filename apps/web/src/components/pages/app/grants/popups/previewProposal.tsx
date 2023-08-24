import { Tooltip } from 'antd'
import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'
import { BsFillInfoCircleFill } from 'react-icons/bs'
import { useAccount } from 'wagmi'
import ProfileCard from '~/components/misc/profileCard'
import { useUserRead } from '~/hooks/web3/useUser'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'
import { monthNames } from '~/utils/date'

type PreviewProps = {
  setState: Dispatch<SetStateAction<'proposalMeta' | 'grantMeta' | 'confirm'>>
  loader: boolean
  submitProposal: () => Promise<void>
  grantName: string
  tokenAddress: string
  matchingAmount: string
  selectedDate: Date | undefined
  logo: File | undefined
  theme: File | undefined
  grantDescription: string
}
const PreviewProposal = ({ grantName, tokenAddress, matchingAmount, selectedDate, logo, theme, grantDescription, setState, loader, submitProposal }: PreviewProps) => {
  const { address } = useAccount()

  const { data } = useUserRead({ address: address! })
  return (
    <div className='py-5 font-body text-lg font-normal '>
      <ProfileCard icon={data.picture} name={data.name!} address={data.address} />

      <div className='grid grid-cols-1 gap-10 pt-11 md:grid-cols-2 md:gap-[76px]'>
        <div>
          <div>
            <div className='flex justify-between'>
              <div className='text-[22px] font-bold'>Round Name*</div>
              {/* <div className='text-vdao-light'>*Required</div> */}
            </div>
            <input
              readOnly
              className=' mt-[17px] h-10 w-full max-w-[480px] rounded-[10px] border-[1px] border-[#A7A7A7] bg-[#F0F0F0] px-5 outline-none placeholder:py-2 md:mt-5'
              placeholder='What’s the round name?'
              value={grantName}
            />
          </div>

          <div className='pt-10'>
            <div className='flex justify-between'>
              <div className='text-[22px] font-bold'>Token Address*</div>
              {/* <div className='text-vdao-light'>*Required</div> */}
            </div>
            <div className='flex items-end gap-4'>
              <input
                readOnly
                className='mt-[17px] h-10 w-full max-w-[480px] rounded-[10px] border-[1px] border-[#A7A7A7] bg-[#F0F0F0] px-5 outline-none placeholder:py-2 md:mt-5'
                placeholder='Token address ?'
                value={tokenAddress}
              />
            </div>
          </div>

          <div className='pt-10'>
            <div className='flex justify-between'>
              <div className='text-[22px] font-bold'>Matching Amount*</div>
            </div>
            <input
              readOnly
              className='mt-[17px] h-10 w-full max-w-[480px] rounded-[10px] border-[1px] border-[#A7A7A7] bg-[#F0F0F0] px-5 outline-none placeholder:py-2 md:mt-5'
              placeholder='How much should the grant be financed'
              type='number'
              value={matchingAmount}
            />
          </div>

          <div className='pt-10'>
            <div className='flex justify-between'>
              <div className='text-[22px] font-bold'>Startup Time*</div>
              <Tooltip
                placement='bottomLeft'
                color='white'
                title={
                  <div className='text-black'>
                    Make sure to set a date and time that would be after the proposal execution, the grant contract will reject the action if the application block is prior to the execution block
                  </div>
                }
              >
                <BsFillInfoCircleFill />
              </Tooltip>
            </div>
            <input
              readOnly
              className='mt-[17px] h-10 w-full max-w-[480px] rounded-[10px] border-[1px] border-[#A7A7A7] bg-[#F0F0F0] px-5 outline-none placeholder:py-2 md:mt-5'
              placeholder='How much should the grant be financed'
              value={selectedDate?.getDate() + ' ' + (monthNames[Number(selectedDate?.getMonth())] as any).name + ', ' + selectedDate?.getFullYear()}
            />

            <div className='pt-2'>
              Time will be around {selectedDate ? `${selectedDate.getHours() + ' : ' + selectedDate.getMinutes() + ' : ' + selectedDate.getSeconds()}` : '00:00'} UTC, imprecisions could be caused by
              inconsistent block times
            </div>
          </div>
        </div>

        <div>
          <div>
            <div className='text-[22px] font-bold'>Round Logo*</div>
            {logo && (
              <div className='mt-5 h-fit w-fit rounded-[100px]  text-center '>
                <Image src={URL.createObjectURL(logo)} alt='upload' className='mx-auto' width={183} height={183} />
              </div>
            )}
          </div>

          <div className='pt-[30px]'>
            <div className='text-[22px] font-bold'>Round Theme*</div>
            {theme && (
              <div className='mt-5 h-full w-fit rounded-[10px] text-center'>
                <Image src={URL.createObjectURL(theme)} alt='upload' className='mx-auto' height={183} width={300} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='mt-10'>
        <div className='flex justify-between'>
          <div className='text-[22px] font-bold'>Grant Round Description*</div>
        </div>

        <textarea className='mt-5 w-full rounded-[10px] border-[1px] border-[#A7A7A7] bg-[#F0F0F0] p-5 outline-none ' rows={10} value={grantDescription} readOnly />
      </div>

      <div className='float-right flex gap-5 py-6'>
        <div className='cursor-pointer rounded-[5px] border-[1px] border-vdao-dark px-[35px] pt-[5px] font-heading text-lg font-medium' onClick={() => setState('grantMeta')}>
          Previous
        </div>
        <PrimaryButton text='Confirm' loading={loader} className='float-right text-xl font-medium' onClick={submitProposal} />
      </div>
    </div>
  )
}

export default PreviewProposal
