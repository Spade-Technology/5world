import Image from "next/image";
import { useEffect, useState } from "react";
import PageNation from "~/components/misc/pageNation";
import PrimaryButton from "~/styles/shared/buttons/primaryButton";
import { proposalDetails } from "./proposalDetails";

type CardProps = {
  proposal: any;
};

const ProposalCards = () => {
  const [pageCount, setPageCount] = useState(1);
  const [pageNumbers, setPageNumbers] = useState<any>([]);
  const [proposals, setUpdatedProposals] = useState<any>([]);

  const itemsPerPage = 3;

  /** The following two useEffects are for Pagenation functionality. */
  useEffect(() => {
    if (proposalDetails.length) {
      let pageCountArr = [];
      let count = 0;
      for (let i = 0; i < proposalDetails.length; i++) {
        if ((i + 1) % itemsPerPage === 0) {
          count = count + 1;
          pageCountArr.push(count);
        }
      }

      if (proposalDetails.length % itemsPerPage !== 0) {
        pageCountArr.push(count + 1);
      }

      setPageNumbers(pageCountArr);
    }
  }, [proposalDetails.length]);

  useEffect(() => {
    if (pageCount) {
      let updatedBlogsArr = [];
      const startBlog = itemsPerPage * (pageCount - 1);
      const endBlog =
        (pageCount - 1) * itemsPerPage + 3 <= proposalDetails.length
          ? (pageCount - 1) * itemsPerPage + 3
          : proposalDetails.length;

      for (let i = startBlog; i < endBlog; i++) {
        updatedBlogsArr.push(proposalDetails[i]);
      }

      setUpdatedProposals(updatedBlogsArr);
    }
  }, [pageCount]);

  return (
    <div className="mx-auto w-screen bg-vdao-deep">
      <div className="mx-auto max-w-[1280px] pb-[120px]">
        <div className="mx-6 max-w-[1280px] font-heading text-[32px] font-medium text-vdao-light md:mx-auto md:text-[46px]">
          Proposals
        </div>

        <div className="mx-6 mt-[15px]  md:mx-0 ">
          {proposals?.map((proposal: any, idx: number) => {
            return <Card proposal={proposal} key={idx} />;
          })}
        </div>

        <PageNation
          pageNumbers={pageNumbers}
          pageCount={pageCount}
          setPageCount={setPageCount}
          web3
        />
      </div>
    </div>
  );
};

export const Card = ({ proposal }: CardProps) => {
  return (
    <div className="mt-[20px] rounded-[20px] bg-white px-5 py-10 font-body text-vdao-dark md:mt-[30px] md:p-[50px]">
      <div className="flex flex-col md:flex-row">
        <div className="flex-1">
          <div className="text-lg font-semibold">{proposal.postedAt}</div>
          <div className="pt-[10px] text-3xl font-medium">
            {proposal.content}
          </div>

          <div className="flex w-full pt-[20px]">
            <div>
              <Image
                src={proposal.creatorIcon}
                alt=""
                className="rounded-full"
              />
            </div>

            <div className="pl-[10px] md:pl-[16px]">
              <div className="font-body text-lg font-semibold">
                {proposal.creatorName}
              </div>
              <div className="font-body text-sm">{proposal.creatorAddress}</div>
            </div>
          </div>

          <div
            className={`mt-[30px] w-fit cursor-pointer rounded-[20px] border-[1px] border-vdao-dark px-9 py-[5px] text-lg font-medium text-vdao-light`}
          >
            Active
          </div>
        </div>
        <div className="flex-1">
          <div className="pt-7 md:pt-9 text-lg font-normal">{proposal.description}</div>
          <PrimaryButton
            text="View Detail"
            className="mt-[30px] py-[5px] px-9 text-xl font-medium"
          />
        </div>
      </div>
    </div>
  );
};

export default ProposalCards;
