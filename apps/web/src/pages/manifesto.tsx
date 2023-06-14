import { NextApiRequest, NextApiResponse, type NextPage } from 'next'
import Head from 'next/head'

import { HeaderManifesto } from '~/components/layout/header'

// VDAO-get-involved.png
import VDAOGetInvolved from 'public/illustrations/home/PNG/VDAO-get-involved.png'
import VDAOTweetManifesto from 'public/illustrations/home/PNG/tweet-manifesto.png'
import VDAOApply from 'public/illustrations/apply/PNG/VDAO-apply.png'

import Tick from 'public/icons/home/tick.svg'
import Image from 'next/image'
import { Button, Divider, notification } from 'antd'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { FooterManifesto } from '~/components/layout/footer'
import { VDAOConnectButton } from '~/components/walletconnect/connectbutton'
import { useAccount } from 'wagmi'

import { useSignMessage } from 'wagmi'

import { api } from '~/utils/api'
import { prisma } from '~/server/db'
import { useEffect, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'
import { Section } from '~/components/layout/section'
import VDAO_whiteIcon from 'public/logo/svg/white.svg'
import Green_VDAO from 'public/logo/svg/VDAO-twitter-background-black 1.svg'
import SubmitIcon from 'public/icons/manifesto/submitIcon.svg'
import { useConnect } from 'wagmi'

dayjs.extend(relativeTime)

const Home: NextPage<any> = ({ signatures }) => {
  const ref = useRef(null)

  return (
    <>
      <Head>
        <title>VDAO Manifesto</title>
        <meta name='description' content='Restoring Ecosystems From the Soil up.' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='bg-vdao-deep'>
        <HeaderManifesto signatures={signatures.total} />
        <div className='px-4'>
          <SectionOne />

          {/* <Color
            colorFrom={"#00FF19"}
            colorTo={"#0038FF"}
            left={"-550px"}
            size={"400px"}
            opacity={0.7}
          /> */}
          <SectionTwo />

          <Signing signatures={signatures} />
        </div>
        <FooterManifesto signatures={signatures.total} ref={ref} />
      </main>
    </>
  )
}

export default Home

type colorProps = {
  colorFrom: string
  colorTo?: string
  left: string
  size?: string
  opacity?: number
}

function Color({ colorFrom, colorTo, left, size, opacity }: colorProps) {
  // take 0 horizontal space, but create a circle gradient with the color passed in
  return (
    <div className='relative overflow-hidden md:overflow-visible'>
      <div className=' absolute left-1/2 -translate-x-1/2'>
        <div
          className={`relative rounded-full`}
          style={{
            width: size,
            height: size,
            transform: `translateX(${left})`,
            backgroundImage: `radial-gradient(circle, ${colorFrom} 0%,  ${colorTo || 'transparent'} 100%)`,
            filter: `blur(999px)`,
            opacity: opacity,
          }}
        ></div>
      </div>
    </div>
  )
}

function Signing({ signatures }: { signatures: { total: number; list: any[] } }) {
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
      <div className='mx-auto max-w-[850px]' id='SignModule'>
        <div className='mx-auto w-[350px] rounded-lg bg-vdao-dark p-4 '>
          <span className='text-lg font-medium'>Sign the manifesto with 3 simple steps</span>
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
                onClickOverride={() => {}}
              />
              {/* step 1 */}
              <VDAOConnectButton
                className={`!h-10 w-fit font-roboto text-sm font-medium ${
                  step < 1 ? '!border-[#9B9B9B] !bg-[#9B9B9B] !text-[#515151]' : step == 1 ? '!text-vdao-light' : '!border-vdao-light !text-vdao-light'
                }`}
                disabled={step != 1}
                onClickOverride={() => {}}
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

        <h3 className='mt-24 mr-auto text-left text-center font-heading text-5xl text-[48px] font-medium leading-[54px] text-vdao-light md:mt-40 md:text-start md:text-[32px] md:font-normal'>
          Manifesto Signers
        </h3>
        <div className='mt-[32px] flex items-center justify-between'>
          <div className='font-heading text-[32px] font-medium text-white md:text-xl md:font-normal '>Signed By :</div>
          <span className='font-heading text-3xl font-medium leading-[36px] md:text-xl '>
            {signatures.total}
            <div className='font-body text-sm font-normal'>Signatures</div>
          </span>
        </div>
        <div className={`mt-3 max-w-[860px] rounded-lg bg-vdao-dark py-5 px-6`}>
          {list.map((item, i) => (
            <>
              <div key={i} className={`mt-4 flex w-full flex-row items-center justify-between ${sticky ? '' : ''}`}>
                <div className='flex w-full items-center  gap-3'>
                  <div
                    className='rounded-full'
                    style={{
                      background: 'linear-gradient(221.35deg, #36DFAE 0%, #28B6A5 36.46%, #1D555C 100%)',
                      width: '50px',
                      height: '44px',
                    }}
                  />
                  <span className=' w-48 overflow-hidden overflow-ellipsis text-sm font-medium md:hidden md:w-full'>{item?.name || item?.eoa.substring(0, 13)}</span>
                  <span className='hidden w-48 overflow-hidden overflow-ellipsis text-sm font-medium md:block md:w-full'>{item?.name || item?.eoa}</span>
                </div>
                <span className='w-full text-right font-body  text-[13px] font-normal'>{dayjs(item.updatedAt).fromNow()}</span>
              </div>
              {i !== list.length - 1 && <Divider className='w-full bg-white opacity-20' />}
            </>
          ))}
        </div>

        <div className={`max-w-96 mt-24 flex flex-col justify-between gap-7 rounded-lg bg-vdao-dark px-6 pt-[16px] pb-[46px] text-white md:mt-44 md:flex-row md:gap-0 md:py-5`}>
          <div className='my-auto font-body text-lg font-medium'>
            Join our mailing list
            <br />
            <div className='font-body text-base font-normal opacity-70'>Be the 1st one to get all future updates.</div>
          </div>
          <div className='flex'>
            <input className='w-80 rounded bg-[#14444A] px-5 py-3 font-body text-base font-normal text-[#3BA7B5] outline-none placeholder:text-[#3BA7B5]' placeholder='Enter your email address ' />
            <div className='relative -left-1 w-16 rounded-r bg-vdao-light py-[14px] px-5'>
              <Image src={SubmitIcon} alt='SubmitIcon' className='h-fit' />
            </div>
          </div>
        </div>
      </div>
      <div className='mx-auto mt-20 flex  flex-col items-center justify-center gap-[38px] md:mb-48 md:mt-60 md:max-w-[860px] md:flex-row'>
        <div className='flex w-full flex-col'>
          <div className='max-w-[293px] mr-auto text-left font-heading text-[24px] font-light leading-none text-vdao-light md:mt-9 md:w-[496px] md:max-w-[496px] md:text-[40px] '>
            <div className='font-medium leading-[28px] md:leading-[60px] md:tracking-[-1.5px]'>Feeling inspired?</div>
            <div className='font-light leading-[28px] md:leading-[60px] md:tracking-[-1.5px]'>Want to get more involved?</div>
            <div className='font-medium leading-[28px] md:leading-[60px] md:tracking-[-1.5px]'>APPLY TO JOIN THE DAO.</div>
          </div>
          <div className='n=md:text-[24px] mt-10 w-fit cursor-pointer rounded-md bg-vdao-light px-9 py-1.5 font-heading text-xl font-medium text-vdao-dark md:py-[18px] md:px-[33px]'>Join Now</div>
        </div>
        <Image src={VDAOApply} width={0} height={0} alt='apply' className='pointer-events-none md:h-[420px]  w-9/12 h-[284px] transform md:mt-0 md:w-[326px] mb-[69px] md:mb-0' />
      </div>
    </section>
  )
}

function SectionTwo() {
  return (
    // light to dark

    <section>
      <div className='mx-auto mt-24 flex max-w-[860px] flex-col items-center md:mt-48 '>
        <div className='mr-auto text-left font-heading text-[28px] md:text-[32px] font-medium text-vdao-light'>The Metacrisis</div>
        <br />
        <div className='font-body text-base md:text-xl font-normal leading-[28px] text-white'>
          Humanity is at the peak of our known history. The economic, industrial, agricultural, energy and technological systems that helped us evolve have become the very liabilities that now
          challenge our survival. These systems were designed with growth and profitability as the top priority, which has led to negative externalities impacting our health, well-being and to single
          points of failure across the various centralized systems we rely on. 
        </div>
        <div className='mx-auto mx-auto my-[64px] md:my-20 max-w-[638px] text-left font-heading text-[28px] md:text-[40px] font-light leading-[36px] md:leading-10 text-vdao-light'>
          “Our societies have devolved into a zero-sum scarcity mindset, with{' '}
          <span className='font-heading text-[28px] md:text-[40px] font-medium leading-[36px] mdLleading-10 text-vdao-light'> band-aid solutions that exacerbate the problems.”</span>
        </div>
        <div className='font-body text-base md:text-xl font-normal leading-[28px] text-white'>
          The signs are everywhere for those with the eyes to see. Financial systems are collapsing. The Web 2 model is polarizing society and exploiting consumers. Mainstream media has become a
          propaganda machine. Manufacturing systems and supply chains are increasingly fragile. Energy systems rely heavily on oil and minerals, both of which are running out. Agricultural and food
          systems are energy intensive, while nutrient density diminishes and we degrade our soil.
          <br />
          <br /> The writing is on the wall, and the pattern is clear. If you haven’t seen it yet, we hope this is a wake-up call. We, human beings, are part of a much bigger ecosystem, but we have
          fallen out of harmony with it.
        </div>
      </div>

      <div className='mx-auto flex max-w-[860px] flex-col items-center  mt-[100px] md:mt-[160px]'>
        <div className='mr-auto text-left font-heading text-[28px] md:text-[32px] font-medium text-vdao-light'>VDAO</div>
        <br />
        <div className='font-body text-base md:text-xl font-normal leading-[28px] text-white'>
          Vdao is a place for collaboration, to build regenerative and anti-fragile systems to propel humanity out of our existing paradigm into a new world - the 5th World. 
          <br />
          <br />
          “V” stands for ‘5’ and that humanity is on the ‘Verge’ of transitioning into the 5th World. The ‘V’ also symbolizes a formation of birds benefiting from shared leadership. Each bird takes turns at the front, pushing through the resistance of the air and drafting for the benefit of the others, until another teammate moves forward to lead the flock, relieving the teammate that now falls back and rejoins the group. This is the essence of the 5th World and V DAO leadership.
        </div>
        <div className='mx-auto mx-auto mt-24 mb-20 max-w-[630px] text-left font-heading text-[40px] font-light leading-10 text-vdao-light hidden md:block'>
         It is a decentralized community of
          <span className='font-heading text-[40px] font-medium leading-10 text-vdao-light'> creators, contributors, artists, thinkers and seekers.</span>
        </div>
        <br />
        <div className='font-body text-base md:text-xl font-normal leading-[28px] text-white'>
          We believe that the only way to address the challenges that are facing us is to go back to the first principles of system design and leverage regenerative, anti-fragile and decentralized primitives to build the 5th World systems, with a focus on generating positive externalities and adopting an abundance mindset of enlightened self-interest where all stakeholders win together.
        </div>
      </div>
  
      <Image src={Green_VDAO} alt='Green_VDAO' className='mx-auto my-24 h-[86px] max-w-[358px] md:my-40 md:h-[260px] md:w-11/12 md:max-w-[860px] hidden md:block' />

      <div className='mx-auto w-full max-w-[860px] font-body text-xl font-normal leading-[28px] text-white hidden md:block'>
        The VDAO philosophy is based on the principles of freedom, liberty and enlightened self-interest. We believe that we are able to build systems that ensure profits along with impact, without
        compromising on any of the two.   <br />
        <br />
      The V community is built on a simple but essential umbrella principle: “Do the right thing”. Beneath this umbrella are 4 core values that are used in common practice to ensure integrity at all times: Fairness & Caring, Trust & Respect, Generous Listening, and Straight Talk.
      <div>
          <br />
          <br />
          The V community is apolitical and does not engage in political, religious, and social issues as a rule. No matter your background and personal beliefs, as long as you agree with our mission and community core values, we welcome you into the V community and hope that you will contribute towards building the new world systems.
        </div>
      </div>

      <div className='mx-auto flex max-w-[860px] flex-col items-center font-body md:my-40 '>
       <div className="font-heading text-[32px] mt-[425px] mb-[100px] leading-[36px] md:hidden font-medium text-white">The VDAO philosophy is based on the principles of freedom, liberty and enlightened self-interest.</div>
        <div className='mr-auto text-left font-heading text-[28px] md:text-[32px] font-medium text-vdao-light'>VDAO Objectives</div>
        <br />
        <span className='font-body text-base  md:text-xl font-normal leading-[28px] text-white'>
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
        <div className='mt-[100px] md:mt-24 mr-auto text-left font-heading text-[28px] md:text-[32px] font-medium text-vdao-light md:mt-40'>V DAO Roadmap</div>

        <div className=' md:hidden tracking-[-1.5%] my-[44px] mr-auto font-heading text-[32px] md:text-[40px] font-light leading-10 text-white'>
         We have got to go 
          <div className='font-heading text-[32px] md:text-[40px] font-medium leading-10 text-white tracking-[-1.5%]'> back to the soil.</div>
        </div>
      
        <span className='md:mt-[32px] font-body text-base md:text-xl font-normal leading-[28px] text-white '>
        Agriculture is the foundational layer of our society and we believe, as a start, V DAO should be focused on building and scaling regenerative and anti-fragile agricultural systems. As the DAO grows, the community will vote on expanding the scope to include other verticals such as energy, finance and others.
        </span>

          <div className='mx-auto hidden md:block tracking-[-1.5%] my-[60px] text-left font-heading text-[40px] text-center font-light leading-10 text-vdao-light'>
         We have got to go 
          <span className='font-heading text-[40px] font-medium leading-10 text-vdao-light tracking-[-1.5%]'> back to the soil.</span>
        </div>
   <span className=' font-body text-base mt-5 md:mt-0 md:text-xl font-normal leading-[28px] text-white '>
     Our goal is to create space for an authentic self-organizing community to emerge. The community will develop the whitepaper including the decentralization roadmap, the DAO token governance model, as well as the NFT art collaboration model.
        </span>


        <h4 className='mt-24 text-[28px] mr-auto text-left font-heading md:text-[32px] font-medium text-vdao-light md:mt-40'>Time for Action</h4>
        <br />

        <span className='mr-auto font-body text-base md:text-xl font-normal leading-[28px] text-white mb-[106px] md:mb-0'>
          If you agree with this manifesto and want to be part of our community, please <u className='font-bold'>sign here.</u>
        </span>
      </div>
    </section>
  )
}

function SectionOne() {
  return (
    <section className='md:mx-auto mt-9 flex max-w-[1140px] flex-col md:mt-20 mx-[8px]'>
      <div className='md:text-center font-heading text-[38px] font-medium leading-[48px] md:leading-[72px] tracking-[-1.5px] text-vdao-light md:text-[96px]'>VDAO Manifesto</div>
      <div className='mt-[16px] w-[307px] md:w-full md:mt-[24px] md:text-center font-heading text-xl font-medium text-white md:text-[32px]'>Restoring Ecosystems From the Soil up.</div>
      <div className='mt-[64px] md:flex h-[96px] w-full items-center justify-between rounded-[20px] bg-vdao-dark px-10 font-body text-xl font-medium text-white hidden'>
        <div className='flex items-center justify-between gap-[16px]'>
          <div className='h-[36px] w-[36px] bg-[url(/icons/manifesto/Pen.svg)] bg-contain bg-center bg-no-repeat'></div>
          <div className=''>
            {' '}
            <span className='opacity-70'>Restoring Ecosy</span>stems From the Soil up.
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <div className=''>
            1739 Signa<span className='opacity-70'>tures</span>
          </div>
          <PrimaryButton text='Sign Manifesto' className='ml-[35px]' />
        </div>
      </div>
      <div className='md:mt-20 mt-10 flex flex-col-reverse md:flex-row gap-10 md:gap-0'>
        <Image src={VDAOGetInvolved} alt='VDAO' width={0} height={0} className='mx-auto h-[248px] w-[230px] md:w-[338px] md:h-[364px] ' />
        {/* line height 28px */}
        <div className='my-auto flex flex-col gap-4  md:w-1/2'>
          <span className='mb-[16px] md:mb-[35px] md:w-[412px] font-body md:text-xl text-base font-medium leading-[28px] text-white'>Complete all 4 steps to join the Vcommunity & gain full access to future benefits.</span>
          <div className=' flex items-start gap-3 '>
            <div className='mt-1 h-[19.64px] w-[19.32px] rounded-[2px] bg-vdao-light opacity-20 hidden md:block' />
              <div className='h-[19px] w-[25px] bg-[url(/icons/manifesto/Group.svg)] mt-2 bg-contain bg-center bg-no-repeat md:hidden'></div>

            <div className='font-body text-base md:text-xl font-medium leading-[28px] md:text-white text-vdao-light md:w-[327px]'>
              
              Read the manifesto below and <u>sign</u> using your wallet if you agree.
            </div>
          </div>
          <span className='mb-1 inline-flex gap-3'>
            <div className='mt-1 h-[19.64px] w-[19.32px] rounded-[2px] bg-vdao-light opacity-20 hidden md:block' />
             <div className='h-[19px] w-[25px] bg-[url(/icons/manifesto/Group.svg)] mt-2 bg-contain bg-center bg-no-repeat md:hidden'></div>
            <div className='font-body text-base md:text-xl font-medium leading-[28px] md:text-white text-vdao-light'>
              Follow us on <u className='font-bold'>Twitter</u>
            </div>
          </span>
          <span className='mb-1 inline-flex gap-3'>
            <div className='mt-1 h-[19.64px] w-[19.32px] rounded-[2px] bg-vdao-light opacity-20 hidden md:block' />
             <div className='h-[19px] w-[25px] bg-[url(/icons/manifesto/Group.svg)] mt-2 bg-contain bg-center bg-no-repeat md:hidden'></div>
            <div className='font-body text-base md:text-xl font-medium leading-[28px] md:text-white text-vdao-light'>
              Join us on <u className='font-bold'>Discord</u>
            </div>
          </span>
          <span className='mb-1 inline-flex gap-3'>
            <div className='mt-1 h-[19.64px] w-[19.32px] rounded-[2px] bg-vdao-light opacity-20 hidden md:block' />
             <div className='h-[19px] w-[25px] bg-[url(/icons/manifesto/Group.svg)] mt-2 bg-contain bg-center bg-no-repeat md:hidden'></div>
            <div className='font-body text-base md:text-xl font-medium leading-[28px] md:text-white text-vdao-light'>
              <u className='font-bold text-base md:text-xl font-medium leading-[28px] md:text-white text-vdao-light'>Sign up</u> to our mailing list
            </div>
          </span>
        </div>
      </div>
    </section>
  )
}

export async function getServerSideProps({ req, res }: { req: NextApiRequest; res: NextApiResponse }) {
  const total_p = prisma.signatures.count()
  const list_p = prisma.signatures.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    // last 10 signatures
    take: 10,
  })

  const [total, list] = await Promise?.all([total_p, list_p])

  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=86400')

  return {
    props: {
      signatures: {
        total,
        list: list.map(item => ({
          eoa: item.eoa,
          signature: item.signature,
          updatedAt: item.createdAt.toString(),
        })),
      },
    },
  }
}
