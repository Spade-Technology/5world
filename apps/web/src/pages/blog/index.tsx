import Header from '~/components/layout/header'
import DownwardsArrow from 'public/icons/blog/polygonDownwards.svg'
import Image from 'next/image'

import MailingListComponent from '~/components/misc/mailinglist'
import Footer from '~/components/layout/footer'
import BlogPagination from '~/components/pages/blog/blogPagination'

const Blog = () => {
  return (
    <>
      <Header web2 />
      <div className='mx-auto max-w-[1280px] bg-white  text-vdao-dark'>
        <h1 className='px-6 pt-16 pb-10 text-8xl font-medium md:pb-0'>Blog</h1>

        <div className='flex w-full flex-col-reverse justify-end gap-3 py-10 px-6 md:mr-20 md:flex-row md:px-0 md:py-16'>
          <div className='flex h-10 w-full cursor-pointer justify-between rounded-md bg-vdao-dark px-5 py-1  text-white md:mx-0 md:w-48 md:py-2'>
            <span className='my-auto text-lg'>Catagory</span>
            <Image src={DownwardsArrow} alt='' height={8} width={10} className='my-auto' />
          </div>

          <div>
            <input
              placeholder='Search'
              className='h-10 w-full rounded-md pl-5 text-vdao-dark outline-none outline-1 outline-vdao-dark placeholder:text-vdao-dark placeholder:opacity-30 md:mx-0 md:w-56'
            />
          </div>
        </div>

        <BlogPagination />
      </div>
      <MailingListComponent />

      <Footer />
    </>
  )
}

export default Blog
