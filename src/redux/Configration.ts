import { combineReducers } from "@reduxjs/toolkit"
import AuthSlice from "./slices/AuthSlice"
import ChatSlice from "./slices/ChatSlice"
import PostSlice from "./slices/PostSlice"
import UsersSlice from "./slices/UsersSlice"


const RootReducer = combineReducers({
  AuthSlice: AuthSlice,
  PostSlice: PostSlice,
  UsersSlice: UsersSlice,
  ChatSlice: ChatSlice
})

export type RootState = ReturnType<typeof RootReducer>
export default RootReducer