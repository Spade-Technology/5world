import Link from "next/link";
import { useEffect, useState } from "react";

const ContentsTable = () => {
  const [sticky, setSticky] = useState(false);
  const headingCSS = "text-3xl font-medium font-heading";

  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  });

  /* Method that will fix header after a specific scrollable */
  const isSticky = (e: any) => {
    const scrollTop = window.scrollY;
    console.log("scrollTop", scrollTop, window.screen.availWidth);

    if (window.screen.availWidth > 390 && scrollTop >= 400 && scrollTop <= 4200) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  return (
    <section className="mx-auto w-screen bg-vdao-deep py-[60px] px-6 md:px-0  ">
      <div className=" mx-auto grid max-w-[1280px] grid-cols-1 md:grid-cols-3 md:gap-[68px]">
        <div
          className={`flex h-fit max-w-[319px] flex-col gap-5 rounded-[20px] bg-vdao-dark p-10 font-body text-[22px] font-normal text-vdao-light
           ${sticky ? "fixed top-5 pr-14" : ""} `}
          id="tableOfContents"
        >
          <Link href={"/app/support/#codeOfConduct"}>Code of Conduct</Link>
          <Link href={"/app/support/#goal"}>Our Goal</Link>
          <Link href={"/app/support/#scope"}>Scope</Link>
          <Link href={"/app/support/#enforcement"}>Enforcement</Link>
          <Link href={"/app/support/#enf-guidelines"}>
            Enforcement Guideline
          </Link>
          <Link href={"/app/support/#license"}>License and Attribution</Link>
        </div>
        {sticky && <div></div>}

        <div className="col-span-2 max-w-[669px] pt-11 font-body text-[22px] font-normal text-white md:pt-0">
          {/* Code of Conduct */}
          <div id="codeOfConduct">
            <div className={`${headingCSS}`}>Code of Conduct</div>
            <div className="pt-5">
              We are committed to fostering an a-political environment that is
              creative, hospitable and collaborative. We encourage all those who
              participate in the DAO to actively contribute to building a
              community that offers positive experiences for everyone,
              regardless of their views, background or identity.
            </div>
          </div>

          {/* Our Goal */}
          <div className="pt-[60px]" id="goal">
            <div className={`${headingCSS}`}>Our Goal</div>
            <div className="pt-5">
              The goal of this Code of Conduct is to set the overall tone for
              our community and to provide a guide and a process by which we
              interact and hold each other accountable. This isn't an exhaustive
              list of things you can and can't do. Rather its an invitation to
              community members to reflect upon how they can help to support a
              thriving, healthy community space. The following values and ethics
              guide our thinking:
              <ul className="list-disc p-5 pl-10">
                <li>Fairness & Caring</li>
                <li>Trust & Respect</li>
                <li>Generous Listening</li>
                <li>Straight Talk</li>
              </ul>
            </div>

            <div className="pt-5">
              Behaviours that promote healthy community:
              <ul className="list-disc p-5 pl-10">
                <li>
                  Acting in the best interests of the community with respect for
                  personal autonomy and freedoms.
                </li>
                <li>
                  Being kind and courteous to others. Exercising consideration
                  and respect in your speech and actions.
                </li>
                <li>Participating in an authentic and active way.</li>
                <li>
                  Being respectful of different viewpoints and experiences.
                </li>
                <li>
                  Approaching and listening to others in good faith and leading
                  with empathy.
                </li>
                <li>
                  Engaging in healthy self-reflection and gracefully accepting
                  constructive criticism.
                </li>
              </ul>
            </div>

            <div className="pt-5">
              Behaviors that undermine community cohesion:
              <ul className="list-disc p-5 pl-10">
                <li>
                  Overt political or ideological discourse that seeks to divide
                  the community in to ‘us’ and ‘them’.
                </li>
                <li>
                  Implicitly or explicitly offensive comments, harassment or
                  trolling.
                </li>
                <li>
                  Use of sexual images or messages, the use of explicit or
                  violent sexual language and unwelcome sexual advances.
                </li>
                <li>
                  Threats or incitement of violence of any kind, including
                  encouraging an individual to engage in self-harm.
                </li>
                <li>
                  Sustained disruption of community events, including talks and
                  presentations.{" "}
                </li>
                <li>Prospecting / selling services or products.</li>
                <li>Prospecting / selling services or products.</li>
                <li>
                  Other conduct which could reasonably be considered
                  inappropriate in a professional setting
                </li>
              </ul>
            </div>
          </div>

          {/* Scope */}
          <div className="pt-[60px]" id="scope">
            <div className={`${headingCSS}`}>Scope</div>
            <div className="pt-5">
              This Code of Conduct applies to all spaces managed, facilitated
              and maintained by the DAO both online and in real life. It also
              applies when an individual is representing the project or its
              community in public spaces or online spaces outwith the DAO.
            </div>
          </div>

          {/* Enforcement */}
          <div className="pt-[60px]" id="enforcement">
            <div className={`${headingCSS}`}>Enforcement</div>
            <div className="pt-5">
              Users who wish to report an issue can email X@5thworld.farms.
              Guild stewards will review the submission as promptly as possible
              and address the issue to the best of their abilities.
            </div>
          </div>

          {/* Enforcement Guidelines */}
          <div className="pt-[60px]" id="enf-guidelines">
            <div className={`${headingCSS}`}>Enforcement Guidelines</div>
            <div className="pt-5">
              Community stewards will follow these Community Impact Guidelines
              in determining the consequences for any action they deem in
              violation of this Code of Conduct:
            </div>

            <div className="pt-[52px]">
              <div className="pt-5">
                Correction <br />
                Community Impact: Use of inappropriate language or other
                behavior deemed unprofessional or unwelcome in the community.
                <br />
                Consequence: A private, written warning from Guild stewards,
                providing clarity around the nature of the violation and an
                explanation of why the behavior was inappropriate. A public
                apology may be requested.
              </div>{" "}
              <div className="pt-5">
                Warning
                <br />
                Community Impact: A violation of community standards through a
                single incident or series of actions.
                <br />
                Consequence: A warning with consequences for continued behavior.
                No interaction with the people involved, including unsolicited
                interaction with those enforcing the Code of Conduct, for a
                specified period of time. This includes avoiding interactions in
                community spaces as well as external channels like social media.
                Violating these terms may lead to a temporary or permanent ban.
              </div>{" "}
              <div className="pt-5">
                Temporary Ban
                <br />
                Community Impact: A serious violation of community standards,
                including sustained inappropriate behavior.
                <br />
                Consequence: A temporary ban from any sort of interaction or
                public communication with the community for a specified period
                of time. No public or private interaction with the people
                involved, including unsolicited interaction with those enforcing
                the Code of Conduct, is allowed during this period. Violating
                these terms may lead to a permanent ban.
              </div>{" "}
              <div className="pt-5">
                Permanent Ban
                <br />
                Community Impact: Demonstrating a pattern of violation of
                community standards, including sustained inappropriate behavior,
                harassment of an individual, or aggression toward or
                disparagement of classes of individuals.
                <br />
                Consequence: A permanent ban from any sort of public interaction
                within the community.
              </div>
            </div>
          </div>

          {/* License and Attribution */}
          <div className="pt-[60px]" id="license">
            <div className={`${headingCSS}`}>License and Attribution</div>
            <div className="pt-5">
              This document is licensed under{" "}
              <a
                href="https://creativecommons.org/licenses/by-sa/3.0/"
                target="_blank"
                className="underline underline-offset-4"
              >
                Creative Commons Attribution-Share Alike License
              </a>{" "}
              <br /> This Code of Conduct draws from the following antecedents
              with portions of text derived from:
              <br />
              <a
                href="https://www.contributor-covenant.org/version/2/0/code_of_conduct/"
                target="_blank"
                className="underline underline-offset-4"
              >
                Contributor Covenant v2.0{" "}
              </a>
              <br />
              <a
                href="https://support.gitcoin.co/gitcoin-knowledge-base/about-gitcoin/code-of-conduct"
                target="_blank"
                className="underline underline-offset-4"
              >
                Gitcoin Code of Conduct
              </a>{" "}
              <br />
              <a
                href="https://github.com/songcamp/code/blob/main/CODE_OF_CONDUCT.md"
                target="_blank"
                className="underline underline-offset-4"
              >
                Songcamp Code of Conduct
              </a>{" "}
              <br />
              Quartz{" "}
              <a
                href="https://github.com/jackyzha0/quartz/blob/hugo/CODE_OF_CONDUCT.md"
                target="_blank"
                className="underline underline-offset-4"
              >
                Code of Conduct
              </a>{" "}
              <br />
              Friends with Benefits’{" "}
              <a
                href="https://github.com/friends-with-benefits/codeofconduct/blob/main/code.md"
                target="_blank"
                className="underline underline-offset-4"
              >
                Code of Conduct{" "}
              </a>
              <br />
              Annalee Flower Horne's{" "}
              <a
                href="https://gist.github.com/annalee/2cddeff11357c3a8a613583ebca4dc17"
                target="_blank"
                className="underline underline-offset-4"
              >
                Sample Slack Code of Conduct{" "}
              </a>
              <br />
              Geek Feminism's{" "}
              <a
                href="https://geekfeminism.fandom.com/wiki/Community_anti-harassment/Policy"
                target="_blank"
                className="underline underline-offset-4"
              >
                Community Anti-Harassment Policy
              </a>{" "}
              <br />
              Python's{" "}
              <a
                href="https://www.pythondiscord.com/pages/code-of-conduct/"
                target="_blank"
                className="underline underline-offset-4"
              >
                Discord Code of Conduct.
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentsTable;
