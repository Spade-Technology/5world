import CustomModal from '~/components/misc/customModal'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'
import UploadImage from 'public/illustrations/grants/uploadImage.svg'
import Image from 'next/image'
// import Calendar from 'react-calendar'
import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { Button } from '~/components/ui/button'
import { cn } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { Calendar } from '~/components/ui/calendar'
import { DropzoneOptions, useDropzone } from 'react-dropzone'
import { notification } from 'antd'

type CreateGrantProps = {
  show: boolean
  close: any
}

const CreateGrant = ({ show, close }: CreateGrantProps) => {
  const [name, setName] = useState<string>('')
  const [tokenAddress, setTokenAddress] = useState<string>('')
  const [matchingAmount, setMatchingAmount] = useState<string>('')
  const [date, setDate] = useState<Date>()
  const [description, setDescription] = useState<string>('')

  const dropzoneParams: DropzoneOptions = { accept: { 'image/*': [] }, multiple: false, maxSize: 4194304 }
  const {
    getRootProps: getLogoRootProps,
    getInputProps: getLogoInputProps,
    acceptedFiles: { 0: logo },
  } = useDropzone(dropzoneParams)
  const {
    getRootProps: getThemeRootProps,
    getInputProps: getThemeInputProps,
    acceptedFiles: { 0: theme },
  } = useDropzone(dropzoneParams)

  const submit = () => {
    const requiredFields = { name, tokenAddress, matchingAmount, date, description, logo, theme }
    const emptyFields = Object.keys(requiredFields).filter(field => !(requiredFields as any)[field])

    if (emptyFields.length)
      return notification.error({
        message: 'Error',
        description: `Fields cannot be empty: ${emptyFields.join(', ')}`,
        placement: 'bottomRight',
      })

    if (tokenAddress.match(/0x[a-fA-F0-9]{40}/) === null)
      return notification.error({
        message: 'Error',
        description: 'Invalid token address',
        placement: 'bottomRight',
      })
  }

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
                className='mt-[17px] h-10 w-full max-w-[480px] rounded-[10px] border-[1px] border-vdao-dark px-5 outline-none placeholder:py-2 md:mt-5'
                placeholder='What’s the round name?'
                onChange={e => setName(e.target.value)}
              />
            </div>

            <div className='pt-10'>
              <div className='flex justify-between'>
                <div className='text-[22px] font-bold'>Token Address*</div>
                {/* <div className='text-vdao-light'>*Required</div> */}
              </div>
              <input
                className='mt-[17px] h-10 w-full max-w-[480px] rounded-[10px] border-[1px] border-vdao-dark px-5 outline-none placeholder:py-2 md:mt-5'
                placeholder='What’s the token address ?'
                onChange={e => setTokenAddress(e.target.value)}
              />
            </div>

            <div className='pt-10'>
              <div className='flex justify-between'>
                <div className='text-[22px] font-bold'>Matching amount*</div>
              </div>
              <input
                className='mt-[17px] h-10 w-full max-w-[480px] rounded-[10px] border-[1px] border-vdao-dark px-5 outline-none placeholder:py-2 md:mt-5'
                placeholder='How much should the grant be financed'
                type='number'
                onChange={e => setMatchingAmount(e.target.value)}
              />
            </div>

            <div className='pt-10'>
              <div className='flex justify-between'>
                <div className='text-[22px] font-bold'>Startup time*</div>
              </div>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant={'outline'} className={cn('mt-[17px] w-full justify-start text-left font-normal', !date && 'text-muted-foreground')}>
                    <CalendarIcon className='mr-2 h-4 w-4 ' />
                    {date ? format(date, 'PPP') : <div>Pick a date</div>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0'>
                  <Calendar mode='single' selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div>
            <div>
              <div className='text-[22px] font-bold'>Round Logo*</div>
              {logo ? (
                <div className='mt-5 h-[300px] w-[300px] rounded-[10px] py-5 text-center outline-dashed md:py-9'>
                  <Image src={URL.createObjectURL(logo)} alt='upload' className='mx-auto' width={300} height={300} />
                </div>
              ) : (
                <div className='mt-5 h-[300px] w-[300px] rounded-[10px] py-5 text-center outline-dashed md:py-9' {...getLogoRootProps()}>
                  <input {...getLogoInputProps()} />
                  <Image src={UploadImage} alt='upload' className='mx-auto' />
                  <div className='py-3 font-medium md:text-[22px]'>Drop your PNG or JPG file here!</div>
                  <div className='text-lg font-normal'>Recommended size: 300px X 300px</div>
                </div>
              )}
            </div>

            <div className='pt-[30px]'>
              <div className='text-[22px] font-bold'>Round Theme*</div>
              {theme ? (
                <div className='mt-5 h-[300px] w-[300px] rounded-[10px] py-5 text-center outline-dotted md:py-9'>
                  <Image src={URL.createObjectURL(theme)} alt='upload' className='mx-auto' width={300} height={300} />
                </div>
              ) : (
                <div className='mt-5 h-[300px] w-[300px] rounded-[10px] px-20 py-5 text-center outline-dotted md:py-9' {...getThemeRootProps()}>
                  <input {...getThemeInputProps()} />
                  <Image src={UploadImage} alt='upload' className='mx-auto' />
                  <div className='py-3 font-medium md:text-[22px]'>Drop your PNG or JPG file here!</div>
                  <div className='text-lg font-normal'>Recommended size: 300px X 300px</div>
                </div>
              )}
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
            rows={10}
            onChange={e => setDescription(e.target.value)}
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
          <PrimaryButton text='Submit' className='float-right py-[5px] px-[35px] text-xl font-medium' onClick={() => submit()} />
        </div>
      </div>
    </CustomModal>
  )
}

export default CreateGrant
