import React from 'react'
import { Button, Image } from 'antd'
import { Section } from '../layout/section'
import { VDAOConnectButton } from '../walletconnect/connectbutton'
import { useSession } from 'next-auth/react'

const LoginPromptComponent = () => {
  return (
    <Section className='mx-auto my-8 flex max-w-[1440px] flex-col items-center gap-5 rounded-lg bg-vdao-dark md:px-6' 
              >
      <div className='z-10 flex w-11/12 flex-col px-6' id="restrictedContent">
        <div className='font-heading text-[32px] font-medium text-white md:text-[46px] '>Restricted Content</div>
        <div className='mt-[21px] font-body text-lg font-normal leading-[22px] text-white md:mt-9'>The page you're trying to access requires you to be logged in. Please log in to continue.</div>

        <VDAOConnectButton className='my-8 text-white' />
      </div>
    </Section>
  )
}

export const EnforceAuth = ({ children }: { children: React.ReactNode }) => {
  const { data: siwe, status } = useSession()

  return status === 'loading' ? <></> : siwe ? <>{children}</> : <LoginPromptComponent />
}

export default LoginPromptComponent
