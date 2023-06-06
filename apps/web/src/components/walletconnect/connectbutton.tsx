import logo from 'public/logo/png/color.png'
import closeIcon from 'public/logo/svg/close.svg'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export const VDAOConnectButton = ({ className, web2 }: { className?: string; web2?: boolean }) => {
  const buttonStyle = `rounded-md border-[1px] h-10 px-5 font-heading font-medium ${className ? className : ''}`

  const ref = useRef<HTMLInputElement>(null)
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    if (openModal) {
      document.body.style.overflowY = 'hiddn'
    } else {
      document.body.style.overflowY = 'scroll'
    }
  }, [openModal])

  useEffect(() => {
    const muf = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpenModal(false)
      }
    }
    document.addEventListener('mousedown', muf)
  }, [ref])

  if (web2)
    return (
      <Link href='/app'>
        <button type='button' className={buttonStyle}>
          Open App
        </button>
      </Link>
    )

  return (
    <>
      <button onClick={() => setOpenModal(true)} type='button' className={buttonStyle}>
        Connect Walleth
      </button>
      <article
        className={`fixed top-0 left-0 bottom-0 h-[100vh] w-[100vw]  bg-vdao-dark duration-150 ease-in-out ${
          openModal ? 'visible z-50 opacity-100' : 'invisible opacity-0'
        } `}
      >
        <section
          ref={ref}
          className='h-full w-full bg-vdao-deep pl-[24px] pr-[60px] md:mx-auto md:mt-[60px] md:h-[387px] md:w-fit md:rounded-[20px] md:pl-10 md:pt-[28px]'
        >
          <div className=' hidden justify-between md:flex'>
            <Link href='/'>
              <Image src={logo} alt='VDAO' height={30} className='md:pt-[20px]' />
            </Link>

            <Image
              src={closeIcon}
              onClick={() => setOpenModal(false)}
              alt='VDAO'
              height={24}
              className='cursor-pointer'
            />
          </div>
          <div className='flex flex-col justify-between gap-[100px] pt-[60px] md:flex-row md:gap-10'>
            <div className=''>
              <div className='w-[274px] font-heading text-[46px] font-medium leading-[56.58px] text-vdao-light md:leading-[52px]'>
                Sign in with your wallet.
              </div>
              <div className='w-[359px] pt-5 font-inter text-lg font-normal leading-[22px] text-white md:w-[310px] md:text-base md:leading-5'>
                Connect with one of our available wallet providers or create a new one.{' '}
              </div>
            </div>

            {/* BUTTONS */}
            <div className='flex flex-col gap-5'>
              {['MetaMask Wallet', 'Coinbase Wallet', 'WalletConnect'].map((btn, index) => {
                return (
                  <div className='mx-auto flex w-[300px] cursor-pointer items-center justify-center rounded-[20px] bg-vdao-light py-[7px] font-heading text-xl font-medium leading-[26px] text-vdao-dark md:mx-0'>
                    Sign in with your wallet.
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </article>
    </>

    // <ConnectButton.Custom>
    //   {({ account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
    //     // Note: If your app doesn't use authentication, you
    //     // can remove all 'authenticationStatus' checks
    //     const ready = mounted && authenticationStatus !== 'loading'
    //     const connected =
    //       ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated')
    //     return (
    //       <div
    //         {...(!ready && {
    //           'aria-hidden': true,
    //           style: {
    //             opacity: 0,
    //             pointerEvents: 'none',
    //             userSelect: 'none',
    //           },
    //         })}
    //       >
    //         {(() => {
    //           if (!connected) {
    //             return (
    //               <button onClick={openConnectModal} type='button' className={buttonStyle}>
    //                 Connect Wallet
    //               </button>
    //             )
    //           }
    //           if (chain.unsupported) {
    //             return (
    //               <button onClick={openChainModal} type='button' className={buttonStyle}>
    //                 Wrong network
    //               </button>
    //             )
    //           }
    //           return (
    //             <div style={{ display: 'flex', gap: 12 }}>
    //               <button onClick={openAccountModal} type='button' className={buttonStyle}>
    //                 {account.displayName}
    //               </button>
    //             </div>
    //           )
    //         })()}
    //       </div>
    //     )
    //   }}
    // </ConnectButton.Custom>
  )
}
