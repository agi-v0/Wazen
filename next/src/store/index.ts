import { configureStore } from '@reduxjs/toolkit'
import calculatorReducer from './calculator'
export type AppStore = ReturnType<typeof store>

export const store = () => {
  return configureStore({
    reducer: {
      calculator: calculatorReducer,
    },
  })
}