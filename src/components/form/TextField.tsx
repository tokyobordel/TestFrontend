import styles from './FormStyle.module.css'
import { useFieldContext } from './FormContext';

function TextField({ label }: { label: string }) {
  const field = useFieldContext<string>()
  const errors = field.state.meta.errors.map((x: any) => x["message"]);

  return (
    <div className={styles.form_element}>
      <label className={styles.label}>
        <div className={styles.element_label}>{label}</div>
        <input
          placeholder={label}
          value={field.state.value}
          onChange={(e) => {
            return field.handleChange(e.target.value)
          }}
        />
      </label>
      <div className={styles.error}>{errors.map(x => (x))}</div>
    </div>
  )
}

export default TextField