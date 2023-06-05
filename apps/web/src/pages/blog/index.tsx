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
        <h1 className='px-6 pt-16 pb-10 text-[44px] font-medium md:pb-0 md:text-8xl'>Blog</h1>

        <div className='flex w-full flex-col-reverse justify-end gap-3 py-10 px-6 md:mr-20 md:flex-row md:px-5 md:py-16 xl:px-0'>
          <div className='mx-0 flex h-10 w-full cursor-pointer items-center justify-between rounded-md bg-vdao-dark  px-5 text-white md:w-48'>
            <div className='my-auto font-body text-lg font-normal'>Catagory</div>
            <Image src={DownwardsArrow} alt='' height={8} width={10} className='my-auto' />
          </div>

          <div className='w-full'>
            <input
              placeholder='Search'
              className='h-9 w-full rounded-[5px] px-5 text-vdao-dark outline-none outline-1 outline-vdao-dark placeholder:text-vdao-dark placeholder:opacity-30 md:mx-0 md:w-56'
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
