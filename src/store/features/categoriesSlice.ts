import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { createSelector } from 'reselect';
import { ICategories, ICategory } from '../../types';

export interface CategoriesState {
  categories: ICategory[]
}

const initialState: ICategories = {
  categories: []
}

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addToCategory: (state, action) => {
      state.categories = [...state.categories, action.payload]
    },

    updateACategory: (state, action: PayloadAction<ICategory>) => {
      const updatedCategory = action.payload
      const index = state.categories.findIndex(
        (category) => category.category_id === updatedCategory.category_id
      )
      if (index !== -1) {
        state.categories[index] = updatedCategory
      }
    },

    removeCategory: (state, action: PayloadAction<string>) => {
      const categoryIdToRemove = action.payload;
      const index = state.categories.findIndex(
        (category) => category.category_id === categoryIdToRemove
      )
      if (index !== -1) {
        state.categories = state.categories.filter((category) => category.category_id !== categoryIdToRemove)
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToCategory, updateACategory, removeCategory } = categoriesSlice.actions

const selectCategoryId = (_: any, category_id: string) => category_id

export const selectAllCategories = (state: RootState) => state.categories.categories

export const selectCategoryById = createSelector(
  selectAllCategories,
  selectCategoryId,
  (items, category_id) => items.find(item => item.category_id === category_id)
)

// export const selectCategoryById = (categoryId: string) =>
//   createSelector(
//     selectAllCategories,
//     (categories) => categories.find((category) => category.category_id === categoryId)
//   );


export default categoriesSlice.reducer
