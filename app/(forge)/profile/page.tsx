import React from "react";
import ConnectedAccount from "./_components/ConnectedAccount";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import ProfileForm from "./_components/ProfileForm";
import DeleteUser from "./_components/DeleteUser";
import { robotoCondensed } from "@/app/fonts";

export default async function Page() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="mb-6 py-12 px-6 text-gray-700 space-y-12">
      <section className="container space-y-2">
        <div className="mb-6">
          <h1
            className={`text-3xl sm:text-5xl font-bold ${robotoCondensed.className}`}
          >
            Profile
          </h1>
          <h4 className="text-md text-gray-600 prose">
            Manage your profile information.
          </h4>
        </div>
        <div className="py-6 border-t border-gray-200 rounded-3xl">
          <ProfileForm user={user} />
          <h3 className="py-4 font-medium text-gray-600">Connected Accounts</h3>
          <div className="px-4 space-y-3">
            {user?.identities?.map((identity) => (
              <ConnectedAccount key={identity.id} identity={identity} />
            ))}
          </div>
        </div>
      </section>
      <section className="container space-y-2 py-3 ">
        <div className="mb-6">
          <h1
            className={`text-3xl sm:text-5xl font-bold ${robotoCondensed.className}`}
          >
            Security
          </h1>
          <p className="prose text-md text-gray-600">
            Manage your security settings.
          </p>
        </div>
        <div className="py-6 border-t border-gray-200 rounded-3xl">
          Security content
        </div>
      </section>
      <section className="container space-y-2 py-3 ">
        <h4 className="text-2xl font-semibold">Danger</h4>
        <div className="flex flex-row justify-between py-6 border-t border-gray-200 rounded-3xl">
          <div>
            <p
              className={`text-md font-medium text-gray-600 ${robotoCondensed.className}`}
            >
              Delete Profile
            </p>
            <span className="text-sm text-gray-600 prose">
              Delete your profile and all its associated data.
            </span>
          </div>
          <DeleteUser />
        </div>
      </section>
    </main>
  );
}
