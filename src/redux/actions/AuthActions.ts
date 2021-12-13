import { createAsyncThunk } from '@reduxjs/toolkit'
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import { Navigation } from 'react-native-navigation';
import { AuthRoot } from '../../navigation/Roots';
import { CurrentUser } from '../../services/current-user.service';
import { createUser } from './UsersAction';
import { changeAuthProps } from '../slices/AuthSlice';

export interface IPayload {
    email: string,
    password: string,
    resetForm: any,
    setStatus: any
}
let currentUser = new CurrentUser()

export const LoginUser = createAsyncThunk('LOGIN_USER',
    async (payload: IPayload, { dispatch }) => {
        let { email, password } = payload
        let userData = await auth().signInWithEmailAndPassword(email, password);
        if (userData) {
            dispatch(createUser(userData.user.providerData[0]))
        } else {
            dispatch(changeAuthProps({ prop: 'isLoginLoading', value: false }))
        }
    })

export const SignUpUser = createAsyncThunk('SIGN_UP_USER',
    async (payload: IPayload, { dispatch }) => {
        let { email, password } = payload
        let userData = await auth().createUserWithEmailAndPassword(email, password);
        if (userData) {
            console.log({ userData })
            dispatch(createUser(userData.user.providerData[0]))
        } else {
            dispatch(changeAuthProps({ prop: 'isSignUpLoading', value: false }))
        }
    })

export const LogOutUser = createAsyncThunk('LOGOUT_USER',
    async () => {
        await auth().signOut().finally(() => {
            Navigation.setRoot(AuthRoot)
            currentUser.logout()
        });
    })

export const facebookLogin = createAsyncThunk('FACEBOOK_LOGIN', async (_, { dispatch }) => {
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    if (result.isCancelled) {
        throw 'User cancelled the login process';
    }
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
        throw 'Something went wrong obtaining access token';
    } else {
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
        let userFBData = await auth().signInWithCredential(facebookCredential);
        if (userFBData) {
            dispatch(createUser(userFBData.user.providerData[0]))
        } else {
            dispatch(changeAuthProps({ prop: 'isFBLoading', value: false }))
        }
    }

})

export const googleLogin = createAsyncThunk('GOOGLE_LOGIN', async (_, { dispatch }) => {
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    let userGmailData = await auth().signInWithCredential(googleCredential);
    if (userGmailData) {
        dispatch(createUser(userGmailData.user.providerData[0]))
    } else {
        dispatch(changeAuthProps({ prop: 'isGmailLoading', value: false }))
    }

})
