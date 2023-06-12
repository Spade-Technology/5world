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
}: {
  className?: string
  web2?: boolean
  disabled?: boolean
  messageOverrides?: Partial<ButtonMessages>
  redirectDisabled?: boolean
  onClickOverride?: () => void
}) => {
  const buttonStyle = `rounded-md border-[1px] h-10 px-5 font-heading text-xl font-medium ${className || ''}`

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
    if (status === 'authenticated' && siwe?.address !== address) signOut()
    else {
      setModalState(isLoading ? 'loading' : address ? (data ? (siwe ? 'verified' : 'verify') : 'register') : 'walletselect')
      setIsDisabled((isLoading && address) || !!disabled)
      setMessage(siwe?.address && !web2 ? shortenAddress(siwe.address) : messages[modalState])
    }
  }, [address, siwe, data, status, disabled])

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

      <div
        className={` fixed top-[-160px] left-0 bottom-0 flex h-[100vh] w-[100vw] items-center justify-center transition-all ease-in-out md:top-0 ${
          openModal ? 'visible z-50 opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div
          className={`absolute -z-10 h-full w-full bg-vdao-dark bg-opacity-60 backdrop-blur-lg backdrop-opacity-0 transition-all ${openModal && 'backdrop-opacity-100'}`}
          onClick={() => {
            setOpenModal(false)
          }}
        />
        {modalState === 'walletselect' && <WalletSelect setOpenModal={setOpenModal} />}
        {modalState === 'verify' && <VerifyWallet setOpenModal={setOpenModal} web2={!!web2} />}
        {modalState === 'register' && <RegisterWallet setOpenModal={setOpenModal} />}
        {modalState === 'verified' && <DisplayWallet setOpenModal={setOpenModal} />}
      </div>
    </>
  )
}

function WalletSelect({ setOpenModal }: { setOpenModal: Dispatch<SetStateAction<boolean>> }) {
  const { connect, connectors } = useConnect()

  return (
    <div
      style={{ backgroundColor: '#06121E' }}
      className='md:w-contain h-full w-full bg-[url(/illustrations/connectWallet/SVG/VDAO-connect-wallet-mobile.svg)] bg-contain bg-center bg-no-repeat pl-[24px] pr-[60px] md:mt-[28px] md:h-[387px] md:w-fit md:rounded-[20px] md:bg-[url(/illustrations/connectWallet/SVG/VDAO-connect-bg.svg)] md:pl-10'
    >
      <div className='  flex justify-between pt-[35px]'>
        <Link href='/'>
          <Image src={logo} alt='VDAO' height={30} className='md:pt-[20px]' />
        </Link>

        <Image src={closeIcon} onClick={() => setOpenModal(false)} alt='VDAO' height={24} className='cursor-pointer' />
      </div>
      <div className='flex flex-col justify-between gap-[100px] pt-[60px] md:flex-row md:gap-10'>
        <div className=''>
          <div className='w-[274px] font-heading text-[46px] font-medium leading-[56.58px] text-vdao-light md:leading-[52px]'>Sign in with your wallet.</div>
          <div className='w-[359px] pt-5 font-inter text-lg font-normal leading-[22px] text-white md:w-[310px] md:text-base md:leading-5'>
            Connect with one of our available wallet providers or create a new one.{' '}
          </div>
        </div>

        {/* BUTTONS */}
        <div className='flex flex-col gap-5'>
          {[
            { label: 'MetaMask Wallet', connector: connectors[0] },
            { label: 'Coinbase Wallet', connector: connectors[1] },
            { label: 'Wallet Connect', connector: connectors[2] },
          ].map((btn, index) => {
            return (
              <div
                key={index}
                onClick={() => connect({ connector: btn.connector })}
                className='mx-auto flex w-[300px] cursor-pointer items-center justify-center rounded-[20px] bg-vdao-light py-[7px] font-heading text-xl font-medium leading-[26px] text-vdao-dark md:mx-0'
              >
                {btn.label}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function VerifyWallet({ setOpenModal, web2 }: { setOpenModal: Dispatch<SetStateAction<boolean>>; web2: boolean }) {
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

  return (
    <div className='h-full w-full bg-vdao-deep pl-[24px] pr-[60px] md:h-[387px] md:w-fit md:rounded-[20px] md:pl-10 md:pt-[28px]'>
      <div className=' hidden justify-between md:flex'>
        <Link href='/'>
          <Image src={logo} alt='VDAO' height={30} className='md:pt-[20px]' />
        </Link>

        <Image src={closeIcon} onClick={() => setOpenModal(false)} alt='VDAO' height={24} className='cursor-pointer' />
      </div>
      <div className='flex flex-col justify-between gap-[100px] pt-[60px] md:flex-row md:gap-10'>
        <div className='flex flex-col gap-5'>
          <div className='w-[274px] font-heading text-[46px] font-medium leading-[56.58px] text-vdao-light md:leading-[52px]'>Verify</div>
          <div className='w-[359px] font-inter text-lg font-normal leading-[22px] text-white md:w-[310px] md:text-base md:leading-5'>
            VDAO needs to verify your wallet address. This is not a transaction and won't cost any gas fees.
          </div>
          <Button type='primary' className='!h-9 !text-xl !text-black' onClick={verify} loading={loading}>
            Verify Wallet
          </Button>
        </div>
      </div>
    </div>
  )
}

function RegisterWallet({ setOpenModal }: { setOpenModal: Dispatch<SetStateAction<boolean>> }) {
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
    <div className={`flex flex-row gap-5 text-center align-middle max-md:mx-auto  md:gap-10 md:pt-8 lg:flex-row ${className}`}>
      <div className='relative !h-24 !w-24 flex-none'>
        <Image src={image ? image : PodImage} alt='PodImage' className='mx-auto' sizes='square' fill />
      </div>
      <div className='flex flex-col'>
        <label className='mx-auto w-fit cursor-pointer rounded-[5px] bg-vdao-pink py-[5px] px-[35px] font-heading text-xl font-medium'>
          <input type='file' accept='image/*' className='hidden cursor-pointer pt-5' form='register-form' name='image' onChange={onImageChange} max={1} />
          Upload Image
        </label>
        <div className='pt-[5px] text-sm text-vdao-light md:pt-2'>Optional</div>
        <div className='pt-[5px] text-sm text-vdao-light'>800 x 800px png or jpeg</div>
      </div>
    </div>
  )

  return (
    <div className='h-full w-full bg-vdao-deep pl-[24px] pr-[60px] md:h-auto md:w-fit md:rounded-[20px] md:pl-10 md:pt-[28px]'>
      <div className=' hidden justify-between md:flex'>
        <Link href='/'>
          <Image src={logo} alt='VDAO' height={30} className='md:pt-[20px]' />
        </Link>

        <Image src={closeIcon} onClick={() => setOpenModal(false)} alt='VDAO' height={24} className='cursor-pointer' />
      </div>
      <div className='mb-4 flex flex-col justify-between gap-[100px] pt-[60px] md:flex-row md:gap-10'>
        <div className='flex flex-col  gap-5'>
          <div className='w-full font-heading text-[46px] font-medium leading-[56.58px] text-vdao-light md:leading-[52px]'>Oh, You're new here</div>
          <Input placeholder='Enter your name' className='!h-9 !text-xl !text-black' onChange={e => setName(e.target.value)} />
          <Input.TextArea placeholder='Enter your bio' className='!text-xl !text-black' onChange={e => setBio(e.target.value)} />
          <ImageInput className='md:hidden' />
          <Button type='primary' className='!h-9 !text-xl !text-black' onClick={verify} loading={isLoading}>
            Register
          </Button>
          <div className='flex gap-2'>
            <span>Next steps: Apply to join a guild to be a member of the DAO</span>
            <Tooltip title='Apply to join a guild to be a member of the DAO' className='my-auto text-white'>
              <BsFillInfoCircleFill />
            </Tooltip>
          </div>
        </div>
        <ImageInput className='max-md:hidden' />
      </div>
    </div>
  )
}

function DisplayWallet({ setOpenModal }: { setOpenModal: Dispatch<SetStateAction<boolean>> }) {
  const { data: siwe } = useSession()

  return (
    <div className='h-full w-full bg-vdao-deep pl-[24px] pr-[60px] pb-6 md:h-auto md:w-5/12 md:rounded-[20px] md:pl-10 md:pt-[28px]'>
      <div className=' hidden justify-between md:flex'>
        <Link href='/'>
          <Image src={logo} alt='VDAO' height={30} className='md:pt-[20px]' />
        </Link>

        <Image src={closeIcon} onClick={() => setOpenModal(false)} alt='VDAO' height={24} className='cursor-pointer' />
      </div>
      <div className='flex flex-col items-center justify-between gap-[100px] pt-[60px] md:gap-2'>
        <div className='relative mx-auto h-24 w-24'>
          <Image src={siwe?.user.picture || PodImage} alt='PodImage' className='mx-auto' sizes='square' fill />
        </div>
        <span className='text-xl text-white'>{shortenText(siwe?.user.name!, 20)}</span>
        <span className='text-xl text-white'>{shortenAddress(siwe?.address || '')}</span>

        <div className='flex gap-4'>
          <Button type='primary' className='!h-9 !text-xl !text-black' onClick={() => signOut()}>
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  )
}
