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

        <div className="mx-auto  flex w-fit">
          <section className="mx-6 flex flex-wrap justify-between gap-5 lg:max-w-[1280px]">
            <ProfileHomeComponent />

            <NewMembersComponent />

            <StatisticsHomeComponent />
          </section>
        </div>
      </Page>
    </>
  );
};

export default Home;
