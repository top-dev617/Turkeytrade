import CookieConsent from "@/components/commons/CookieConsent";
import CookieConsentUi from "@/components/commons/CookieConsentUi";
import HelpBreadcrumb from "@/components/help/HelpBreadcrumb";
import HelpTabContainer from "@/components/help/HelpTabContainer";
import Cookies from "js-cookie";
import Link from "next/link";
import React, { useState } from "react";

const PrivacyPolicy = () => {
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
        <HelpBreadcrumb name="Privacy Policy" />
        <div className="flex flex-col lg:flex-row items-start gap-4">
          <HelpTabContainer name="Privacy Policy" actionCookie={setIsVisible} />
          <div className="border-[1px] border-gray-200 rounded-[5px] w-full h-full p-3">
            <div className="w-full h-full">
              <h1 className="text-center font-bold text-black font-inter text-base">
                PRIVACY POLICY OF Turkeytrademarket
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
                Welcome to Turkeytrademarket, your trusted B2B platform
                connecting Turkish suppliers with buyers worldwide. This Privacy
                Policy outlines our commitment to protecting the privacy and
                security of your personal information in compliance with the Law
                on Protection of Personal Data No. 6698 in Turkey and the
                General Data Protection Regulation (GDPR) in the EU. <br />
                <br />
                By accessing or using our services through{" "}
                <Link
                  href="https://www.turkeytrademarket.com"
                  target="_blank"
                  className="text-pm hover:text-pmd cursor-pointer underline"
                >
                  www.Turkeytrademarket.com
                </Link>
                , you agree to the collection, storage, use, and disclosure of
                your personal information as described in this policy.
              </p>
            </div>
            <div className="mt-4">
              <h1 className="font-bold text-black font-inter text-[17px]">
                2. Consent
              </h1>
              <p className="mt-2 text-black text-[14px] font-inter font-normal">
                By using Turkeytrademarket, you consent to the data practices
                described in this policy. You may withdraw your consent at any
                time by contacting us, but please be aware that this may affect
                your ability to use certain features of our platform
                effectively. Withdrawal of consent does not affect the
                lawfulness of processing based on consent before its withdrawal.
              </p>
            </div>

            <div className="mt-4">
              <h1 className="font-bold text-black font-inter text-[17px]">
                3. Information We Collect
              </h1>
              <p className="mt-2 text-black text-[14px] font-inter font-normal">
                We collect both personal and non-personal information to provide
                and improve our services:
              </p>
              <ul className="mt-2 ml-8 md:ml-16 list-disc">
                <li className="text-black text-[14px] font-inter font-normal">
                  <strong>Personal Information:</strong> Includes but is not
                  limited to, your full name, email address, company name,
                  company address, phone number, and financial information (such
                  as payment details).
                </li>
                <li className="text-black text-[14px] font-inter font-normal">
                  <strong>Non-Personal Information:</strong> Includes data such
                  as your browser type, the time and date of your visit, and the
                  pages you accessed on our website.
                </li>
              </ul>
            </div>
            <div className="mt-4">
              <h1 className="font-bold text-black font-inter text-[17px]">
                4. How We Collect Your Information
              </h1>
              <ul className="mt-2 ml-8 md:ml-16 list-disc">
                <li className="text-black text-[14px] font-inter font-normal">
                  <strong>Direct Collection:</strong> We collect information you
                  provide when you register an account, update your profile,
                  post information, sign up for a newsletter, or make a
                  purchase.
                </li>
                <li className="text-black text-[14px] font-inter font-normal">
                  <strong>Indirect Collection:</strong> We use cookies and
                  similar tracking technologies to gather data about your
                  interactions and usage of our platform. Additionally, we
                  receive some data from third parties such as payment
                  processors and advertising services.
                </li>
              </ul>
            </div>

            <div className="mt-4">
              <h1 className="font-bold text-black font-inter text-[17px]">
                5. Use of Your Information
              </h1>
              <p className="mt-2 text-black text-[14px] font-inter font-normal">
                The information collected by Turkeytrademarket is used for
                various purposes:
              </p>
              <ul className="mt-2 ml-8 md:ml-16 list-disc">
                <li className="text-black text-[14px] font-inter font-normal">
                  <strong>To provide and maintain our Service:</strong>{" "}
                  Including managing your account, providing customer support,
                  and facilitating transactions.
                </li>
                <li className="text-black text-[14px] font-inter font-normal">
                  <strong>To improve our platform:</strong> We analyze user
                  behavior to enhance our website functionalities and user
                  interface.
                </li>
                <li className="text-black text-[14px] font-inter font-normal">
                  <strong>To communicate with you:</strong> This may include
                  responding to your inquiries, providing information about your
                  account, or offering new products, services, and terms.
                </li>
                <li className="text-black text-[14px] font-inter font-normal">
                  <strong>To comply with the law:</strong> We may use your
                  information to comply with applicable legal obligations, such
                  as responding to lawful requests by public authorities.
                </li>
              </ul>
            </div>

            <div className="mt-4">
              <h1 className="font-bold text-black font-inter text-[17px]">
                6. Legal Basis for Processing
              </h1>
              <p className="mt-2 text-black text-[14px] font-inter font-normal">
                Turkeytrademarket processes your personal information under the
                following legal bases:
              </p>
              <ul className="mt-2 ml-8 md:ml-16 list-disc">
                <li className="text-black text-[14px] font-inter font-normal">
                  <strong>Consent:</strong> You have given clear consent for us
                  to process your personal data for specific purposes.
                </li>
                <li className="text-black text-[14px] font-inter font-normal">
                  <strong>Contract:</strong> The processing is necessary for a
                  contract you have with Turkeytrademarket, or because you have
                  asked us to take specific steps before entering into that
                  contract.
                </li>
                <li className="text-black text-[14px] font-inter font-normal">
                  <strong>Legal Obligation:</strong> The processing is necessary
                  for us to comply with the law (not including contractual
                  obligations).
                </li>
                <li className="text-black text-[14px] font-inter font-normal">
                  <strong>Legitimate Interests:</strong> The processing is
                  necessary for our legitimate interests or the legitimate
                  interests of a third party unless there is a good reason to
                  protect your personal data which overrides those legitimate
                  interests.
                </li>
              </ul>
            </div>

            <div className="mt-4">
              <h1 className="font-bold text-black font-inter text-[17px]">
                7. Information Sharing and Disclosure
              </h1>
              <p className="mt-2 text-black text-[14px] font-inter font-normal">
                Turkeytrademarket may share your data with third parties in the
                following circumstances:
              </p>
              <ul className="mt-2 ml-8 md:ml-16 list-disc">
                <li className="text-black text-[14px] font-inter font-normal">
                  <strong>Service Providers:</strong> We engage certain trusted
                  third parties to perform functions and provide services to our
                  shop, such as payment processing and data analysis. We share
                  your personal information with these third parties, but only
                  to the extent necessary to perform these services.
                </li>
                <li className="text-black text-[14px] font-inter font-normal">
                  <strong>Legal Requirements:</strong> We may disclose your
                  information if required to do so by law or in response to
                  valid requests by public authorities (e.g., a court or a
                  government agency).
                </li>
                <li className="text-black text-[14px] font-inter font-normal">
                  <strong>Business Transfers:</strong> If Turkeytrademarket is
                  involved in a merger, acquisition, or asset sale, your
                  personal data may be transferred.
                </li>
              </ul>
            </div>

            <div className="mt-4">
              <h1 className="font-bold text-black font-inter text-[17px]">
                8. International Data Transfers
              </h1>
              <p className="mt-2 text-black text-[14px] font-inter font-normal">
                Your information, including Personal Data, may be transferred to
                — and maintained on — computers located outside of your state,
                province, country, or other governmental jurisdiction where the
                data protection laws may differ from those of your jurisdiction.
                If you are located outside Turkey and choose to provide
                information to us, please note that we transfer the data,
                including Personal Data, to Turkey and process it there. Your
                consent to this Privacy Policy followed by your submission of
                such information represents your agreement to that transfer.
              </p>
            </div>
            <div className="mt-4">
              <h1 className="font-bold text-black font-inter text-[17px]">
                9. Data Security
              </h1>
              <p className="mt-2 text-black text-[14px] font-inter font-normal">
                We are committed to ensuring the security of your personal
                information. Turkeytrademarket employs a variety of security
                technologies and procedures to help protect your personal data
                from unauthorized access, use, or disclosure. This includes
                using SSL technology for encryption and secure servers. However,
                no method of transmission over the Internet or method of
                electronic storage is 100% secure; therefore, while we strive to
                use commercially acceptable means to protect your personal
                information, we cannot guarantee its absolute security.
              </p>
            </div>
            <div className="mt-4">
              <h1 className="font-bold text-black font-inter text-[17px]">
                10. Data Accuracy
              </h1>
              <p className="mt-2 text-black text-[14px] font-inter font-normal">
                Turkeytrademarket takes reasonable steps to ensure that the data
                we collect is accurate, complete, and up-to-date. You are
                encouraged to help us maintain the accuracy of your information
                by regularly updating your account details and immediately
                reporting any changes in your personal information.
              </p>
            </div>
            <div className="mt-4">
              <h1 className="font-bold text-black font-inter text-[17px]">
                11. Data Minimization
              </h1>
              <p className="mt-2 text-black text-[14px] font-inter font-normal">
                We adhere to the principle of data minimization by only
                collecting, using, and retaining the amount of personal
                information necessary for the specified purposes. This helps
                ensure that your data is not used in ways that are incompatible
                with the purposes for which it was collected.
              </p>
            </div>
            <div className="mt-4">
              <h1 className="font-bold text-black font-inter text-[17px]">
                12. Retention of Your Information
              </h1>
              <p className="mt-2 text-black text-[14px] font-inter font-normal">
                Turkeytrademarket retains your personal information only for as
                long as is necessary for the purposes set out in this policy,
                for as long as your account is active, or as needed to provide
                you services. If you no longer want Turkeytrademarket to use
                your information to provide you services, you can request that
                we erase your personal information and close your account. We
                will retain and use your information to the extent necessary to
                comply with our legal obligations (for example, if we are
                required to retain your data to comply with applicable laws),
                resolve disputes, and enforce our legal agreements and policies.
              </p>
            </div>
            <div className="mt-4">
              <h1 className="font-bold text-black font-inter text-[17px]">
                13. Your Data Protection Rights
              </h1>
              <p className="mt-2 text-black text-[14px] font-inter font-normal">
                Under the applicable data protection laws, you have rights
                including:
              </p>
              <ul className="mt-2 ml-8 md:ml-16 list-disc">
                <li className="text-black text-[14px] font-inter font-normal">
                  <strong>Right of Access:</strong> You have the right to
                  request copies of your personal data from Turkeytrademarket.
                </li>
                <li className="text-black text-[14px] font-inter font-normal">
                  <strong>Right to Rectification:</strong> You have the right to
                  request that Turkeytrademarket correct any information you
                  believe is inaccurate or complete information you believe is
                  incomplete.
                </li>
                <li className="text-black text-[14px] font-inter font-normal">
                  <strong>Right to Erasure:</strong> You have the right to
                  request that Turkeytrademarket erase your personal data, under
                  certain conditions.
                </li>
                <li className="text-black text-[14px] font-inter font-normal">
                  <strong>Right to Restrict Processing:</strong> You have the
                  right to request that Turkeytrademarket restrict the
                  processing of your personal data, under certain conditions.
                </li>
                <li className="text-black text-[14px] font-inter font-normal">
                  <strong>Right to Object to Processing:</strong> You have the
                  right to object to Turkeytrademarket’s processing of your
                  personal data, under certain conditions.
                </li>
                <li className="text-black text-[14px] font-inter font-normal">
                  <strong>Right to Data Portability:</strong> You have the right
                  to request that Turkeytrademarket transfer the data that we
                  have collected to another organization, or directly to you,
                  under certain conditions.
                </li>
              </ul>
            </div>

            <div className="mt-4">
              <h1 className="font-bold text-black font-inter text-[17px]">
                14. Use of Cookies and Tracking Technologies
              </h1>
              <p className="mt-2 text-black text-[14px] font-inter font-normal">
                Turkeytrademarket uses cookies and similar tracking technologies
                to track the activity on our service and hold certain
                information. Cookies are files with a small amount of data which
                may include an anonymous unique identifier. You can instruct
                your browser to refuse all cookies or to indicate when a cookie
                is being sent. However, if you do not accept cookies, you may
                not be able to use some portions of our service. Detailed
                information about the types of cookies used and the purposes
                they serve is provided in our Cookie Policy.
              </p>
            </div>

            <div className="mt-4">
              <h1 className="font-bold text-black font-inter text-[17px]">
                15. Third-Party Links and Services
              </h1>
              <p className="mt-2 text-black text-[14px] font-inter font-normal">
                Our service may contain links to other sites that are not
                operated by us. If you click on a third-party link, you will be
                directed to that third party’s site. We strongly advise you to
                review the Privacy Policy of every site you visit.
                Turkeytrademarket has no control over and assumes no
                responsibility for the content, privacy policies, or practices
                of any third-party sites or services.
              </p>
            </div>

            <div className="mt-4">
              <h1 className="font-bold text-black font-inter text-[17px]">
                16. Children's Privacy
              </h1>
              <p className="mt-2 text-black text-[14px] font-inter font-normal">
                Our services are not directed to individuals under the age of
                18. We do not knowingly collect personal information from
                children under 18. If we become aware that a child under 18 has
                provided us with personal information, we will take steps to
                delete such information from our servers immediately. If you are
                aware that a child under 18 has provided us with personal
                information, please contact us.
              </p>
            </div>

            <div className="mt-4">
              <h1 className="font-bold text-black font-inter text-[17px]">
                17. Automated Decision-Making and Profiling
              </h1>
              <p className="mt-2 text-black text-[14px] font-inter font-normal">
                Turkeytrademarket does not engage in fully automated
                decision-making or profiling that has legal or similarly
                significant effects using customer data. If these practices are
                adopted in the future, users will be provided with information
                about the logic involved, as well as the significance and the
                envisaged consequences of such processing for the user.
              </p>
            </div>
            <div className="mt-4">
              <h1 className="font-bold text-black font-inter text-[17px]">
                18. Marketing Communications
              </h1>
              <p className="mt-2 text-black text-[14px] font-inter font-normal">
                You may opt to receive marketing communications from us if you
                have requested such information from us, participated in our
                promotions, or if you provided us with your details when
                registering for an account. You can opt out of receiving
                marketing emails from us at any time by clicking the unsubscribe
                link at the bottom of our emails or by contacting us directly.
              </p>
            </div>
            <div className="mt-4">
              <h1 className="font-bold text-black font-inter text-[17px]">
                19. Changes to This Privacy Policy
              </h1>
              <p className="mt-2 text-black text-[14px] font-inter font-normal">
                We reserve the right to update or change our Privacy Policy at
                any time. Changes to this policy will be posted on our website
                and, where appropriate, notified to you by email. We encourage
                you to periodically review this Privacy Policy for any changes.
                Changes to this Privacy Policy are effective when they are
                posted on this page.
              </p>
            </div>
            <div className="mt-4">
              <h1 className="font-bold text-black font-inter text-[17px]">
                20. Contact Us
              </h1>
              <p className="mt-2 text-black text-[14px] font-inter font-normal">
                If you have any questions about this Privacy Policy, our data
                practices, or your dealings with our services, you can contact
                us through the dedicated contact section on our website or via
                email, as provided on our platform. Our dedicated team is
                available to address any concerns or inquiries you may have.
              </p>
            </div>
            <div className="mt-4">
              <h1 className="font-bold text-black font-inter text-[17px]">
                21. Compliance and Cooperation with Regulatory Authorities
              </h1>
              <p className="mt-2 text-black text-[14px] font-inter font-normal">
                We are committed to complying with applicable laws and
                regulations and to cooperate with data protection authorities.
                If you have any concerns about our data practices, we encourage
                you to contact us so we can address them directly. We also
                commit to resolving any complaints regarding our collection or
                use of your personal information.
              </p>
            </div>
            <div className="mt-4">
              <h1 className="font-bold text-black font-inter text-[17px]">
                22. Breach Notification
              </h1>
              <p className="mt-2 text-black text-[14px] font-inter font-normal">
                In the unlikely event of a data breach that is likely to result
                in a risk to your rights and freedoms, we will notify the
                appropriate authorities without undue delay. We will also
                communicate any such data breach to the affected individuals
                when the breach is likely to result in a high risk to their
                personal data, so appropriate protective measures can be taken.
              </p>
            </div>
            <div className="mt-4">
              <h1 className="font-bold text-black font-inter text-[17px]">
                23. Data Protection Officer
              </h1>
              <p className="mt-2 text-black text-[14px] font-inter font-normal">
                Turkeytrademarket has appointed a Data Protection Officer (DPO)
                to oversee compliance with this privacy policy and other data
                protection laws. If you have any questions or concerns about our
                privacy practices or this policy, you can contact our DPO at
                dpo@turkeytrademarket.com.
              </p>
            </div>
            <div className="mt-4">
              <h1 className="font-bold text-black font-inter text-[17px]">
                24. Governing Law
              </h1>
              <p className="mt-2 text-black text-[14px] font-inter font-normal">
                This Privacy Policy is governed by and construed in accordance
                with the laws of Sweden, without regard to its conflict of law
                provisions. You agree to submit any disputes arising from the
                use of this policy to the exclusive jurisdiction of the courts
                of Sweden.
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

export default PrivacyPolicy;
