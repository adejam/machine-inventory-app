import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { createSelector } from 'reselect';
import { IMachine, IMachines } from '../../types';

const initialState: IMachines = {
  machines: []
}

export const machinesSlice = createSlice({
  name: 'machines',
  initialState,
  reducers: {
    addMachine: (state, action) => {
      state.machines = [...state.machines, action.payload]
    },

    updateAMachine: (state, action: PayloadAction<IMachine>) => {
      const updatedMachine = action.payload
      const index = state.machines.findIndex(
        (machine) => machine.machine_id === updatedMachine.machine_id
      )
      if (index !== -1) {
        state.machines[index] = updatedMachine
      }
    },

    removeMachine: (state, action: PayloadAction<string>) => {
      const machineIdToRemove = action.payload;
      const index = state.machines.findIndex(
        (machine) => machine.machine_id === machineIdToRemove
      )
      if (index !== -1) {
        state.machines = state.machines.filter((machine) => machine.machine_id !== machineIdToRemove)
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { addMachine, updateAMachine, removeMachine } = machinesSlice.actions

const id = (_: any, id: string) => id
// const attrId = (_: any, category_id: string) => category_id

export const selectAllMachines = (state: RootState) => state.machines.machines
// export const selectAllMachinesByCategory = (state: RootState) => state.machines.machines

export const selectMachineByCategoryId = createSelector(
  selectAllMachines,
  id,
  (items, categoryId) => items.filter(item => item.category_id === categoryId)
)

// export const selectMachineByCategoryAttrId = createSelector(
//   selectAllMachines,
//   id,
//   (items, attrId) => items.filter(item => item.category_id === categoryId)
// )

export default machinesSlice.reducer
