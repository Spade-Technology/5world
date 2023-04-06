import { NextApiRequest, NextApiResponse, type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { HeaderManifesto } from "~/components/layout/header";

// VDAO-get-involved.png
import VDAOGetInvolved from "public/illustrations/home/PNG/VDAO-get-involved.png";
import VDAOTweetManifesto from "public/illustrations/home/PNG/tweet-manifesto.png";
import VDAOApply from "public/illustrations/apply/PNG/VDAO-apply.png";

import Tick from "public/icons/home/tick.svg";
import Image from "next/image";
import { Button, Divider, notification } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FooterManifesto } from "~/components/layout/footer";
import { VDAOConnectButton } from "~/components/walletconnect/connectbutton";
import { useAccount } from "wagmi";

import { useSignMessage } from "wagmi";

import { api } from "~/utils/api";
import { prisma } from "~/server/db";
import { useEffect, useRef, useState } from "react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useSession } from "next-auth/react";

dayjs.extend(relativeTime);

const Home: NextPage<any> = ({ signatures }) => {
  const ref = useRef(null);

  return (
    <>
      <Head>
        <title>VDAO Manifesto</title>
        <meta
          name="description"
          content="Restoring Ecosystems From the Soil up."
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.cdnfonts.com/css/clash-display"
          rel="stylesheet"
        />
        <link href="https://fonts.cdnfonts.com/css/satoshi" rel="stylesheet" />
      </Head>
      <main className="bg-vdao-deep">
        <HeaderManifesto signatures={signatures.total} />
        <div className="px-4">
          <SectionOne />

          <Color
            colorFrom={"#00FF19"}
            colorTo={"#0038FF"}
            left={"-550px"}
            size={"400px"}
            opacity={0.7}
          />
          <SectionTwo />

          <Signing signatures={signatures} ref={ref} />
        </div>
        <FooterManifesto signatures={signatures.total} ref={ref} />
      </main>
    </>
  );
};

export default Home;

type colorProps = {
  colorFrom: string;
  colorTo?: string;
  left: string;
  size?: string;
  opacity?: number;
};

function Color({ colorFrom, colorTo, left, size, opacity }: colorProps) {
  // take 0 horizontal space, but create a circle gradient with the color passed in
  return (
    <div className="relative overflow-hidden md:overflow-visible">
      <div className=" absolute left-1/2 -translate-x-1/2">
        <div
          className={`relative rounded-full`}
          style={{
            width: size,
            height: size,
            transform: `translateX(${left})`,
            backgroundImage: `radial-gradient(circle, ${colorFrom} 0%,  ${
              colorTo || "transparent"
            } 100%)`,
            filter: `blur(999px)`,
            opacity: opacity,
          }}
        ></div>
      </div>
    </div>
  );
}

function Signing({
  signatures,
}: {
  signatures: { total: number; list: any[] };
}) {
  const list = signatures.list;
  const [step, setStep] = useState(0);

  // wagmi get address
  const { address } = useAccount();
  const { mutateAsync } = api.manifesto.sign.useMutation();
  const { openConnectModal } = useConnectModal();

  const [notificationApi, contextHolder] = notification.useNotification();
  const { status } = useSession();

  const { data, error, isLoading, signMessage } = useSignMessage({
    onSuccess: async (data, variables) => {
      // const address = verifyMessage(variables.message, data)

      mutateAsync({
        eoa: String(address),
        signature: data,
        message: variables.message.toString(),
      }).then((res) => {
        notificationApi.success({
          message: <span>Signed Manifesto</span>,
          description: (
            <div className="flex flex-col gap-4">
              <span className="text-base">
                You have successfully signed the manifesto
              </span>
              <Image src={VDAOTweetManifesto} alt="VDAO Tweet Manifesto" />
              <Button
                type="primary"
                className="!h-10"
                href="https://twitter.com/intent/tweet?text=I%20just%20signed%20the%20VDAO%20Manifesto.%20You%20need%20to%20check%20this%20out%20!%20https%3A%2F%2Fwww.vdao.io"
                target="_blank"
              >
                Share on Twitter
              </Button>
            </div>
          ),
          placement: "top",
          className: "!bg-vdao-dark !text-white",

          duration: 150,
        });
      });
    },
  });

  const signManifesto = () => {
    signMessage({
      message: `I agree to the terms of the Manifesto of the VDAO Project.\n\n\n\nDate of signing: ${new Date().toISOString()} Signing Nounce: ${
        (Math.random() * 1000000).toFixed(0) + 1
      }`,
    });
  };

  useEffect(() => {
    if (address && status === "authenticated") {
      setStep(2);
    } else if (address && status !== "authenticated") {
      setStep(1);
    } else if (!address) {
      setStep(0);
    }
  }, [address, status]);

  return (
    <section>
      {contextHolder}
      <div className="mx-auto max-w-[850px]" id="SignModule">
        <div className="mx-auto my-20 w-[350px] rounded-lg bg-vdao-dark p-4 ">
          <span className="text-lg font-medium">
            Sign the manifesto with 3 simple steps
          </span>
          <div className="ml-1 mt-4 flex">
            {/* left */}
            <div className="my-[10px] mr-6 flex flex-col">
              {/* step 0 */}
              <div className="z-10 h-5 w-5 rounded-full bg-vdao-light" />

              {/* step 1 */}
              <div
                className={`mx-auto h-14 w-[2px] scale-110 rounded-full bg-vdao-light ${
                  step < 1 ? "opacity-0" : ""
                }`}
              />

              <div
                className={`z-10 h-5 w-5 rounded-full ${
                  step >= 1 ? "bg-[#36DFAE]" : "bg-[#9B9B9B]"
                }`}
              />

              {/* step 2 */}
              <div
                className={`mx-auto h-14 w-[2px] scale-110 rounded-full bg-vdao-light ${
                  step < 2 ? "opacity-0" : ""
                }`}
              />
              <div
                className={`z-10 h-5 w-5 rounded-full ${
                  step >= 2 ? "bg-[#36DFAE]" : "bg-[#9B9B9B]"
                }`}
              />
            </div>
            {/* right */}
            <div className="flex flex-col justify-between ">
              {/* step 0 */}
              <VDAOConnectButton className="text-white" />
              {/* step 1 */}
              <Button
                className={`!h-10 ${
                  step < 1
                    ? "!bg-[#9B9B9B]"
                    : step == 1
                    ? "!bg-vdao-light"
                    : "!border-vdao-light"
                }`}
                disabled={step != 1}
                onClick={openConnectModal}
                type={"primary"}
              >
                Sign in With Ethereum
              </Button>

              {/* step 2 */}
              <Button
                className={`!h-10 ${
                  step < 2
                    ? "!bg-[#9B9B9B]"
                    : step == 2
                    ? "!bg-vdao-light"
                    : "!border-vdao-light"
                }`}
                disabled={step != 2}
                type={"primary"}
                onClick={signManifesto}
              >
                Sign Manifesto
              </Button>
            </div>
          </div>
        </div>
        <Color
          colorFrom={"#00FF19"}
          colorTo={"#0038FF"}
          left={"600px"}
          size={"400px"}
          opacity={0.7}
        />

        <h3 className="mt-6 mr-auto text-center font-heading text-5xl font-medium text-vdao-light">
          Manifesto Signers
        </h3>
        <div className="mt-12 flex justify-between">
          <span className="text-3xl">Signed By :</span>
          <span className="text-3xl">{signatures.total} Signatures</span>
        </div>
        <div className="max-w-96 mt-3 rounded-xl bg-vdao-dark py-5 px-6 ">
          {list.map((item, i) => (
            <>
              <div
                key={i}
                className="mt-4 flex w-full flex-row items-center justify-between"
              >
                <div className="flex w-full items-center  gap-3">
                  <div
                    className="rounded-full"
                    style={{
                      background:
                        "linear-gradient(221.35deg, #36DFAE 0%, #28B6A5 36.46%, #1D555C 100%)",
                      width: "44px",
                      height: "44px",
                    }}
                  />
                  <span className=" w-48 overflow-hidden overflow-ellipsis text-[14px] md:w-full">
                    {item?.name || item?.eoa}
                  </span>
                </div>
                <span className="w-full text-right text-[14px]">
                  {dayjs(item.updatedAt).fromNow()}
                </span>
              </div>
              {i !== list.length - 1 && (
                <Divider className="w-full bg-white opacity-20" />
              )}
            </>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-60 mb-48 flex max-w-[1150px] flex-col justify-evenly md:flex-row">
        <div className="flex w-full flex-col">
          <h3 className="mr-auto mt-9 max-w-[1153px] text-left font-heading text-2xl font-light leading-none text-vdao-light md:text-[56px] ">
            <b className="font-medium">Feeling inspired?</b>
            <br />
            Want to get more involved?
            <br />
            <b className="font-medium">APPLY TO JOIN THE DAO.</b>
          </h3>
          <Button type="primary" className="mt-10 !h-10 w-40 !rounded-sm">
            Join Now
          </Button>
        </div>
        <Image
          src={VDAOApply}
          width={500}
          height={500}
          alt="apply"
          className="mx-auto w-1/2 scale-150 transform md:w-1/3 md:translate-y-5 md:-translate-x-20"
        />
      </div>
    </section>
  );
}

function SectionTwo() {
  return (
    // light to dark

    <section>
      <div className="mx-auto mt-32 flex max-w-[850px] flex-col items-center ">
        <h3 className="mt-6 mr-auto text-left font-heading text-3xl font-medium text-vdao-light">
          The Metacrisis
        </h3>
        <br />
        <span>
          Humanity is at the peak of our known history. The economic,
          industrial, agricultural, energy and technological systems that helped
          us evolve have become the very liabilities that now challenge our
          survival. These systems were designed with growth and profitability as
          the top priority, which has led to negative externalities impacting
          our health, well-being and to single points of failure across the
          various centralized systems we rely on. 
        </span>
        <h3 className="mx-auto mt-24 mb-20 mr-auto max-w-[570px] text-left font-heading text-[32px] font-medium leading-9 text-vdao-light">
          “Our societies have devolved into a zero-sum scarcity mindset, with
          band-aid solutions that exacerbate the problems.”
        </h3>
        <span>
          The signs are everywhere for those with the eyes to see. Financial
          systems are collapsing. The Web 2 model is polarizing society and
          exploiting consumers. Mainstream media has become a propaganda
          machine. Manufacturing systems and supply chains are increasingly
          fragile. Energy systems rely heavily on oil and minerals, both of
          which are running out. Agricultural and food systems are energy
          intensive, while nutrient density diminishes and we degrade our soil.
          <br />
          <br /> The writing is on the wall, and the pattern is clear. If you
          haven’t seen it yet, we hope this is a wake-up call. We, human beings,
          are part of a much bigger ecosystem, but we have fallen out of harmony
          with it.
        </span>
      </div>
      <Color
        colorFrom={"#11C6FF"}
        left={"550px"}
        size={"400px"}
        opacity={0.7}
      />
      <h3 className="mx-auto my-48 mr-auto max-w-[1153px] text-center font-heading text-[56px] font-medium leading-none text-white">
        V DAO is a decentralized community of creators, contributors, artists,
        <br />
        thinkers and seekers. 
      </h3>
      <div className="mx-auto mt-32 flex max-w-[850px] flex-col items-center ">
        <span>
          Vdao is a place for collaboration, to build regenerative and
          anti-fragile systems to propel humanity out of our existing paradigm
          into a new world - the 5th World.  “V” stands for ‘5’ and that
          humanity is on the ‘Verge’ of transitioning into the 5th World. The
          <br />
          <br />
          ‘V’ also symbolizes a formation of birds benefiting from shared
          leadership. Each bird takes turns at the front, pushing through the
          resistance of the air and drafting for the benefit of the others,
          until another teammate moves forward to lead the flock, relieving the
          teammate that now falls back and rejoins the group. This is the
          essence of the 5th World and V DAO leadership.
          <br />
          <br />
          We believe that the only way to address the challenges that are facing
          us is to go back to the first principles of system design and leverage
          regenerative, anti-fragile and decentralized primitives to build the
          5th World systems, with a focus on generating positive externalities
          and adopting an abundance mindset of enlightened self-interest where
          all stakeholders win together.
        </span>
      </div>
      <h3 className="mx-auto my-48 mr-auto max-w-[1153px] text-center font-heading text-[56px] font-medium leading-none text-white">
        The VDAO philosophy is based on
        <br />
        the principles of freedom, liberty
        <br />
        and enlightened self-interest.
      </h3>
      <div className="mx-auto mt-32 flex max-w-[850px] flex-col items-center ">
        <span>
          We believe that we are able to build systems that ensure profits along
          with impact, without compromising on any of the two.
          <br />
          <br /> The V community is built on a simple but essential umbrella
          principle: “Do the right thing”. Beneath this umbrella are 4 core
          values that are used in common practice to ensure integrity at all
          times: Fairness & Caring, Trust & Respect, Generous Listening, and
          Straight Talk.
          <br />
          <br /> The V community is apolitical and does not engage in political,
          religious, and social issues as a rule. No matter your background and
          personal beliefs, as long as you agree with our mission and community
          core values, we welcome you into the V community and hope that you
          will contribute towards building the new world systems.
        </span>
        <Color
          colorFrom={"#00FFA5"}
          left={"-550px"}
          size={"400px"}
          opacity={0.7}
        />
        <h3 className="mt-40 mr-auto text-left font-heading text-3xl font-medium text-vdao-light">
          V DAO Objectives
        </h3>
        <br />
        <span>
          V DAO will be built around two main pillars.
          <br />
          <br />
          1. Unlocking coordination among creators, contributors and thinkers
          focused on building and scaling new regenerative and anti-fragile
          systems. This includes
          <br />
          <li className="ml-8">
            Funding and supporting regenerative and anti-fragile projects
            worldwide
          </li>
          <li className="ml-8">
            Providing a space for ideation and discussions
          </li>
          2. Unlocking our collective imagination on what a regenerative and
          anti-fragile world would look like. This includes
          <br />
          <li className="ml-8">
            Creating NFT art showcasing a regenerative and anti-fragile future
          </li>
          <li className="ml-8">
            Organizing immersive exhibitions and building metaverse experiences
          </li>
        </span>
        <br />
        <h4 className="mt-40 mr-auto text-left font-heading text-3xl font-medium text-vdao-light">
          V DAO Roadmap
        </h4>
        <h3 className="mr-auto mt-9 max-w-[1153px] text-left font-heading text-[56px] font-light leading-none text-white ">
          We have got to go
          <br />
          <b className="font-semibold">back to the soil.</b>
        </h3>
        <span className="mt-20">
          Agriculture is the foundational layer of our society and we believe,
          as a start, V DAO should be focused on building and scaling
          regenerative and anti-fragile agricultural systems. As the DAO grows,
          the community will vote on expanding the scope to include other
          verticals such as energy, finance and others.
          <br />
          <br /> Our goal is to create space for an authentic self-organizing
          community to emerge. The community will develop the whitepaper
          including the decentralization roadmap, the DAO token governance
          model, as well as the NFT art collaboration model.
        </span>
        <h4 className="mt-40 mr-auto text-left font-heading text-3xl font-medium text-vdao-light">
          Time for Action
        </h4>
        <br />

        <span className="mr-auto">
          If you agree with this manifesto and want to be part of our community,
          please <u>sign here.</u>
        </span>
      </div>
    </section>
  );
}

function SectionOne() {
  return (
    <section className="mx-auto mt-32 flex max-w-[1280px] flex-col items-center">
      <h1 className="text-4xl font-medium text-vdao-light md:text-8xl">
        VDAO Manifesto
      </h1>
      <h2 className="mt-6 text-3xl font-medium text-white">
        Restoring Ecosystems From the Soil up.
      </h2>
      <div className="mt-14 flex flex-col-reverse md:flex-row ">
        <Image
          src={VDAOGetInvolved}
          alt="VDAO"
          width={350}
          height={350}
          className="mx-auto"
        />
        {/* line height 28px */}
        <div className="my-auto flex flex-col gap-4 font-body text-base font-medium leading-7 text-vdao-light md:w-1/2">
          <span className="mb-1 text-white">
            Complete all 4 steps to join the Vcommunity & gain full access to
            future benefits.
          </span>
          <div className="mb-1 flex gap-3 md:w-2/3">
            <Image src={Tick} alt="VDAO" width={20} height={20} />
            <span>
              Read the manifesto below and <u>sign</u> using your wallet if you
              agree.
            </span>
          </div>
          <span className="mb-1 inline-flex gap-3">
            <Image src={Tick} alt="VDAO" width={20} height={20} />
            Follow us on <u>Twitter</u>
          </span>
          <span className="mb-1 inline-flex gap-3">
            <Image src={Tick} alt="VDAO" width={20} height={20} />
            Join us on <u>Discord</u>
          </span>
          <span className="mb-1 inline-flex gap-3">
            <Image src={Tick} alt="VDAO" width={20} height={20} />
            <u>Sign up</u> to our mailing list
          </span>
        </div>
      </div>
    </section>
  );
}

export async function getServerSideProps({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  const total_p = prisma.signatures.count();
  const list_p = prisma.signatures.findMany({
    orderBy: {
      createdAt: "desc",
    },
    // last 10 signatures
    take: 10,
  });

  const [total, list] = await Promise.all([total_p, list_p]);

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=86400"
  );

  return {
    props: {
      signatures: {
        total,
        list: list.map((item) => ({
          eoa: item.eoa,
          signature: item.signature,
          updatedAt: item.createdAt.toString(),
        })),
      },
    },
  };
}
