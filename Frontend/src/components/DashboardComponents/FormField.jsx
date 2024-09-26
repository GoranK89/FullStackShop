import styles from "./FormField.module.css";

const FormField = ({ labelText, inputType, inputValue, onChange }) => {
  return (
    <div className={styles.formGroup}>
      <label>{labelText}</label>
      {inputType === "textarea" ? (
        <textarea
          value={inputValue}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          type={inputType}
          value={inputValue}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
};

export default FormField;
