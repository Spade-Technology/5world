import logo from 'public/logo/png/color.png'
import closeIcon from 'public/logo/svg/close.svg'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export const VDAOConnectButton = ({ className, web2 }: { className?: string; web2?: boolean }) => {
  const buttonStyle = `rounded-md border-[1px] h-10 px-5 font-heading font-medium ${className ? className : ''}`

  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    if (openModal) {
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = 'scroll'
    }
  }, [openModal])

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
        Connect Wallet
      </button>
      <article
        className={`fixed top-0 left-0 bottom-0    h-[100vw] w-[100vw]  bg-vdao-dark duration-150 ease-in-out ${
          openModal ? 'visible z-50 opacity-100' : 'invisible opacity-0'
        } `}
      >
        <section className='mx-auto mt-[60px] h-[387px] w-fit rounded-[20px] bg-vdao-deep pl-10 pr-[60px] pt-[28px]'>
          <div className='flex justify-between'>
            <Link href='/'>
              <Image src={logo} alt='VDAO' height={30} className='pt-[20px]' />
            </Link>

            <Image
              src={closeIcon}
              onClick={() => setOpenModal(false)}
              alt='VDAO'
              height={24}
              className='cursor-pointer'
            />
          </div>
          <div className='flex justify-between gap-10 pt-[60px]'>
            <div className=''>
              <div className='w-[274px] font-heading text-[46px] font-medium leading-[52px] text-vdao-light'>
                Sign in with your wallet.
              </div>
              <div className='w-[310px] pt-5 font-inter text-base font-normal leading-5 text-white'>
                Connect with one of our available wallet providers or create a new one.{' '}
              </div>
            </div>

            {/* BUTTONS */}
            <div className='flex flex-col gap-5'>
              {['MetaMask Wallet', 'Coinbase Wallet', 'WalletConnect'].map((btn, index) => {
                return (
                  <div className='flex w-[300px] cursor-pointer items-center justify-center rounded-[20px] bg-vdao-light py-[7px] font-heading text-xl font-medium leading-[26px] text-vdao-dark'>
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
