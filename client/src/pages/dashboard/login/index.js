// import { Button } from "@material-tailwind/react";
// import React from "react";
// import { useForm } from "react-hook-form";

// const DLoginPage = () => {
//   const {
//     handleSubmit,
//     register,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const handleLogin = (data) => {
//     console.log(data);
//   };
//   return (
//     <div className="bg-pm hover:bg-pmd duration-700 h-screen flex items-center justify-center px-3">
//       <div className="bg-white w-full max-w-[400px] mx-auto shadow-3xl rounded-xl">
//         <div className="bg-white shadow shadow-gray-200 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             fill="currentColor"
//             class="w-14 h-14 text-pm bg-white rounded-full"
//           >
//             <path
//               fill-rule="evenodd"
//               d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
//               clip-rule="evenodd"
//             />
//           </svg>
//         </div>
//         <form
//           onSubmit={handleSubmit(handleLogin)}
//           className="px-3 pb-3 pt-16 md:!p-12"
//         >
//           <div className="flex items-center text-lg ">
//             <svg className="absolute ml-3" width="24" viewBox="0 0 24 24">
//               <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z" />
//             </svg>
//             <input
//               {...register("email", {
//                 required: "Email is required",
//                 pattern: {
//                   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
//                   message: "Invalid email address",
//                 },
//               })}
//               type="email"
//               className={`bg-gray-200 rounded italic text-sm pl-12 py-3 md:py-4 focus:outline-none w-full ${
//                 errors.email &&
//                 "!border !border-red-600 focus:!border focus:!border-red-600"
//               }`}
//               placeholder="Email"
//             />
//           </div>
//           {errors.email && (
//             <small className="text-red-500 text-xs italic block">
//               {errors.email.message}
//             </small>
//           )}
//           <div className="flex items-center text-lg mt-6 md:mt-8">
//             <svg className="absolute ml-3" viewBox="0 0 24 24" width="24">
//               <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z" />
//             </svg>
//             <input
//               {...register("password", {
//                 required: "Password is Required",
//               })}
//               type="password"
//               className={`bg-gray-200 rounded italic text-sm pl-12 py-3 md:py-4 focus:outline-none w-full ${
//                 errors.password && "!border !border-red-600"
//               }`}
//               placeholder="Password"
//             />
//           </div>
//           {errors.password && (
//             <small className="text-red-500 text-xs italic">
//               {errors.password.message}
//             </small>
//           )}
//           <Button
//             type="submit"
//             className="bg-gradient-to-b from-pm to-pmd font-medium hover:bg-pmd text-white uppercase  mt-6 md:mt-8 w-full rounded"
//           >
//             Login
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default DLoginPage;
