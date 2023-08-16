"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function NavBar() {
  const isClient = typeof window !== "undefined";
  const [scrolled, setScrolled] = useState("");

  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled("navbar_scrolled");
      } else {
        setScrolled("");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isClient]);

  return (
    <div className={`navbar_wrapper ${scrolled}`}>
      <ul className="navbar_wrapper_list">
        <li className="navbar_wrapper_item">
          <Link className="link" href={"/matrix"}>
            Matrix Calculator
          </Link>
        </li>
        <li className="navbar_wrapper_item">
          <Link className="link" href={"/equation-solver"}>
            Equation Solver
          </Link>
        </li>
        <li className="navbar_wrapper_item">
          <Link className="link" href={"/geometry"}>
            Geometry
          </Link>
        </li>
        <li className="navbar_wrapper_item">
          <Link className="link" href={"/equation-solver/simultaneous"}>
            Simultaneous Equation
          </Link>
        </li>
      </ul>
    </div>
  );
}
