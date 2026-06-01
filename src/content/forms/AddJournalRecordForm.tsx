import { createFormHook, useStore } from '@tanstack/react-form'
import { z } from 'zod'
import  { fieldContext, formContext } from '@components/form/FormContext'
import TextField from '@components/form/TextField';
import NumberField from '@components/form/NumberField';
import SubmitButton from '@components/form/SubmitButton';
import styles from './AddJournalRecordForm.module.css'
import AutocompleteField from '@components/form/AutocompleteField';
import { useEffect } from 'react'
import { IoIosCloseCircleOutline } from "react-icons/io";
import DateField from '@components/form/DateField';

const journalRecordSchema = z.object({
  date: z.iso.date("Обязательно для заполнения"),
  recordType: z.number("Обязательно для заполнения"),
  volume: z.number("Обязательно для заполнения"),
  employee: z.string("Обязательно для заполнения").nonempty("Обязательно для заполнения"),
})

const { useAppForm } = createFormHook({
  fieldComponents: {
    NumberField,
    TextField,
    AutocompleteField,
    DateField
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
})

type AddEngineFormProps = {engineID?: number, closeFormFunc: Function}

function AddJournalRecordForm(props: AddEngineFormProps) {
  const engineID = props.engineID;

  // todo выполнить запрос на бек по engineID и подставить сюда значения
  const defaults = {
    date: new Date().toISOString().split("T")[0],
    recordType: 0,
    volume: 0,
    employee: '',
  }

  const form = useAppForm({
    defaultValues: defaults,
    validators: {
      onChange: journalRecordSchema,
    },
    onSubmit: ({ value }) => {
      alert(JSON.stringify(value, null, 2))
    },
  })

  const recordTypes = [
    {
      id: 0,
      name: "Монтаж опалубки",
      unit: "м2"
    },
    {
      id: 1,
      name: "Кладка перегородок",
      unit: "м2"
    },
    {
      id: 2,
      name: "Замешивание раствора",
      unit: "м3"
    },
    {
      id: 3,
      name: "Закупка инструмента",
      unit: "шт"
    },
    {
      id: 4,
      name: "Закупка материалов",
      unit: "шт"
    }
  ]

  useEffect(() => {
    /* if(engineConfigTypes) {
      if(engineConfigType == engineConfigTypes.filter(x => x.type == "ROTARY")[0]["value"]) {
        form.setFieldValue("cylindersAmount", 0)
      } else if(form.getFieldValue("cylindersAmount") == 0) {
        form.setFieldValue("cylindersAmount", 1)
      }
    } */
    console.log(form.state)
  })

  return (
    <>
      <form
        id={styles.add_journal_record_form}
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <div>
          <IoIosCloseCircleOutline size={25} style={{cursor: "pointer"}} onClick={() => props.closeFormFunc()} />

          <form.AppField
            name="date"
            children={(field) => <field.DateField label="Дата выполнения" />}
          />

          <form.AppField
            name="recordType"
            children={(field) => <field.AutocompleteField items={recordTypes} itemKey={"id"} searchParam={"name"} label="Вид работ" />}
          /> 

          {/* <form.AppField
            name="recordType"
            children={(field) => <field.NumberField label="Вид работ" />}
          /> */}

          <form.AppField
            name="volume"
            children={(field) => <field.NumberField label="Объем работы" />}
          />

          <form.AppField
            name="employee"
            children={(field) => <field.TextField label="ФИО исполнителя" />}
          />

        </div>

        <div>
          <form.AppForm>
            <form.SubmitButton label='Добавить' />
          </form.AppForm>
        </div>
      </form>
    </>
  )
}

export default AddJournalRecordForm