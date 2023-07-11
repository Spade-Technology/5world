import Image from 'next/image'
import LeftArrow from 'public/icons/pagination/leftArrow.svg'
import RightArrow from 'public/icons/pagination/rightArrow.svg'
import DarkLeftAroow from 'public/icons/pagination/darkLeftArrow.svg'
import DarkRightArrow from 'public/icons/pagination/darkRight.svg'

type PaginationProps = {
  pageNumbers: any
  pageCount: number
  setPageCount: any
  web3?: boolean
  innerClass?: string
  outerClass?: string
}

const Pagination = ({ pageNumbers, pageCount, setPageCount, web3, outerClass, innerClass }: PaginationProps) => {
  return (
    <div className={`flex w-full px-6 ${outerClass ? outerClass : "justify-end"}`}>
      <div className={`flex justify-center md:justify-end ${innerClass ? '' : 'py-11 md:py-14 '} `}>
        <Image src={web3 ? DarkLeftAroow : LeftArrow} alt='Left Arrow' height={10.61} width={10.61} className='mr-5 cursor-pointer' onClick={() => pageCount > 1 && setPageCount(pageCount - 1)} />
        {pageNumbers.length &&
          pageNumbers.map((number: number, idx: number) => {
            return (
              <div
                className={`cursor-pointer pr-4 font-body text-lg font-normal ${pageCount === number ? ' text-vdao-light' : `${web3 ? 'text-white' : ''}`}`}
                onClick={() => setPageCount(number)}
                key={idx}
              >
                {number}
              </div>
            )
          })}

        <Image
          src={web3 ? DarkRightArrow : RightArrow}
          alt='Right Arrow'
          height={10.61}
          width={10.61}
          className='cursor-pointer'
          onClick={() => pageCount < pageNumbers.length && setPageCount(pageCount + 1)}
        />
      </div>
    </div>
  )
}

export default Pagination
