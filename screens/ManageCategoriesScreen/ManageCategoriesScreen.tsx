import React from 'react'
import { Dimensions, FlatList, View } from 'react-native'
import { Button } from 'react-native-paper'
import { ScrollView, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { addToCategory, selectAllCategories } from '../../src/store/features/categoriesSlice'
import { nanoid } from '@reduxjs/toolkit'
import { ICategory } from '../../src/types'
import CategoryFormCard from '../../src/components/CategoryFormCard'

const ManageCategoriesScreen = () => {
  const categories = useSelector(selectAllCategories)
  const dispatch = useDispatch()
  const addNewCategory = () => {
    const category_id = nanoid()
    const attribute_field_id = nanoid()
    const values: ICategory = {
      category_name: '',
      attributes: [{ field_name: '', attribute_field_id, type: "text" }],
      machine_field_title: attribute_field_id,
      category_id
    }
    dispatch(addToCategory(values))
  }

  return (
    <View className='flex-1  p-3'>
      <View className='flex-1' >
        {categories.length < 1 ? (
          <Text className='text-center text-gray-500'>No categories to display</Text>
        ) : (
          <FlatList
            className='flex-1 mb-6'
            numColumns={Dimensions.get('window').width > 900 ? 2 : 0}
            key={'_'}
            data={categories}
            renderItem={({ item }) => (
              <CategoryFormCard category={item} />
            )}
            keyExtractor={(item) => item.category_id}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      <View className='mb-5'>
        <Button
          mode='contained'
          onPress={addNewCategory}
        >Add a category</Button>
      </View>
    </View>
  )
}

export default ManageCategoriesScreen
