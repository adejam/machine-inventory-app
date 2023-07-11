import React, { useCallback, useMemo } from 'react'
import { Text, View } from 'react-native'
import { Switch, TextInput } from 'react-native-paper'
import { DatePickerInput } from 'react-native-paper-dates'
import { useDispatch } from 'react-redux'
import { updateAMachine } from '../../store/features/machinesSlice'
import { AttributeFieldType, ICategory, IMachine, IMachineField } from '../../types'

type Props = {
  machineField: IMachineField
  category: ICategory
  machine: IMachine
}

const AttributeField: React.FC<Props> = ({ machine, category, machineField }) => {

  const machineAttribute = category.attributes.find((attr) => attr.attribute_field_id === machineField.category_attribute_id)

  if (!machineAttribute) {
    return null
  }

  const type: AttributeFieldType | undefined = machineAttribute?.type;

  const dispatch = useDispatch();

  const handleMachineAttributeUpdate = useCallback(
    (value: AttributeFieldType) => {
      const updatedMachine = { ...machine }
      const updatedMachineField = {
        ...updatedMachine,
        machine_fields: updatedMachine.machine_fields.map((field) =>
          field.machine_field_id === machineField.machine_field_id ? { ...field, value: value } : field
        ),
      }

      dispatch(updateAMachine({ ...updatedMachineField }))
    },
    [dispatch, machine, machineField.machine_field_id]
  )

  const InputToReturn = useMemo(() => ({
    "text": <TextInput
      mode="outlined"
      label={machineAttribute.field_name}
      value={typeof machineField.value === 'string' ? `${machineField.value}` : ''}
      onChangeText={(value) => {
        const val = value as unknown as AttributeFieldType
        handleMachineAttributeUpdate(val)
      }}
    />,
    "number": <TextInput
      mode="outlined"
      label={machineAttribute.field_name}
      keyboardType="numeric"
      value={typeof machineField.value === 'number' ? `${machineField.value}` : '0'}
      onChangeText={(value) => {
        const numericValue = Number(value.replace(/[^0-9]/g, ''))
        const val = numericValue as unknown as AttributeFieldType
        handleMachineAttributeUpdate(val)
      }}
    />,
    "date": <DatePickerInput
      locale="en"
      label={machineAttribute.field_name}
      value={
        (typeof machineField.value === 'string' ||
          typeof machineField.value === 'object') && Boolean(machineField.value) ? new Date(machineField.value) : undefined}
      onChange={(value) => {
        if (typeof value !== undefined) {
          const val = value as unknown as AttributeFieldType
          handleMachineAttributeUpdate(val)
        }
      }}
      inputMode="start"
    />,
    "checkbox": <View className='flex-row space-x-2 items-center'><Switch
      value={typeof machineField.value === 'boolean' && machineField.value}
      onValueChange={(value) => {
        const val = value as unknown as AttributeFieldType
        handleMachineAttributeUpdate(val)
      }}
    />
      <Text>{machineAttribute.field_name}</Text>
    </View>,
  }), [handleMachineAttributeUpdate, machineField.value, type])

  return (
    <View className='mt-2'>
      {InputToReturn[type as keyof typeof InputToReturn]}
    </View>
  )
}

export default AttributeField
