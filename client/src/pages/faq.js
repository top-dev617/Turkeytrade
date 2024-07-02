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
        {/* <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
          <AccordionHeader
            className="hover:text-pm label"
            onClick={() => handleOpen(1)}
          >
            What payment methods do you accept?
          </AccordionHeader>
          <AccordionBody className="label-list">
            We accept major credit cards, including Visa, MasterCard, American
            Express, as well as PayPal and Apple Pay.
          </AccordionBody>
        </Accordion> */}
        <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
          <AccordionHeader
            className="hover:text-pm label"
            onClick={() => handleOpen(2)}
          >
            How do I track my order?
          </AccordionHeader>
          <AccordionBody className="label-list">
            To track your order, log in to your account and go to the "Order
            History" section. You'll find real-time updates and tracking
            information there.
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
          <AccordionHeader
            className="hover:text-pm label"
            onClick={() => handleOpen(3)}
          >
            What is your return policy?
          </AccordionHeader>
          <AccordionBody className="label-list">
            Our return policy allows you to return items within 30 days of
            purchase. Please visit our Returns page for detailed instructions.
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 4} icon={<Icon id={4} open={open} />}>
          <AccordionHeader
            className="hover:text-pm label"
            onClick={() => handleOpen(4)}
          >
            Are there any shipping charges?
          </AccordionHeader>
          <AccordionBody className="label-list">
            Shipping charges vary depending on your location and the shipping
            method selected during checkout. You can view the shipping cost at
            the checkout page before placing your order.
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 5} icon={<Icon id={5} open={open} />}>
          <AccordionHeader
            className="hover:text-pm label"
            onClick={() => handleOpen(5)}
          >
            Can I change my shipping address after placing an order?
          </AccordionHeader>
          <AccordionBody className="label-list">
            You can change your shipping address within the first 24 hours of
            placing your order. Contact our customer support team for
            assistance.
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 6} icon={<Icon id={6} open={open} />}>
          <AccordionHeader
            className="hover:text-pm label"
            onClick={() => handleOpen(6)}
          >
            How can I contact customer support?
          </AccordionHeader>
          <AccordionBody className="label-list">
            You can reach our customer support team via email at
            support@example.com
          </AccordionBody>
        </Accordion>
      </div>
    </div>
  );
};

export default FaqPage;
