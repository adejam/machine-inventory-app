import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { Button, IconButton, Menu, Text as PaperText, TextInput } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { attributeTypes } from '../../../constants'
import { updateACategory } from '../../../store/features/categoriesSlice'
import { updateAMachine } from '../../../store/features/machinesSlice'
import { IAttribute, ICategory, IMachine } from '../../../types'

type Props = {
  category: ICategory
  attribute: IAttribute
  cat_machines: IMachine[]
}

const AttributeFieldSection: React.FC<Props> = ({ category, attribute, cat_machines }) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)

  const openMenu = () => setVisible(true)
  const closeMenu = () => setVisible(false)

  const handleCategoryAttributeUpdate = (value: string, input_name: string) => {
    const newCategory = { ...category }
    const updatedAttributeCategory = {
      ...newCategory, attributes: newCategory.attributes.map((attr) =>
        attribute.attribute_field_id === attr.attribute_field_id ? { ...attr, [input_name]: value } : attr
      ),
    }

    dispatch(updateACategory({ ...updatedAttributeCategory }))

    if (cat_machines.length > 0 && input_name === "type") {
      console.log('hgjhjhjhj hjhj hhjb bjjb')
      const asMachines = [...cat_machines]
      asMachines.forEach(mach => {
        const updatedMachine = { ...mach }
        const updatedMachineField = {
          ...updatedMachine,
          machine_fields: [...updatedMachine.machine_fields.map(field => {
            if (field.category_attribute_id === attribute.attribute_field_id) {
              return { ...field, value: '' }
            }
            return field
          })],
        }

        dispatch(updateAMachine({ ...updatedMachineField }))
      })
    }
  }

  const handleRemoveAttribute = () => {
    if (category.attributes.length > 1) {
      const newCategory = { ...category }
      const updatedAttributeCategory = {
        ...newCategory, attributes: newCategory.attributes.filter((attr) =>
          attribute.attribute_field_id !== attr.attribute_field_id
        ),
        machine_field_title: attribute.attribute_field_id === newCategory.machine_field_title ? '' : newCategory.machine_field_title
      }

      dispatch(updateACategory({ ...updatedAttributeCategory }))
    }
  }

  return (
    <View className='flex-row items-center space-x-2'>
      <TextInput
        className='flex-1'
        mode="outlined"
        label="Field"
        placeholder="Enter field"
        value={category.attributes.find(attr => attr.attribute_field_id === attribute.attribute_field_id)?.field_name}
        onChangeText={(value) => handleCategoryAttributeUpdate(value, 'field_name')
        }
      />
      <View>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Button mode='text' className='text-blue-400 uppercase font-bold' onPress={openMenu}>
              {attribute.type}
            </Button>
          }
        >
          {/* Menu items */}
          {attributeTypes.map(item => (
            <Menu.Item
              key={item}
              onPress={() => {
                handleCategoryAttributeUpdate(item, 'type')
                closeMenu()
              }}
              title={item} />
          ))}
        </Menu>
      </View>

      <IconButton
        icon="delete"
        size={25}
        onPress={handleRemoveAttribute}
      />
    </View>
  )
}

export default AttributeFieldSection
