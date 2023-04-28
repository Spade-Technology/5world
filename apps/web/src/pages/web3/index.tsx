import React from "react";
import Footer from "~/components/layout/footer";
import Header from "~/components/layout/header";
import {
  HomeDashboardComponentOne,
  HomeDashboardComponentThree,
  HomeDashboardComponentTwo,
  HomeWelcomeComponent,
} from "~/components/pages/web3/home/home";

interface Types {
  error: false;
}

const Index: React.FC<Types> = () => {
  return (
    <div className="overflow-hidden bg-vdao-deep">
      <Header web3 />

      <article className="">
        <HomeWelcomeComponent />

        <section className="flex flex-wrap">
          <HomeDashboardComponentOne />
          <HomeDashboardComponentTwo />
          <HomeDashboardComponentThree />
        </section>
      </article>

      <Footer />
    </div>
  );
};

export default Index;
