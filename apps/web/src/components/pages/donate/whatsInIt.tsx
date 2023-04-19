const WhatsInIt = () => {
  return (
    <div className="mt-[60px] max-w-[1280px] px-6 font-body text-white md:mx-[348px] md:mt-[140px]">
      <div className="mx-auto flex flex-col justify-between gap-5 md:flex-row md:gap-[43px] ">
        <div className="flex-none font-heading text-4xl font-medium underline underline-offset-8 md:w-[225px]">
          What’s in it for me?
        </div>

        <div className="flex-auto text-lg font-normal">
          There is no minimum donation amount. All donors get to rest in the
          knowledge that they are contributing to ecosystem regeneration.
        </div>
      </div>

      <div className="flex flex-col gap-5 py-[38px] md:flex-row md:gap-[43px]  md:py-[72px]">
        <div className="flex-none font-heading text-4xl font-medium underline underline-offset-8 md:w-[225px]">
          Badges
        </div>
        <div className="flex-auto text-lg font-normal">
          For those who want a little more, we offer the following ‘Proof of
          Virtue’ badges. A must have item for all discerning donors who want to
          signal publicly that they are supporting efforts to regenerate the
          plant’s ecosystems. Each badge also contains 100voting credits,
          enabling holders to vote in quadratic funding rounds and have some say
          over where their donations are being spent.
        </div>
      </div>
    </div>
  );
};

export default WhatsInIt;
