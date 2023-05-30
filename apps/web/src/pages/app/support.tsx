import Footer from '~/components/layout/footer'
import Header from '~/components/layout/header'
import ContentsTable from '~/components/pages/app/support/contentsTable'
import MemberSuport from '~/components/pages/app/support/memberSupport'

const Support = () => {
  return (
    <>
      <Header />

      <div className='w-full text-vdao-dark'>
        <MemberSuport />
        <ContentsTable />
      </div>

      <Footer />
    </>
  )
}

export default Support
