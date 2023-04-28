const GrantCards = () => {
  return (
    <div className="mx-auto w-screen bg-vdao-deep">
      <div className="mx-auto max-w-[1280px] pb-[120px]">
        <div className="mx-6 max-w-[1280px] font-heading text-[32px] font-medium text-vdao-light md:mx-auto md:text-[46px]">
          Current Grants
        </div>

        <div className="mx-6 mt-5 grid grid-cols-1 gap-5 md:mx-0 md:grid-cols-2">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  );
};

export const Card = () => {
  return <></>;
};

export default GrantCards;
