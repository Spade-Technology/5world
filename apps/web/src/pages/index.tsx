import { type NextPage } from "next";

import Footer from "~/components/layout/footer";
import Header from "~/components/layout/header";
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
      <Header />

      <div className="w-full text-vdao-dark">
        <HomeWelcomeComponent />

        <HomeIntroComponent />

        <HomeObjectivesComponent />

        <HomeGetInvolvedComponent />

        <HomeCommunityComponent />

        <HomePartnersComponent />

        <HomeCTAComponent />

        <MailingListComponent />
      </div>

      <Footer />
    </>
  );
};

export default Home;
