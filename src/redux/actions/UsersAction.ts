import { createAsyncThunk } from '@reduxjs/toolkit'
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import { Navigation } from 'react-native-navigation';
import { CurrentUser, IUser } from '../../services/current-user.service';
import { setUserProfileData, changeUsersSliceProps, addUserIChatWith } from '../slices/UsersSlice';
import { FetchPostsByUserID, updatePostInfoAfterUpdateProfile } from './PostsAction';
import { AppRoot } from '../../navigation/Roots';

let currentUser = new CurrentUser()

export const createUser = createAsyncThunk('CREATE_USER', async (user: any) => {
    let { uid, displayName, photoURL } = user

    await firestore().collection('users').doc(uid).get()
        .then(async (userDoc) => {
            if (!userDoc.exists) {
                await firestore().collection('users').doc(uid).set({
                    userId: uid,
                    userName: displayName,
                    userImg: photoURL,
                    userBio: null,
                    userCoverImg: null
                }).then(async () => {

                    firestore().collection('users').doc(uid).get().then(async (userDoc) => {
                        currentUser.login(userDoc.data() as unknown as IUser).then(() => Navigation.setRoot(AppRoot))
                    })
                })
            } else {
                currentUser.login(userDoc.data() as unknown as IUser).then(() => Navigation.setRoot(AppRoot))
            }
        })

})


export const UpdateUserData = createAsyncThunk('UPDATE_USER_PROFILE', async (payload: { userData: any, componentId: string }, { dispatch }: any) => {
    let { userData, componentId } = payload
    let { userId } = await currentUser.getCurrentUser()
    let { userName, userImg, userCoverImg, userBio } = userData
    let userUpdatedData = {
        userId,
        userName,
        userImg,
        userBio,
        userCoverImg
    }
    await firestore().collection('users').doc(userId).update(userUpdatedData).then(() => {
        Navigation.pop(componentId)
        dispatch(updatePostInfoAfterUpdateProfile({ userID: userId, userImg, userName }))
        currentUser.login(userUpdatedData as unknown as IUser)
    }).catch((error) => console.log({ error }))
})

export const getUserById = createAsyncThunk('GET_USER_BY_ID', async (payload: { userId: string, fromBottomTab: boolean }, { dispatch }: any) => {
    let { fromBottomTab, userId } = payload
    let { userId: currentUserID } = await currentUser.getCurrentUser()
    const ID = fromBottomTab ? currentUserID : userId
    dispatch(changeUsersSliceProps({ prop: 'isUserProfileLoading', value: true }))
    firestore().collection('users').doc(ID).get()
        .then(async (userDoc) => {
            dispatch(changeUsersSliceProps({ prop: 'isUserProfileLoading', value: false }))
            dispatch(setUserProfileData(userDoc.data()))
            dispatch(FetchPostsByUserID(ID))

        }).catch(() => { dispatch(changeUsersSliceProps({ prop: 'isUserProfileLoading', value: false })) })
})


export const fetchAllUsers = createAsyncThunk('Fetch_ALL_USERS', async (_, { dispatch, getState }: any) => {
    dispatch(changeUsersSliceProps({ prop: 'allUsers', value: [] }))
    const { userId: currentUserID } = await currentUser.getCurrentUser()
    const { lastVisibleUser } = getState().UsersSlice
    const limit = 10
    const usersSnapShot = lastVisibleUser ? await firestore().collection('users').orderBy('userName', 'asc').startAfter(lastVisibleUser).limit(limit).get() :
        await firestore().collection('users').orderBy('userName', 'asc').limit(limit).get();
    const records = (await firestore().collection('users').get()).size
    const allUsers: any[] = [];
    usersSnapShot.forEach((user) => {
        if (user.data().userId !== currentUserID) {
            allUsers.push(user.data())
        }
    })
    return {
        payloadUsers: allUsers,
        records,
        lastVisibleUserObj: allUsers[allUsers.length - 1]
    }
})

export const paginateAllUsers = createAsyncThunk('PAGINAGTE_ALL_USERS', async (_, { dispatch }) => {
    dispatch(fetchAllUsers())
})

export const refreshAllUsers = createAsyncThunk('REFRESH_ALL_USERS', async (_, { dispatch }) => {
    dispatch(fetchAllUsers())
})

export const fetchUsersIChatWithThem = createAsyncThunk('FETCH_USERS_I_CHAT_WITH_THEM', async (_, { dispatch }: any) => {
    dispatch(changeUsersSliceProps({ prop: 'allUsersIChatWith', value: [] }))
    let { userId: currentUserID } = await currentUser.getCurrentUser()
    let usersSnapShot = await firestore().collection('users').get()
    usersSnapShot.forEach(async (user) => {
        if (user.data().userId !== currentUserID) {
            let customUserSnapShotId = user.data().userId.replace(/[^a-zA-Z0-9 ]/g, "")
            let customCurrentUserID = currentUserID.replace(/[^a-zA-Z0-9 ]/g, "")
            let userLastMsg = await database().ref(`chatList/${customCurrentUserID}/${customUserSnapShotId}`).orderByValue().limitToLast(1).once('value')
            if (userLastMsg.exists()) {
                // @ts-ignore
                user.data().lastMsg = Object.values(userLastMsg.val())[0].lastMsg || '';
                // @ts-ignore
                user.data().lastMsgSendAt = Object.values(userLastMsg.val())[0].createdAt || '';
                dispatch(addUserIChatWith(user.data()))
            }
        }
    })

})
export const paginateAllUsersIChatWith = createAsyncThunk('PAGINATE_ALL_USERS_I_CHAT_WITH', async (_, { dispatch }: any) => {
    dispatch(fetchUsersIChatWithThem())
})

export const refreshAllUsersIChatWith = createAsyncThunk('REFRESH_ALL_USERS_I_CHAT_WITH', async (_, { dispatch }: any) => {
    dispatch(fetchUsersIChatWithThem())
})
