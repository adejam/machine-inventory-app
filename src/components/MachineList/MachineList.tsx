import { nanoid } from '@reduxjs/toolkit'
import React from 'react'
import { FlatList, ScrollView, Text, View } from 'react-native'
import { Button, Text as PaperText } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { addMachine, selectMachineByCategoryId } from '../../store/features/machinesSlice'
import { RootState } from '../../store/store'
import { ICategory, IMachine } from '../../types'
import MachineFormCard from '../MachineFormCard'

type Props = {
  category: ICategory
}

// IMachine {
//   category_id: string
//   machine_id: string
//   machine_fields: {
//     machine_field_id: string
//     [x: string]: string | number | boolean | Date
//   }[]
// }

const MachineList: React.FC<Props> = ({ category }) => {
  const machines = useSelector((state: RootState) => selectMachineByCategoryId(state, category.category_id))
  const dispatch = useDispatch()

  const addNewMachine = () => {
    const machine_id = nanoid()

    const categoryAttributes = [...category.attributes]
    const ccc = categoryAttributes.map(attr => (
      {
        machine_field_id: nanoid(),
        category_attribute_id: attr.attribute_field_id,
        value: ''
      }
    ))

    const values: IMachine = {
      category_id: category.category_id,
      machine_id: machine_id,
      machine_fields: [...ccc]
    }
    dispatch(addMachine(values))
  }

  console.log('loop loop', machines)
  return (
    <View className='mt-5 flex-1'>

      <View className='flex-row justify-between items-center'>
        <PaperText className='font-extrabold text-lg uppercase' variant="titleMedium">{category.category_name}</PaperText>
        <Button
          className='rounded-md'
          mode="contained"
          onPress={addNewMachine}
          uppercase
        >Add new item</Button>
      </View>
      {machines.length > 0 && (
        <FlatList
          className='mt-5'
          data={machines}
          renderItem={({ item }) => (
            <MachineFormCard machine={item} category={category} />
          )}
          keyExtractor={(item) => item.machine_id}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  )
}

export default MachineList
