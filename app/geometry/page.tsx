import React from "react";
import styles from "@/styles/geomtery.module.css";
import { formula } from "@/lib/formulas";
import Link from "next/link";

export default function GeometryPage() {
  return (
    <div className="page_container">
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
                {shape.image}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
