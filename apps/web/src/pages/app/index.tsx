import { type NextPage } from "next";

import Page from "~/components/layout/page";
import {
  NewMembersComponent,
  ProfileHomeComponent,
  StatisticsHomeComponent,
  WelcomeComponent,
} from "~/components/pages/web3home";

const Home: NextPage = () => {
  return (
    <>
      <Page>
        <WelcomeComponent />

        <section className="mx-6 flex max-w-[1280px] flex-wrap md:gap-5">
          <ProfileHomeComponent />

          <NewMembersComponent />

          <StatisticsHomeComponent />
        </section>
      </Page>
    </>
  );
};

export default Home;
