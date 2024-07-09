import { faqs } from "@/utils/datas/faqData";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import React from "react";

const FaqPage = () => {
  const [open, setOpen] = React.useState(1);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  function Icon({ id, open }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        fill-rule="evenodd"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className={`${
          id === open ? "rotate-180" : ""
        } h-5 w-5 transition-transform`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
        />
      </svg>
    );
  }

  return (
    <div className="container mx-auto my-8">
      <img
        className="w-full max-w-[600px] mx-auto"
        src="https://img.freepik.com/free-vector/tiny-business-people-with-giant-faq-letters-gadget-users-searching-instructions-useful-information-flat-vector-illustration-customer-support-solution-concept-banner-landing-web-page_74855-23409.jpg?t=st=1695746085~exp=1695746685~hmac=01cfb7adfc36f6e7f16950caad51cc9f4a351efd6c964f525e74d729e58d133f"
        loading="lazy"
        alt="frequently asked questions"
        title="frequently asked questions"
      />

      <h1 className="text-center label !text-4xl">
        Frequently Asked Questions
      </h1>

      <div className="mt-8">
        {faqs.map((item, index) => (
          <Accordion
            key={index}
            open={open === item.id}
            icon={<Icon id={item.id} open={open} />}
          >
            <AccordionHeader
              className="hover:text-pm label"
              onClick={() => handleOpen(item?.id)}
            >
              {item?.question}
            </AccordionHeader>
            <AccordionBody className="label-list">{item?.answer}</AccordionBody>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default FaqPage;
