import React from 'react'
import { Dimensions, FlatList, Text, View } from 'react-native'
import { Button, Card } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { selectAllCategories } from '../../src/store/features/categoriesSlice'
import type { RouteProp, NavigationProp } from '@react-navigation/native'
import { RootStackParamList } from '../../App'
import MachineList from '../../src/components/MachineList'

type DashboardScreenNavigationProp = NavigationProp<RootStackParamList, 'Dashboard'>
type DashboardScreenRouteProp = RouteProp<RootStackParamList, 'Dashboard'>

interface IDashboardScreenNavigation {
  route: DashboardScreenRouteProp
  navigation: DashboardScreenNavigationProp
}

const DashboardScreen = ({ navigation }: IDashboardScreenNavigation) => {
  const categories = useSelector(selectAllCategories)
  return (
    <View className='flex-1 p-5'>
      {categories.length > 0 ? (
        <FlatList
          className=''
          data={categories}
          renderItem={({ item }) => (
            <MachineList category={item} />
          )}
          keyExtractor={(item) => item.category_id}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View className='bg-white h-full'>
          <View className='my-auto items-center'>
            <Text className='mb-5'>No categories found</Text>
            <Button
              mode='contained'
              onPress={() => navigation.navigate('ManageCategories')}
            >Add a category</Button>
          </View>
        </View>
      )}
    </View>
  )
}

export default DashboardScreen
