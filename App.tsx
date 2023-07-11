import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { setupURLPolyfill } from 'react-native-url-polyfill'
import { Provider } from 'react-redux'
import { PaperProvider } from 'react-native-paper'
import DashboardScreen from './screens/DashboardScreen'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './src/store/store'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import 'react-native-gesture-handler'
import ManageCategoriesScreen from './screens/ManageCategoriesScreen'
import CategoryPage from './screens/CategoryPage'
import { en, enGB, registerTranslation } from 'react-native-paper-dates'
import DefaultHeaderRight from './src/components/DefaultHeaderRight/DefaultHeaderRight'


registerTranslation('en', en)
registerTranslation('en-GB', enGB)

// Define your stack navigator's param list
export type RootStackParamList = {
  Dashboard: undefined
  ManageCategories: undefined
  // CategoryPage: undefined
  CategoryPage: { category: ICategory }
}

setupURLPolyfill()

import AsyncStorage from '@react-native-async-storage/async-storage';
import { ICategory } from './src/types'

const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log('AsyncStorage cleared successfully.');
  } catch (error) {
    console.error('Error clearing AsyncStorage:', error);
  }
};

// Call the clearAsyncStorage function wherever you want to clear AsyncStorage
// clearAsyncStorage();
// clearAsyncStorage();
// clearAsyncStorage();

const Stack = createNativeStackNavigator<RootStackParamList>()

const defaultScreenOptions = {
  headerRight: () => <DefaultHeaderRight />,
}

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <NavigationContainer>
            <PaperProvider>
              <Stack.Navigator initialRouteName='Dashboard' screenOptions={defaultScreenOptions}>
                <Stack.Screen name="Dashboard" component={DashboardScreen} />
                <Stack.Screen
                  name="ManageCategories" component={ManageCategoriesScreen}
                  options={{ headerTitle: "Manage Categories" }}
                />
                <Stack.Screen
                  name="CategoryPage" component={CategoryPage}
                />
              </Stack.Navigator>
            </PaperProvider>
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  )
}
