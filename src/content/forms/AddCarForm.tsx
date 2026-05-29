import { observer } from 'mobx-react'
//import styles from './AddCarForm.module.css';
import Brands from "@assets/cars/Brands"
import { createFormHook, /*createFormHookContexts, Field, useForm*/ } from '@tanstack/react-form'
import { z } from 'zod'
import  { fieldContext, formContext } from '@components/form/FormContext'
import TextField from '@components/form/TextField';
import NumberField from '@components/form/NumberField';
import SubmitButton from '@components/form/SubmitButton';
import styles from './AddCarForm.module.css'
import AutocompleteField from '@components/form/AutocompleteField';

const carSchema = z.object({
  brand: z.string("обязательно"),
  model: z.string(),
  year: z.number(),
  mileage: z.number().optional(),
  fuelTankVolume: z.number().optional(),
  VIN: z.string().optional(),
  engine: z.number(),
  transmission: z.number()
})

const { useAppForm } = createFormHook({
  fieldComponents: {
    NumberField,
    TextField,
    AutocompleteField
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
})

type AddCarFormProps = {carID?: number}

function AddCarForm(props: AddCarFormProps) {
  const carID = props.carID;

  const carBrands = Brands.map(x => x["label"])

  // todo запрос к справочнику движков
  const engines: Array<{id: number, model: string}> = [
    /*{"id": 1, "model": "6G72"},
    {"id": 2, "model": "R18A"},
    {"id": 3, "model": "4G69"},
    {"id": 4, "model": "2UZ-FE"},
    {"id": 5, "model": "4G63T"},
    {"id": 6, "model": "2AR-FE"},
    {"id": 7, "model": "4B12"},
    {"id": 8, "model": "G4FC"},
    {"id": 9, "model": "M16-A"},*/
  ]

  // todo запрос к справочнику коробок
  const transmissions: Array<{id: number, model: string}> = [
    /*{"id": 1, "model": "V5A5A"},
    {"id": 2, "model": "4T40"},
    {"id": 3, "model": "A140E"},
    {"id": 4, "model": "U880F"},
    {"id": 5, "model": "UA80E"},
    {"id": 6, "model": "U540E"},
    {"id": 7, "model": "AR25"},
    {"id": 8, "model": "AF23"},
    {"id": 9, "model": "6T30"},*/
  ]

  // todo выполнить запрос на бек по carID и подставить сюда значения
  const defaults = {
    brand: "",
    model: "",
    year: 2025,
    mileage: 0,
    fuelTankVolume: 0,
    VIN: "",
    engine: "",
    transmission: ""
  }

  const form = useAppForm({
    //defaultValues: defaults,
    validators: {
      // Pass a schema or function to validate
      onChange: carSchema,
    },
    onSubmit: ({ value }) => {
      // Do something with form data
      alert(JSON.stringify(value, null, 2))
    },
  })

  return (
    <>
      <form
        id={styles.add_car_form}
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <div>
          <form.AppField
            name="brand"
            children={(field) => <field.AutocompleteField label="Бренд автомобиля" items={carBrands}  />}
          />

          <form.AppField
            name="model"
            children={(field) => <field.TextField label="Модель автомобиля" />}
          />
          <form.AppField
            name="year"
            children={(field) => <field.NumberField label="Модельный год" />}
          />

          <form.AppField
            name="engine"
            children={(field) => <field.AutocompleteField label="Двигатель" items={engines} itemKey={"id"} searchParam={"model"}  />}
          />

          <form.AppField
            name="transmission"
            children={(field) => <field.AutocompleteField label="Трансмиссия" items={transmissions} itemKey={"id"} searchParam={"model"} />}
          />

          <form.AppField
            name="mileage"
            children={(field) => <field.NumberField label="Пробег" />}
          />

          <form.AppField
            name="fuelTankVolume"
            children={(field) => <field.NumberField label="Объем топливного бака" />}
          />

          <form.AppField
            name="VIN"
            children={(field) => <field.TextField label="VIN" />}
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

export default observer(AddCarForm)