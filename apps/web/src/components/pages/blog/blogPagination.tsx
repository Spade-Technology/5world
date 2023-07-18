import { useEffect, useState } from 'react'
import { blogDetails } from './blogDetails'
import BlogCard from './blogCard'
// import Pagination from '~/components/misc/Pagination'

const BlogPagination = () => {
  const [pageCount, setPageCount] = useState(1)
  const [pageNumbers, setPageNumbers] = useState<any>([])
  const [updatedBlogs, setUpdatedBlogs] = useState<any>([])

  const itemsPerPage = 3

  /** The following two useEffects are for Pagination functionality. */
  useEffect(() => {
    if (blogDetails.length) {
      let pageCountArr = []
      let count = 0
      for (let i = 0; i < blogDetails.length; i++) {
        if ((i + 1) % itemsPerPage === 0) {
          count = count + 1
          pageCountArr.push(count)
        }
      }

      if (blogDetails.length % itemsPerPage !== 0) {
        pageCountArr.push(count + 1)
      }

      setPageNumbers(pageCountArr)
    }
  }, [blogDetails.length])

  useEffect(() => {
    if (pageCount) {
      let updatedBlogsArr = []
      const startBlog = itemsPerPage * (pageCount - 1)
      const endBlog = (pageCount - 1) * itemsPerPage + 3 <= blogDetails.length ? (pageCount - 1) * itemsPerPage + 3 : blogDetails.length

      for (let i = startBlog; i < endBlog; i++) {
        updatedBlogsArr.push(blogDetails[i])
      }

      setUpdatedBlogs(updatedBlogsArr)
    }
  }, [pageCount])

  return (
    <>
      <div className='px-6 md:mt-16'>
        {updatedBlogs &&
          updatedBlogs.map((blog: any, idx: number) => {
            return <BlogCard blog={blog} key={idx} showBorder={idx + 1 < updatedBlogs.length} id={idx} />
          })}
      </div>
      {/* <Pagination pageNumbers={pageNumbers} pageCount={pageCount} setPageCount={setPageCount} /> */}
    </>
  )
}

export default BlogPagination
