"use client";

import React, { useState, useRef } from "react";
import styles from "@/styles/shape.module.css";
import { formula } from "@/lib/formulas";
import {
  calculateResult,
  countVariables,
  modifyLatexExpression,
  scrollToContainer,
  useOutsideAlerter,
} from "@/lib/Helper";
import LatexExpression from "@/components/LatexExpression";
import InputVariable from "@/components/InputVariable";
import { FaCaretDown } from "react-icons/fa6";

type Params = {
  params: { shape: string };
};

export default function Shapes({ params: { shape } }: Params) {
  let bottomRef = useRef(null);
  let dropdownRef = useRef(null);
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const [selectedParam, setSelectedParam] = useState("area");
  const [parameters, setParameters] = useState<{
    [key: string]: number;
  }>({});
  const [modifiedLatexExp, setModifiedLatexExp] = useState("");
  const [result, setResult] = useState({ value: 0, exp: "" });

  let selectedShape = formula.find((s) => s.name === shape);
  let { variables } = countVariables(
    selectedShape?.renderFormula?.[selectedParam]
  );

  const handleSubmitButton = () => {
    const { value, exp } = calculateResult(
      variables,
      selectedShape?.calculateFormula?.[selectedParam]!,
      parameters,
      selectedShape?.renderFormula?.[selectedParam]!
    );

    setResult({ value, exp });

    setModifiedLatexExp(
      modifyLatexExpression(
        parameters,
        selectedShape?.modifiedFormula?.[selectedParam]!
      )
    );

    scrollToContainer(bottomRef.current);
  };

  useOutsideAlerter(dropdownRef, setIsDropDownVisible);

  return (
    <>
      <div className={styles.shapeContainer}>
        <div className={styles.shapeHeader}>
          <h2 className={styles.shapeTitle}>{selectedShape?.name}</h2>
          <div
            ref={dropdownRef}
            style={{ color: "#9aa0a6", position: "relative" }}
          >
            Solve for :
            <span
              onClick={() => setIsDropDownVisible((v) => !v)}
              className={styles.shapeDropdown}
            >
              {selectedParam} <FaCaretDown />
            </span>
            {isDropDownVisible && (
              <div className={styles.dropDownContainer}>
                <ul className={styles.dropDownList}>
                  {selectedShape &&
                    Object.keys(selectedShape.renderFormula)
                      .filter((key) => key.toLowerCase() !== selectedParam)
                      .map((key, i) => (
                        <li
                          onClick={() => {
                            setSelectedParam(key);
                            setIsDropDownVisible((v) => !v);
                          }}
                          key={i}
                          className={styles.dropDownListItem}
                        >
                          {key}
                        </li>
                      ))}
                </ul>
              </div>
            )}
          </div>
          <h2 className={styles.shapeFormula}>
            <LatexExpression
              expression={selectedShape?.renderFormula?.[selectedParam]}
            />
          </h2>
        </div>
        <div className={styles.shapeContent}>
          <div className={styles.shapeInputContainer}>
            {variables.map((variable, i) => (
              <InputVariable
                setParameters={setParameters}
                name={selectedShape?.parameters?.[variable]}
                variable={variable}
                key={i}
              />
            ))}
          </div>
          <div className={styles.shapeImg}>{selectedShape?.image}</div>
        </div>
        <div className={styles.shapeSubmitContainer}>
          <button onClick={handleSubmitButton} className={styles.shapeButton}>
            Submit
          </button>
        </div>
      </div>
      {result.exp && (
        <div className={styles.solutionContainer}>
          <h2 className={styles.solutionTitle}>Solution: </h2>
          <div className={styles.solutionContent}>
            <h3 style={{ height: "60px" }}>
              <LatexExpression
                expression={selectedShape?.renderFormula?.[selectedParam]}
              />
            </h3>
            <h3 style={{ height: "60px" }}>
              <LatexExpression expression={modifiedLatexExp} />
            </h3>
            <h3 style={{ height: "60px" }}>
              <LatexExpression expression={result?.exp} />
            </h3>
          </div>
        </div>
      )}
      <div ref={bottomRef}></div>
    </>
  );
}
