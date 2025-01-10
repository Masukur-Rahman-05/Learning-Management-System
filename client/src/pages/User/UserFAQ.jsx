import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const UserFAQ = () => {
    return (
      <div className="w-full md:w-1/2 px-8 md:mx-auto my-10 text-white">
        <h1 className="text-xl md:text-3xl font-bold text-violet-500 text-center my-5">
          FAQs
        </h1>
        <Accordion
          type="single"
          collapsible
          className="w-full bg-gray-900 p-10 rounded-xl "
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-violet-500 text-[10px] md:text-sm">
              What is E-Learning?
            </AccordionTrigger>
            <AccordionContent className="text-slate-400 text-[10px] md:text-sm">
              E-Learning is an online platform that offers a wide range of
              courses across various fields, including technology, business,
              personal development, and more. You can browse, enroll, and learn
              at your own pace.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-violet-500 text-[10px] md:text-sm">
              How can I pay for a course?
            </AccordionTrigger>
            <AccordionContent className="text-slate-400 text-[10px] md:text-sm">
              You can pay securely using PayPal. Select your desired course,
              proceed to checkout, and complete your payment through PayPal.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-violet-500 text-[10px] md:text-sm">
              Are there any hidden fees?
            </AccordionTrigger>
            <AccordionContent className="text-slate-400 text-[10px] md:text-sm">
              No, there are no hidden fees. The price you see for the course is
              the final amount you’ll pay.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-violet-500 text-[10px] md:text-sm">
              Will I receive a certificate after completing a course?
            </AccordionTrigger>
            <AccordionContent className="text-slate-400 text-[10px] md:text-sm">
              Yes, most courses provide a certificate of completion that you can
              download and share.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="text-violet-500 text-[10px] md:text-sm">
              Do I have lifetime access to the course?
            </AccordionTrigger>
            <AccordionContent className="text-slate-400 text-[10px] md:text-sm">
              Yes, once you enroll in a course, you have lifetime access to the
              course content, including future updates.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
};

export default UserFAQ;