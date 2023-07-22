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
      <div className='mx-auto max-w-[1141px] bg-white px-6 text-vdao-dark  lg:px-0'>
        <h1 className='pt-16 text-[44px] font-medium md:text-8xl'>Blog</h1>

        <div className='mt-10 w-full justify-end gap-[11px] md:mt-[60px] md:flex'>
          <div className='mx-0 flex h-10 w-full cursor-pointer items-center justify-between rounded-md bg-vdao-dark px-5  text-white md:ml-auto md:w-48'>
            <div className='font-body text-lg font-normal'>Catagory</div>
            <Image src={DownwardsArrow} alt='' height={8} width={10} className='my-auto' />
          </div>

          <input
            placeholder='Search'
            className='mt-[15px] flex h-10 w-full items-center rounded-[5px] border-[1px] border-vdao-dark pl-5 font-body text-base font-normal text-vdao-dark duration-500 placeholder:text-vdao-dark placeholder:opacity-50 md:mt-0 md:w-[220px]'
          />
        </div>

        <BlogPagination />
      </div>
      <MailingListComponent />

      <Footer />
    </>
  )
}

export default Blog
