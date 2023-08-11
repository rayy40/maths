"use client";

import React from "react";
import styles from "@/styles/geomtery.module.css";
import { formula } from "@/lib/formulas";
import Link from "next/link";
import useSystemColorScheme from "@/lib/useSystemColorScheme";

export default function GeometryPage() {
  const isDarkMode = useSystemColorScheme();

  return (
    <div
      style={{ borderBottom: "none transparent" }}
      className="page_container"
    >
      <div className={styles.geometry_outer_wrapper}>
        {formula.map((shape) => (
          <Link
            className="link"
            key={shape.id}
            href={`/geometry/${shape.name}`}
          >
            <div className={styles.shape_container}>
              <h3 className={styles.shape_name}>{shape.name}</h3>
              <div
                className={`${styles.shape_img} ${
                  styles[`shape_img_${shape.id}`]
                }`}
              >
                {React.cloneElement(shape.image, {
                  children: React.Children.map(
                    shape.image.props.children,
                    (child) => {
                      if (child.type === "rect") {
                        return React.cloneElement(child, {
                          fill: isDarkMode ? "#202124" : "#ebeaeb",
                        });
                      } else if (child.type === "path") {
                        return React.cloneElement(child, {
                          fill: isDarkMode ? "#D9D9D9" : "#3A3D40", // Change the fill color for path elements
                        });
                      }
                      return child;
                    }
                  ),
                })}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
