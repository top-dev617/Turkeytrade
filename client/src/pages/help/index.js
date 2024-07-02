import HelpBreadcrumb from "@/components/help/HelpBreadcrumb";
import HelpTabContainer from "@/components/help/HelpTabContainer";
import HelpTermsAndConditions from "@/components/help/helpPages/TermsAndConditions";
import React from "react";

const HelpMain = () => {
  return (
    <div className="container min-h-screen">
      <HelpBreadcrumb name="Terms and Conditions" />
      <div className="flex flex-col lg:flex-row items-start gap-4">
        <HelpTabContainer name="Terms and Conditions" />
        <HelpTermsAndConditions />
      </div>
    </div>
  );
};

export default HelpMain;
