"use client";

import React, { useEffect, useMemo, useState, useRef } from "react";
import Matrix from "@/components/Matrix";
import styles from "@/styles/matrix.module.css";
import { InlineMath } from "react-katex";
import RenderMatrix from "@/components/RenderMatrix";
import { scrollToContainer } from "@/lib/Helper";
import { useMatrixContext } from "@/context/MatrixContext";
import MatrixTypes from "@/components/MatrixTypes";
import MatrixOperations from "@/components/MatrixOperations";
import RenderMatrixCalculation from "@/components/RenderMatrixCalculation";
import IncreaseDecreaseCount from "@/components/IncreaseDecreaseCount";
import NumberPad from "@/components/NumberPad";

export default function MatrixPage() {
  let solutionContainerRef = useRef<HTMLDivElement>(null);
  let calculationContainerRef = useRef<HTMLDivElement>(null);
  const [rows, setRows] = useState(2);
  const [columns, setColumns] = useState(2);
  const [matrix, setMatrix] = useState<string[][]>([]);
  const [index, setIndex] = useState({ row: 0, column: 0 });
  const [isMatrixError, setIsMatrixError] = useState(false);
  const [declaration, setDeclaration] = useState<string>("A");
  const { setMatrixHistory } = useMatrixContext();

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
    const updatedMatrix = [...matrix].map((row) =>
      row.map((value) => (value === "" ? "0" : value))
    );
    setMatrixHistory({
      [declaration]: updatedMatrix,
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
      <div
        style={{
          flexDirection:
            typeof window !== undefined && window.innerWidth < 767
              ? "column"
              : "row",
        }}
        className={`page_container ${styles.matrix_page_modified}`}
      >
        <div className={styles.section}>
          <div className={styles.header}>
            <h2 className="title">Matrix Calculator</h2>
            <div className={styles.order_wrapper}>
              <IncreaseDecreaseCount
                label={"Row"}
                setCount={setRows}
                count={rows}
                maxCount={6}
              />
              <IncreaseDecreaseCount
                label={"Column"}
                setCount={setColumns}
                count={columns}
                maxCount={6}
              />
            </div>
          </div>
          <div className={styles.types_container}>
            <h3 className="sub_title">Types:</h3>
            <MatrixTypes
              matrix={matrix}
              setMatrix={setMatrix}
              setDeclaration={setDeclaration}
            />
          </div>
          <div className={styles.numpad_outer_wrapper}>
            <h3 className="sub_title">Number pad:</h3>
            <NumberPad
              type={"matrix"}
              index={index}
              maxRow={rows - 1}
              maxColumn={columns - 1}
              setIndex={setIndex}
              setMatrixValue={setMatrix}
              setIsMatrixError={setIsMatrixError}
            />
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.matrix_container}>
            <div className={styles.declare}>
              <InlineMath math={declaration} />
              <InlineMath math="=" />
            </div>
            <Matrix
              matrix={matrix}
              setIndex={setIndex}
              setMatrix={setMatrix}
              isMatrixError={isMatrixError}
              setIsMatrixError={setIsMatrixError}
            />
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
        <RenderMatrixCalculation />
      </div>
    </>
  );
}
