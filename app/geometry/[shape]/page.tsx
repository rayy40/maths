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

export default function ShapePage({ params: { shape } }: Params) {
  let solutionContainerRef = useRef<HTMLDivElement | null>(null);
  let dropdownRef = useRef(null);
  const [selectedParam, setSelectedParam] = useState("area");
  const [result, setResult] = useState({ value: 0, exp: "" });
  const [modifiedLatexExp, setModifiedLatexExp] = useState("");
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const [parameters, setParameters] = useState<{ [key: string]: number }>({});
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});

  let selectedShape = formula.find((s) => s.name === decodeURIComponent(shape));
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

    setInputValues({});

    if (solutionContainerRef.current) {
      solutionContainerRef.current.style.display = "block";

      scrollToContainer(solutionContainerRef);
    }
  };

  useOutsideAlerter(dropdownRef, setIsDropDownVisible);

  return (
    <>
      <div className={styles.shape_container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{selectedShape?.name}</h2>
          <div
            ref={dropdownRef}
            style={{ color: "#9aa0a6", position: "relative" }}
          >
            Solve for :
            <span
              onClick={() => setIsDropDownVisible((v) => !v)}
              className={styles.dropdown_label}
            >
              {selectedParam} <FaCaretDown />
            </span>
            {isDropDownVisible && (
              <div className={styles.dropDown_container}>
                <ul className={styles.dropDown_list}>
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
                          className={styles.dropDown_list_item}
                        >
                          {key}
                        </li>
                      ))}
                </ul>
              </div>
            )}
          </div>
          <h2 className={styles.formula}>
            <LatexExpression
              expression={selectedShape?.renderFormula?.[selectedParam]}
            />
          </h2>
        </div>
        <div className={styles.content}>
          <div className={styles.input_container}>
            {variables.map((variable, i) => (
              <InputVariable
                setParameters={setParameters}
                name={selectedShape?.parameters?.[variable]}
                variable={variable}
                key={i}
                inputValue={inputValues[variable] || ""}
                setInputValue={setInputValues}
              />
            ))}
          </div>
          <div className={styles.figure}>{selectedShape?.image}</div>
        </div>
        <div className={styles.submit_container}>
          <button onClick={handleSubmitButton} className={styles.submit_button}>
            Submit
          </button>
        </div>
      </div>
      <div ref={solutionContainerRef} className={styles.solution_container}>
        <h2
          style={{ paddingBottom: "1.25em", fontSize: "1.25em" }}
          className={styles.title}
        >
          Solution:{" "}
        </h2>
        <div className={styles.solution_content}>
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
      {/* <div ref={bottomRef}></div> */}
    </>
  );
}
