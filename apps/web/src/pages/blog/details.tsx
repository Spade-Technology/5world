import Image from 'next/image'
import BackArrow from 'public/icons/blog/backArrow.svg'
import Header from '~/components/layout/header'
import Details from '~/components/pages/blog/details'
import { useRouter } from 'next/router'
import Recommends from '~/components/pages/blog/recommends'
import Footer from '~/components/layout/footer'
import Link from 'next/link'
import MailingListComponent from '~/components/misc/mailinglist'

const BlogDetails = () => {
  const router = useRouter()
  const {
    query: { id },
  } = router

  return (
    <>
      <Header web2 />

      <div className='mx-auto mb-[84px] max-w-[1280px] bg-white px-6 text-vdao-dark md:mb-28 md:px-0'>
        <Link href='/blog' className='mb-8 flex gap-3 md:mt-5  md:pl-6 xl:pl-0'>
          <Image src={BackArrow} alt='' width={20} />
          <div className='font-body text-lg font-normal'> Back</div>
        </Link>

        <Details id={id ? id : '0'} />

        <Recommends />
      </div>
      <MailingListComponent />
      <Footer />
    </>
  )
}

export default BlogDetails
