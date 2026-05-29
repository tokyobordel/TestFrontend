import  { useFieldContext  } from '@components/form/FormContext'
import styles from './FormStyle.module.css'
import { useState } from 'react'

function AutocompleteField({ label, items, itemKey, searchParam }: { label: string, items: Array<any>, itemKey?: number | string, searchParam?: string }) {
    /**
     * Компонент для создания текстового инпута с автокомплитом. Использует Tanstack forms. Валидатор - zod.
     * Для использования требуется тип number или string исходного поля 
     * 
     * @param label - отображаемое имя инпута
     * @param items - массив сущностей
     * @param itemKey - ключ (обычно уникальный ID) сущности
     * @param searchParam - параметр, по которому сущность ищется в списке
     */
    const field = useFieldContext<number | string | undefined>()
    const [filteredItems, setFilteredItems] = useState<Array<any>>([])
    const [visibleValue, setVisibleValue] = useState<string>(""); 
    return (
        <div className={styles.form_element}>
            <label className={styles.label}>
                <div className={styles.element_label}>{label}</div>
                <div>
                <input
                    value={visibleValue}
                    placeholder={label}
                    onInput={(e) => {
                        const value = e.currentTarget.value;
                        if(value) {
                            const searchedItems = items.filter(x => searchParam 
                                ? x[searchParam].toUpperCase().includes(value.toUpperCase()) 
                                : x.toUpperCase().includes(value.toUpperCase()))
                            setFilteredItems(searchedItems)
                        } else {
                            setFilteredItems([])
                        }
                    }}
                    onBlur={() => {
                        const visibleData = itemKey 
                            ? filteredItems.filter(x => x[itemKey] == field.state.value)[0] 
                            : filteredItems.filter(x => x == field.state.value)[0];
                        if(filteredItems.length == 0) {
                            if(visibleData && itemKey) setVisibleValue(searchParam ? visibleData[searchParam] : visibleData)
                        }
                    }}
                    onChange={(e) => {
                        setVisibleValue(e.target.value)
                        if(itemKey) {
                            field.handleChange(undefined)
                        } else field.handleChange(e.target.value && e.target.value != "" ? e.target.value : undefined)
                    }}
                />
                {filteredItems.length != 0 ? <div className={styles.autocomplete_items}>
                    <div className={styles.autocomplete_item_list}>
                    {Object.entries(filteredItems).map((item, index) => {
                        const visibleData = searchParam ? filteredItems[index][searchParam] : filteredItems[index]
                        return (<div onClick={() => {
                            setFilteredItems([])
                            setVisibleValue(visibleData)
                            return field.handleChange(itemKey ? filteredItems[index][itemKey] : filteredItems[index])
                        }} className={styles.item_of_list} key={index}>{visibleData}</div>)
                    })}</div>
                </div> : undefined}
                </div>
            </label>
            <div className={styles.error}>{field.state.meta.isValid ? "" : "Поле обязательно"}</div>
        </div>
    )
}

export default AutocompleteField