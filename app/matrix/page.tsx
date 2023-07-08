import React from "react";
import styles from "@/styles/matrix.module.css";

type Props = {};

export default function MatrixPage({}: Props) {
  return (
    <>
      <div className={styles.matrixContainer}>
        <div className={styles.header}>
          <h2 className={styles.title}>Matrix Calculator</h2>
        </div>
      </div>
    </>
  );
}
