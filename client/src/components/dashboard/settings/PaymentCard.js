import React from 'react';

const PaymentCard = () => {
    return (
        <div>
            <div class="rounded-2xl overflow-hidden shadow-lg">
                <div
                    class="flex justify-center p-10 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
                >
                    <div
                        class="w-80 h-fit bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900 rounded-lg shadow-lg"
                    >
                        <div class="flex justify-between m-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="34"
                                height="34"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="#ffffff"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <rect x="3" y="5" width="18" height="14" rx="3" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                                <line x1="7" y1="15" x2="7.01" y2="15" />
                                <line x1="11" y1="15" x2="13" y2="15" />
                            </svg>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="34"
                                height="34"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="#ffffff"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <circle cx="9.5" cy="9.5" r="5.5" fill="#fff" />
                                <circle cx="14.5" cy="14.5" r="5.5" />
                            </svg>
                        </div>
                        <div class="flex justify-center mt-4">
                            <h1 class="text-gray-400 font-thin font-os">
                                XXXX XXXX XXXX 1234
                            </h1>
                        </div>
                        <div
                            class="flex flex-col justfiy-end mt-4 p-4 text-gray-400 font-quick"
                        >
                            <p class="font-bold text-xs">12 / 17</p>
                            <h4 class="uppercase tracking-wider font-semibold text-xs pb-4">
                                Our customer
                            </h4>
                        </div>
                    </div>
                </div>
                <div class="text-center mt-8 mb-2 font-quick">
                    <h1 class="font-black text-gray-700 tracking-wide text-xl">
                        Banks are supported
                    </h1>
                    <p class="font-bold text-gray-500">including yours</p>
                </div>

            </div>
            <div class="bg-white min-h-screen flex justify-center items-center">
                <div class="space-y-16">
                    <div class="w-96 h-56 m-auto bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-110">

                        <img class="relative object-cover w-full h-full rounded-xl" src="https://i.imgur.com/kGkSg1v.png" />

                        <div class="w-full px-8 absolute top-8">
                            <div class="flex justify-between">
                                <div class="">
                                    <h1 class="font-light">
                                        Name
                                    </h1>
                                    <p class="font-medium tracking-widest">
                                        Karthik P
                                    </p>
                                </div>
                                <img class="w-14 h-14" src="https://i.imgur.com/bbPHJVe.png" />
                            </div>
                            <div class="pt-1">
                                <h1 class="font-light">
                                    Card Number
                                </h1>
                                <p class="font-medium tracking-more-wider">
                                    4642  3489  9867  7632
                                </p>
                            </div>
                            <div class="pt-6 pr-6">
                                <div class="flex justify-between">
                                    <div class="">
                                        <h1 class="font-light text-xs">
                                            Valid
                                        </h1>
                                        <p class="font-medium tracking-wider text-sm">
                                            11/15
                                        </p>
                                    </div>
                                    <div class="">
                                        <h1 class="font-light text-xs text-xs">
                                            Expiry
                                        </h1>
                                        <p class="font-medium tracking-wider text-sm">
                                            03/25
                                        </p>
                                    </div>

                                    <div class="">
                                        <h1 class="font-light text-xs">
                                            CVV
                                        </h1>
                                        <p class="font-bold tracking-more-wider text-sm">
                                            ···
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="w-96 h-56 m-auto bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-110">

                        <img class="relative object-cover w-full h-full rounded-xl" src="https://i.imgur.com/Zi6v09P.png" />

                        <div class="w-full px-8 absolute top-8">
                            <div class="flex justify-between">
                                <div class="">
                                    <h1 class="font-light">
                                        Name
                                    </h1>
                                    <p class="font-medium tracking-widest">
                                        Karthik P
                                    </p>
                                </div>
                                <img class="w-14 h-14" src="https://i.imgur.com/bbPHJVe.png" />
                            </div>
                            <div class="pt-1">
                                <h1 class="font-light">
                                    Card Number
                                </h1>
                                <p class="font-medium tracking-more-wider">
                                    4642  3489  9867  7632
                                </p>
                            </div>
                            <div class="pt-6 pr-6">
                                <div class="flex justify-between">
                                    <div class="">
                                        <h1 class="font-light text-xs">
                                            Valid
                                        </h1>
                                        <p class="font-medium tracking-wider text-sm">
                                            11/15
                                        </p>
                                    </div>
                                    <div class="">
                                        <h1 class="font-light text-xs text-xs">
                                            Expiry
                                        </h1>
                                        <p class="font-medium tracking-wider text-sm">
                                            03/25
                                        </p>
                                    </div>

                                    <div class="">
                                        <h1 class="font-light text-xs">
                                            CVV
                                        </h1>
                                        <p class="font-bold tracking-more-wider text-sm">
                                            ···
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentCard;