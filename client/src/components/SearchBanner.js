import React, { useState } from "react";
import search from "../../public/assets/serach.png";
import { useRouter } from "next/router";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { iSearch } from "@/utils/icons/icons";
import dynamic from "next/dynamic";
import { useGetStoreInfoBySellerIdQuery } from "@/redux/features/stores/storeApi";

const Picker = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false }
);

const languages = [
  { id: 1, name: "English" },
  { id: 2, name: "German" },
  { id: 3, name: "Arabic" },
  { id: 4, name: "French" },
];

const SearchBanner = () => {
  const { user } = useContext(AuthContext);
  const { data } = useGetStoreInfoBySellerIdQuery(user?._id);
  const [search, setSearch] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search) {
      router.push(`/search/${search}`);
    } else {
      return;
    }
  };

  return (
    <div className="search_banner">
      <div className="container">
        <div className="select_field d-flex justify-content-end gap-3">
          <Menu
            animate={{
              mount: { y: 0 },
              unmount: { y: 25 },
            }}
          >
            <MenuHandler>
              <button className="form-select max-w-[90px] bg-transparent text-gray-700">
                Help
              </button>
            </MenuHandler>
            <MenuList>
              <Link href="/faq">
                <button className="bg-white text-gray-700 py-2 w-full hover:!bg-pm hover:text-white rounded block">
                  FAQ
                </button>
              </Link>
              <Link href="/contact-us">
                <button className="bg-white text-gray-700 py-2 w-full hover:!bg-pm hover:text-white rounded block">
                  Contact us
                </button>
              </Link>
              {user && user?.role === "Buyer" && !data?.data?._id && (
                <Link href="/seller-register">
                  <button className="bg-white text-gray-700 py-2 w-full hover:!bg-pm hover:text-white rounded block">
                    Start Selling
                  </button>
                </Link>
              )}
            </MenuList>
          </Menu>
          {/* <Menu
            animate={{
              mount: { y: 0 },
              unmount: { y: 25 },
            }}
          >
            <MenuHandler>
              <button className="form-select max-w-fit bg-transparent text-gray-700">
                {selectedLanguage}
              </button>
            </MenuHandler>
            <MenuList>
              {languages.map((lan, index) => (
                <>
                  {lan.name !== selectedLanguage && (
                    <button
                      key={index}
                      onClick={() => setSelectedLanguage(lan.name)}
                      className="bg-white text-gray-700 py-2 w-full hover:!bg-pm hover:text-white rounded block"
                    >
                      {lan.name}
                    </button>
                  )}
                </>
              ))}
            </MenuList>
          </Menu> */}
        </div>
        <form onSubmit={handleSearch}>
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            placeholder="What do you need?"
          />
          <Button type="submit">
            <span className="hidden md:block">Search</span>
            <span className="md:hidden">{iSearch}</span>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SearchBanner;
