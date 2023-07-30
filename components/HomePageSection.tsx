import React from "react";
import styles from "@/styles/homepage.module.css";
import { BlockMath, InlineMath } from "react-katex";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";

type Props = {
  link: string;
  title: string;
  description: string;
  expression: string;
};

export default function HomePageSection({
  link,
  title,
  description,
  expression,
}: Props) {
  return (
    <div className={styles.type_wrapper}>
      <div className={styles.type_details_wrapper}>
        <div className={styles.type_details}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </div>
        <div
          style={{ fontSize: link === `/geometry` ? "4rem" : "" }}
          className={styles.type_img_wrapper}
        >
          {link === `/geometry` ? (
            <InlineMath math={expression} />
          ) : (
            <BlockMath math={expression} />
          )}
        </div>
      </div>
      <div className={styles.type_go_to_wrapper}>
        <Link className="link" href={link}>
          <button className={`submit_button ${styles.go_to_button}`}>
            Go To <FaArrowRightLong />
          </button>
        </Link>
      </div>
    </div>
  );
}
