import { nanoid } from '@reduxjs/toolkit'
import React, { useState } from 'react'
import { View } from 'react-native'
import { Card, TextInput, Button, Menu } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { attributeTypes } from '../../constants'
import { removeCategory, updateACategory } from '../../store/features/categoriesSlice'
import { selectMachineByCategoryId, updateAMachine } from '../../store/features/machinesSlice'
import { RootState } from '../../store/store'
import { AttributeFieldType, ICategory } from '../../types'
import AttributeFieldSection from './AttributeFieldSection'

interface Props {
  category: ICategory
  // categories: ICategory[]
}

const CategoryFormCard: React.FC<Props> = ({ category }) => {
  const [visible, setVisible] = useState(false)
  const [titleFieldVisible, setTitleFieldVisible] = useState(false)

  const machines = useSelector((state: RootState) => selectMachineByCategoryId(state, category.category_id))

  const openMenu = () => setVisible(true)
  const closeMenu = () => setVisible(false)
  const openTitleFieldMenu = () => setTitleFieldVisible(true)
  const closeTitleFieldMenu = () => setTitleFieldVisible(false)

  const dispatch = useDispatch()

  const addNewAttributeToCategory = (type: AttributeFieldType) => {
    if (category) {
      const AttrFieldId = nanoid()
      const newCategory = { ...category }
      const updatedAttributeCategory = {
        ...newCategory,
        attributes: [...newCategory.attributes, { type, field_name: "", attribute_field_id: AttrFieldId }]
      }

      dispatch(updateACategory({ ...updatedAttributeCategory }))

      if (machines.length > 0) {
        const asMachines = [...machines]
        asMachines.forEach(mach => {
          const updatedMachine = { ...mach }
          const updatedMachineField = {
            ...updatedMachine,
            machine_fields: [...updatedMachine.machine_fields, {
              machine_field_id: nanoid(),
              category_attribute_id: AttrFieldId,
              value: ''
            }],
          }

          dispatch(updateAMachine({ ...updatedMachineField }))
        })
      }
    }
  }

  return (
    <View className='sm:max-w-[450px] md:max-w-[500px] w-full'>
      <Card className='bg-white border-0 shadow m-2 '>
        <Card.Title
          title={category?.category_name || 'New Category'}
        />
        <Card.Content>
          {category && (
            <>
              <TextInput
                mode="outlined"
                label="Category name"
                placeholder="Enter category"
                value={category.category_name}
                onChangeText={(value) => {
                  const newCategory = { ...category }
                  dispatch(updateACategory({ ...newCategory, category_name: value }))
                }}
              />

              {category.attributes.map(item => (
                <View className='mt-2' key={item.attribute_field_id}>
                  <AttributeFieldSection category={category} attribute={item} cat_machines={machines} />
                </View>
              ))}
              <View className='mt-5'>

                <View>
                  <Menu
                    visible={titleFieldVisible}
                    onDismiss={closeTitleFieldMenu}
                    anchor={
                      <Button
                        className='rounded-md'
                        mode="contained"
                        onPress={openTitleFieldMenu}
                        uppercase
                      >
                        Title Field: {
                          category.attributes.find(
                            attr => attr.attribute_field_id === category.machine_field_title
                          )?.field_name || 'Unnamed model'}
                      </Button>
                    }
                  >
                    {/* Menu items */}
                    {category.attributes.map(item => (
                      <Menu.Item
                        key={item.attribute_field_id}
                        onPress={() => {
                          const newCategory = { ...category }
                          dispatch(updateACategory({ ...newCategory, machine_field_title: item.attribute_field_id }))
                          closeTitleFieldMenu()
                        }}
                        title={item.field_name} />
                    ))}
                  </Menu>
                </View>
              </View>
              <View className='mt-5 flex-row space-x-2'>
                <View>
                  <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={
                      <Button
                        className='rounded-md'
                        mode="outlined"
                        onPress={openMenu}
                        uppercase
                      >add new field</Button>
                    }
                  >
                    {/* Menu items */}
                    {attributeTypes.map(item => (
                      <Menu.Item
                        key={item}
                        onPress={() => {
                          addNewAttributeToCategory(item)
                          closeMenu()
                        }}
                        title={item} />
                    ))}
                  </Menu>
                </View>
                <Button
                  className='rounded-md'
                  icon="delete"
                  mode="text"
                  onPress={() => dispatch(removeCategory(category.category_id))}
                  uppercase
                >remove</Button>
              </View>
            </>
          )}

        </Card.Content>
      </Card>
    </View>
  )
}

export default CategoryFormCard
