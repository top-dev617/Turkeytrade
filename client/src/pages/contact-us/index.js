import { useSendMessageMutation } from "@/redux/features/helpers/helperApi";
import { Button, Spinner } from "@material-tailwind/react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ContactUsPage = () => {
  const [sendMessage, { isLoading }] = useSendMessageMutation();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const handleMessage = async (data) => {
    const options = { data: data };
    const result = await sendMessage(options);
    if (result?.data?.status === true) {
      reset();
      toast.success("Message Send Success");
    } else {
      toast.error("Message Send Failed");
    }
  };
  return (
    <>
      <div className="container min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-12 border max-w-[1000px] mx-auto mt-16">
          <div className="bg-gray-900 md:col-span-4 p-10 text-white">
            <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight">
              Reach Out for Support
            </h3>
            <p className="mt-4 leading-7 text-gray-200">
              Have questions or need assistance with Turkeytrademarket? Our team
              is here to provide the help you need. Send us a message, and we'll
              respond as quickly as possible.
            </p>

            <div className="flex items-center mt-5">
              <span className="text-sm">Customer service available 24/7.</span>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(handleMessage)}
            className="md:col-span-8 p-2 md:p-10"
          >
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-first-name"
                >
                  First Name
                </label>
                <input
                  {...register("first_name", {
                    required: true,
                    maxLength: 20,
                  })}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 !mb-1 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  type="text"
                  placeholder="Jane"
                />
                {errors.first_name && (
                  <small className="text-red-500 text-xs italic">
                    Please fill out this field.
                  </small>
                )}
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-last-name"
                >
                  Last Name
                </label>
                <input
                  {...register("last_name", {
                    pattern: {
                      value: /^[A-Za-z]+$/,
                      message:
                        "Last name should only contain letters without spaces",
                    },
                  })}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight"
                  type="text"
                  placeholder="Doe"
                />
                {errors.last_name && (
                  <small className="text-red-500 text-xs italic">
                    {errors.last_name.message}
                  </small>
                )}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-password"
                >
                  Email Address
                </label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 !mb-1 leading-tight"
                  id="grid-email"
                  type="email"
                  placeholder="********@*****.**"
                />
                {errors.email && (
                  <small className="text-red-500 text-xs italic">
                    {errors.email.message}
                  </small>
                )}
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-password"
                >
                  Your Message
                </label>
                <textarea
                  {...register("message", {
                    required: true,
                    minLength: 50,
                    maxLength: 2000,
                    message: "Message is Required",
                  })}
                  placeholder="Enter Message..."
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 !mb-1 leading-tight min-h-[200px]"
                ></textarea>
                {errors.message && (
                  <small className="text-red-500 text-xs italic">
                    Please fill out this field.(Minimum: 50 and Maximum 2000
                    Characters)
                  </small>
                )}
              </div>
              <div className="flex justify-between w-full px-3 mt-2">
                <Button
                  className="shadow bg-pm hover:bg-pmd focus:shadow-outline focus:outline-none text-white font-bold py-3 px-6 rounded flex justify-center items-center"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? <Spinner color="white" /> : "Send Message"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactUsPage;
