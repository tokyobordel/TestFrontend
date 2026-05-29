import { useFieldContext } from './FormContext';
import styles from './FormStyle.module.css'

function NumberField({ label }: { label: string }) {
  const field = useFieldContext<number>()
  const errors = field.state.meta.errors.map((x: any) => x["message"]);

  return (
    <div className={styles.form_element}>
      <label className={styles.label}>
        <div className={styles.element_label}>{label}</div>
        <input
          value={field.state.value}
          type='number'
          placeholder={label}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            return field.handleChange(isNaN(value) ? 0 : value)
          }}
        />
      </label>
      <div className={styles.error}>{errors.map(x => (x))}</div>
    </div>
  )
}

export default NumberField