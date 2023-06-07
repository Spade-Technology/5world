import Image from 'next/image'
import BackArrow from 'public/icons/blog/backArrow.svg'
import Header from '~/components/layout/header'
import Details from '~/components/pages/blog/details'
import { useRouter } from 'next/router'
import Recommends from '~/components/pages/blog/recommends'
import Footer from '~/components/layout/footer'
import Link from 'next/link'

const BlogDetails = () => {
  const router = useRouter()
  const {
    query: { id },
  } = router

  return (
    <>
      <Header web2 />

      <div className='mx-auto max-w-[1280px] bg-white text-vdao-dark'>
        <Link href='/blog' className='mt-5 mb-8 flex gap-3'>
          <Image src={BackArrow} alt='' width={20} />
          <div className='text-lg'> Back</div>
        </Link>

        <Details id={id ? id : '0'} />

        <Recommends />
      </div>

      <Footer />
    </>
  )
}

export default BlogDetails
