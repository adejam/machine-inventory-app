import React, { useEffect, useLayoutEffect } from 'react'
import { Text, View } from 'react-native'
import MachineList from '../../src/components/MachineList'
import type { RouteProp, NavigationProp } from '@react-navigation/native'
import { RootStackParamList } from '../../App'

type CategoryPageNavigationProp = NavigationProp<RootStackParamList, 'CategoryPage'>
type CategoryPageRouteProp = RouteProp<RootStackParamList, 'CategoryPage'>

interface ICategoryPageNavigation {
  route: CategoryPageRouteProp
  navigation: CategoryPageNavigationProp
}

const CategoryPage = ({ route, navigation }: ICategoryPageNavigation) => {
  const { params: {
    category
  } } = route

  useLayoutEffect(() => {
    navigation.setOptions({
      title: category.category_name
    })
  }, [category])

  console.log('category_pagencbnc', category)
  return (
    <View className='p-5 flex-1'>
      <MachineList category={category} />
    </View>
  )
}

export default CategoryPage
