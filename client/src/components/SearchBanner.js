import React, { useState } from "react";
import search from "../../public/assets/serach.png";
import { useRouter } from "next/router";
import { Button } from "@material-tailwind/react";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { iSearch } from "@/utils/icons/icons";

const SearchBanner = () => {
  const { user } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search) {
      router.push(`/search/${search}`);
    } else {
      return;
    }
  };

  const handleNavigate = (path) => {
    if (path === "FAQ") {
      router.push("/faq");
    } else if (path === "Contact") {
      router.push("/contact-us");
    } else if (path === "Start Selling") {
      router.push("/seller-register");
    }
  };

  return (
    <div className="search_banner">
      <div className="container">
        <div className="select_field d-flex justify-content-end gap-3">
          <select
            onChange={(e) => handleNavigate(e.target.value)}
            className="form-select max-w-[90px]"
            aria-label="Default select example"
          >
            <option value="FAQ">FAQ</option>
            <option value="Contact">Contact us</option>
            {user && user?.role === "Buyer" && (
              <option value="Start Selling">Start Selling</option>
            )}
          </select>
          <select
            className="form-select max-w-fit"
            aria-label="Default select example"
          >
            <option selected value="en">
              English
            </option>
            <option value="de">German</option>
            <option value="ar">Arabic</option>
            <option value="fr">French</option>
          </select>
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
