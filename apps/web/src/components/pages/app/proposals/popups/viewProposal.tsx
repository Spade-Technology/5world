import { useState } from "react";
import CustomModal from "~/components/misc/customModal";
import ProfileCard from "~/components/misc/profileCard";
import Image from "next/image";
import { SupporterDetails } from "./details";

type ViewProposalProps = {
  show: boolean;
  close: any;
};

const ViewProposal = ({ show, close }: ViewProposalProps) => {
  const [showComments, setShowComments] = useState(false);
  return (
    <CustomModal show={show} close={close}>
      <div className="pb-[30px] font-body text-lg font-normal text-vdao-dark">
        <div className="font-bold">Posted FEB 02 2023</div>

        <div className="grid grid-cols-1 gap-[73px] py-[10px] md:py-5 md:grid-cols-3">
          <div className="col-span-2">
            <div className="text-[26px] md:text-[30px] font-medium font-heading">
              Proposal name goes here. One or two sentence will be ideal for
              this section
            </div>
            <div className="pt-[10px] md:pt-5">
              <ProfileCard />
            </div>

            <div className={` mt-[25px] flex flex-col md:flex-row gap-[22px] md:gap-20 md:mt-11`}>
              <div>
                <div className=" font-medium text-vdao-dark md:text-[22px]">
                  0xDve212....21E
                </div>
                <div className={` pt-1`}>Spell Address</div>
              </div>

              <div>
                <div className="font-medium text-vdao-dark md:text-[22px]">
                  10.0
                </div>
                <div className={`pt-1`}>ETH Support</div>
              </div>

              <div>
                <div className="font-medium text-vdao-dark md:text-[22px]">
                  5
                </div>
                <div className={` pt-1`}>Supporters</div>
              </div>
            </div>

            <div className="flex gap-[10px] border-b-[1px] border-b-vdao-dark pb-2 pt-10 font-body font-bold">
              <div
                className={` ${
                  !showComments && "text-vdao-light"
                } cursor-pointer justify-start`}
                onClick={() => setShowComments(false)}
              >
                Proposal Detail
              </div>
              <div
                className={` ${
                  showComments && "text-vdao-light"
                } cursor-pointer justify-start`}
                onClick={() => setShowComments(true)}
              >
                Comments (5)
              </div>
            </div>

            {!showComments && <Detailed />}
          </div>

          <div>
            <div className="text-xl font-bold">Supporters</div>
            <div className="pt-5 pr-[60px]">
              {SupporterDetails.map((details, idx) => {
                return (
                  <div className="flex justify-between pt-5" key={idx}>
                    <div className="flex gap-3">
                      <Image
                        src={details.icon}
                        height={40}
                        width={40}
                        alt="icon"
                      />
                      <div className="my-auto text-sm">{details.name}</div>
                    </div>
                    <div className="my-auto text-sm font-bold">
                      {details.percentage}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

const Detailed = () => {
  return (
    <div className="pt-11 text-black">
      The Governance Facilitator(s) and the Protocol Engineering Core Unit have
      placed an urgent out-of-schedule executive proposal into the voting
      system. MKR Holders should vote for this proposal if they support the
      following alterations to the Maker Protocol.
      <br />
      <br />
      If you are new to voting in the Maker Protocol, please see the voting
      guide to learn how voting works, and this wallet setup guide to set up
      your wallet to vote.
      <br />
      <br />
      Executive Summary
      <br />
      If this executive proposal passes, the following changes will occur within
      the Maker Protocol:
      <br />
      <br />
      Urgent Parameter Changes to MATIC-A, LINK-A, YFI-A, renBTC-A, and MANA-A
      Vaults, as detailed below.
      <br />
      Voting for this executive proposal will place your MKR in support of the
      changes and additions outlined above.
      <br />
      <br />
      Unless otherwise noted, the changes and additions listed above are subject
      to the GSM Pause Delay. This means that if this executive proposal passes,
      the changes and additions listed above will only become active in the
      Maker Protocol after the GSM Pause Delay has expired. The GSM Pause Delay
      is currently set to 48 hours.
      <br />
      <br />
      If this executive proposal does not pass within 30 days, then it will
      expire and can no longer have any effect on the Maker Protocol.
      <br />
      <br />
      Urgent Collateral Parameter Proposal Details
      <br />
      As per this successful urgent signal request, the following parameter
      changes will take place if this out-of-schedule executive proposal passes.
      To read more on the process for urgent responses, please see MIP24:
      Emergency Response.
      <br />
      <br />
      MATIC-A Changes
      <br />
      Reduce the MATIC-A Maximum Debt Ceiling (line) by 10 million DAI from 20
      million DAI to 10 million DAI.
      <br />
      <br />
      LINK-A Changes
      <br />
      Reduce the LINK-A Maximum Debt Ceiling (line) by 20 million DAI from 25
      million DAI to 5 million DAI.
      <br />
      <br />
      YFI-A Changes
      <br />
      Reduce the YFI-A Maximum Debt Ceiling (line) by 7 million DAI from 10
      million DAI to 3 million DAI.
      <br />
      <br />
      renBTC-A Changes
      <br />
      Reduce the renBTC-A Maximum Debt Ceiling (line) by 10 million DAI from 10
      million DAI to 0.
      <br />
      <br />
      MANA-A Changes
      <br />
      Reduce the MANA-A Maximum Debt Ceiling (line) by 7 million DAI from 10
      million DAI to 3 million DAI.
      <br />
      Increase the MANA-A Stability Fee by 42.5% from 7.5% to 50%.
      <br />
      Increase the MANA-A Liquidation Penalty (chop) by 17% from 13% to 30%.
      <br />
      <br />
      Review
      <br />
      Community debate on these topics can be found on the MakerDAO Governance
      forum. Please review any linked threads to inform your position before
      voting.
      <br />
      <br />
      Additionally, these changes may have been discussed further in recent
      Governance calls. Video for these calls is available to review.
      <br />
      <br />
      Resources
      <br />
      Additional information about the Governance process can be found in the
      Governance section of the MakerDAO community portal.
      <br />
      <br />
      To participate in future Governance calls, please join us every Thursday
      at 17:00 UTC.
      <br />
      <br />
      To add current and upcoming votes to your calendar, please see the
      MakerDAO Public Events Calendar.
    </div>
  );
};

export default ViewProposal;
