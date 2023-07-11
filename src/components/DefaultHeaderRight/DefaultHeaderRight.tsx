import { NavigationProp, useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { IconButton, Menu } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { RootStackParamList } from '../../../App'
import { selectAllCategories } from '../../store/features/categoriesSlice'

type Props = {}
type NavigationType = NavigationProp<RootStackParamList>

const DefaultHeaderRight: React.FC<Props> = ({ }) => {
  const [visible, setVisible] = useState(false)

  const openMenu = () => setVisible(true)
  const closeMenu = () => setVisible(false)

  const navigation = useNavigation<NavigationType>()

  const categories = useSelector(selectAllCategories)

  return (
    <>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<IconButton icon="menu" size={20} onPress={openMenu} />}
      >
        {/* Menu items */}
        <Menu.Item
          onPress={() => {
            navigation.navigate('Dashboard')
            closeMenu()
          }}
          title="Dashboard"
        />
        {categories && categories.map(category => (
          <Menu.Item
            key={category.category_id}
            onPress={() => {
              navigation.navigate('CategoryPage', { category })
              closeMenu()
            }}
            title={category.category_name}
          />
        ))}
        <Menu.Item
          onPress={() => {
            navigation.navigate('ManageCategories')
            closeMenu()
          }}
          title="Manage Categories" />
      </Menu>
    </>
  )
}

export default DefaultHeaderRight