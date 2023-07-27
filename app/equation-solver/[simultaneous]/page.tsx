"use client";

import React, {
  useCallback,
  useMemo,
  useState,
  useEffect,
  useRef,
} from "react";
import IncreaseDecreaseCount from "@/components/IncreaseDecreaseCount";
import styles from "@/styles/simultaneous.module.css";
import { BlockMath, InlineMath } from "react-katex";
import NumberPad from "@/components/NumberPad";
import { replaceVariables, scrollToContainer } from "@/lib/Helper";
import {
  MultiInputValues,
  MultiInputErrors,
  NestedInputErrors,
} from "@/lib/types";
import useSolveEquation from "@/lib/useSolveEquation";
import { useEquationSolverContext } from "@/context/EquationSolverContext";

export default function SimultaneousLinearEquation() {
  let solutionContainerRef = useRef<HTMLDivElement | null>(null);
  const [variables, setVariables] = useState(2);
  const [activeKey, setActiveKey] = useState("X_1");
  const [activeChildKey, setActiveChildKey] = useState("");
  const [expressions, setExpressions] = useState<{ [key: string]: string }>({});
  const [renderExpressions, setRenderExpressions] = useState<{
    [key: string]: string;
  }>({});
  const [multiInputValues, setMultiInputValues] = useState<MultiInputValues>(
    {}
  );
  const [isMultiInputError, setIsMultiInputError] = useState<MultiInputErrors>(
    {}
  );
  const { getSimultaneousRoots } = useSolveEquation();
  const { simultaneousResult } = useEquationSolverContext();

  const generateExpressions = useCallback(() => {
    const expressionsObj: { [key: string]: string } = {};

    for (let i = 1; i <= variables; i++) {
      let newExpressions = "";
      let coefficients = "a";
      let parameters = "x";
      for (let j = 1; j <= variables + 1; j++) {
        if (j === 1) {
          newExpressions += `${coefficients}_${i}${parameters}`;
        } else if (j === variables + 1) {
          newExpressions += ` = ${coefficients}_${i}`;
        } else {
          newExpressions += ` + ${coefficients}_${i}${parameters}`;
        }
        if (parameters === "z") {
          parameters = "t";
        }
        coefficients = String.fromCharCode(coefficients.charCodeAt(0) + 1);
        parameters = String.fromCharCode(parameters.charCodeAt(0) + 1);
      }

      const key = `X_${i}`;
      expressionsObj[key] = newExpressions;
    }

    setExpressions(expressionsObj);
    setRenderExpressions(expressionsObj);
  }, [variables]);

  useMemo(() => {
    generateExpressions();

    const newObj: MultiInputValues = {};
    const errObj: MultiInputErrors = {};

    for (let i = 0; i < variables; i++) {
      const parentKey = `X_${i + 1}`;
      newObj[parentKey] = {};
      errObj[parentKey] = {};
      for (let j = 0; j < variables + 1; j++) {
        const childKey = String.fromCharCode(97 + j) + `_${i + 1}`;
        newObj[parentKey][childKey] = "";
        errObj[parentKey][childKey] = false;
      }
    }

    setMultiInputValues(newObj);
    setIsMultiInputError(errObj);
  }, [variables, generateExpressions]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    parentKey: string,
    childKey: string
  ) => {
    const { value } = e.target;

    if (!isNaN(Number(value)) || value === "-") {
      const newMultiInputValues = { ...multiInputValues };
      newMultiInputValues[parentKey][childKey] = value;
      setMultiInputValues(newMultiInputValues);

      const newMultiInputErrors = { ...isMultiInputError };
      newMultiInputErrors[parentKey][childKey] = false;
      setIsMultiInputError(newMultiInputErrors);
    } else {
      const newMultiInputErrors = { ...isMultiInputError };
      newMultiInputErrors[parentKey][childKey] = true;
      setIsMultiInputError(newMultiInputErrors);
    }
  };

  useEffect(() => {
    if (
      Object.keys(multiInputValues).length > 0 &&
      Object.keys(expressions).length > 0
    ) {
      const newEq = replaceVariables(
        multiInputValues?.[activeKey],
        expressions?.[activeKey]
      );

      const updatedEq = { ...renderExpressions, [activeKey]: newEq };
      setRenderExpressions(updatedEq);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [multiInputValues, activeKey, expressions]);

  const validateInputValues = () => {
    const updatedErrorState: MultiInputErrors = {};
    let hasErrors = false;

    for (const key in multiInputValues) {
      if (Object.prototype.hasOwnProperty.call(multiInputValues, key)) {
        const inputValues = multiInputValues[key];
        const errorValues: NestedInputErrors = {};

        for (const inputKey in inputValues) {
          if (Object.prototype.hasOwnProperty.call(inputValues, inputKey)) {
            errorValues[inputKey] = inputValues[inputKey] === "";
          }
        }
        const hasEmptyString = Object.values(errorValues).some(
          (value) => value
        );

        if (hasEmptyString) {
          hasErrors = true;
        }

        updatedErrorState[key] = hasEmptyString ? errorValues : {};
      }
    }

    setIsMultiInputError(updatedErrorState);

    return hasErrors;
  };

  const handleSubmit = () => {
    if (validateInputValues()) {
      return;
    }

    if (solutionContainerRef.current) {
      solutionContainerRef.current.style.display = "block";

      scrollToContainer(solutionContainerRef);
    }

    getSimultaneousRoots({ equation: renderExpressions });
  };

  console.log(simultaneousResult);

  return (
    <>
      <div style={{ flexDirection: "row" }} className="page_container">
        <div className={styles.section}>
          <div className={styles.header}>
            <h2 className="title">Equation Solver</h2>
            <div
              style={{
                paddingTop: "1.25em",
              }}
            >
              <IncreaseDecreaseCount
                label={"Variables"}
                setCount={setVariables}
                maxCount={4}
                setMultiInputValues={setMultiInputValues}
                count={variables}
              />
            </div>
          </div>
          <div className={styles.input_values_container}>
            <h3 className="sub_title">Input: </h3>
            <div className={styles.input_values_wrapper}>
              {Object.keys(multiInputValues).map((key, i) => {
                const errorKeys = Object.keys(
                  isMultiInputError?.[key] || {}
                ).filter((inputKey) => isMultiInputError?.[key]?.[inputKey]);
                return (
                  <div key={i} className={styles.input_values}>
                    <div className={styles.key_wrapper}>
                      <InlineMath math={key} />
                    </div>
                    <InlineMath math="=" />
                    <div
                      style={{
                        color: errorKeys.length > 0 ? "red" : "inherit",
                      }}
                      className={styles.brackets}
                    >
                      <InlineMath math="\lbrack" />
                    </div>
                    <div className={styles.input_wrapper}>
                      {Object.entries(multiInputValues?.[key])?.map(
                        ([childKey, val], index) => (
                          <input
                            key={index}
                            autoComplete="off"
                            id={`${key}_${childKey}`}
                            className={`${styles.matrix_input} ${
                              isMultiInputError?.[key]?.[childKey] &&
                              styles.matrix_input_error
                            }`}
                            value={val}
                            placeholder="0"
                            type="text"
                            onClick={() => {
                              setActiveKey(key);
                              setActiveChildKey(childKey);
                            }}
                            onChange={(e) =>
                              handleInputChange(e, key, childKey)
                            }
                          />
                        )
                      )}
                    </div>
                    <div
                      style={{
                        color: errorKeys.length > 0 ? "red" : "inherit",
                      }}
                      className={styles.brackets}
                    >
                      <InlineMath math="\rbrack" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <h3 className="sub_title">Number pad:</h3>
            <NumberPad
              type={"simultaneous"}
              maxColumn={variables}
              setMultiInputValue={setMultiInputValues}
              activeInput={activeKey}
              setActiveInput={setActiveKey}
              activeChildKey={activeChildKey}
              setActiveChildKey={setActiveChildKey}
            />
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.simultaneous_equation_wrapper}>
            {Object.values(renderExpressions).map((exp, index) => (
              <div key={index} className={styles.equation_wrapper}>
                <>
                  {console.log(renderExpressions)}
                  <BlockMath math={exp} />
                </>
              </div>
            ))}
            <div className={styles.button_wrapper}>
              <button
                onClick={handleSubmit}
                className={`submit_button ${styles.submit_btn_modified}`}
              >
                Submit
              </button>
              <button
                onClick={() => setMultiInputValues({})}
                className={`submit_button ${styles.submit_btn_modified}`}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
      <div ref={solutionContainerRef} className={styles.page_solution}>
        <h3 style={{ fontSize: "1.15rem" }} className="sub_title">
          Solution:
        </h3>
        <div className={styles.solution_wrapper}>
          {Object.entries(simultaneousResult).map(([key, value]) => (
            <div className={styles.results_container} key={key}>
              <BlockMath math={key} />
              <BlockMath math={"="} />
              <BlockMath math={value.toString()} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
