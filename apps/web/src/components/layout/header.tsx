import React, { useEffect, useState } from 'react'

import Image from 'next/image'

import logo from 'public/logo/png/color.png'

import discord from 'public/illustrations/socials/discord.svg'
import discordCircle from 'public/illustrations/socials/discordCircle.svg'
import discourse from 'public/illustrations/socials/discourse.svg'

import darkDiscourse from 'public/illustrations/socials/darkDiscourse.svg'
import darkDiscord from 'public/illustrations/socials/darkDiscord.svg'

import twitter from 'public/illustrations/socials/twitter.svg'
import { Collapse, Divider, Skeleton, Tooltip } from 'antd'
import { VDAOConnectButton } from '../walletconnect/connectbutton'
import Link from 'next/link'
import { useRouter } from 'next/router'
const { Panel } = Collapse

type Props = {
  signatures?: number
  className?: string
  web2?: boolean
  dark?: boolean
  loading?: boolean
}

type NavigationElement = {
  name: string
  link: string
  children?: NavigationElement[]
}

const navigationElementsWeb2: NavigationElement[] = [
  { name: 'Home', link: '/' },
  {
    name: 'Participate',
    link: '/apply',
    children: [
      { name: 'Sign Manifesto', link: '/manifesto' },
      { name: 'Apply', link: '/apply' },
      { name: 'NFT Collection', link: '/nft' },
      { name: 'Discord', link: '#' },
      { name: 'Forum', link: '#' },
    ],
  },
  { name: 'Get Funding', link: '/funding' },
  { name: 'Donate', link: '/donate' },
  {
    name: 'About',
    link: '/about',
    children: [
      { name: 'About Us', link: '/about' },
      { name: 'Whitepaper', link: '/whitepaper' },
      { name: 'Analytics', link: '/analytics' },
      { name: 'Blog', link: '/blog' },
    ],
  },
]

const navigationElementsWeb3: NavigationElement[] = [
  { name: 'Dashboard', link: '/app' },
  {
    name: 'Vote',
    link: '#',
    children: [
      { name: 'Operational Proposals', link: '/app/proposals' },
      { name: 'Grants Round', link: '/app/grants' },
      { name: 'Steward Election', link: '/app/election' },
      { name: 'Forum Discussion', link: '#' },
    ],
  },

  {
    name: 'Profiles',
    link: '#',
    children: [
      { name: 'Steward Profile', link: '/app/steward' },
      { name: 'Pods Profile', link: '/app/pods' },
    ],
  },

  { name: 'Support', link: '/app/support' },
  { name: 'Analytics', link: '/app/analytics' },
]

const Header = (props: Props) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [subModal, setSubModal] = useState(false)
  const router = useRouter()

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  const [pathname, setPathname] = useState('')

  useEffect(() => {
    if (typeof window != 'undefined') {
      setPathname(window.location.pathname)
    }
  }, [])

  return (
    <header className={!props.dark && router.pathname !== '/app/support' ? 'overflow-hidden bg-white' : 'w-full overflow-hidden bg-vdao-deep'}>
      {/* Desktop */}
      <div className={`z-50 mx-auto hidden h-[100px] max-w-[1140px] items-center justify-center px-6 md:flex xl:px-0`}>
        <Link href={props.web2 ? '/' : '/app'}>
          <Image src={logo} alt='VDAO' height={30} />
        </Link>

        <div className={'ml-auto mr-[50px] flex justify-between gap-5 lg:gap-[35px] ' + (!props.dark ? '!text-vdao-dark' : 'text-white')}>
          {(props.web2 ? navigationElementsWeb2 : navigationElementsWeb3).map((element, index) =>
            !props.web2 && index >= 0 ? (
              <Tooltip
                placement='bottomLeft'
                color='white'
                overlayStyle={{ width: '390px', maxWidth: 'auto', boxShadow: ' 0px 4px 20px 0px rgba(0, 0, 0, 0.25)', padding: '0px' }}
                title={
                  element.children &&
                  element.children.length > 0 && (
                    <div className='flex flex-col py-5 '>
                      {element.children?.map(child => (
                        <Link
                          className='rounded-sm px-10 py-2.5 font-inter text-base font-normal !text-vdao-dark duration-500 hover:bg-[rgb(3,218,247,.2)] hover:text-lg hover:font-bold'
                          href={child.link}
                          key={child.name}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )
                }
                key={element.name}
              >
                <Link href={element.link} className={`font-body text-lg font-medium ${props.web2 ? 'text-vdao-dark' : 'text-white'}`}>
                  {element.name}
                </Link>
              </Tooltip>
            ) : props.web2 ? (
              <Tooltip
                placement='bottomLeft'
                color='white'
                title={
                  element.children &&
                  element.children.length > 0 && (
                    <div className='flex flex-col gap-5 px-10 py-8 '>
                      {element.children?.map(child => (
                        <Link className='small-text !text-vdao-dark hover:opacity-80' href={child.link} key={child.name}>
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )
                }
                key={element.name}
              >
                <Link href={element.link} className={`font-body text-lg font-medium ${props.web2 && router.pathname !== '/nft' ? 'text-vdao-dark' : 'text-white'}`}>
                  {element.name}
                </Link>
              </Tooltip>
            ) : (
              ''
            ),
          )}
        </div>

        <div className='hidden gap-[30px] md:flex'>
          <Link href='https://vdao.discourse.group' target='_blank' rel='noopener noreferrer' className='flex items-center'>
            <Image src={!props.dark && router.pathname !== '/app/support' ? discourse : darkDiscourse} alt='VDAO' width={30} height={30} className='hidden md:block' />
          </Link>
          <Image src={!props.dark && router.pathname !== '/app/support' ? discordCircle : darkDiscord} alt='VDAO' width={30} height={30} className='hidden md:block' />
          <VDAOConnectButton
            web2={props.web2}
            className={!props.dark && router.pathname !== '/app/support' ? 'border-vdao-dark text-xl font-medium text-vdao-dark' : 'border-none bg-vdao-dark text-white'}
          />
        </div>
      </div>

      {/* Mobile */}
      <div className={`flex w-full items-center justify-between overflow-hidden py-16 px-4 md:hidden ${!props.dark ? 'bg-white ' : 'bg-vdao-deep '}  ${pathname === '/blog/details' ? '!pb-4' : ''}`}>
        <Link href='/'>
          <Image src={logo} alt='VDAO' height={30} />
        </Link>
        <button
          onClick={toggleMobileMenu}
          className={`text-white-dark rounded-md px-2 transition-all focus:outline-none focus:ring-2 focus:ring-vdao-dark focus:ring-offset-2 ${
            !props.dark ? '' : '!text-vdao-light focus:ring-vdao-light '
          }`}
        >
          <span className='sr-only'>Open menu</span>
          <svg className='h-8 w-8' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={
          'hide-scrollbar fixed top-0 left-0 z-50 h-full w-full -translate-x-full overflow-x-hidden overflow-y-scroll  transition-all md:mt-[150px] md:hidden ' +
          (!props.dark ? 'bg-white ' : 'bg-vdao-deep ') +
          (isMobileMenuOpen && '!translate-x-0 ')
        }
      >
        <div className={`flex w-full items-center justify-between py-16 px-4 md:hidden ${!props.dark ? 'bg-white ' : 'bg-vdao-deep '}  ${pathname === '/blog/details' ? '!pb-4' : ''}`}>
          <Link href='/'>
            <Image src={logo} alt='VDAO' height={30} />
          </Link>
          <button
            onClick={toggleMobileMenu}
            className={`text-white-dark rounded-md px-2 transition-all focus:outline-none focus:ring-2 focus:ring-vdao-dark focus:ring-offset-2 ${
              !props.dark ? '' : '!text-vdao-light focus:ring-vdao-light '
            }`}
          >
            <span className='sr-only'>Open menu</span>
            <svg className='h-8 w-8' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>

        <div className='antd-stop-propagation space-y-1 px-6 pt-2 pb-3'>
          {(props.web2 ? navigationElementsWeb2 : navigationElementsWeb3).map(element => (
            <MobileSubmenu element={element} key={element.name} dark={props.dark} />
          ))}
        </div>
        <div className='flex flex-col items-center pt-4 pb-3'>
          <div className='my-10 flex gap-7'>
            <Link href='https://vdao.discourse.group' target='_blank' rel='noopener noreferrer'>
              <Image src={!props.dark ? discourse : darkDiscourse} alt='VDAO' width={50} height={50} />
            </Link>
            <Image src={!props.dark ? discordCircle : darkDiscord} alt='VDAO' width={50} height={50} />
          </div>
          <div className='flex items-center px-5'>
            <VDAOConnectButton className={`${!props.dark ? 'border-vdao-dark text-vdao-dark ' : 'border-white text-white '} `} web2={props.web2} />
          </div>
        </div>
      </div>
    </header>
  )
}

const MobileSubmenu = (props: {
  element: NavigationElement

  dark?: boolean
}) => {
  const { element, dark } = props

  const [isChildOpen, setIsChildOpen] = useState(false)
  const router = useRouter()

  const hasChildren = element.children && element.children.length > 0
  const toggleChild = () => hasChildren && setIsChildOpen(!isChildOpen)

  return (
    <>
      <button
        onClick={hasChildren ? toggleChild : () => router.push(element.link)}
        className={
          'h3 flex w-full items-center justify-between py-2 text-left text-base font-medium hover:bg-opacity-75 focus:outline-none ' +
          (isChildOpen ? 'text-vdao-light' : !dark ? 'text-vdao-dark ' : 'text-white ')
        }
      >
        {element.name}
        {hasChildren && (
          <svg
            className={`h-10 w-10 transform text-vdao-light transition duration-300 ${isChildOpen ? 'rotate-180' : ''}`}
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
          </svg>
        )}
      </button>
      <div
        style={{
          maxHeight: isChildOpen ? `${(element?.children?.length || 0) * 3}rem` : '0',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease-in-out',
        }}
      >
        {hasChildren &&
          element?.children?.map(child => (
            <Link href={child.link} key={child.name} className={'big-text-mobile block py-1 pl-4 text-sm font-medium last:mb-4 hover:bg-opacity-75 ' + (!dark ? 'text-vdao-dark ' : 'text-white ')}>
              {child.name}
            </Link>
          ))}
      </div>
    </>
  )
}

const HeaderManifesto = (props: Props) => {
  return (
    <div className='mx-auto flex w-full items-center justify-between bg-vdao-deep px-4 py-11 lg:max-w-[1140px]'>
      <Image src={logo} alt='VDAO' className='my-auto h-[17.74px] w-[76px] max-[350px]:h-4 max-[350px]:w-[69px] md:h-[30px]  md:w-[130px]' />
      <div className='flex items-center gap-[56px]'>
        <section className='hidden items-center justify-between gap-[35px] lg:flex'>
          {navigationElementsWeb2.map(
            (element, index) =>
              index > 0 && (
                <Tooltip
                  placement='bottomLeft'
                  color='white'
                  title={
                    element.children &&
                    element.children.length > 0 && (
                      <div className='flex flex-col gap-5 px-10 py-8 '>
                        {element.children?.map(child => (
                          <Link className='small-text !text-vdao-dark hover:opacity-80' href={child.link} key={child.name}>
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )
                  }
                  key={element.name}
                >
                  <Link href={element.link} className={`font-body text-lg font-medium ${props.web2 ? 'text-vdao-dark' : 'text-white'}`}>
                    {element.name}
                  </Link>
                </Tooltip>
              ),
          )}
        </section>
        <div className='flex items-center justify-center gap-4 max-[350px]:gap-3 md:gap-7'>
          <Image src={twitter} alt='VDAO' width={30} height={30} className='max-[350px]:h-[25.7px] max-[350px]:w-[24.6px]' />
          <Image src={discord} alt='VDAO' width={30} height={30} className='max-[350px]:h-[25.7px] max-[350px]:w-[24.6px]' />

          <VDAOConnectButton className='!mx-0 flex items-center justify-center border-vdao-light !px-[23px] !py-[11px] text-sm text-vdao-light max-[350px]:!py-[10.4px] max-[350px]:!px-[14px] max-[350px]:!text-[13.3px]' />
        </div>
      </div>
    </div>
  )
}

export { HeaderManifesto, Header }

export default Header
