import { useFieldContext } from '@components/form/FormContext';
import styles from './FormStyle.module.css';
import { useState, useEffect } from 'react';

function AutocompleteField({
  label,
  items,
  itemKey,
  searchParam,
}: {
  label: string;
  items: Array<any>;
  itemKey?: number | string;
  searchParam?: string;
}) {
  const field = useFieldContext<number | string | undefined>();

  const [filteredItems, setFilteredItems] = useState<Array<any>>([]);
  const [visibleValue, setVisibleValue] = useState<string>('');

  // Синхронизация видимого текста с реальным значением поля
  useEffect(() => {
    const currentVal = field.state.value;
    if (currentVal !== undefined && currentVal !== null) {
      const selectedItem = itemKey
        ? items.find((item) => item[itemKey] === currentVal)
        : items.find((item) => item === currentVal);
      if (selectedItem) {
        setVisibleValue(searchParam ? selectedItem[searchParam] : selectedItem);
      } else {
        setVisibleValue('');
      }
    } else {
      setVisibleValue('');
    }
  }, [field.state.value, items, itemKey, searchParam]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setVisibleValue(val);

    if (val) {
      const searched = items.filter((x) =>
        searchParam
          ? String(x[searchParam]).toUpperCase().includes(val.toUpperCase())
          : String(x).toUpperCase().includes(val.toUpperCase())
      );
      setFilteredItems(searched);
    } else {
      setFilteredItems([]);
    }

    // При любом ручном вводе сбрасываем выбранное значение
    field.handleChange(undefined as any);
  };

  const handleSelectItem = (item: any) => {
    const newValue = itemKey ? item[itemKey] : item;
    const newVisible = searchParam ? item[searchParam] : item;

    setVisibleValue(newVisible);
    setFilteredItems([]);
    field.handleChange(newValue);
  };
  
  console.log(filteredItems)

  return (
    <div className={styles.form_element}>
      <label className={styles.label}>
        <div className={styles.element_label}>{label}</div>
        <div style={{ width: '100%' }}>
          <input
            type="text"
            value={visibleValue}
            placeholder={label}
            onChange={handleInputChange}
          />
          {filteredItems.length > 0 && (
            <div className={styles.autocomplete_items}>
              <div className={styles.autocomplete_item_list}>
                {filteredItems.map((item, index) => {
                  const displayText = searchParam
                    ? item[searchParam]
                    : item;
                  return (
                    <div
                      onClick={() => handleSelectItem(item)}
                      className={styles.item_of_list}
                      key={index}
                    >
                      {displayText}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </label>
      <div className={styles.error}>
        {field.state.meta.isValid
          ? ''
          : field.state.meta.errors[0].message}
      </div>
    </div>
  );
}

export default AutocompleteField;