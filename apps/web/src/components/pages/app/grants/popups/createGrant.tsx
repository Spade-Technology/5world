import Image from 'next/image'
import UploadImage from 'public/illustrations/grants/uploadImage.svg'
import CustomModal from '~/components/misc/customModal'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'
// import Calendar from 'react-calendar'
import { cn } from '@/lib/utils'
import { notification } from 'antd'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import { DropzoneOptions, useDropzone } from 'react-dropzone'
import { Button } from '~/components/ui/button'
import { Calendar } from '~/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { useCreateProposal } from '~/hooks/web3/useProposal'
import { title } from 'process'
import { Address, useAccount, useBlockNumber } from 'wagmi'
import { imageToBase64String } from '~/utils/helpers'
import FormOne from '../../proposals/popups/formOne'
import { currentContracts } from '~/config/contracts'
import RoundFactoryAbi from '~/abi/RoundFactory.json'
import { encodeFunctionData } from 'viem'

type CreateGrantProps = {
  show: boolean
  close: any
}

const CreateGrant = ({ show, close }: CreateGrantProps) => {
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
  const [IPFSHash, setIPFSHash] = useState<string>('')
  const { data, isError, isLoading } = useBlockNumber()

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
        placement: 'bottomRight',
      })

    if (tokenAddress.match(/0x[a-fA-F0-9]{40}/) === null)
      return notification.error({
        message: 'Error',
        description: 'Invalid token address',
        placement: 'bottomRight',
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

  // const handlePreviews = () => {
  //   let cds: string[] = []
  //   if (address && spells.length > 0) {
  //     // Encode arguments using ethers.js or a similar library
  //     spells.map(async (spell, idx) => {
  //       type typing = {
  //         name: string
  //         type: string
  //       }

  //       const types: typing[] = spell?.abi
  //         ?.filter((item: abiItem) => item.name === spell.name)[0]
  //         .inputs.map((item: abiItem) => {
  //           return {
  //             name: item.name,
  //             type: item.type,
  //           }
  //         })

  //       const valuesArr: any = []
  //       types.map(type => {
  //         valuesArr.push(spell.calldata[type.name])
  //       })

  //       // const callData = types && encodeAbiParameters(types, Object.values(args))
  //       const callData = types && encodeFunctionData({ abi: spell?.abi, args: valuesArr, functionName: spell.name })

  //       // Construct calldatas, targets, values
  //       cds.push(callData)
  //     })

  //     setCallDatas(cds)
  //   }
  // }
  const submitProposal = async () => {
    if (!date) return notification.error({ message: 'Error', description: 'Please select a date', placement: 'bottomRight' })

    const spell = currentContracts?.roundFactory
    const abi = RoundFactoryAbi
    const signature = 'create'

    const currentBlockTimeToNextBlock = currentContracts.blockTime
    const currentBlock = data

    const startApplicationBlock = (date?.getTime() / 1000 - Date.now() / 1000) / currentBlockTimeToNextBlock + Number(currentBlock)
    const endApplicationBlock = startApplicationBlock + (7 * 24 * 60 * 60) / currentBlockTimeToNextBlock
    const startRoundBlock = endApplicationBlock
    const endRoundBlock = startRoundBlock + (14 * 24 * 60 * 60) / currentBlockTimeToNextBlock

    // [
    // uint256 applicationsStartBlock; // block number from when round can accept applications
    // uint256 applicationsEndBlock; // block number from when round stops accepting applications
    // uint256 roundStartBlock; // block number of the start of the round
    // uint256 roundEndBlock; // block number of the end of the round]
    // ],
    // address _vDAO,
    // address _donationSBT,
    // address _token,
    // uint256 _matchingAmount,
    // [
    //   [ // Round Meta
    //     // uint256 protocol;
    //     // string pointer;
    //   ],

    //   [  // MetaPtr to the application form schema
    //   // uint256 protocol;
    //   // // Pointer to fetch metadata for the specified protocol
    //   // string pointer;
    //   ]
    // ],
    // [
    // address[] adminRoles; // Addresses to be granted DEFAULT_ADMIN_ROLE
    // address[] roundOperators
    // ]

    const args = [
      [startApplicationBlock, endApplicationBlock, startRoundBlock, endRoundBlock],
      currentContracts.vDao,
      currentContracts.donationSBT,
      tokenAddress,
      matchingAmount,
      [
        [0, IPFSHash],
        [0, IPFSHash],
      ],
      [[address], [address]],
    ]

    const callData = encodeFunctionData({ abi, args, functionName: signature })

    createGrantProposal
  }

  return (
    <CustomModal show={show} close={close} heading='Create Grant Operaitonal Proposal'>
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
                  defaultValue={'0x9E873b3A125040B2295FbED16aF22Ed9b101e470'}
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
            <PrimaryButton text='Submit' className='float-right py-[5px] px-[35px] text-xl font-medium' onClick={submitIPFS} />
          </div>
        </div>
      )}

      {state === 'confirm' && (
        <div className='pt-10 pb-[24px] font-body text-lg font-normal md:pt-[60px]'>
          UI IS TODO
          <div className='pt-[20px] md:pt-10'>
            <PrimaryButton text='Submit' className='float-right py-[5px] px-[35px] text-xl font-medium' onClick={submitProposal} />
          </div>
        </div>
      )}
    </CustomModal>
  )
}

export default CreateGrant
