import React, { useRef } from "react";
import styles from "@/styles/help.module.css";
import { InlineMath } from "react-katex";
import { useOutsideAlerter } from "@/lib/Helper";
import { FaXmark } from "react-icons/fa6";

type Props = {
  setIsHelpVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Help({ setIsHelpVisible }: Props) {
  const helpRef = useRef<HTMLDivElement | null>(null);

  useOutsideAlerter(helpRef, setIsHelpVisible);

  return (
    <div ref={helpRef} className={styles.help_container}>
      <div className={styles.help_wrapper}>
        <div className={styles.header}>
          <h3 className={styles.title}>Guildelines to use:</h3>
          <FaXmark
            onClick={() => setIsHelpVisible(false)}
            className={styles.close_icon}
          />
        </div>
        <div className={styles.content}>
          <p style={{ padding: "1em 0" }}>
            Insert the numbers between the curly braces in case of an advanced
            operation (square root, cube root, sin, cos...)
          </p>
          <ul className={styles.guidelines_list}>
            <p>Examples: </p>
            <li className={styles.examples}>
              If you want to input power to a function, say{" "}
              <span className={styles.expression}>
                <InlineMath math="x^3" />
              </span>
              , then either input <span className={styles.expression}>x^3</span>{" "}
              or click on the{" "}
              <span className={styles.expression}>
                <InlineMath math={"\\square^3"} />
              </span>
              , then enter the value between the curly braces for the value to
              be considered as the power of that substance. You can input power
              of any degree with just putting a{" "}
              <span className={styles.expression}>`^`</span> symbol after the
              element you want a power to.
            </li>
            <li className={styles.examples}>
              If you want to input{" "}
              <span className={styles.expression}>
                <InlineMath math="\sqrt{x+2}" />
              </span>{" "}
              , then either input{" "}
              <span className={styles.expression}>{`\\sqrt{x+2}`}</span> or
              click on the{" "}
              <span className={styles.expression}>
                <InlineMath math={"\\sqrt{\\square}"} />
              </span>{" "}
              then enter the value between the curly braces for the value to be
              considered as inside the square root. Same goes for other roots.
            </li>
            <li className={styles.examples}>
              If you want to input trigonometric functions, say
              <span className={styles.expression}>
                <InlineMath math="\sin({x^2})" />
              </span>
              , then either input{" "}
              <span className={styles.expression}>{`\\sin({x^2})`}</span> or
              click on the{" "}
              <span className={styles.expression}>
                <InlineMath math={"sin()"} />
              </span>
              , then enter the value between the curly braces for the value to
              be considered as inside{" "}
              <span className={styles.expression}>
                <InlineMath math="\sin" />
              </span>{" "}
              function. Same goes for other trigonometric functions.
            </li>
            <li className={styles.examples}>
              If you want to input logarathmic functions, say{" "}
              <span className={styles.expression}>
                <InlineMath math="\log({x})" />
              </span>{" "}
              , then either input{" "}
              <span className={styles.expression}>{`\log({x})`}</span> or click
              on the{" "}
              <span className={styles.expression}>
                <InlineMath math={"\\log()"} />
              </span>
              , then enter the value between the curly braces for the value to
              be considered as inside the{" "}
              <span className={styles.expression}>
                <InlineMath math="\log" />
              </span>
              function. Same goes for{" "}
              <span className={styles.expression}>
                <InlineMath math="\ln" />
              </span>
              .
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
