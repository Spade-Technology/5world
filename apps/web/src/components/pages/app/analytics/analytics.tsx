import Image from "next/image";
import React from "react";
import { Section } from "~/components/layout/section";

export function ProposalComponent() {
  const data = [
    {
      proposal: "The Longevist: A collection of the top longevity research",
      startDate: "Feb 12, 2023",
      endDate: "Feb 28, 2023",
      votes: "51",
      acceptance: "87.4%",
      status: "Closed",
    },
    {
      proposal: "Enable shielded voting for Snapshot proposal",
      startDate: "Feb 14, 2023",
      endDate: "Mar 01, 2023",
      votes: "68",
      acceptance: "95.1%",
      status: "Closed",
    },
    {
      proposal: "Proposal to Realign Working Group Structures",
      startDate: "Feb 16, 2023",
      endDate: "Mar 04, 2023",
      votes: "57",
      acceptance: "92.1%",
      status: "Closed",
    },
    {
      proposal: "Governance Amendment #2",
      startDate: "Feb 18, 2023",
      endDate: "Mar 06, 2023",
      votes: "21",
      acceptance: "96.7%",
      status: "Closed",
    },
    {
      proposal: "Proposal to Accept Funds",
      startDate: "Feb 22, 2023",
      endDate: "Mar 08, 2023",
      votes: "15",
      acceptance: "84.5%",
      status: "Active",
    },
    {
      proposal: "Institutional Genesis Raise",
      startDate: "Feb 23, 2023",
      endDate: "Mar 12, 2023",
      votes: "35",
      acceptance: "82.9%",
      status: "Active",
    },
  ];
  return (
    <div className="mt-28 pb-28">
      <div className="clash text-3xl font-medium text-white md:pb-10">
        Proposals Insights
      </div>

      <div className="flex flex-wrap justify-between ">
        {[
          { title: "Proposals Insights", amount: "68" },
          { title: "Proposal Creators", amount: "12" },
          { title: "Lifetime Voters", amount: "351" },
          { title: "Voter Acceptance Rate", amount: "95.6%" },
        ].map(({ title, amount }, index) => {
          return (
            <div className="flex w-[23%] flex-col gap-5 rounded-2xl bg-vdao-dark px-7 pb-10 pt-5">
              <div className="satoshi text-lg font-medium leading-5 text-white">
                {title}
              </div>
              <div className="satoshi text-3xl font-bold leading-8 text-vdao-light">
                {amount}
              </div>
            </div>
          );
        })}

        {/* RECENT PROPOSALS */}
        <article className="mt-5 flex w-full flex-col rounded-2xl bg-vdao-dark px-7 pt-5 pb-10">
          <div className="satoshi text-lg font-bold text-white">
            Proposals Insights
          </div>
          <div className="satoshi text-sm font-normal text-white">
            Recent Proposals
          </div>

          <Section className="mt-10 flex flex-col gap-2.5">
            <div className="grid grid-cols-12 justify-between ">
              <div className="satoshi col-span-5 text-sm font-normal text-white">
                {"Proposal"}
              </div>
              <div className="satoshi col-span-2 text-sm font-normal text-white">
                {"Start Date"}
              </div>
              <div className="satoshi col-span-2 text-sm font-normal text-white">
                {"End Date"}
              </div>
              <div className="satoshi col-span-1 text-sm font-normal text-white">
                {"Votes"}
              </div>
              <div className="satoshi col-span-1 text-sm font-normal text-white">
                {"Acceptance"}
              </div>
              <div className="satoshi col-span-1 ml-3 text-sm font-normal text-white">
                {"Status"}
              </div>
            </div>
            {data.map(
              (
                { proposal, startDate, endDate, votes, acceptance, status },
                index
              ) => {
                return (
                  <div key={index} className="justify- grid grid-cols-12 ">
                    <div className="satoshi col-span-5 text-sm font-bold text-white">
                      {proposal}
                    </div>
                    <div className="satoshi col-span-2 text-sm font-bold text-white">
                      {startDate}
                    </div>
                    <div className="satoshi col-span-2 text-sm font-bold text-white">
                      {endDate}
                    </div>
                    <div className="satoshi col-span-1 text-sm font-bold text-white">
                      {votes}
                    </div>
                    <div className="satoshi col-span-1 text-sm font-bold text-white">
                      {acceptance}
                    </div>
                    <div
                      className={`satoshi ${
                        status !== "Active"
                          ? "text-[#909090]"
                          : "text-vdao-light"
                      } col-span-1 ml-3 text-sm font-bold`}
                    >
                      {status}
                    </div>
                  </div>
                );
              }
            )}
          </Section>
        </article>
      </div>
    </div>
  );
}

export function MembershipComponent() {
  const data = [
    {
      token: "Ethereum",
      symbol: "ETH",
      balance: "100",
      usdValue: "170,535",
      percentage: "11.5%",
    },
    {
      token: "USD Coin",
      symbol: "USDC",
      balance: "1,621,524",
      usdValue: "1,621,524",
      percentage: "65.5%",
    },
    {
      token: "USDT",
      symbol: "USDT",
      balance: "506,981",
      usdValue: "506,981",
      percentage: "23.0%",
    },
  ];

  return (
    <div className="">
      <div className="clash text-3xl font-medium text-white md:pb-10">
        Membership & Treasury
      </div>

      <div className="flex flex-wrap justify-between ">
        {[
          { title: "Members", amount: "291" },
          { title: "Membership Value", amount: "$ 350" },
          { title: "Treasury Holdings", amount: "$ 3.5m" },
          { title: "Liquid Holdings", amount: "$ 1.9m" },
        ].map(({ title, amount }, index) => {
          return (
            <div className="flex w-[23%] flex-col gap-5 rounded-2xl bg-vdao-dark px-7 pb-10 pt-5">
              <div className="satoshi text-lg font-medium leading-5 text-white">
                {title}
              </div>
              <div className="satoshi text-3xl font-bold leading-8 text-vdao-light">
                {amount}
              </div>
            </div>
          );
        })}

        {/* TREASURY AND MEMBER'S GROWTH */}
        {[
          {
            title: "Members Growth",
            period: ["7d", "1m", "6m", "1y"],
            percent: "121.15% Last 1 Year",
            img: `${"/illustrations/web3/analytics/SVG/Group 448.svg"}`,
          },
          {
            title: "Treasury Growth",
            period: ["7d", "1m", "6m", "1y"],
            percent: "121.15% Last 1 Year",
            img: `${"/illustrations/web3/analytics/SVG/Group 448.svg"}`,
          },
        ].map(({ title, period, percent, img }, index) => {
          return (
            <div className="mt-5 flex w-[48.5%] flex-col rounded-2xl bg-vdao-dark px-7 pt-5 pb-10">
              <div className="flex items-center justify-between">
                <div className="satoshi text-lg font-bold leading-5 text-white">
                  {title}
                </div>
                <div className="flex gap-5">
                  {period.map((time) => {
                    return (
                      <div
                        className={`satoshi text-sm font-normal leading-5 ${
                          time != "1y" ? "text-white" : "text-vdao-light"
                        }`}
                      >
                        {time}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="satoshi text-sm font-normal leading-5 text-white">
                {percent}
              </div>
              <Image
                src={img}
                alt={title}
                className="mt-11 w-full"
                width={"0"}
                height={"0"}
              />
            </div>
          );
        })}

        {/* TREASURY HOLDINGS */}
        <article className="mt-5 flex w-[75%] flex-col rounded-2xl bg-vdao-dark px-7 pt-5 pb-10">
          <div className="satoshi text-lg font-bold text-white">
            Treasury Holdings
          </div>
          <div className="satoshi text-sm font-normal text-white">
            All tokens in treasury accounts
          </div>
          <Section className="mt-10 flex flex-col gap-2.5">
            <div className="grid grid-cols-12 justify-between ">
              <div className="satoshi col-span-3 text-sm font-normal text-white">
                {"Token"}
              </div>
              <div className="satoshi col-span-2 text-sm font-normal text-white">
                {"Symbol"}
              </div>
              <div className="satoshi col-span-2 text-sm font-normal text-white">
                {"Balance"}
              </div>
              <div className="satoshi col-span-2 text-sm font-normal text-white">
                {"USD Value"}
              </div>
              <div className="satoshi col-span-2 text-sm font-normal text-white">
                {"Percentage"}
              </div>
            </div>
            {data.map(
              ({ token, symbol, balance, usdValue, percentage }, index) => {
                return (
                  <div key={index} className="justify- grid grid-cols-12 ">
                    <div className="satoshi col-span-3 text-sm font-bold text-white">
                      {token}
                    </div>
                    <div className="satoshi col-span-2 text-sm font-bold text-white">
                      {symbol}
                    </div>
                    <div className="satoshi col-span-2 text-sm font-bold text-white">
                      {balance}
                    </div>
                    <div className="satoshi col-span-2 text-sm font-bold text-white">
                      {usdValue}
                    </div>
                    <div className="satoshi col-span-2 text-sm font-bold text-white">
                      {percentage}
                    </div>
                  </div>
                );
              }
            )}
          </Section>
        </article>

        {/* INFLOW AND OUTFLOW */}
        <div className="mt-5 flex w-[23%] flex-col gap-5">
          {[
            { title: "Inflow (30d)", amount: "$ 2.3m" },
            { title: "Outflow (30d)", amount: "$ 1.9m" },
          ].map(({ title, amount }, index) => {
            return (
              <div className="flex w-full flex-col gap-5 rounded-2xl bg-vdao-dark px-7 pb-10 pt-5">
                <div className="satoshi text-lg font-medium leading-5 text-white">
                  {title}
                </div>
                <div className="satoshi text-3xl font-bold leading-8 text-vdao-light">
                  {amount}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function TitleComponent() {
  return (
    <div className="clash text-7xl font-medium text-vdao-light md:pt-20 md:pb-28">
      Analytics
    </div>
  );
}
