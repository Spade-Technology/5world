import Image from 'next/image'
import UploadImage from 'public/illustrations/grants/uploadImage.svg'
import CustomModal from '~/components/misc/customModal'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'
// import Calendar from 'react-calendar'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { DropzoneOptions, useDropzone } from 'react-dropzone'
import { Address, useAccount } from 'wagmi'
import { useCreateProposal } from '~/hooks/web3/useProposal'
import { api } from '~/utils/api'
import { notification } from 'antd'
import { imageToBase64String } from '~/utils/helpers'
import { waitForTransaction, writeContract } from '@wagmi/core'
import RoundImplementation from '~/abi/RoundImplementation.json'
import { currentChainId } from '~/config/contracts'
import ProjectPreview from './projectPreview'
import { error } from 'console'

type CreateProjectProps = {
  show: boolean
  close: any
  grant: any
}

const CreateProject = ({ show, close, grant }: CreateProjectProps) => {
  const { address } = useAccount()
  const generateGrantIPFSHash = api.grant.generateIPFSHash.useMutation()

  const [state, setState] = useState<'projectRequest' | 'confirm'>('projectRequest')

  const [projectName, setProjectName] = useState<string>('')
  const [projectDescription, setProjectDescription] = useState<string>('')
  const [projectAddress, setProjectAddress] = useState<string>(address || '')
  const [website, setWebsite] = useState<string>('')
  const [twitter, setTwitter] = useState<string>('')
  const [hash, setHash] = useState<string>('')

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

  const confirm = async () => {
    const requiredFields = { logo, theme, projectName, projectDescription, projectAddress, website, twitter }
    const emptyFields = Object.keys(requiredFields).filter(field => !(requiredFields as any)[field])

    if (emptyFields.length)
      return notification.error({
        message: 'Error',
        description: `Fields cannot be empty: ${emptyFields.join(', ')}`,
      })

    if (projectAddress.match(/0x[a-fA-F0-9]{40}/) === null)
      return notification.error({
        message: 'Error',
        description: 'Invalid project address',
      })

    const hash = generateGrantIPFSHash.mutate(
      {
        authorAddress: address as Address,
        name: projectName,
        description: projectDescription,
        address: projectAddress,
        image: await imageToBase64String(logo),
        theme: await imageToBase64String(theme),
        socials: { website, twitter },
      },
      {
        onSuccess: data => {
          setHash(data.IpfsHash)
          setState('confirm')
        },
        onError: error => {
          return notification.error({
            message: 'Error',
            description: JSON.stringify(error),
          })
        },
      },
    )
  }

  const submitRequest = async () => {
    await writeContract({
      abi: RoundImplementation,
      address: grant.address,
      functionName: 'applyToRound',
      args: [[0n, hash], address],
    })
      .then(async e => {
        await waitForTransaction({ hash: e.hash, timeout: 10000, chainId: currentChainId })
        notification.success({
          message: 'Success',
          description: 'Successfully submitted request',
        })
        close()
      })
      .catch(e => {
        notification.error({
          message: 'Error',
          description: e.shortMessage || e.message,
        })
      })
  }

  return (
    <CustomModal show={show} close={close} heading='Create Project Request' externalStyle={'w-full md:mx-10 xl:mx-auto md:!px-5 lg:!px-10'}>
      {state === 'projectRequest' && (
        <div className='pt-10 pb-[24px] font-body text-lg font-normal md:pt-[60px]'>
          <div className='grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-[76px]'>
            <div>
              <div>
                <div className='flex justify-between'>
                  <div className='text-[22px] font-bold'>{state === 'projectRequest' ? 'Project Name*' : 'Round Name*'}</div>
                  {/* <div className='text-vdao-light'>*Required</div> */}
                </div>
                <input
                  className='mt-[17px] h-10 w-full max-w-[480px] rounded-[10px] border-[1px] border-vdao-dark px-5 outline-none placeholder:py-2 md:mt-5'
                  placeholder={state === 'projectRequest' ? 'What’s the project name?' : 'What’s the round name?'}
                  onChange={e => setProjectName(e.target.value)}
                />
              </div>

              <div className='pt-10'>
                <div className='flex justify-between'>
                  <div className='text-[22px] font-bold'>Project Address*</div>
                  {/* <div className='text-vdao-light'>*Required</div> */}
                </div>
                <input
                  className='mt-[17px] h-10 w-full max-w-[480px] rounded-[10px] border-[1px] border-vdao-dark px-5 outline-none placeholder:py-2 md:mt-5'
                  placeholder='What’s the token address ?'
                  onChange={e => setProjectAddress(e.target.value)}
                  defaultValue={address}
                />
              </div>

              {state === 'projectRequest' && (
                <>
                  <div className='pt-10'>
                    <div className='flex justify-between'>
                      <div className='text-[22px] font-bold'>Project Website*</div>
                    </div>
                    <input
                      className='mt-[17px] h-10 w-full max-w-[480px] rounded-[10px] border-[1px] border-vdao-dark px-5 outline-none placeholder:py-2 md:mt-5'
                      placeholder='Your project`s website'
                      onChange={e => setWebsite(e.target.value)}
                      value={website}
                    />
                  </div>

                  <div className='pt-10'>
                    <div className='flex justify-between'>
                      <div className='text-[22px] font-bold'>Project Twitter Account </div>
                    </div>
                    <input
                      className='mt-[17px] h-10 w-full max-w-[480px] rounded-[10px] border-[1px] border-vdao-dark px-5 outline-none placeholder:py-2 md:mt-5'
                      placeholder='Your twitter profile'
                      onChange={e => setTwitter(e.target.value)}
                      value={twitter}
                    />
                  </div>
                </>
              )}
            </div>

            <div>
              <div>
                <div className='text-[22px] font-bold'>{state === 'projectRequest' ? 'Project Logo' : 'Round Logo'}</div>
                {logo ? (
                  <div className='mt-5 h-fit w-fit rounded-[100px]  text-center'>
                    <Image src={URL.createObjectURL(logo)} alt='upload' className='mx-auto' height={183} width={183} />
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
                <div className='text-[22px] font-bold'>{state === 'projectRequest' ? 'Project Banner' : 'Round Theme'}</div>
                {theme ? (
                  <div className='mt-5 h-full w-fit rounded-[10px] text-center'>
                    <Image src={URL.createObjectURL(theme)} alt='upload' className='mx-auto' height={183} width={300} />
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
              <div className='text-[22px] font-bold'>Project Description*</div>
              {/* <div className='text-vdao-light'>*Required</div> */}
            </div>

            <textarea
              className='mt-5 w-full rounded-[10px] border-[1px] border-vdao-deep p-5 outline-none '
              rows={10}
              onChange={e => setProjectDescription(e.target.value)}
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
            <PrimaryButton
              text='Submit'
              className='float-right text-xl font-medium'
              onClick={() => {
                confirm()
              }}
            />
          </div>
        </div>
      )}

      {state === 'confirm' && (
        <ProjectPreview
          submitRequest={submitRequest}
          setState={setState}
          projectName={projectName}
          projectAddress={projectAddress}
          website={website}
          twitter={twitter}
          logo={logo}
          theme={theme}
          projectDescription={projectDescription}
        />
      )}
    </CustomModal>
  )
}

export default CreateProject
