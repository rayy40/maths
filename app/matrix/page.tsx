"use client";

import React, { useEffect, useMemo, useState, useRef } from "react";
import Matrix from "@/components/Matrix";
import styles from "@/styles/matrix.module.css";
import { FaPlus, FaMinus } from "react-icons/fa";
import { InlineMath } from "react-katex";
import MatrixOperations from "@/components/MatrixOperations";
import RenderMatrix from "@/components/RenderMatrix";
import { scrollToContainer } from "@/lib/Helper";

type Props = {};

export default function MatrixPage({}: Props) {
  let solutionContainerRef = useRef<HTMLDivElement>(null);
  const [rows, setRows] = useState(2);
  const [columns, setColumns] = useState(2);
  const [declaration, setDeclaration] = useState("A");
  const [matrix, setMatrix] = useState<string[][]>([]);

  const createMatrix = () => {
    const newMatrix = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < columns; j++) {
        row.push("");
      }
      newMatrix.push(row);
    }
    setMatrix(newMatrix);
  };

  useEffect(() => {
    createMatrix();
  }, []);

  useMemo(() => {
    createMatrix();
  }, [rows, columns]);

  const handleSubmit = () => {
    createMatrix();
    setDeclaration("B");

    if (solutionContainerRef.current) {
      solutionContainerRef.current.style.display = "block";
      scrollToContainer(solutionContainerRef);
    }
  };

  return (
    <>
      <div className={styles.matrix_page_container}>
        <div className={styles.matrix_section}>
          <div className={styles.header}>
            <h2 className={styles.title}>Matrix Calculator</h2>
            <div className={styles.order_wrapper}>
              <div className={styles.order_container}>
                <p style={{ width: "65px", marginRight: "1.25em" }}>Row: </p>
                <button
                  onClick={() => setRows((prev) => prev - 1)}
                  className={`${styles.plus_minus_icon} ${
                    rows <= 2 ? styles.plus_minus_icon_disabled : ""
                  }`}
                >
                  <FaMinus />
                </button>
                <input
                  onChange={(e) => setRows(parseInt(e.target.value))}
                  className={styles.order_input}
                  value={rows}
                  type="text"
                />
                <button
                  onClick={() => setRows((prev) => prev + 1)}
                  className={`${styles.plus_minus_icon} ${
                    rows >= 6 ? styles.plus_minus_icon_disabled : ""
                  }`}
                >
                  <FaPlus />
                </button>
              </div>
              <div className={styles.order_container}>
                <p style={{ width: "65px", marginRight: "1.25em" }}>Column: </p>
                <button
                  onClick={() => setColumns((prev) => prev - 1)}
                  className={`${styles.plus_minus_icon} ${
                    columns <= 2 ? styles.plus_minus_icon_disabled : ""
                  }`}
                >
                  <FaMinus />
                </button>
                <input
                  onChange={(e) => setColumns(parseInt(e.target.value))}
                  className={styles.order_input}
                  value={columns}
                  type="text"
                />
                <button
                  onClick={() => setColumns((prev) => prev + 1)}
                  className={`${styles.plus_minus_icon} ${
                    columns >= 6 ? styles.plus_minus_icon_disabled : ""
                  }`}
                >
                  <FaPlus />
                </button>
              </div>
            </div>
          </div>
          <div className={styles.operation_container}>
            <h3
              style={{ paddingBottom: "1.25em", fontSize: "1.05rem" }}
              className={styles.title}
            >
              Operations:
            </h3>
            <MatrixOperations
              handleSubmit={handleSubmit}
              declaration={declaration}
              setDeclaration={setDeclaration}
            />
          </div>
        </div>
        <div className={styles.matrix_section}>
          <div className={styles.matrix_container}>
            <div className={styles.matrix_declare}>
              <InlineMath math={declaration} />
              <InlineMath math="=" />
            </div>
            <Matrix matrix={matrix} setMatrix={setMatrix} />
            <button
              onClick={createMatrix}
              className={`submit_button ${styles.clear_matrix_btn}`}
            >
              Clear all
            </button>
          </div>
        </div>
      </div>
      <div ref={solutionContainerRef} className={styles.matrix_page_solution}>
        <h2
          style={{ paddingBottom: "1.25em", fontSize: "1.15em" }}
          className={styles.title}
        >
          Solution:
        </h2>
        <div className={styles.matrix_soltuion}>
          <RenderMatrix matrix={matrix} />
        </div>
      </div>
    </>
  );
}
