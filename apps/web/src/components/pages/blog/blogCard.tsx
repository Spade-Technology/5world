import Image from 'next/image'
import Link from 'next/link'

type cardProps = {
  blog: any
  showBorder: boolean
  id: number
}

const BlogCard = ({ blog, showBorder, id }: cardProps) => {
  return (
    <div className={` grid-cols-12 gap-12 md:grid md:pb-16  ${showBorder ? 'border-b-[1px] border-black ' : ''} ${id > 0 ? 'pt-10' : ''} `}>
      <Image src={blog.image} alt='' className='w-full md:col-span-4 lg:col-span-6' />
      <div className='w-full pt-[34px] md:col-span-8 md:pt-0 lg:col-span-6'>
        <div className='font-body text-lg font-bold'>{blog.createdAt}</div>
        <div className='pt-5 font-heading text-[26px] font-medium leading-[30px] md:text-3xl md:leading-9'>{blog.heading}</div>
        <div className='mx-auto flex pt-[23.4px] md:pt-2'>
          <Image src={blog.createdByProfile} alt='' width={40} height={42.8} className='rounded-full' />
          <div className='my-auto pl-4 font-body text-[22px] font-normal'> {blog.createdBy} </div>
        </div>

        <div className='mt-[18.8px] flex flex-wrap gap-2.5'>
          {blog.features &&
            blog.features.length > 0 &&
            blog.features.map((item: string, idx: number) => {
              return (
                <div className='w-fit cursor-pointer rounded-[20px] bg-vdao-purple px-6 py-1 font-body text-sm font-normal text-black md:rounded-3xl' key={idx}>
                  {item}
                </div>
              )
            })}
        </div>

        <div className='py-8 font-body text-lg font-normal leading-[22px] text-black'>{blog.about}</div>

        <Link href={'/blog/details?id=' + blog.id}>
          <div className='mb-10 w-fit cursor-pointer border-b-2 border-b-vdao-light font-heading text-xl font-medium md:mb-0 '>Read More</div>
        </Link>
      </div>
    </div>
  )
}

export default BlogCard
