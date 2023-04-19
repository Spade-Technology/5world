import PrimaryButton from "~/styles/shared/buttons/primaryButton";

const HowToApply = () => {
  return (
    <div className="font-body flex flex-col justify-between  bg-vdao-deep px-6 py-16 md:py-24 md:px-24 text-white md:flex-row gap-11 md:gap-10 ">
      <div className="flex-1">
        <div className="font-heading text-4xl md:text-5xl text-vdao-light">
          Funding Schedule
        </div>
        <div className="font-heading mt-8 text-2xl md:mt-12 md:text-3xl"> Grants Round 1</div>
        <div className="pt-3 md:pt-6 text-xl md:text-2xl">Application opens: q2 2023</div>
        <div className="pt-3 md:pt-6 text-xl md:text-2xl">Application deadline: q3, 2022</div>
        <div className="pt-3 md:pt-6 text-xl md:text-2xl">Application shortlist: q3 2022</div>
        <div className="pt-3 md:pt-6 text-xl md:text-2xl">Voting begins: q3 2023</div>
        <div className="pt-3 md:pt-6 text-xl md:text-2xl">Grants Awarded: q3 2023</div>
      </div>
      <div className="flex-1">
        <div className="font-heading text-4xl md:text-5xl text-vdao-light">
          How to Apply
        </div>
        <div className="mt-8 md:mt-12 font-heading text-2xl">Step 1</div>
        <div className="pt-5 md:pt-6 text-2xl font-light">
          Check your project meets our basic <a href="" target="_blank" className="text-white font-semibold border-b-2"> eligibility criteria.  </a> 
        </div>

        <div className="mt-12 font-heading text-2xl">Step 2</div>
        <div className="pt-5 md:pt-6 text-2xl font-light">
          Complete our <a href="" target="_blank" className="text-white font-semibold border-b-2">application tutorial</a> to ensure you have the web3 tools
          and knowledge you need.
        </div>

        <div className="mt-12 font-heading text-2xl">Step 3</div>
        <div className="pt-5 md:pt-6 text-2xl font-light">
          Sign in to our grants application portal and submit your proposal.
        </div>

        <PrimaryButton
          text="Grants Application Portal"
          className="my-10 py-1 text-xl"
        />

        <div className="pt-6 text-lg font-light">
          For additional information please contact us @vdao_regen on Twitter or
          join our Discord Community!
        </div>

        <div className="pt-6 text-lg font-light">
          VDAO grants rounds take place every quarter. Sign up to our mailing
          list to keep updated on our next available round.
        </div>
      </div>
    </div>
  );
};

export default HowToApply;
