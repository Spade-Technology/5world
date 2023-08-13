import Image from 'next/image'
import UploadImage from 'public/illustrations/grants/uploadImage.svg'
import CustomModal from '~/components/misc/customModal'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'
// import Calendar from 'react-calendar'
import { cn } from '@/lib/utils'
import { DatePicker, Tooltip, notification } from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'
import { DropzoneOptions, useDropzone } from 'react-dropzone'
import { BsFillInfoCircleFill } from 'react-icons/bs'
import { Address, useAccount } from 'wagmi'
import { Button } from '~/components/ui/button'
import { useCreateProposal } from '~/hooks/web3/useProposal'
import { imageToBase64String } from '~/utils/helpers'
import FormOne from '../../proposals/popups/formOne'
import PreviewProposal from './previewProposal'

type CreateGrantProps = {
  show: boolean
  close: any
  refetchFunc?: Function
}

const CreateGrant = ({ show, close, refetchFunc }: CreateGrantProps) => {
  const { createGrantProposal, generateGrantIPFSHash } = useCreateProposal()
  const { address } = useAccount()
  const [state, setState] = useState<'proposalMeta' | 'grantMeta' | 'confirm'>('proposalMeta')

  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const [grantName, setGrantName] = useState<string>('')
  const [grantDescription, setGrantDescription] = useState<string>('')
  const [date, setDate] = useState<Date>()
  const [tokenAddress, setTokenAddress] = useState<string>('0x9E873b3A125040B2295FbED16aF22Ed9b101e470')
  const [matchingAmount, setMatchingAmount] = useState<string>('')

  const [loader, setLoader] = useState(false)
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

  const submitIPFS = async () => {
    const requiredFields = { grantName, tokenAddress, matchingAmount, date, grantDescription, logo, theme }
    const emptyFields = Object.keys(requiredFields).filter(field => !(requiredFields as any)[field])

    if (emptyFields.length)
      return notification.error({
        message: 'Error',
        description: `Fields cannot be empty: ${emptyFields.join(', ')}`,
      })

    if (tokenAddress.match(/0x[a-fA-F0-9]{40}/) === null)
      return notification.error({
        message: 'Error',
        description: 'Invalid token address',
      })

    const hash = await generateGrantIPFSHash.mutateAsync(
      {
        authorAddress: address as Address,

        name: grantName,
        description: grantDescription,
        rules: grantDescription,
        amount: matchingAmount,
        token: tokenAddress,
        image: await imageToBase64String(logo),
        theme: await imageToBase64String(theme),
      },
      {
        onSuccess: async (data, variables, context) => {
          setState('confirm')
        },
      },
    )
  }

  const submitProposal = async () => {
    setLoader(true)
    createGrantProposal({
      title,
      description,
      authorAddress: address as Address,
      grantTitle: grantName,
      grantDescription,
      grantRules: grantDescription,
      grantDate: date as Date,
      grantToken: tokenAddress,
      grantAmount: matchingAmount,
      grantImage: await imageToBase64String(logo),
      grantTheme: await imageToBase64String(theme),
      callback: successful => {
        if (successful) {
          refetchFunc && refetchFunc()
          close()
        }
      },
    }).finally(() => {
      setLoader(false)
    })
  }

  return (
    <CustomModal show={show} close={close} heading={state === 'confirm' ? 'Preview your proposal' : '  Create Grant Operational Proposal'}>
      {state === 'proposalMeta' && <FormOne description={description} setDescription={setDescription} title={title} setTitle={setTitle} setNextForm={() => setState('grantMeta')} />}

      {state === 'grantMeta' && (
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
                  onChange={e => setGrantName(e.target.value)}
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
                    className='mt-[17px] h-10 w-full max-w-[480px] rounded-[10px] border-[1px] border-vdao-dark px-5 outline-none placeholder:py-2 md:mt-5'
                    placeholder='Token address ?'
                    onChange={e => setTokenAddress(e.target.value)}
                    value={tokenAddress}
                    // defaultValue={'0x9E873b3A125040B2295FbED16aF22Ed9b101e470'}
                  />
                  <Button className='w-full' 
                  onClick={e => setTokenAddress('0x0000000000000000000000000000000000000000')}
                  >
                    send ETH
                  </Button>
                </div>
              </div>

              <div className='pt-10'>
                <div className='flex justify-between'>
                  <div className='text-[22px] font-bold'>Matching Amount*</div>
                </div>
                <input
                  className='mt-[17px] h-10 w-full max-w-[480px] rounded-[10px] border-[1px] border-vdao-dark px-5 outline-none placeholder:py-2 md:mt-5'
                  placeholder='How much should the grant be financed'
                  type='number'
                  onChange={e => setMatchingAmount(e.target.value)}
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

                <DatePicker
                  className={cn('!mt-[17px] !h-10 w-full justify-start !rounded-[10px] !border-vdao-dark text-left font-normal', !date && 'text-muted-foreground')}
                  format='YYYY-MM-DD HH:mm:ss'
                  // defaultValue={dayjs().add(1, 'day')}
              
                  showTime={{ defaultValue: dayjs().add(1, 'day') }}
                  onChange={e => setDate(e?.toDate())}
                  disabledDate={current => current && current < dayjs()}
                  disabledTime={current => dayjs().add(10, 'minute').isAfter(current) as any}
                  showNow={false}
                  presets={[
                    {
                      label: 'in 10 minutes',
                      value: dayjs().add(10, 'minute'),
                    },
                    {
                      label: 'in 15 minutes',
                      value: dayjs().add(15, 'minute'),
                    },
                    {
                      label: 'in 30 minutes',
                      value: dayjs().add(30, 'minute'),
                    },
                  ]}
                />

                <div>Time will be around {date ?  `${date.getHours() + " : " + date.getMinutes() + " : " + date.getSeconds()}` : "00:00"} UTC, imprecisions could be caused by inconsistent block times</div>
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
                  <div className='mt-5 rounded-[10px] py-5 text-center outline-dashed md:px-16 md:py-9' {...getLogoRootProps()}>
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
                  <div className='mt-5 rounded-[10px] px-20 py-5 text-center outline-dotted md:px-16 md:py-9' {...getThemeRootProps()}>
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
              onChange={e => setGrantDescription(e.target.value)}
              value={grantDescription}
              placeholder='The Governance Facilitator(s) and the Protocol Engineering Core Unit have placed an urgent out-of-schedule executive proposal into the voting system. MKR Holders should vote for this proposal if they support the following alterations to the Maker Protocol.

            If you are new to voting in the Maker Protocol, please see the voting guide to learn how voting works, and this wallet setup guide to set up your wallet to vote.
            
            Executive Summary
            If this executive proposal passes, the following changes will occur within the Maker Protocol:
            
            Urgent Parameter Changes to MATIC-A, LINK-A, YFI-A, renBTC-A, and MANA-A Vaults, as detailed below.
            Voting for this executive proposal will place your MKR in support of the changes and additions outlined above.
            '
            />
          </div>

          <div className='float-right flex gap-5 py-6 md:pt-10 '>
          <div
            className='cursor-pointer rounded-[5px] border-[1px] border-vdao-dark px-[35px] pt-[5px] font-heading text-lg font-medium'
            onClick={() => {
              setState('proposalMeta')
            }}
          >
            Previous
          </div>
            <PrimaryButton text='Submit' className='float-right text-xl font-medium' onClick={submitIPFS} />
          </div>
        </div>
      )}

      {state === 'confirm' && (
        <PreviewProposal  setState={setState} loader={loader} submitProposal={submitProposal}
        grantName={grantName}
        tokenAddress={tokenAddress}
        matchingAmount={matchingAmount}
        selectedDate = {date}
        logo={logo}
        theme={theme}
        grantDescription={grantDescription}
         />
      )}
    </CustomModal>
  )
}

export default CreateGrant
