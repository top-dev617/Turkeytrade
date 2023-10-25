import React from 'react';

const ProfileSidebar = ({ setTab, open }) => {
    const tabs = ["Change Password", "Change Payment Card", "Delete Account"]
    return (
        <div className="w-full mt-4">
            {
                tabs?.map((t, index) => (
                    <div onClick={() => setTab(index)} key={index}
                        className={`label h-12 flex items-center cursor-pointer border-l-4 border-transparent px-2 py-2 font-semibold transition hover:border-l-pm hover:text-pmd
                    ${open === index ? "border-l-red-600 text-white bg-pm" : "border-l-white"}`}
                    >
                        <span>{t}</span>
                    </div>
                ))
            }

        </div>
    );
};

export default ProfileSidebar;