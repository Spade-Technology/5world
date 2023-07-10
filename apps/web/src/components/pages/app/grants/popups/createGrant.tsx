import CustomModal from '~/components/misc/customModal'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'
import UploadImage from 'public/illustrations/grants/uploadImage.svg'
import Image from 'next/image'
// import Calendar from 'react-calendar'
import { useState } from 'react'

type CreateGrantProps = {
  show: boolean
  close: any
}

const CreateGrant = ({ show, close }: CreateGrantProps) => {
  const [date, setDate] = useState(new Date())

  return (
    <CustomModal show={show} close={close} heading='Create Grant Operaitonal Proposal'>
      <div className='pt-10 pb-[24px] font-body text-lg font-normal md:pt-[60px]'>
        <div className='grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-[76px]'>
          <div>
            <div>
              <div className='flex justify-between'>
                <div className='text-[22px] font-bold'>Round Name*</div>
                {/* <div className='text-vdao-light'>*Required</div> */}
              </div>
              <input
                className='mt-[17px] h-10 w-full max-w-[480px] rounded-[10px] border-[1px] border-vdao-dark px-5 outline-none placeholder:py-2 placeholder:pl-5 md:mt-5'
                placeholder='What’s the round name?'
              />
            </div>

            <div className='pt-10'>
              <div className='flex justify-between'>
                <div className='text-[22px] font-bold'>Token Address*</div>
                {/* <div className='text-vdao-light'>*Required</div> */}
              </div>
              <input
                className='mt-[17px] h-10 w-full max-w-[480px] rounded-[10px] border-[1px] border-vdao-dark px-5 outline-none placeholder:py-2 placeholder:pl-5 md:mt-5'
                placeholder='What’s the token address ?'
              />
            </div>

            <div className='pt-10'>
              <div className='flex justify-between'>
                <div className='text-[22px] font-bold'>Matching amount*</div>
                {/* <div className='text-vdao-light'>*Required</div> */}
              </div>
              <input
                className='mt-[17px] h-10 w-full max-w-[480px] rounded-[10px] border-[1px] border-vdao-dark px-5 outline-none placeholder:py-2 placeholder:pl-5 md:mt-5'
                placeholder='How much should the grant be financed'
              />
            </div>

            {/* <div className='pt-10'>
              <div className='flex justify-between'>
                <div className='text-[22px] font-bold'>Duration *</div>
              </div>
              <input className='mt-[17px] h-10 w-full max-w-[480px] rounded-[10px] border-[1px] border-vdao-dark px-5 outline-none placeholder:py-2 placeholder:pl-5 md:mt-5' placeholder='14 days' />
            </div> */}

            <div className='pt-10'>
              <div className='flex justify-between'>
                <div className='text-[22px] font-bold'>Startup time*</div>
              </div>
              <input className='mt-[17px] h-10 w-full max-w-[480px] rounded-[10px] border-[1px] border-vdao-dark px-5 outline-none placeholder:py-2 placeholder:pl-5 md:mt-5' placeholder='5 days' />
              {/* <div className='calendar-container'>
                <Calendar onChange={(evt: any) => setDate(evt.target.value)} value={date} />
              </div>
              <div className='text-center'>Selected date: {date.toDateString()}</div> */}
            </div>
          </div>

          <div>
            <div>
              <div className='text-[22px] font-bold'>Round Logo</div>
              <div className='mt-5 rounded-[10px] py-5 text-center outline-dashed md:py-9'>
                <Image src={UploadImage} alt='upload' className='mx-auto' />
                <div className='py-3 font-medium md:text-[22px]'>Drop your PNG or JPG file here!</div>
                <div className='text-lg font-normal'>Recommended size: 300px X 300px</div>
              </div>
            </div>

            <div className='pt-[30px]'>
              <div className='text-[22px] font-bold'>Round Theme</div>
              <div className='mt-5 rounded-[10px] px-20 py-5 text-center outline-dotted md:py-9'>
                <Image src={UploadImage} alt='upload' className='mx-auto' />
                <div className='py-3 font-medium md:text-[22px]'>Drop your PNG or JPG file here!</div>
                <div className='text-lg font-normal'>Recommended size: 300px X 300px</div>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-10'>
          <div className='flex justify-between'>
            <div className='text-[22px] font-bold'>Grant Round Description*</div>
            {/* <div className='text-vdao-light'>*Required</div> */}
          </div>

          <textarea
            className='mt-5 w-full rounded-[10px] border-[1px] border-vdao-deep p-5 outline-none '
            placeholder='The Governance Facilitator(s) and the Protocol Engineering Core Unit have placed an urgent out-of-schedule executive proposal into the voting system. MKR Holders should vote for this proposal if they support the following alterations to the Maker Protocol.

            If you are new to voting in the Maker Protocol, please see the voting guide to learn how voting works, and this wallet setup guide to set up your wallet to vote.
            
            Executive Summary
            If this executive proposal passes, the following changes will occur within the Maker Protocol:
            
            Urgent Parameter Changes to MATIC-A, LINK-A, YFI-A, renBTC-A, and MANA-A Vaults, as detailed below.
            Voting for this executive proposal will place your MKR in support of the changes and additions outlined above.
            '
          />
        </div>

        <div className='pt-[20px] md:pt-10'>
          <PrimaryButton text='Submit' className='float-right py-[5px] px-[35px] text-xl font-medium' onClick={() => close()} />
        </div>
      </div>
    </CustomModal>
  )
}

export default CreateGrant
