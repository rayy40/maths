"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/Logo";
import { LuMenu } from "react-icons/lu";

export default function NavBar() {
  const pathname = usePathname();
  const isClient = typeof window !== "undefined";
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState("");

  useEffect(() => {
    if (!isClient) return;
    const checkIfMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };

    checkIfMobile();

    const handleResize = () => {
      checkIfMobile();
    };

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled("navbar_scrolled");
      } else {
        setScrolled("");
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [isClient]);

  return (
    <div className={`navbar_wrapper ${scrolled}`}>
      <div className="navbar_wrapper_logo">
        <Link href={"/"}>
          <Logo />
        </Link>
      </div>
      {isMobile ? (
        <div className="navbar_wrapper_menu">
          <LuMenu size={"2rem"} className="menu_logo" />
        </div>
      ) : (
        <ul className="navbar_wrapper_list">
          <li
            className={`navbar_wrapper_item ${
              pathname === "/matrix" ? "navbar_wrapper_item--active" : ""
            }`}
          >
            <Link
              className={`link ${pathname === "/matrix" ? "link-active" : ""}`}
              href={"/matrix"}
            >
              Matrix Calculator
            </Link>
          </li>
          <li
            className={`navbar_wrapper_item ${
              pathname === "/equation-solver"
                ? "navbar_wrapper_item--active"
                : ""
            }`}
          >
            <Link
              className={`link ${
                pathname === "/equation-solver" ? "link-active" : ""
              }`}
              href={"/equation-solver"}
            >
              Equation Solver
            </Link>
          </li>
          <li
            className={`navbar_wrapper_item ${
              pathname === "/geometry" ? "navbar_wrapper_item--active" : ""
            }`}
          >
            <Link
              className={`link ${
                pathname === "/geometry" ? "link-active" : ""
              }`}
              href={"/geometry"}
            >
              Geometry
            </Link>
          </li>
          <li
            className={`navbar_wrapper_item ${
              pathname === "/equation-solver/simultaneous"
                ? "navbar_wrapper_item--active"
                : ""
            }`}
          >
            <Link
              className={`link ${
                pathname === "/equation-solver/simultaneous"
                  ? "link-active"
                  : ""
              }`}
              href={"/equation-solver/simultaneous"}
            >
              Simultaneous Equation
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
