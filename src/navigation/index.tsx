import React from 'react'
import { Navigation } from 'react-native-navigation'
import { Provider } from "react-redux"
import App from '../../App';
import store from '../redux/store';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';
import PostScreen from '../screens/Posts/PostScreen';
import AddPostScreen from '../screens/Posts/AddPostScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import UpdateProfileScreen from '../screens/Profile/UpdateProfileScreen';
import SplashScreen from '../screens/Intro/SplashScreen';
import UsersToChatWithScreen from '../screens/Chat/UsersToChatWithScreen';
import MyChatsScreen from '../screens/Chat/MyChatsScreen';
import ChatMessagesScreen from '../screens/Chat/ChatMessagesScreen';



const reduxStoreWrapper = (MyComponent: any) => (props: any) => {
    return (
        <Provider store={store}>
            <MyComponent  {...props} />
        </Provider>
    )
}


const registerScreens = () => {
    Navigation.registerComponent('App', () => reduxStoreWrapper(App))
    Navigation.registerComponent('SplashScreen', () => reduxStoreWrapper(SplashScreen))
    Navigation.registerComponent('LoginScreen', () => reduxStoreWrapper(LoginScreen))
    Navigation.registerComponent('SignUpScreen', () => reduxStoreWrapper(SignUpScreen))
    Navigation.registerComponent('PostsScreen', () => reduxStoreWrapper(PostScreen))
    Navigation.registerComponent('AddPostScreen', () => reduxStoreWrapper(AddPostScreen))
    Navigation.registerComponent('ChatMessagesScreen', () => reduxStoreWrapper(ChatMessagesScreen))
    Navigation.registerComponent('MyChatsScreen', () => reduxStoreWrapper(MyChatsScreen))
    Navigation.registerComponent('ProfileScreen', () => reduxStoreWrapper(ProfileScreen))
    Navigation.registerComponent('UpdateProfileScreen', () => reduxStoreWrapper(UpdateProfileScreen))
    Navigation.registerComponent('UsersToChatWithScreen', () => reduxStoreWrapper(UsersToChatWithScreen))
}

export default registerScreens

