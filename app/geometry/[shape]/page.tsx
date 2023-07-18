"use client";

import React, { useState, useRef, useMemo } from "react";
import styles from "@/styles/shape.module.css";
import { formula } from "@/lib/formulas";
import {
  calculateResult,
  countVariables,
  modifyLatexExpression,
  scrollToContainer,
} from "@/lib/Helper";
import InputVariable from "@/components/InputVariable";
import DropDown from "@/components/DropDown";
import { BlockMath } from "react-katex";

type Params = {
  params: { shape: string };
};

export default function ShapePage({ params: { shape } }: Params) {
  let solutionContainerRef = useRef<HTMLDivElement | null>(null);
  const [selectedParam, setSelectedParam] = useState("area");
  const [result, setResult] = useState({ value: 0, exp: "" });
  const [modifiedLatexExp, setModifiedLatexExp] = useState("");
  const [parameters, setParameters] = useState<{ [key: string]: number }>({});
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});

  let selectedShape = formula.find((s) => s.name === decodeURIComponent(shape));
  let items = useMemo(
    () =>
      Object.keys(selectedShape?.renderFormula!).filter(
        (key) => key.toLowerCase() !== selectedParam
      ),
    [selectedShape, selectedParam]
  );
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

  return (
    <>
      <div className={styles.shape_container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{selectedShape?.name}</h2>
          <DropDown
            selectedParam={selectedParam}
            setSelectedParam={setSelectedParam}
            items={items}
          />
          <h2 className={styles.formula}>
            <BlockMath math={selectedShape?.renderFormula?.[selectedParam]!} />
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
          <button onClick={handleSubmitButton} className="submit_button">
            Submit
          </button>
        </div>
      </div>
      <div ref={solutionContainerRef} className={styles.solution_container}>
        <h2
          style={{ paddingBottom: "1.25em", fontSize: "1.25em" }}
          className={styles.title}
        >
          Solution:
        </h2>
        <div className={styles.solution_content}>
          <h3 style={{ height: "60px" }}>
            <BlockMath math={selectedShape?.renderFormula?.[selectedParam]!} />
          </h3>
          <h3 style={{ height: "60px" }}>
            <BlockMath math={modifiedLatexExp} />
          </h3>
          <h3 style={{ height: "60px" }}>
            <BlockMath math={result?.exp} />
          </h3>
        </div>
      </div>
    </>
  );
}
