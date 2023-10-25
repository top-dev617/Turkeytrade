import React from "react";
import logo from "../../public/assets/logo.png";

import facebook from "../../public/assets/fb.png";
import linkedin from "../../public/assets/linkedin.png";
import youtube from "../../public/assets/youtube.png";
import instagram from "../../public/assets/instagram.png";
import Link from "next/link";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div>
          <Link href="/">
            <img src={logo.src} alt="" />
          </Link>
        </div>
        <div>
          <div className="footer_route">
            {/* <Link href="/">Shopping Cart</Link>
            <Link href="/">Messages</Link> */}
            <Link href="/">Terms & Service</Link>
          </div>
        </div>

        <div>
          {/* <div className="social_media">
            <Link href="/">
              <img src={facebook.src} alt="" />
            </Link>
            <Link href="/">
              <img src={linkedin.src} alt="" />
            </Link>
            <Link href="/">
              <img src={youtube.src} alt="" />
            </Link>
            <Link href="/">
              <img src={instagram.src} alt="" />
            </Link>
          </div> */}
        </div>
      </div>

    </footer>
  );
};

export default Footer;
