import Footer from '~/components/layout/footer'
import Header from '~/components/layout/header'
import Page from '~/components/layout/page'
import ContentsTable from '~/components/pages/app/support/contentsTable'
import MemberSuport from '~/components/pages/app/support/memberSupport'

const Support = () => {
  return (
    <Page>
      <div className='w-full text-vdao-dark'>
        <MemberSuport />
        <ContentsTable />
      </div>
    </Page>
  )
}

export default Support
