import Image from "next/image";
import UpWardsArrow from "public/icons/apply/FAQ-arrow-up.png";
import { useState } from "react";

const FAQSection = () => {
  const [index, setIndex] = useState<number>(0);
  const FAQS = [
    {
      title: "Morbi turpis mi, faucibus vitae.",
      description:
        "Sed quis sapien nec erat blandit cursus eget at risus. Cras maximus orci ultricies mi tempor pellentesque.",
    },
    {
      title: "Aenean venenatis erat eget placerat.",
      description:
        "Sed quis sapien nec erat blandit cursus eget at risus. Cras maximus orci ultricies mi tempor pellentesque.",
    },
    {
      title: "Vivamus facilisis odio non orci malesuada.",
      description:
        "Sed quis sapien nec erat blandit cursus eget at risus. Cras maximus orci ultricies mi tempor pellentesque.",
    },
    {
      title: "Morbi turpis mi, faucibus vitae.",
      description:
        "Sed quis sapien nec erat blandit cursus eget at risus. Cras maximus orci ultricies mi tempor pellentesque.",
    },
    {
      title: "Aenean venenatis erat eget placerat.",
      description:
        "Sed quis sapien nec erat blandit cursus eget at risus. Cras maximus orci ultricies mi tempor pellentesque.",
    },
  ];

  return (
    <div className="mx-10 my-20 flex flex-col md:mx-20 md:mt-28 md:flex-row md:gap-9">
      <div className="w-96 text-5xl font-medium ">
        {" "}
        Frequently asked Questions{" "}
      </div>
      <div className="mt-5 flex-1">
        <div className="text-xl font-normal md:pr-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi turpis
          mi, faucibus vitae elementum id, tristique at lectus.
        </div>

        {FAQS.map((faq, idx) => {
          return (
            <div className="mt-5 flex cursor-pointer justify-between gap-9 md:mt-10">
              <div>
                <div
                  className="text-2xl font-medium md:text-3xl"
                  onClick={() => setIndex(idx)}
                >
                  {faq.title}
                </div>
                {index === idx && (
                  <div className="pt-2 text-lg font-normal">
                    {faq.description}
                  </div>
                )}
              </div>

              <div>
                <Image
                  src={UpWardsArrow}
                  alt="arrow"
                  className={`h-6 w-6 ${
                    index === idx
                      ? "mt-10 origin-top rotate-180 transition-transform"
                      : ""
                  } `}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQSection;
