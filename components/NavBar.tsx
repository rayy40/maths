"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { LuMenu } from "react-icons/lu";
import { VscClose } from "react-icons/vsc";
import useOutsideClick from "@/lib/useOutsideClick";

export default function NavBar() {
  const isClient = typeof window !== "undefined";
  const dropDownRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
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

  useOutsideClick(dropDownRef, () => {
    setShowDropDown(false);
  });

  return (
    <div className={`navbar_wrapper ${scrolled}`}>
      <div className="navbar_wrapper_logo">
        <Link href={"/"}>
          <Logo />
        </Link>
      </div>
      {isMobile ? (
        <div className="navbar_wrapper_menu">
          <LuMenu
            onClick={() => setShowDropDown(true)}
            size={"2rem"}
            className="menu_logo"
          />
          <div
            style={{ display: showDropDown ? "block" : "none" }}
            className="navbar_wrapper_bg"
          >
            <div ref={dropDownRef} className="navbar_wrapper_list">
              <div className="navbar_wrapper_header">
                <Link href={"/"}>
                  <Logo />
                </Link>
                <VscClose
                  onClick={() => setShowDropDown(false)}
                  size={"2.5rem"}
                />
              </div>
              <div
                onClick={() => setShowDropDown(false)}
                className="navbar_wrapper_list_item"
              >
                <Link href={"/matrix"}>Matrix</Link>
              </div>
              <div
                onClick={() => setShowDropDown(false)}
                className="navbar_wrapper_list_item"
              >
                <Link href={"/geometry"}>Geometry</Link>
              </div>
              <div
                onClick={() => setShowDropDown(false)}
                className="navbar_wrapper_list_item"
              >
                <Link href={"/equation-solver"}>Equation</Link>
              </div>
              <div
                onClick={() => setShowDropDown(false)}
                className="navbar_wrapper_list_item"
              >
                <Link href={"/equation-solver/simultaneous"}>Simultaneous</Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="navbar_wrapper_links">
          <div ref={dropDownRef} className="navbar_dropdown">
            <button
              className="navbar_dropdown_btn"
              onClick={() => setShowDropDown((v) => !v)}
            >
              Operations
            </button>
            <div
              style={{ display: showDropDown ? "flex" : "none" }}
              className="navbar_dropdown_list"
            >
              <div
                onClick={() => setShowDropDown(false)}
                className="navbar_dropdown_list_item"
              >
                <Link href={"/matrix"}>Matrix</Link>
              </div>
              <div
                onClick={() => setShowDropDown(false)}
                className="navbar_dropdown_list_item"
              >
                <Link href={"/geometry"}>Geometry</Link>
              </div>
              <div
                onClick={() => setShowDropDown(false)}
                className="navbar_dropdown_list_item"
              >
                <Link href={"/equation-solver"}>Equation</Link>
              </div>
              <div
                onClick={() => setShowDropDown(false)}
                className="navbar_dropdown_list_item"
              >
                <Link href={"/equation-solver/simultaneous"}>Simultaneous</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
