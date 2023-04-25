import Image from "next/image";
import { blogDetails } from "./blogDetails";
import Link from "next/link";
import { type } from "os";

const Recommends = () => {
  return (
    <div className="mx-10 md:mx-20">
      <h2 className="font-heading text-[46px] font-medium">
        Recommended Reading
      </h2>

      <div className="flex pt-10">
        <div className="flex-1">
          <RecommendedCard blog={blogDetails[0]} />
        </div>
        <div className="flex-1">
          <RecommendedCard blog={blogDetails[1]} />
        </div>
      </div>
    </div>
  );
};

type RecommendedProps = {
  blog: any;
};

export const RecommendedCard = (Props: RecommendedProps) => {
  return (
    <>
      <div className="float-left">
        <Image src={Props.blog?.image} alt="" />
        <div className="text-lg font-bold pt-5">{Props.blog?.createdAt}</div>
        <div className="pt-5 text-3xl font-medium">{Props.blog?.heading}</div>
        <div className="mx-auto flex pt-2">
          <Image
            src={Props.blog?.createdByProfile}
            alt=""
            width={40}
            height={42.8}
            className="rounded-full"
          />
          <div className="my-auto pl-4"> {Props.blog?.createdBy} </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-5 md:grid-cols-4">
          {Props.blog?.features &&
            Props.blog?.features.length > 0 &&
            Props.blog?.features.map((item: string, idx: number) => {
              return (
                <div
                  className="w-fit cursor-pointer rounded-3xl bg-vdao-purple px-6 py-1 text-sm text-black"
                  key={idx}
                >
                  {item}
                </div>
              );
            })}
        </div>

        <div className="py-8 font-body text-lg font-normal text-black">
          {Props.blog?.about}
        </div>

        <Link href={"/blog/details?id=" + Props.blog?.id}>
          <div className="mb-10 w-fit cursor-pointer border-b-2 border-b-vdao-light font-heading text-xl font-medium md:mb-0 ">
            Read More
          </div>
        </Link>
      </div>
    </>
  );
};

export default Recommends;
