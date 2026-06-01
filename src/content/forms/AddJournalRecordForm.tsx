import { createFormHook, useStore } from '@tanstack/react-form'
import { z } from 'zod'
import  { fieldContext, formContext } from '@components/form/FormContext'
import TextField from '@components/form/TextField';
import NumberField from '@components/form/NumberField';
import SubmitButton from '@components/form/SubmitButton';
import styles from './AddJournalRecordForm.module.css'
import AutocompleteField from '@components/form/AutocompleteField';
import { useEffect, useState } from 'react'
import { IoIosCloseCircleOutline } from "react-icons/io";
import DateField from '@components/form/DateField';
import useSaveJournal from '@/hooks/useSaveJournal';
import useGetRecord from '@/hooks/useGetRecord';

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

type FormProps = {recordID?: number, closeFormFunc: Function}

export const recordTypes = [
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
    name: "Штукатурные работы",
    unit: "м2"
  },
  {
    id: 4,
    name: "Укладка обоев",
    unit: "м2"
  }
]

function AddJournalRecordForm(props: FormProps) {
  const recordID = props.recordID;

  const { getRecord } = useGetRecord();


  const { mutateAsync: createJournal, isPending: isCreatingJournal } = useSaveJournal();

  const [defaults, setDefaults] = useState({
    date: new Date().toISOString().split("T")[0],
    recordType: 0,
    volume: 0,
    employee: '',
  })

  const form = useAppForm({
    defaultValues: defaults,
    validators: {
      onChange: journalRecordSchema,
    },
    onSubmit: async ({ value }) => {
      const payload = { ...(value as any), id: recordID }
      await createJournal(payload)
      props.closeFormFunc()
    },
  })

  useEffect(() => {
    if (!recordID) return;

    const controller = new AbortController();
    let ignore = false;

    getRecord({ id: recordID, signal: controller.signal })
      .then((data) => {
        if (!ignore) {
          const [day, month, year] = data.date.split('.');
          const result = `${year}-${month}-${day}`;
          setDefaults({
            date: result,
            recordType: data.record_type,
            volume: data.volume,
            employee: data.employee,
          });
        }
      })
      .catch((error) => {
        // Отмена запроса – не ошибка, игнорируем
        if (error.name !== 'CanceledError') {
          // Здесь можно показать ошибку пользователю
          console.error('Ошибка загрузки записи:', error);
        }
      });

    return () => {
      controller.abort();
      ignore = true;
    };
  }, [recordID]);

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