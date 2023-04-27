import React from "react";
import Header from "~/components/layout/header";
import {
  HomeDashboardComponentOne,
  HomeWelcomeComponent,
} from "~/components/pages/web3/home/home";

interface Types {
  okay: string;
}

const Index: React.FC<Types> = () => {
  return (
    <div className="bg-vdao-deep">
      <Header web3 />

      <article>
        <HomeWelcomeComponent />

        <section className="flex flex-wrap">
          <HomeDashboardComponentOne />
        </section>
      </article>
    </div>
  );
};

export default Index;
