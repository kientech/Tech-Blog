import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="mt-8 mb-8">
      <div className="w-full h-[1px] bg-gray-100 my-8"></div>
      <div className="flex items-center justify-between">
        <span className="font-base text-textBase text-md">
          © 2024 Tech Blog. Design and Development by{" "}
          <span className="font-semibold text-buttonColor">Kien Duong Trung</span>.
        </span>
        <div className="md:flex md:items-center md:gap-x-4">
          <Link className="hover:text-buttonColor transition-all">
            <FaFacebookF />
          </Link>
          <Link className="hover:text-buttonColor transition-all">
            <FaInstagram />
          </Link>
          <Link className="hover:text-buttonColor transition-all">
            <FaTwitter />
          </Link>
          <Link className="hover:text-buttonColor transition-all">
            <FaLinkedinIn />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
