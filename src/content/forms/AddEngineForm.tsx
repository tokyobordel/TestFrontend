import { observer } from 'mobx-react'
//import styles from './AddCarForm.module.css';
import Brands from "@assets/cars/Brands"
import { createFormHook, useStore } from '@tanstack/react-form'
import { z } from 'zod'
import  { fieldContext, formContext } from '@components/form/FormContext'
import TextField from '@components/form/TextField';
import NumberField from '@components/form/NumberField';
import SubmitButton from '@components/form/SubmitButton';
import styles from './AddCarForm.module.css'
import AutocompleteField from '@components/form/AutocompleteField';
import axios from 'axios'
import useAxios from 'axios-hooks'
import { useEffect } from 'react'

const engineSchema = z.object({
  model: z.string(),
  displacement: z.number(),
  manufacturer: z.string(),
  power: z.number(),
  cylindersAmount: z.number().nonnegative(),
  engineConfigType: z.number(),
  superchargerType: z.number(),
  torque: z.number().optional(),
  info: z.string().optional(),
  engineType: z.number(),
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

type AddEngineFormProps = {engineID?: number}

function AddEngineForm(props: AddEngineFormProps) {
  const engineID = props.engineID;

  const carBrands = Brands.map(x => x["label"])

  const engineTypes: Array<EnumType> = getEnums(requests.get_engine_types);

  const engineConfigTypes: Array<EnumType> = getEnums(requests.get_engine_config_types);
  
  const superchargerTypes: Array<EnumType> = getEnums(requests.get_supercharger_types);

  // todo выполнить запрос на бек по engineID и подставить сюда значения
  const defaults = {
    model: "",
    displacement: 0.0,
    manufacturer: "",
    power: 0.0,
    torque: 0.0,
    info: "",
    engineType: 0,
    cylindersAmount: 1,
  }

  const form = useAppForm({
    //defaultValues: defaults,
    validators: {
      // Pass a schema or function to validate
      onChange: engineSchema,
    },
    onSubmit: ({ value }) => {
      // Do something with form data
      alert(JSON.stringify(value, null, 2))
    },
  })

  const engineConfigType = useStore(form.store, (state) => (state.values as {engineConfigType: number}).engineConfigType )

  useEffect(() => {
    if(engineConfigTypes) {
      if(engineConfigType == engineConfigTypes.filter(x => x.type == "ROTARY")[0]["value"]) {
        form.setFieldValue("cylindersAmount", 0)
      } else if(form.getFieldValue("cylindersAmount") == 0) {
        form.setFieldValue("cylindersAmount", 1)
      }
    }
    console.log(form.state)
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
            name="manufacturer"
            children={(field) => <field.AutocompleteField label="Производитель мотора" items={carBrands}  />}
          />

          <form.AppField
            name="model"
            children={(field) => <field.TextField label="Модель мотора" />}
          />

          <form.AppField
            name="displacement"
            children={(field) => <field.NumberField label="Рабочий объем" />}
          />

          <form.AppField
            name="power"
            children={(field) => <field.NumberField label="Мощность" />}
          />
          
          {engineConfigTypes && engineConfigType != engineConfigTypes.filter(x => x.type == "ROTARY")[0]["value"] ? <form.AppField
            name="cylindersAmount"
            children={(field) => <field.NumberField label="Число цилиндров" />}
          /> : null}

          <form.AppField
            name="engineConfigType"
            children={(field) => <field.AutocompleteField label="Компоновка двигателя" items={engineConfigTypes} itemKey={"value"} searchParam={"typeVisible"}  />}
          />

          <form.AppField
            name="superchargerType"
            children={(field) => <field.AutocompleteField label="Турбонаддув" items={superchargerTypes} itemKey={"value"} searchParam={"typeVisible"}  />}
          />

          <form.AppField
            name="engineType"
            children={(field) => <field.AutocompleteField label="Тип двигателя" items={engineTypes} itemKey={"value"} searchParam={"typeVisible"}  />}
          />

          <form.AppField
            name="torque"
            children={(field) => <field.NumberField label="Крутящий момент" />}
          />

          <form.AppField
            name="info"
            children={(field) => <field.TextField label="Комментарий" />}
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

export default observer(AddEngineForm)