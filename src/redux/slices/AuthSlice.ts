import { createSlice } from '@reduxjs/toolkit'
import { facebookLogin, googleLogin, LoginUser, SignUpUser } from '../actions/AuthActions';
import { RootState } from '../Configration';


const initialState = {
  isLoginLoading: false,
  isSignUpLoading: false,
  isLogOutLoading: false,
  isGmailLoading: false,
  isFBLoading: false,

}


let AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    changeAuthProps: (state: any, { payload: { prop, value } }) => {
      state[prop] = value
    }
  },
  extraReducers: (builder) => {
    builder.addCase(LoginUser.pending, (state) => {
      state.isLoginLoading = true
    })
    builder.addCase(LoginUser.fulfilled, (state) => {
      state.isLoginLoading = false
    })
    builder.addCase(LoginUser.rejected, (state) => {
      state.isLoginLoading = false
    })

    builder.addCase(SignUpUser.pending, (state) => {
      state.isSignUpLoading = true
    })
    builder.addCase(SignUpUser.fulfilled, (state) => {
      state.isSignUpLoading = false
    })
    builder.addCase(SignUpUser.rejected, (state) => {
      state.isSignUpLoading = false
    })

    builder.addCase(facebookLogin.pending, (state) => {
      state.isFBLoading = true
    })
    builder.addCase(facebookLogin.fulfilled, (state) => {
      state.isFBLoading = false
    })
    builder.addCase(facebookLogin.rejected, (state) => {
      state.isFBLoading = false
    })

    builder.addCase(googleLogin.pending, (state) => {
      state.isGmailLoading = true
    })
    builder.addCase(googleLogin.fulfilled, (state) => {
      state.isGmailLoading = false
    })
    builder.addCase(googleLogin.rejected, (state) => {
      state.isGmailLoading = false
    })
  }
});

export const { changeAuthProps } = AuthSlice.actions

export default AuthSlice.reducer


export const checkGmailLoading = (state: RootState) => state.AuthSlice.isGmailLoading
export const checkFBLoading = (state: RootState) => state.AuthSlice.isFBLoading
export const checkSignUpLoading = (state: RootState) => state.AuthSlice.isSignUpLoading
export const checkLoginLoading = (state: RootState) => state.AuthSlice.isLoginLoading

