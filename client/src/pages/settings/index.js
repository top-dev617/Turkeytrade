import ChangePassword from "@/components/dashboard/settings/ChangePassword";
import DeleteAccount from "@/components/dashboard/settings/DeleteAccount";
import PaymentCard from "@/components/dashboard/settings/PaymentCard";
import ProfileSidebar from "@/components/dashboard/settings/ProfileSidebar";
import AuthRoute from "@/privete-routes/AuthRoute";
import React from "react";
import { useState } from "react";

const SettingsPage = () => {
  const [tab, setTab] = useState(0);
  return (
    <AuthRoute>
      <div className="container my-8">
        <div class="mx-4 max-w-screen-xl sm:mx-8 xl:mx-auto">
          <h1 class="border-b py-6 text-4xl font-semibold">Profile</h1>
          <div class="grid grid-cols-[250px_auto] gap-4 w-full">
            <ProfileSidebar setTab={setTab} open={tab} />

            <div class="overflow-hidden rounded-xl min-h-screen">
              {tab === 0 && <ChangePassword />}
              {tab === 1 && <PaymentCard />}
              {tab === 2 && <DeleteAccount />}
            </div>
          </div>
        </div>
      </div>
    </AuthRoute>
  );
};

export default SettingsPage;
