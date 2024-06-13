import { AuthContext } from "@/components/context/AuthContext";
import { useDeleteUserMutation } from "@/redux/features/auth/authApi";
import { Button, Spinner } from "@material-tailwind/react";
import { useRouter } from "next/router";
import React from "react";
import { useContext } from "react";

const DeleteAccount = () => {
  const { user, setUser, signOut } = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const [deleteUser, { isLoading }] = useDeleteUserMutation();

  const handleDelete = async () => {
    const result = await deleteUser();
    if (result?.data?.success) {
      signOut();
      router.push("/sigin");
    }
  };
  return (
    <div className="">
      <>
        <div className="py-20 px-2">
          <div className="w-full mx-auto rounded-lg overflow-hidden md:max-w-xl">
            <div className="w-full md:p-3">
              <div className="relative border-dotted h-fit md:h-48 rounded-lg border-dashed border-2 border-blue-700 bg-gray-50 flex justify-center items-center">
                <div className="flex flex-col items-center p-2 md:p-4">
                  <i className="fa fa-folder-open fa-4x text-blue-700"></i>
                  <h4 className="label mb-4 mt-2">Deleting account</h4>
                  <span className="block text-gray-400 label-list">
                    Deleting your account will remove all of your information
                    from our database. This cannot be undone.
                  </span>
                </div>
              </div>
              <Button
                onClick={() => setOpen(true)}
                className="w-full mt-4"
                color="red"
              >
                Yes Delete
              </Button>
            </div>
          </div>
        </div>
        {open && (
          <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full flex bg-pm bg-opacity-25">
            <div className="relative p-4 w-full max-w-md h-full md:h-auto">
              <div className="relative p-4 text-center bg-white rounded-lg shadow  sm:p-5">
                <button
                  onClick={() => setOpen(false)}
                  type="button"
                  className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>

                <svg
                  className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <p className="mb-4 text-gray-500 dark:text-gray-300">
                  Are you sure you want to delete your account?
                </p>
                <div className="flex justify-center items-center space-x-4">
                  <button
                    onClick={() => setOpen(false)}
                    data-modal-toggle="deleteModal"
                    type="button"
                    className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    No, cancel
                  </button>
                  <button
                    onClick={() => handleDelete()}
                    disabled={isLoading}
                    className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none"
                  >
                    {isLoading ? <Spinner color="white" /> : "Yes, I'm sure"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default DeleteAccount;
