"use client";

import React, { useEffect, useMemo, useState, useRef } from "react";
import Matrix from "@/components/Matrix";
import styles from "@/styles/matrix.module.css";
import { FaPlus, FaMinus } from "react-icons/fa";
import { InlineMath } from "react-katex";
import RenderMatrix from "@/components/RenderMatrix";
import { scrollToContainer } from "@/lib/Helper";
import { useMatrixContext } from "@/context/MatrixContext";
import MatrixTypes from "@/components/MatrixTypes";
import MatrixOperations from "@/components/MatrixOperations";
import RenderCalculation from "@/components/RenderCalculation";

type Props = {};

export default function MatrixPage({}: Props) {
  let solutionContainerRef = useRef<HTMLDivElement>(null);
  let calculationContainerRef = useRef<HTMLDivElement>(null);
  const [rows, setRows] = useState(2);
  const [columns, setColumns] = useState(2);
  const [matrix, setMatrix] = useState<string[][]>([]);
  const [declaration, setDeclaration] = useState<string>("A");
  const { setMatrixHistory, isCalculatorOn } = useMatrixContext();

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
    setMatrixHistory((prev) => {
      const updatedMatrix = [...matrix].map((row) =>
        row.map((value) => (value === "" ? "0" : value))
      );
      return {
        ...prev,
        [declaration]: updatedMatrix,
      };
    });

    if (solutionContainerRef.current) {
      solutionContainerRef.current.style.display = "block";
      scrollToContainer(solutionContainerRef);
    }

    createMatrix();

    if (declaration === "O" || declaration === "I") {
      setDeclaration(declaration);
    } else {
      const successor =
        declaration === "D"
          ? "D"
          : String.fromCharCode(declaration.charCodeAt(0) + 1);
      setDeclaration(successor);
    }
  };

  const handleScroll = () => {
    if (calculationContainerRef.current) {
      calculationContainerRef.current.style.display = "block";
      scrollToContainer(calculationContainerRef);
    }
  };

  return (
    <>
      <div className={styles.page_container}>
        <div className={styles.section}>
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
            <h3 className={styles.sub_title}>Types:</h3>
            <MatrixTypes
              matrix={matrix}
              setMatrix={setMatrix}
              setDeclaration={setDeclaration}
            />
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.matrix_container}>
            <div className={styles.declare}>
              <InlineMath math={declaration} />
              <InlineMath math="=" />
            </div>
            <Matrix matrix={matrix} setMatrix={setMatrix} />
            <div className={styles.button_wrapper}>
              <button
                onClick={handleSubmit}
                className={`submit_button ${styles.btn}`}
              >
                Create
              </button>
              <button
                onClick={createMatrix}
                className={`submit_button ${styles.btn}`}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
      <div ref={solutionContainerRef} className={styles.page_solution}>
        <div className={styles.operation_container}>
          <div className={styles.operation_col}>
            <MatrixOperations handleScroll={handleScroll} />
          </div>
          <div className={styles.operation_col}>
            <RenderMatrix />
          </div>
        </div>
      </div>
      <div ref={calculationContainerRef} className={styles.page_calculation}>
        <RenderCalculation />
      </div>
    </>
  );
}
