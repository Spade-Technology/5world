import Image from 'next/image'
import Link from 'next/link'

type cardProps = {
  blog: any
  showBorder: boolean
  id: number
}

const BlogCard = ({ blog, showBorder, id }: cardProps) => {
  return (
    <div
      className={`flex flex-col gap-12 md:flex-row md:pb-16  ${showBorder ? 'border-b-[1px] border-black ' : ''} ${
        id > 0 ? 'pt-10' : ''
      } `}
    >
      <div>
        <Image src={blog.image} alt='' />
      </div>
      <div className='float-left flex-1'>
        <div className='text-lg font-bold'>{blog.createdAt}</div>
        <div className='pt-5 text-3xl font-medium'>{blog.heading}</div>
        <div className='mx-auto flex pt-2'>
          <Image src={blog.createdByProfile} alt='' width={40} height={42.8} className='rounded-full' />
          <div className='my-auto pl-4'> {blog.createdBy} </div>
        </div>

        <div className='grid grid-cols-2 gap-2 pt-5 md:grid-cols-5'>
          {blog.features &&
            blog.features.length > 0 &&
            blog.features.map((item: string, idx: number) => {
              return (
                <div className='w-fit cursor-pointer rounded-3xl bg-vdao-purple px-6 py-1 text-sm text-black' key={idx}>
                  {item}
                </div>
              )
            })}
        </div>

        <div className='py-8 font-body text-lg font-normal text-black'>{blog.about}</div>

        <Link href={'/blog/details?id=' + blog.id}>
          <div className='mb-10 w-fit cursor-pointer border-b-2 border-b-vdao-light font-heading text-xl font-medium md:mb-0 '>
            Read More
          </div>
        </Link>
      </div>
    </div>
  )
}

export default BlogCard
