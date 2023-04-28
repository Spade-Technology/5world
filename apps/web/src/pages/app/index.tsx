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

        <section className="mx-6 grid max-w-[1280px] gap-5 pb-32 lg:grid-cols-3 xl:mx-auto">
          <ProfileHomeComponent />

          <NewMembersComponent />

          <StatisticsHomeComponent />
        </section>
      </Page>
    </>
  );
};

export default Home;
