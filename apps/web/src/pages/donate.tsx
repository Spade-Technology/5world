import Footer from '~/components/layout/footer'
import Header from '~/components/layout/header'
import Page from '~/components/layout/page'
import MailingListComponent from '~/components/misc/mailinglist'

import Badges from '~/components/pages/donate/badges'
import DonateDescription from '~/components/pages/donate/description'
import DonateNow from '~/components/pages/donate/donateNow'
import WhatsInIt from '~/components/pages/donate/whatsInIt'

const Donate = () => {
  return (
    <article className='w-full overflow-hidden'>
      <Page>
        <div className='mx-auto max-w-[1140px]'>
          <DonateDescription />

          <DonateNow />

          <WhatsInIt />

          <Badges />
        </div>

        <MailingListComponent />
      </Page>
    </article>
  )
}

export default Donate
