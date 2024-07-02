import CookieConsentUi from "@/components/commons/CookieConsentUi";
import HelpBreadcrumb from "@/components/help/HelpBreadcrumb";
import HelpTabContainer from "@/components/help/HelpTabContainer";
import Cookies from "js-cookie";
import Link from "next/link";
import React, { useState } from "react";

const CookiePolicy = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleAccept = () => {
    Cookies.set("cookieConsent", "accepted", { expires: 365 });
    setIsVisible(false);
  };

  const handleDecline = () => {
    Cookies.set("cookieConsent", "declined", { expires: 365 });
    setIsVisible(false);
  };

  const handleClose = () => {
    setIsVisible(false);
  };
  return (
    <>
      <div className="container min-h-screen">
        <HelpBreadcrumb name="Cookie Policy" />
        <div className="flex flex-col lg:flex-row items-start gap-4">
          <HelpTabContainer name="Cookie Policy" actionCookie={setIsVisible} />
          <div className="border-[1px] border-gray-200 rounded-[5px] w-full h-full p-3">
            <div className="w-full h-full">
              <h1 className="text-center font-bold text-black font-inter text-base">
                COOKIE POLICY OF Turkeytrademarket
              </h1>
              <p className="text-center">
                <Link
                  href="https://www.turkeytrademarket.com"
                  target="_blank"
                  className="text-center text-pm underline text-[14px]"
                >
                  www.Turkeytrademarket.com
                </Link>
              </p>
              <p className="text-center font-medium text-black font-inter text-[15px] mt-1">
                Effective date: 1st May 2024
              </p>
            </div>
            <div className="mt-4">
              <h1 className="font-bold text-black font-inter text-[17px]">
                1. Introduction
              </h1>
              <p className="mt-2 text-black text-[14px] font-inter font-normal">
                Welcome to Turkeytrademarket. This Cookie Policy explains how
                we, Turkeytrademarket, use cookies and similar technologies to
                recognize you when you visit our website at{" "}
                <Link
                  href="https://www.turkeytrademarket.com"
                  target="_blank"
                  className="text-pm hover:text-pmd cursor-pointer underline"
                >
                  www.Turkeytrademarket.com
                </Link>{" "}
                It explains what these technologies are and why we use them, as
                well as your rights to control our use of them.
              </p>
            </div>
            <div className="mt-4">
              <h1 className="font-bold text-black font-inter text-[17px]">
                2. What are cookies?
              </h1>
              <p className="mt-2 text-black text-[14px] font-inter font-normal">
                Cookies are small data files that are placed on your computer or
                mobile device when you visit a website. Cookies are widely used
                by website owners to make their websites work, or to work more
                efficiently, as well as to provide reporting information.
              </p>
            </div>
            <div className="mt-4">
              <h1 className="font-bold text-black font-inter text-[17px]">
                3. Why do we use cookies?
              </h1>
              <p className="mt-2 text-black text-[14px] font-inter font-normal">
                We use first-party and third-party cookies for several reasons.
                Some cookies are required for technical reasons in order for our
                Websites to operate, and we refer to these as "essential" or
                "strictly necessary" cookies. Other cookies also enable us to
                track and target the interests of our users to enhance the
                experience on our Websites. Third parties serve cookies through
                our Websites for advertising, analytics, and other purposes.
                This is described in more detail below.
              </p>
            </div>

            <div className="mt-4">
              <h1 className="font-bold text-black font-inter text-[17px]">
                4. Types of cookies used on our website:
              </h1>
              <ul className="mt-2 ml-8 md:ml-16 list-disc">
                <li className="text-black text-[14px] font-inter font-normal">
                  <strong>Essential Cookies:</strong> These cookies are strictly
                  necessary to provide you with services available through our
                  Websites and to use some of its features, such as access to
                  secure areas.
                </li>
                <li className="text-black text-[14px] font-inter font-normal">
                  <strong>Performance and Functionality Cookies:</strong> These
                  cookies are used to enhance the performance and functionality
                  of our Websites but are non-essential to their use. However,
                  without these cookies, certain functionality may become
                  unavailable.
                </li>
                <li className="text-black text-[14px] font-inter font-normal">
                  <strong>Analytics and Customization Cookies:</strong> These
                  cookies collect information that is used either in aggregate
                  form to help us understand how our Websites are being used or
                  how effective our marketing campaigns are, or to help us
                  customize our Websites for you.
                </li>
                <li className="text-black text-[14px] font-inter font-normal">
                  <strong>Advertising Cookies:</strong> These cookies are used
                  to make advertising messages more relevant to you. They
                  perform functions like preventing the same ad from
                  continuously reappearing, ensuring that ads are properly
                  displayed for advertisers, and in some cases selecting
                  advertisements that are based on your interests.
                </li>
              </ul>
            </div>

            <div className="mt-4">
              <h1 className="font-bold text-black font-inter text-[17px]">
                5. Control of Cookies
              </h1>
              <p className="mt-2 text-black text-[14px] font-inter font-normal">
                You have the right to decide whether to accept or reject
                cookies. You can exercise your cookie rights by setting your
                preferences in the Cookie Consent Manager. The Cookie Consent
                Manager allows you to select which categories of cookies you
                accept or reject. Essential cookies cannot be rejected as they
                are strictly necessary to provide you with services.
              </p>
            </div>

            <div className="mt-4">
              <h1 className="font-bold text-black font-inter text-[17px]">
                6. Other tracking technologies
              </h1>
              <p className="mt-2 text-black text-[14px] font-inter font-normal">
                We may use other tracking technologies, such as web beacons
                (also known as "pixel tags" and "clear GIFs") to collect
                information about your interaction with our website. These
                technologies are similar to cookies but are not stored on your
                browser and may not be as easily managed.
              </p>
            </div>

            <div className="mt-4">
              <h1 className="font-bold text-black font-inter text-[17px]">
                7. Third-Party Cookies
              </h1>
              <p className="mt-2 text-black text-[14px] font-inter font-normal">
                Some of our third-party partners may set cookies on your device
                when you visit our website. These cookies are managed by third
                parties, and you may need to visit third-party websites in order
                to get information on how they use cookies.
              </p>
            </div>

            <div className="mt-4">
              <h1 className="font-bold text-black font-inter text-[17px]">
                8. Privacy Policy
              </h1>
              <p className="mt-2 text-black text-[14px] font-inter font-normal">
                Our use of cookies and other tracking technologies is part of
                our broader privacy practices, which are described in our
                Privacy Policy, including details on how we collect, use, and
                protect your personal information.
              </p>
            </div>
            <div className="mt-4">
              <h1 className="font-bold text-black font-inter text-[17px]">
                9. Updates to this Cookie Policy
              </h1>
              <p className="mt-2 text-black text-[14px] font-inter font-normal">
                We may update this Cookie Policy from time to time in order to
                reflect changes to the cookies we use or for other operational,
                legal, or regulatory reasons. Please revisit this Cookie Policy
                regularly to stay informed about our use of cookies and related
                technologies.
              </p>
            </div>
            <div className="mt-4">
              <h1 className="font-bold text-black font-inter text-[17px]">
                10. Contact us
              </h1>
              <p className="mt-2 text-black text-[14px] font-inter font-normal">
                If you have any questions about our use of cookies or other
                technologies, please email us at Support@Turkeytrademarket.com.{" "}
                <br />
                <br />
                By understanding and controlling the use of cookies on our
                platform, you can better safeguard your privacy while enjoying
                an efficient, customized experience on Turkeytrademarket.
              </p>
            </div>
          </div>
        </div>
      </div>
      {isVisible && (
        <CookieConsentUi
          handleAccept={handleAccept}
          handleClose={handleClose}
          handleDecline={handleDecline}
        />
      )}
    </>
  );
};

export default CookiePolicy;
