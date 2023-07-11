import React from 'react'
import { Text, View } from 'react-native'
import { Button, Card, TextInput } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { removeMachine } from '../../store/features/machinesSlice'
import { IAttribute, ICategory, IMachine } from '../../types'
import AttributeField from '../AttributeField/AttributeField'

type Props = {
  machine: IMachine
  category: ICategory
}

const MachineFormCard: React.FC<Props> = ({ machine, category }) => {
  const dispatch = useDispatch()

  const getMachineTitle = () => {
    const attribute_field_id = category.attributes.find(attr => attr.attribute_field_id === category.machine_field_title)?.attribute_field_id
    if (!attribute_field_id) { return 'Unnamed model' }

    const text = machine.machine_fields.find(field => field.category_attribute_id === attribute_field_id)?.value

    if (typeof text !== 'string') {
      return 'Please, use a text field'
    }
    if (!text) { return 'Unnamed model' }
    return text
  }

  return (
    <View className='sm:max-w-[450px] md:max-w-[500px] w-full'>
      <Card className='bg-white border-0 shadow m-2'>
        <Card.Title
          className='font-bold'
          title={<Text className='uppercase'>{getMachineTitle()}</Text>}// should be the title props in the category object
        />
        <Card.Content>
          {machine.machine_fields.map(mac => (
            <AttributeField
              key={mac.machine_field_id}
              machineField={mac}
              category={category}
              machine={machine}
            />
          ))}
          <View className='flex-row mt-2'>
            <Button
              className='rounded-md'
              icon="delete"
              mode="text"
              onPress={() => dispatch(removeMachine(machine.machine_id))}
              uppercase
            >remove</Button>
          </View>
        </Card.Content>
      </Card>
    </View>
  )
}

export default MachineFormCard
