import Description from "~/components/misc/description";
import Header from "~/components/layout/header";
import DownwardsArrow from "public/icons/blog/polygonDownwards.svg";
import Image from "next/image";

import BlogCard from "~/components/pages/blog/blogCard";
import LeftArrow from "public/icons/blog/leftArrow.svg";
import RightArrow from "public/icons/blog/rightArrow.svg";
import Subscription from "~/components/misc/subscription";
import { useEffect, useState } from "react";
import { blogDetails } from "~/components/pages/blog/blogDetails";

const Blog = () => {
  const [pageCount, setPageCount] = useState(1);
  const [pageNumbers, setPageNumbers] = useState<any>([]);
  const [updatedBlogs, setUpdatedBlogs] = useState<any>([]);

  const itemsPerPage = 3;

  /** The following two useEffects are for Pagenation functionality. */
  useEffect(() => {
    if (blogDetails.length) {
      let pageCountArr = [];
      let count = 0;
      for (let i = 0; i < blogDetails.length; i++) {
        if ((i + 1) % itemsPerPage === 0) {
          count = count + 1;
          pageCountArr.push(count);
        }
      }

      if (blogDetails.length % itemsPerPage !== 0) {
        pageCountArr.push(count + 1);
      }

      setPageNumbers(pageCountArr);
    }
  }, [blogDetails.length]);

  useEffect(() => {
    if (pageCount) {
      let updatedBlogsArr = [];
      const startBlog = itemsPerPage * (pageCount - 1);
      const endBlog =
        (pageCount - 1) * itemsPerPage + 3 <= blogDetails.length
          ? (pageCount - 1) * itemsPerPage + 3
          : blogDetails.length;

      for (let i = startBlog; i < endBlog; i++) {
        updatedBlogsArr.push(blogDetails[i]);
      }

      setUpdatedBlogs(updatedBlogsArr);
    }
  }, [pageCount]);

  return (
    <div className="w-full bg-white text-vdao-dark">
      <Header />

      <Description title={<div>Blog</div>} description={<></>} />

      <div>
        <div className="flex flex-col-reverse gap-3 px-10 md:absolute md:right-0 md:mr-20 md:flex-row md:px-0">
          <div className="flex h-full w-full cursor-pointer justify-between rounded-md bg-vdao-dark px-5 py-1  text-white md:mx-0 md:w-48 md:py-2">
            <span className="text-lg">Catagory</span>
            <Image src={DownwardsArrow} alt="" height={8} width={10} />
          </div>

          <div>
            <input
              placeholder="Search"
              className="h-10 w-full rounded-md pl-5 text-vdao-dark outline-none outline-1 outline-vdao-dark placeholder:text-vdao-dark placeholder:opacity-30 md:mx-0 md:w-56"
            />
          </div>
        </div>
      </div>

      <div className="md:mt-16">
        {updatedBlogs &&
          updatedBlogs.map((blog: any, idx: number) => {
            return (
              <BlogCard
                blog={blog}
                key={idx}
                showBorder={idx + 1 < updatedBlogs.length}
              />
            );
          })}
      </div>

      <div className="mr-20 flex justify-center py-11 md:justify-end md:py-14 ">
        <Image
          src={LeftArrow}
          alt=""
          height={10.61}
          width={10.61}
          className="mr-5 cursor-pointer"
          onClick={() => pageCount > 1 && setPageCount(pageCount - 1)}
        />
        {pageNumbers.length &&
          pageNumbers.map((number: number, idx: number) => {
            return (
              <div
                className={`cursor-pointer pr-4 text-lg ${
                  pageCount === number ? " text-vdao-light" : ""
                }`}
                onClick={() => setPageCount(number)}
                key={idx}
              >
                {number}
              </div>
            );
          })}

        <Image
          src={RightArrow}
          alt=""
          height={10.61}
          width={10.61}
          className="cursor-pointer"
          onClick={() =>
            pageCount < pageNumbers.length && setPageCount(pageCount + 1)
          }
        />
      </div>

      <Subscription />
    </div>
  );
};

export default Blog;
