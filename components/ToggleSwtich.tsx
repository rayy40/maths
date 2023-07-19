import React from "react";
import styles from "@/styles/toggle-switch.module.css";

type Props = {
  setIsAdvancedCalcVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ToggleSwtich({ setIsAdvancedCalcVisible }: Props) {
  return (
    <div className={styles.toggle_switch}>
      <input
        onChange={() => setIsAdvancedCalcVisible((v) => !v)}
        type="checkbox"
        className={styles.checkbox}
        name="toggle"
        id="toggle"
      />
      <label className={styles.label} htmlFor="toggle">
        <span className={styles.inner} />
        <span className={styles.switch_handler} />
      </label>
    </div>
  );
}
