import { type NextPage } from 'next'
import Head from 'next/head'

import { HeaderManifesto } from '~/components/layout/header'

// VDAO-get-involved.png
import VDAOApply from 'public/illustrations/apply/PNG/VDAO-apply.png'
import VDAOGetInvolved from 'public/illustrations/home/PNG/VDAO-get-involved.png'
import VDAOTweetManifesto from 'public/illustrations/home/PNG/tweet-manifesto.png'

import { Button, Divider, Skeleton, Spin, notification } from 'antd'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Image from 'next/image'
import Tick from 'public/icons/home/tick.svg'
import { useAccount } from 'wagmi'
import { FooterManifesto } from '~/components/layout/footer'
import { VDAOConnectButton } from '~/components/walletconnect/connectbutton'

import { useSignMessage } from 'wagmi'

import { useSession } from 'next-auth/react'
import COLOR_VDAO_LARGE from 'public/logo/png/color_large.png'
import VDAO_whiteIcon from 'public/logo/svg/white.svg'
import Green_VDAO from 'public/logo/svg/VDAO-twitter-background-black 1.svg'
import SubmitIcon from 'public/icons/manifesto/submitIcon.svg'
import { RefObject, useEffect, useRef, useState } from 'react'

import PrimaryButton from '~/styles/shared/buttons/primaryButton'
import { api } from '~/utils/api'

dayjs.extend(relativeTime)

const Home: NextPage<any> = () => {
  const signModuleRef = useRef<HTMLDivElement>(null)
  const [signatures, setSignatures] = useState({ total: 0, list: [], loading: true })

  useEffect(() => {
    fetchSignatures()
  }, [])

  const fetchSignatures = async () => {
    const res = await fetch('/api/manifesto/api')
    const data = await res.json()
    setSignatures({ ...data, loading: false })
    return res
  }

  return (
    <>
      <Head>
        <title>VDAO Manifesto</title>
        <meta name='description' content='Restoring Ecosystems From the Soil up.' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='bg-vdao-deep'>
        <HeaderManifesto signatures={signatures.total} loading={signatures.loading} />
        <div className='md:px-4'>
          <SectionOne />
          <SectionTwo />

          <Signing signatures={signatures} signModuleRef={signModuleRef} fetchSignatures={fetchSignatures} />
        </div>
        <FooterManifesto signatures={signatures.total} signModuleRef={signModuleRef} loading={signatures.loading} />
      </main>
    </>
  )
}

export default Home

function Signing({
  signatures,
  signModuleRef,
  fetchSignatures,
}: {
  signatures: { total: number; list: any[]; loading: boolean }
  signModuleRef: RefObject<HTMLDivElement>
  fetchSignatures: () => void
}) {
  const list = signatures.list
  const [step, setStep] = useState(0)
  const [sticky, setSticky] = useState(false)

  // wagmi get address
  const { address } = useAccount()
  const { mutateAsync } = api.manifesto.sign.useMutation()

  const [notificationApi, contextHolder] = notification.useNotification()
  const { status } = useSession()

  const { data, error, isLoading, signMessage } = useSignMessage({
    onSuccess: async (data, variables) => {
      // const address = verifyMessage(variables.message, data)

      mutateAsync({
        eoa: String(address),
        signature: data,
        message: variables.message.toString(),
      }).then(res => {
        fetchSignatures()
        notificationApi.success({
          message: <span>Signed Manifesto</span>,
          description: (
            <div className='flex flex-col gap-4'>
              <span className='text-base'>You have successfully signed the manifesto</span>
              <Image src={VDAOTweetManifesto} alt='VDAO Tweet Manifesto' />
              <Button
                type='primary'
                className='!h-10'
                href='https://twitter.com/intent/tweet?text=I%20just%20signed%20the%20VDAO%20Manifesto.%20You%20need%20to%20check%20this%20out%20!%20https%3A%2F%2Fwww.vdao.io'
                target='_blank'
              >
                Share on Twitter
              </Button>
            </div>
          ),
          placement: 'top',
          className: '!bg-vdao-dark !text-white',

          duration: 150,
        })
      })
    },
  })

  const signManifesto = () => {
    signMessage({
      message: `I agree to the terms of the Manifesto of the VDAO Project.\n\n\n\nDate of signing: ${new Date().toISOString()} Signing Nounce: ${(Math.random() * 1000000).toFixed(0) + 1}`,
    })
  }

  useEffect(() => {
    if (address && status === 'authenticated') {
      setStep(2)
    } else if (address && status !== 'authenticated') {
      setStep(1)
    } else if (!address) {
      setStep(0)
    }
  }, [address, status])

  useEffect(() => {
    window.addEventListener('scroll', isSticky)
    return () => {
      window.removeEventListener('scroll', isSticky)
    }
  })

  /* Method that will fix header after a specific scrollable */
  const isSticky = (e: any) => {
    const scrollTop = window.scrollY

    if ((window.screen.availWidth <= 390 && scrollTop >= 7130) || (window.screen.availWidth > 390 && scrollTop >= 5880)) {
      setSticky(true)
    } else {
      setSticky(false)
    }
  }

  return (
    <section>
      {contextHolder}
      <div className='mx-auto max-w-[850px]' id='SignModule' ref={signModuleRef}>
        <div className='mx-auto max-w-[358px] rounded-lg bg-vdao-dark p-4 md:pr-[32px]'>
          <span className='font-body text-lg font-medium'>Sign the manifesto with 3 simple steps</span>
          <div className='ml-1 mt-4 flex'>
            {/* left */}
            <div className='my-[10px] mr-6 flex flex-col'>
              {/* step 0 */}
              <div className='z-10 h-5 w-5 rounded-full bg-vdao-light'></div>

              {/* step 1 */}
              <div className={`mx-auto h-14 w-[2px] scale-110 rounded-full bg-vdao-light ${step < 1 ? 'opacity-0' : ''}`} />

              <div className={`z-10 h-5 w-5 rounded-full ${step >= 1 ? 'bg-[#36DFAE]' : 'bg-[#9B9B9B]'}`} />

              {/* step 2 */}
              <div className={`mx-auto h-14 w-[2px] scale-110 rounded-full bg-vdao-light ${step < 2 ? 'opacity-0' : ''}`} />
              <div className={`z-10 h-5 w-5 rounded-full ${step >= 2 ? 'bg-[#36DFAE]' : 'bg-[#9B9B9B]'}`} />
            </div>
            {/* right */}
            <div className='d-none flex flex-col justify-between'>
              {/* step 0 */}
              <VDAOConnectButton
                className='border-vdao-light bg-vdao-light font-roboto text-sm font-medium text-vdao-dark outline-none'
                messageOverrides={{ verify: 'Wallet Connected', verified: 'Wallet Connected' }}
                web2
                redirectDisabled
              />
              {/* step 1 */}
              <VDAOConnectButton
                className={`!h-10 w-fit font-roboto text-sm font-medium ${
                  step < 1 ? '!border-[#9B9B9B] !bg-[#9B9B9B] !text-[#515151]' : step == 1 ? '!text-vdao-light' : '!border-vdao-light !text-vdao-light'
                }`}
                disabled={step != 1}
                redirectDisabled
                messageOverrides={{ verified: 'Wallet Verified' }}
                web2
              />
              {/* step 2 */}
              <VDAOConnectButton
                className={`!h-10 w-fit font-roboto text-sm font-medium ${step < 2 ? '!border-[#9B9B9B] !bg-[#9B9B9B] !text-[#515151]' : '!border-vdao-light !text-vdao-light'}`}
                disabled={step != 2}
                onClickOverride={signManifesto}
                messageOverrides={{ verified: 'Sign Manifesto', verify: 'Sign Manifesto', register: 'Sign Manifesto', walletselect: 'Sign Manifesto' }}
                web2
              />
            </div>
          </div>
        </div>

        <h3 className='mt-[50px] mr-auto px-4 font-heading text-5xl text-[28px] font-medium leading-[28px] text-vdao-light md:mt-20 md:px-0 md:text-start md:text-[32px] md:font-normal md:leading-[54px]'>
          Manifesto Signers
        </h3>
        <div className='mt-5 flex items-center justify-between px-4 md:mt-[32px] md:px-0'>
          <div className='font-heading text-base font-medium leading-[28px] text-white md:text-xl md:font-normal'>Signed By :</div>
          <span className='font-heading text-lg font-medium leading-3 md:text-xl md:leading-[28px] '>
            <Skeleton active={signatures.loading} paragraph={{ rows: 1, width: '20px' }} title={false} loading={signatures.loading} className='my-auto !w-5'>
              {signatures.total || 0}
            </Skeleton>
            <div className='font-body text-sm font-normal leading-[28px]'>Signatures</div>
          </span>
        </div>
        <div className={`mt-4 max-w-[860px] bg-vdao-dark px-6 py-3 md:mt-3 md:rounded-lg`}>
          {signatures.loading && <Spin className='w-full' />}
          {list.map((item, i) => (
            <>
              <div key={i} className={`flex w-full flex-row items-end justify-between py-4 md:mt-4 md:items-center ${sticky ? '' : ''}`}>
                <div className='flex w-full items-center  gap-3'>
                  <div className=''>
                    <div
                      className='rounded-full'
                      style={{
                        background: 'linear-gradient(221.35deg, #36DFAE 0%, #28B6A5 36.46%, #1D555C 100%)',
                        width: '44px',
                        height: '44px',
                      }}
                    />
                  </div>
                  <span className=' overflow-hidden overflow-ellipsis text-sm font-medium md:hidden md:w-full'>{item?.name || item?.eoa.substring(0, 13)}</span>
                  <span className='hidden w-48 overflow-hidden overflow-ellipsis text-sm font-medium md:block md:w-full'>{item?.name || item?.eoa}</span>
                </div>
                <span className='w-full text-right font-body  text-[13px] font-normal'>{dayjs(item.updatedAt).fromNow()}</span>
              </div>
              {i !== list.length - 1 && <div className='h-[1px] w-full bg-white opacity-20' />}
            </>
          ))}
        </div>

        <div className={`max-w-96 mx-4 mt-[90px] flex flex-col justify-between gap-7 rounded-lg bg-vdao-dark px-6 pt-[16px] pb-[46px] text-white md:mx-0 md:mt-40 md:flex-row md:gap-0 md:py-5`}>
          <div className='my-auto font-body text-lg font-medium'>
            Join our mailing list
            <br />
            <div className='font-body text-base font-normal opacity-70'>Be the 1st one to get all future updates.</div>
          </div>
          <div className='flex'>
            <input className='w-full rounded bg-[#14444A] px-5 py-3 font-body text-base font-normal text-[#3BA7B5] outline-none placeholder:text-[#3BA7B5]' placeholder='Enter your email address ' />
            <div className='relative -left-1 w-16 rounded-r bg-vdao-light py-[14px] px-5'>
              <Image src={SubmitIcon} alt='SubmitIcon' className='h-fit' />
            </div>
          </div>
        </div>
      </div>
      <div className='mx-4 mt-20 flex flex-col  items-center justify-center gap-[28px] md:mx-auto md:mb-20 md:mt-[119] md:max-w-[860px] md:flex-row md:gap-[8px] lg:justify-between lg:gap-[38px] '>
        <div className='flex w-full flex-col'>
          <div className='mr-auto max-w-[293px] text-left font-heading text-[24px] font-light leading-none text-vdao-light md:mt-9 md:w-[496px] md:max-w-[496px] md:text-[40px] '>
            <div className='font-light leading-[28px] md:font-medium md:leading-[60px] md:tracking-[-1.5px]'>Feeling inspired?</div>
            <div className='font-light leading-[28px] md:leading-[60px] md:tracking-[-1.5px]'>Want to get more involved?</div>
            <div className='font-medium leading-[28px] md:leading-[60px] md:tracking-[-1.5px]'>APPLY TO JOIN THE DAO.</div>
          </div>
          <div className='mt-10 w-fit cursor-pointer rounded-md bg-vdao-light px-9 py-1.5 font-heading text-xl font-medium text-vdao-dark md:py-[18px] md:px-[33px] md:text-[24px]'>Join Now</div>
        </div>
        <Image src={VDAOApply} width={0} height={0} alt='apply' className='pointer-events-none mb-[69px]  h-[284px] w-10/12 transform md:mt-0 md:mb-0 md:h-[420px]  md:w-[326px]' />
      </div>
    </section>
  )
}

function SectionTwo() {
  return (
    // light to dark

    <section className='px-4'>
      <div className='mx-auto mt-24 flex max-w-[860px] flex-col items-center md:mt-[122px] '>
        <div className='mr-auto text-left font-heading text-[28px] font-medium text-vdao-light md:text-[32px]'>The Metacrisis</div>
        <div className='mt-5 font-body text-base font-normal leading-[28px] text-white md:text-xl'>
          Humanity is at the peak of our known history. The economic, industrial, agricultural, energy and technological systems that helped us evolve have become the very liabilities that now
          challenge our survival. These systems were designed with growth and profitability as the top priority, which has led to negative externalities impacting our health, well-being and to single
          points of failure across the various centralized systems we rely on. 
        </div>
        <div className='mx-auto my-[64px] max-w-[638px] text-left font-heading text-[28px] font-light leading-[36px] text-vdao-light md:my-20 md:text-[40px] md:leading-10'>
          “Our societies have devolved into a zero-sum scarcity mindset, with{' '}
          <span className='mdLleading-10 font-heading text-[28px] font-medium leading-[36px] text-vdao-light md:text-[40px]'> band-aid solutions that exacerbate the problems.”</span>
        </div>
        <div className='font-body text-base font-normal leading-[28px] text-white md:text-xl'>
          The signs are everywhere for those with the eyes to see. Financial systems are collapsing. The Web 2 model is polarizing society and exploiting consumers. Mainstream media has become a
          propaganda machine. Manufacturing systems and supply chains are increasingly fragile. Energy systems rely heavily on oil and minerals, both of which are running out. Agricultural and food
          systems are energy intensive, while nutrient density diminishes and we degrade our soil.
          <br />
          <br /> The writing is on the wall, and the pattern is clear. If you haven’t seen it yet, we hope this is a wake-up call. We, human beings, are part of a much bigger ecosystem, but we have
          fallen out of harmony with it.
        </div>
      </div>
      <div className='mx-auto mt-[100px] flex max-w-[860px] flex-col  items-center md:mt-[160px]'>
        <div className='mr-auto text-left font-heading text-[28px] font-medium text-vdao-light md:text-[32px]'>VDAO</div>
        <div className='mt-5 font-body text-base font-normal leading-[28px] text-white md:text-xl'>
          Vdao is a place for collaboration, to build regenerative and anti-fragile systems to propel humanity out of our existing paradigm into a new world - the 5th World. 
          <br />
          <br />
          “V” stands for ‘5’ and that humanity is on the ‘Verge’ of transitioning into the 5th World. The ‘V’ also symbolizes a formation of birds benefiting from shared leadership. Each bird takes
          turns at the front, pushing through the resistance of the air and drafting for the benefit of the others, until another teammate moves forward to lead the flock, relieving the teammate that
          now falls back and rejoins the group. This is the essence of the 5th World and V DAO leadership.
        </div>
        <div className='mx-auto my-[52px] max-w-[313px] text-left font-heading text-[22px] font-normal leading-[32px] text-vdao-light md:mt-24 md:max-w-[630px] md:text-[40px] md:font-light md:leading-10'>
          It is a decentralized community of
          <span className='font-heading text-[22px] font-medium leading-[32px] text-vdao-light md:text-[40px] md:leading-10'> creators, contributors, artists, thinkers and seekers.</span>
        </div>
        <div className='font-body text-base font-normal leading-[28px] text-white md:text-xl'>
          We believe that the only way to address the challenges that are facing us is to go back to the first principles of system design and leverage regenerative, anti-fragile and decentralized
          primitives to build the 5th World systems, with a focus on generating positive externalities and adopting an abundance mindset of enlightened self-interest where all stakeholders win
          together.
        </div>
      </div>
       
      <Image src={Green_VDAO} alt='Green_VDAO' className='mx-auto my-[52px] h-[86px] w-full md:my-40  md:h-[260px] md:w-11/12 md:max-w-[860px]' />
      <div className='mx-auto w-full max-w-[860px] font-body text-base font-normal leading-[28px] text-white md:text-xl'>
        The VDAO philosophy is based on the principles of freedom, liberty and enlightened self-interest. We believe that we are able to build systems that ensure profits along with impact, without
        compromising on any of the two.   <br />
        <br />
        The V community is built on a simple but essential umbrella principle: “Do the right thing”. Beneath this umbrella are 4 core values that are used in common practice to ensure integrity at all
        times: Fairness & Caring, Trust & Respect, Generous Listening, and Straight Talk.
        <div>
          <br />
          The V community is apolitical and does not engage in political, religious, and social issues as a rule. No matter your background and personal beliefs, as long as you agree with our mission
          and community core values, we welcome you into the V community and hope that you will contribute towards building the new world systems.
        </div>
      </div>
      <div className='mx-auto mt-[100px] flex max-w-[860px] flex-col items-center font-body md:mt-40 md:mb-[52px]'>
        {/* <div className='mt-[425px] mb-[100px] font-heading text-[32px] font-medium leading-[36px] text-white md:hidden'>
          The VDAO philosophy is based on the principles of freedom, liberty and enlightened self-interest.
        </div> */}
        <div className='mr-auto text-left font-heading text-[28px] font-medium text-vdao-light md:text-[32px]'>VDAO Objectives</div>
        <span className='mt-5 font-body  text-base font-normal leading-[28px] text-white md:text-xl'>
          VDAO will be built around two main pillars.
          <br />
          <br />
          1. Unlocking coordination among creators, contributors and thinkers focused on building and scaling new regenerative and anti-fragile systems. This includes
          <br />
          <li className='ml-8'>Funding and supporting regenerative and anti-fragile projects worldwide</li>
          <li className='ml-8'>Providing a space for ideation and discussions</li>
          <br />
          2. Unlocking our collective imagination on what a regenerative and anti-fragile world would look like. This includes
          <br />
          <li className='ml-8'>Creating NFT art showcasing a regenerative and anti-fragile future</li>
          <li className='ml-8'>Organizing immersive exhibitions and building metaverse experiences</li>
        </span>
        <br />
        <div className='mt-[100px] mr-auto text-left font-heading text-[28px] font-medium text-vdao-light md:mt-40 md:text-[32px]'>V DAO Roadmap</div>

        <span className='mt-5 font-body text-base font-normal leading-[28px] text-white md:mt-[32px] md:text-xl'>
          Agriculture is the foundational layer of our society and we believe, as a start, V DAO should be focused on building and scaling regenerative and anti-fragile agricultural systems. As the
          DAO grows, the community will vote on expanding the scope to include other verticals such as energy, finance and others.
        </span>

        <div className='mx-auto my-[32px] w-[175px] font-heading text-[22px] font-normal leading-[27px] tracking-[-1.5px] text-vdao-light md:my-[60px] md:w-auto md:text-left md:text-[40px] md:font-light md:leading-10'>
          We have got to go
          <span className='font-heading text-[22px] font-medium leading-[27px] tracking-[-1.5px] text-vdao-light md:text-[40px] md:leading-10'> back to the soil.</span>
        </div>
        <span className=' mt-5 font-body text-base font-normal leading-[28px] text-white md:mt-0 md:text-xl '>
          Our goal is to create space for an authentic self-organizing community to emerge. The community will develop the whitepaper including the decentralization roadmap, the DAO token governance
          model, as well as the NFT art collaboration model.
        </span>

        <h4 className='mt-[100px] mr-auto text-left font-heading text-[28px] font-medium leading-[28px] text-vdao-light md:mt-40 md:text-[32px]'>Time for Action</h4>
        <span className='mt-5 mr-auto mb-9 font-body text-base font-normal leading-[28px] text-white md:mt-8 md:mb-0 md:text-xl'>
          If you agree with this manifesto and want to be part of our community, please <u className='font-bold'>sign here.</u>
        </span>
      </div>
    </section>
  )
}

function SectionOne() {
  return (
    <section className='mx-[8px] mt-9 flex max-w-[1140px] flex-col !px-4 md:mx-auto md:mt-20'>
      <div className='font-heading text-[38px] font-medium leading-[48px] tracking-[-1.5px] text-vdao-light md:text-center md:text-[96px] md:leading-[72px]'>VDAO Manifesto</div>
      <div className='mt-[16px] w-[307px] font-heading text-xl font-medium text-white md:mt-[24px] md:w-full md:text-center md:text-[32px]'>Restoring Ecosystems From the Soil up.</div>

      <div className='mt-10 flex flex-col-reverse gap-10 md:mt-[64px] md:flex-row md:gap-0'>
        <Image src={VDAOGetInvolved} alt='VDAO' width={0} height={0} className='mx-auto h-[248px] w-[230px] md:h-[364px] md:w-[338px] ' />
        {/* line height 28px */}
        <div className='my-auto flex flex-col gap-4  md:w-1/2'>
          <span className='mb-[16px] font-body text-base font-medium leading-[28px] text-white md:mb-[35px] md:w-[412px] md:text-xl'>
            Complete all 4 steps to join the Vcommunity & gain full access to future benefits.
          </span>
          <div className=' flex w-full items-start gap-3'>
            <div className='mt-1 hidden h-[19.64px] w-[19.32px] rounded-[2px] bg-vdao-light opacity-20 md:block' />
            <div className=''>
              <div className='mt-2 h-[19px] w-[25px] bg-[url(/icons/manifesto/Group.svg)] bg-contain bg-center bg-no-repeat md:hidden'></div>
            </div>

            <div className=' font-body text-base font-medium leading-[28px] text-vdao-light md:w-[327px] md:text-xl md:text-white '>
              Read the manifesto below and <u className='font-bold'>sign</u> using your wallet if you agree.
            </div>
          </div>
          <span className='mb-1 inline-flex gap-3'>
            <div className='mt-1 hidden h-[19.64px] w-[19.32px] rounded-[2px] bg-vdao-light opacity-20 md:block' />
            <div className='mt-2 h-[19px] w-[25px] bg-[url(/icons/manifesto/Group.svg)] bg-contain bg-center bg-no-repeat md:hidden'></div>
            <div className='font-body text-base font-medium leading-[28px] text-vdao-light md:text-xl md:text-white'>
              Follow us on <u className='font-bold'>Twitter</u>
            </div>
          </span>
          <span className='mb-1 inline-flex gap-3'>
            <div className='mt-1 hidden h-[19.64px] w-[19.32px] rounded-[2px] bg-vdao-light opacity-20 md:block' />
            <div className='mt-2 h-[19px] w-[25px] bg-[url(/icons/manifesto/Group.svg)] bg-contain bg-center bg-no-repeat md:hidden'></div>
            <div className='font-body text-base font-medium leading-[28px] text-vdao-light md:text-xl md:text-white'>
              Join us on <u className='font-bold'>Discord</u>
            </div>
          </span>
          <span className='mb-1 inline-flex gap-3'>
            <div className='mt-1 hidden h-[19.64px] w-[19.32px] rounded-[2px] bg-vdao-light opacity-20 md:block' />
            <div className='mt-2 h-[19px] w-[25px] bg-[url(/icons/manifesto/Group.svg)] bg-contain bg-center bg-no-repeat md:hidden'></div>
            <div className='font-body text-base font-medium leading-[28px] text-vdao-light md:text-xl md:text-white'>
              <u className='text-base font-bold leading-[28px] text-vdao-light md:text-xl md:text-white'>Sign up</u> to our mailing list
            </div>
          </span>
        </div>
      </div>

      <div className='mt-10 w-full items-center justify-between rounded-[20px] bg-vdao-dark py-5 px-[38px] font-body text-xl font-medium text-white  md:mt-20 md:flex md:h-[96px] md:py-0 md:px-10'>
        <div className='flex flex-col justify-between gap-7 md:flex-row md:gap-[16px]'>
          <div className='mx-auto h-[36px] w-[36px] bg-[url(/icons/manifesto/Pen.svg)] bg-contain bg-center bg-no-repeat md:mx-0' />
          <div className='opacity-70'> Sign to join Vcommunity & be eligible for future benefits.</div>
        </div>
        <div className='mt-10 flex flex-col justify-between gap-5  md:mt-0 md:flex-row md:items-center md:gap-0'>
          <div className='opacity-70'>Signatures</div>
          <PrimaryButton text='Sign Manifesto' className='md:ml-[35px]' />
        </div>
      </div>
    </section>
  )
}
