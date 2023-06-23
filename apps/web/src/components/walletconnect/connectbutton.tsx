import PodImage from 'public/illustrations/pods/podImage.svg'
import logo from 'public/logo/png/color.png'
import closeIcon from 'public/logo/svg/close.svg'

import Link from 'next/link'
import Image from 'next/image'
import { Dispatch, Ref, SetStateAction, useEffect, useRef, useState } from 'react'
import { useAccount, useConnect, useNetwork, useSignMessage } from 'wagmi'
import { getCsrfToken, signIn, signOut, useSession } from 'next-auth/react'
import { Button, Input, Tooltip, notification } from 'antd'
import { api } from '~/utils/api'
import { SiweMessage } from 'siwe'
import { useUserRead } from '~/hooks/web3/useUser'
import { Address } from 'viem'
import { BsFillInfoCircleFill } from 'react-icons/bs'
import { shortenAddress, shortenText } from '~/utils/helpers'
import { useRouter } from 'next/router'

type ButtonMessages = {
  verified: string
  verify: string
  register: string
  walletselect: string
  loading: string
}

export const VDAOConnectButton = ({
  className,
  web2,
  disabled,
  messageOverrides,
  onClickOverride,
  redirectDisabled,
  toggleMobileMenu,
}: {
  className?: string
  web2?: boolean
  disabled?: boolean
  messageOverrides?: Partial<ButtonMessages>
  redirectDisabled?: boolean
  onClickOverride?: () => void
}) => {
  const buttonStyle = `rounded-md border-[1px] h-10 px-5 font-heading text-sm md:text-xl font-medium ${className || ''}`

  const { address } = useAccount()
  const { data: siwe, status } = useSession()

  const [openModal, setOpenModal] = useState(false)
  const [modalState, setModalState] = useState<'walletselect' | 'verify' | 'verified' | 'register' | 'loading'>('walletselect')
  const { data, isLoading } = useUserRead({
    address: address as Address,
  })
  const router = useRouter()
  const [isDisabled, setIsDisabled] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (status === 'authenticated' && siwe?.address !== address && !isLoading) signOut()
    else {
      setIsDisabled((isLoading && address) || !!disabled)

      const new_state: 'walletselect' | 'verify' | 'verified' | 'register' | 'loading' =
        isLoading && address ? 'loading' : address ? (data ? (siwe ? 'verified' : 'verify') : 'register') : 'walletselect'
      setModalState(new_state)
      setMessage(siwe?.address && !web2 ? shortenAddress(siwe.address) : messages[new_state])
    }
  }, [address, siwe, data, status, disabled, isLoading])

  const handleButtonClick =
    onClickOverride ||
    (async () => {
      if (modalState === 'verified' && web2 && !redirectDisabled) return router.push('/app')
      setOpenModal(true)
    })

  const messages: ButtonMessages = {
    verified: 'Open App',
    verify: 'Verify',
    register: 'Register',
    walletselect: 'Connect Wallet',
    loading: 'Loading...',
    ...messageOverrides,
  }

  return (
    <>
      <button onClick={handleButtonClick} type='button' className={buttonStyle} disabled={isDisabled}>
        {message}
      </button>

      <div className={` fixed left-0 bottom-0 top-0 flex h-screen w-screen items-center justify-center transition-all ease-in-out ${openModal ? 'visible z-50 opacity-100' : 'invisible opacity-0'}`}>
        <div
          className={`absolute -z-10 h-full w-full bg-vdao-dark bg-opacity-60 backdrop-blur-lg backdrop-opacity-0 transition-all ${openModal && 'hidden backdrop-opacity-100 md:block'}`}
          onClick={() => {
            setOpenModal(false)
          }}
        />
        {modalState === 'walletselect' && <WalletSelect setOpenModal={setOpenModal} openModal={openModal} />}
        {modalState === 'verify' && <VerifyWallet setOpenModal={setOpenModal} openModal={openModal} web2={!!web2} />}
        {modalState === 'register' && <RegisterWallet setOpenModal={setOpenModal} openModal={openModal} />}
        {modalState === 'verified' && <DisplayWallet setOpenModal={setOpenModal} openModal={openModal} />}
      </div>
    </>
  )
}

function WalletSelect({ setOpenModal, openModal }: { setOpenModal: Dispatch<SetStateAction<boolean>>; openModal: Boolean }) {
  const { connect, connectors } = useConnect()

  const ref: any = useRef()

  useEffect(() => {
    ref?.current?.scrollIntoView()
  }, [openModal])

  return (
    <div
      ref={ref}
      style={{ backgroundColor: '#06121E' }}
      className='md:w-contain h-full w-full bg-[url(/illustrations/connectWallet/SVG/VDAO-connect-wallet-mobile.svg)] bg-contain bg-center bg-no-repeat pl-[24px] pr-[35px] md:mt-[28px] md:h-[387px] md:w-fit md:rounded-[20px] md:bg-[url(/illustrations/connectWallet/SVG/VDAO-connect-bg.svg)] md:pr-[60px] md:pl-10'
    >
      <div className='  flex justify-between pt-[35px]'>
        <Link href='/'>
          <Image src={logo} alt='VDAO' height={30} className='md:pt-[20px]' />
        </Link>

        <Image src={closeIcon} onClick={() => setOpenModal(false)} alt='VDAO' height={24} className='cursor-pointer' />
      </div>
      <div className='flex flex-col justify-between gap-5 pt-[60px] md:flex-row md:gap-10'>
        <div className=''>
          <div className='font-heading text-[26px] font-medium leading-[30.58px] text-vdao-light md:w-[274px] md:text-[46px] md:leading-[52px]'>Sign in with your wallet.</div>
          <div className='w-[216px] pt-4 font-inter text-base font-normal leading-5 text-white md:w-[310px] md:pt-5'>Connect with one of our available wallet providers or create a new one. </div>
        </div>

        {/* BUTTONS */}
        <div className='flex flex-col gap-5'>
          {[
            { logo: '/logo/svg/image 13.svg', label: 'MetaMask Wallet', connector: connectors[0] },
            { logo: '/logo/svg/image 14.svg', label: 'Coinbase Wallet', connector: connectors[1] },
            { logo: '/logo/svg/image 15.svg', label: 'Wallet Connect', connector: connectors[2] },
          ].map((btn, index) => {
            return (
              <div
                key={index}
                onClick={() => connect({ connector: btn.connector })}
                className='mx-auto flex w-[300px] cursor-pointer items-center justify-center gap-2.5 rounded-[5px] border-2 border-vdao-light bg-[rgba(6,18,30,0.3)] py-[7px] font-heading text-xl font-medium leading-[26px] text-vdao-light backdrop-opacity-[2.5] md:mx-0'
              >
                <Image alt={btn.label} height={0} width={0} src={btn.logo} className='bg-[url(/logo/svg/image 13.svg)] h-[20.4px] w-5 bg-contain bg-center bg-no-repeat'></Image>
                {btn.label}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function VerifyWallet({ setOpenModal, web2, openModal }: { setOpenModal: Dispatch<SetStateAction<boolean>>; web2: boolean; openModal: Boolean }) {
  const { chain } = useNetwork()
  const { address, isConnected } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const [loading, setLoading] = useState(false)

  const verify = async () => {
    try {
      setLoading(true)
      const callbackUrl = '/protected'
      const message = new SiweMessage({
        domain: window.location.host,
        address: address,
        statement: 'Sign in with Ethereum to VDAO.',
        uri: window.location.origin,
        version: '1',
        chainId: chain?.id,
        nonce: await getCsrfToken(),
      })
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      })
      const res = await signIn('credentials', {
        message: JSON.stringify(message),
        signature,
        redirect: false,
        callbackUrl,
      })
      setLoading(false)
      web2 && setOpenModal(false)
    } catch (error) {
      setLoading(false)
      notification.error({
        message: 'Error',
        description: 'Something went wrong. Please try again.',
      })
    }
  }
  const ref: any = useRef()

  useEffect(() => {
    ref?.current?.scrollIntoView()
  }, [openModal])
  return (
    <div
      ref={ref}
      className='z-50 h-full w-full overflow-auto overflow-x-hidden  bg-vdao-deep bg-[url(/illustrations/connectWallet/SVG/VDAO-connect-wallet-mobile.svg)] bg-contain bg-center bg-no-repeat px-[35px] pb-[65px] pt-[35px] md:mx-10 md:h-[387px] md:w-[640px] md:rounded-[20px] md:bg-[url(/illustrations/connectWallet/SVG/VDAO-connect-bg.svg)] md:px-[35px] md:pb-0 md:pt-[28px]'
    >
      <div className='flex justify-between'>
        <Link href='/'>
          <Image src={logo} alt='VDAO' height={30} className='md:pt-[20px]' />
        </Link>

        <Image src={closeIcon} onClick={() => setOpenModal(false)} alt='VDAO' height={24} className='cursor-pointer' />
      </div>
      <div className='flex flex-col justify-between gap-[16px] pt-[44px] md:flex-row md:gap-10 md:pt-[60px]'>
        <div className='flex flex-col gap-4 md:gap-5'>
          <div className='w-[274px] font-heading text-[26px] font-medium leading-[30px] text-vdao-light max-md:text-left md:text-[46px] md:leading-[52px]'>Verify</div>
          <div className='w-[256px] font-inter text-base font-normal leading-[22px] text-white max-md:text-left md:w-[310px] md:leading-5'>
            VDAO needs to verify your wallet address. This is not a transaction and won't cost any gas fees.
          </div>
          <Button type='primary' className='!h-9 !w-[191px] !text-xl !text-black' onClick={verify} loading={loading}>
            Verify Wallet
          </Button>
        </div>
      </div>
    </div>
  )
}

function RegisterWallet({ setOpenModal, openModal }: { setOpenModal: Dispatch<SetStateAction<boolean>>; openModal: Boolean }) {
  const { chain } = useNetwork()
  const { address, isConnected } = useAccount()
  const { signMessageAsync } = useSignMessage()

  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [image, setImage] = useState<string | null>(null)

  const { mutateAsync, isLoading } = api.user.register.useMutation()

  const verify = async () => {
    try {
      const callbackUrl = '/protected'
      const message = new SiweMessage({
        domain: window.location.host,
        address: address,
        statement: 'Register with Ethereum to VDAO.',
        uri: window.location.origin,
        version: '1',
        chainId: chain?.id,
        nonce: await getCsrfToken(),
      })
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      })

      await mutateAsync(
        {
          address: address as Address,
          message: JSON.stringify(message),
          signature,
          name,
          description: bio,
          picture: image || '',
        },
        {
          onSuccess: async () => {
            notification.success({
              message: 'Success',
              description: 'You have successfully registered a Vdao Account.',
            })
            const res = await signIn('credentials', {
              message: JSON.stringify(message),
              signature,
              redirect: false,
              callbackUrl,
            })
            setOpenModal(false)
          },
          onError: error => {
            const isNameAlreadyRegistered = JSON.stringify(error).includes('Unique constraint failed on the fields: (`name`)')
            notification.error({
              message: 'Error',
              description: isNameAlreadyRegistered ? 'Thise Username has already been taken' : 'Something went wrong. Please try again.',
            })
          },
        },
      ).catch(error => {
        console.error(error)
      })
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Something went wrong. Please try again.',
      })
    }
  }

  const onImageChange = (evt: any) => {
    const file = evt.target.files[0]
    if (file.size > 1000000) return notification.error({ message: 'Error', description: 'File size too large' })
    const fileName = file.name
    // const objectUrl = URL.createObjectURL(file)
    var reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      if (reader.result) {
        setImage(reader.result.toString())
      }
    }
    reader.onerror = function (error) {
      console.log('Error: ', error)
    }
  }

  const ImageInput = ({ className }: { className?: string }) => (
    <div className={`mb-[46px] flex justify-start gap-5 max-md:mx-auto md:mb-0 md:flex-col md:pt-8 md:text-center md:align-middle lg:flex-row ${className}`}>
      <Image src={image ? image : PodImage} alt='PodImage' className='ml-0 h-[75.17px] w-[75.17px] md:mx-auto lg:mx-0' />
      <div className='flex flex-col'>
        <label className='w-fit cursor-pointer rounded-[5px] bg-vdao-pink py-[5px] px-[35px] font-heading text-xl font-medium md:mx-auto'>
          <input type='file' accept='image/*' className='hidden cursor-pointer pt-5' form='register-form' name='image' onChange={onImageChange} max={1} />
          Upload Image
        </label>
        <div className='pt-[5px] text-sm text-vdao-light md:pt-2 lg:text-start'>Optional</div>
        <div className=' text-sm text-vdao-light lg:text-start'>800 x 800px png or jpeg</div>
      </div>
    </div>
  )

  const ref: any = useRef()

  useEffect(() => {
    ref?.current?.scrollIntoView()
  }, [openModal])

  return (
    <div
      ref={ref}
      className='bg-top-right z-50 h-full w-full max-w-[870px] overflow-auto overflow-x-hidden bg-vdao-deep bg-[url(/illustrations/connectWallet/SVG/VDAO-connect-wallet-mobile.svg)] bg-contain bg-center bg-no-repeat px-[35px] pb-[65px] md:mx-10 md:h-auto md:rounded-[20px] md:bg-[url(/illustrations/connectWallet/SVG/VDAO-connect-bg.svg)] md:pb-0 md:pl-[24px] md:pr-5 md:pt-[28px] lg:mx-0 lg:pr-10 lg:pl-10'
    >
      <div className=' flex justify-between pt-[35px] pb-[44px] md:py-0'>
        <Link href='/'>
          <Image src={logo} alt='VDAO' height={30} className='md:pt-[20px]' />
        </Link>

        <Image src={closeIcon} onClick={() => setOpenModal(false)} alt='VDAO' height={24} className='cursor-pointer' />
      </div>
      <div className='mb-4 flex flex-col justify-between gap-[100px] md:mb-[24px] md:flex-row md:gap-10 md:pt-[60px]'>
        <div className='flex flex-col  gap-5 lg:w-[450px]'>
          <div className='w-full font-heading text-[26px] font-medium leading-[30.58px] text-vdao-light md:text-[46px] md:leading-[52px]'>Oh, You're new here</div>
          <Input placeholder='Enter your name' className='!h-9 !font-body !text-lg !text-vdao-dark' onChange={e => setName(e.target.value)} />
          <Input.TextArea placeholder='Enter your bio' className='!h-[102px] !font-body !text-lg !text-vdao-dark md:h-auto' onChange={e => setBio(e.target.value)} />
          <div className=''>
            <ImageInput className='md:hidden' />
          </div>
          <Button type='primary' className=' !h-9 w-fit !px-[35px] !text-xl !text-vdao-dark md:mx-0' onClick={verify} loading={isLoading}>
            Submit
          </Button>
          <div className=' flex flex-row-reverse justify-start gap-2 md:flex-row'>
            <span className='mr-auto max-w-[206px] text-sm leading-4 text-vdao-light md:mr-0 md:max-w-[368px]'>Next steps: Apply to join a guild to be a member of the DAO</span>
            <Tooltip title='Apply to join a guild to be a member of the DAO' className='my-auto text-white '>
              <BsFillInfoCircleFill />
            </Tooltip>
          </div>
        </div>
        <ImageInput className='max-md:hidden' />
      </div>
    </div>
  )
}

function DisplayWallet({ setOpenModal, openModal }: { setOpenModal: Dispatch<SetStateAction<boolean>>; openModal: Boolean }) {
  const { data: siwe } = useSession()
  const ref: any = useRef()

  useEffect(() => {
    ref?.current?.scrollIntoView()
  }, [openModal])

  return (
    <div
      ref={ref}
      className='h-full w-full bg-vdao-deep bg-[url(/illustrations/connectWallet/SVG/VDAO-connect-wallet-mobile.svg)] bg-contain bg-top bg-no-repeat p-[35px] md:h-auto md:w-[640px] md:rounded-[20px] md:bg-[url(/illustrations/connectWallet/SVG/VDAO-connect-bg.svg)] md:bg-center md:px-[30px] md:pb-12 md:pt-[28px]'
    >
      <div className=' flex justify-between'>
        <Link href='/'>
          <Image src={logo} alt='VDAO' height={30} className='md:pt-[20px]' />
        </Link>

        <Image src={closeIcon} onClick={() => setOpenModal(false)} alt='VDAO' height={24} className='cursor-pointer' />
      </div>
      <div className='mt-11 font-heading text-[26px] font-medium leading-[30.58px] text-vdao-light md:mt-[28px] md:w-[274px] md:text-[46px] md:leading-[52px] '>Your wallet</div>
      <div className='flex items-center justify-start gap-[12px] pt-[21px] md:gap-4 md:pt-[28px]'>
        <div className='relative ml-0 h-[54px] w-[54px] '>
          <Image src={siwe?.user.picture || PodImage} alt='PodImage' className='' sizes='square' fill />
        </div>
        <div className='mr-0'>
          <div className='font-inter text-base leading-5 text-white'>{shortenText(siwe?.user.name!, 20)}eth_ninja1</div>
          <div className=' pt-2 font-inter text-base leading-5 text-vdao-light'>0xEfC1C...Ce3b8{shortenAddress(siwe?.address || '')}</div>
        </div>
      </div>
      <div className='flex gap-4 pt-5'>
        <Button type='primary' className='!h-9 !px-[35px] !text-xl !text-black' onClick={() => signOut()}>
          Disconnect wallet
        </Button>
      </div>
    </div>
  )
}
