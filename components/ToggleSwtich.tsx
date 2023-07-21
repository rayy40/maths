import React from "react";
import styles from "@/styles/toggle-switch.module.css";

type Props = {
  label: string;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ToggleSwtich({ label, setToggle }: Props) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.65em" }}>
      <p>{label}: </p>
      <div className={styles.toggle_switch}>
        <input
          onChange={() => setToggle((v) => !v)}
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
    </div>
  );
}
