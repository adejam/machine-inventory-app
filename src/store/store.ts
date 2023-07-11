import { combineReducers, configureStore } from '@reduxjs/toolkit'
import categoriesSlice from './features/categoriesSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistReducer, persistStore } from 'redux-persist'
import machinesSlice from './features/machinesSlice';

const persistConfig = {
  storage: AsyncStorage,
  key: 'root',
};

const rootReducer = combineReducers({
  categories: categoriesSlice,
  machines: machinesSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false, // Disable serialization warning for AsyncStorage
    });
  },
});

const persistor = persistStore(store);

export { store, persistor };

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
