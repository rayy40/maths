"use client";

import React, { useEffect, useMemo, useState, useRef } from "react";
import Matrix from "@/components/Matrix";
import styles from "@/styles/matrix.module.css";
import { FaPlus, FaMinus } from "react-icons/fa";
import { InlineMath } from "react-katex";
import RenderMatrix from "@/components/RenderMatrix";
import { scrollToContainer } from "@/lib/Helper";
import { useGlobalContext } from "@/context/store";
import MatrixTypes from "@/components/MatrixTypes";
import { operations } from "@/lib/types";
import MatrixOperations from "@/components/MatrixOperations";

type Props = {};

export default function MatrixPage({}: Props) {
  let solutionContainerRef = useRef<HTMLDivElement>(null);
  const [rows, setRows] = useState(2);
  const [columns, setColumns] = useState(2);
  const [matrix, setMatrix] = useState<string[][]>([]);
  const [declaration, setDeclaration] = useState<string>("A");
  const { setMatrixHistory, matrixHistory } = useGlobalContext();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMemo(() => {
    createMatrix();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, columns]);

  const handleSubmit = () => {
    setMatrixHistory((prev) => ({
      ...prev,
      [declaration]: [...matrix],
    }));

    if (solutionContainerRef.current) {
      solutionContainerRef.current.style.display = "block";
      scrollToContainer(solutionContainerRef);
    }

    createMatrix();

    const successor = String.fromCharCode(declaration.charCodeAt(0) + 1);
    setDeclaration(successor);
  };

  console.log(matrixHistory);

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
          <div className={styles.types_container}>
            <h3
              style={{ paddingBottom: "1.25em", fontSize: "1.05rem" }}
              className={styles.title}
            >
              Types:
            </h3>
            <MatrixTypes matrix={matrix} setMatrix={setMatrix} />
          </div>
        </div>
        <div className={styles.matrix_section}>
          <div className={styles.matrix_container}>
            <div className={styles.matrix_declare}>
              <InlineMath math={declaration} />
              <InlineMath math="=" />
            </div>
            <Matrix matrix={matrix} setMatrix={setMatrix} />
            <div className={styles.matrix_button_wrapper}>
              <button
                onClick={handleSubmit}
                className={`submit_button ${styles.matrix_btn}`}
              >
                Create
              </button>
              <button
                onClick={createMatrix}
                className={`submit_button ${styles.matrix_btn}`}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
      <div ref={solutionContainerRef} className={styles.matrix_page_solution}>
        <div className={styles.matrix_operation}>
          <div className={styles.matrix_operation_col}>
            <MatrixOperations
              title="Select Matrix"
              data={Object.keys(matrixHistory).filter(
                (key) => !key.includes("^")
              )}
            />
            <MatrixOperations
              title="Operations"
              operations={operations.filter((op) => op.id >= 9 && op.id <= 12)}
            />
          </div>
          <div className={styles.matrix_operation_col}>
            <div className={styles.matrix_render}>
              <RenderMatrix />
            </div>
          </div>
        </div>
        <div className={styles.matrix_history}></div>
      </div>
    </>
  );
}
