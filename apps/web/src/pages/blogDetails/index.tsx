import Image from "next/image";
import BackArrow from "public/icons/blog/backArrow.svg";
import Header from "~/components/layout/header";
import Details from "./components/details";
import { useRouter } from "next/router";
import Recommends from "./components/recommends";

const BlogDetails = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;
  console.log("router", router, id);
  return (
    <div className="bg-white text-vdao-dark">
      <Header />

      <div className="mx-10 flex gap-3 md:mx-20">
        <Image src={BackArrow} alt="" width={20} />
        <div className="text-lg"> Back</div>
      </div>

      <Details id={id ? id : "0"} />

      <Recommends />
    </div>
  );
};

export default BlogDetails;
