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
  date: z.date(),
  recordType: z.number(),
  employee: z.string(),
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
    date: "",
    recordType: 0,
    employee: "",
  }

  const form = useAppForm({
    //defaultValues: defaults,
    validators: {
      // Pass a schema or function to validate
      onChange: journalRecordSchema,
    },
    onSubmit: ({ value }) => {
      // Do something with form data
      alert(JSON.stringify(value, null, 2))
    },
  })

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
            children={(field) => <field.NumberField label="Вид работ" />}
          />

          <form.AppField
            name="employee"
            children={(field) => <field.NumberField label="ФИО исполнителя" />}
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