import { configureStore } from '@reduxjs/toolkit'
import RootReducer from './Configration'

const store = configureStore({
  reducer: RootReducer,

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
})

export default store