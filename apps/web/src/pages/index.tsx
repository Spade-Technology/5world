import { type NextPage } from "next";

import Page from "~/components/layout/page";
import MailingListComponent from "~/components/misc/mailinglist";

import {
  HomeCommunityComponent,
  HomeCTAComponent,
  HomeGetInvolvedComponent,
  HomeIntroComponent,
  HomeObjectivesComponent,
  HomePartnersComponent,
  HomeWelcomeComponent,
} from "~/components/pages/home";

const Home: NextPage = () => {
  return (
    <>
      <Page web2>
        <HomeWelcomeComponent />

        <HomeIntroComponent />

        <HomeObjectivesComponent />

        <HomeGetInvolvedComponent />

        <HomeCommunityComponent />

        <HomePartnersComponent />

        <HomeCTAComponent />

        <MailingListComponent />
      </Page>
    </>
  );
};

export default Home;
