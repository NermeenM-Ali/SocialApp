import { createAsyncThunk } from '@reduxjs/toolkit'
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { Navigation } from 'react-native-navigation';
import { CurrentUser } from '../../services/current-user.service';
import { changePostsProps } from '../slices/PostSlice';


let currentUser = new CurrentUser()
export const FetchPosts = createAsyncThunk('FETCH_POSTS', async (_, { getState }: any) => {
    const { lastVisiblePost } = getState().PostSlice
    const limit = 5
    let querySnapshot = lastVisiblePost ?
        await firestore().collection('posts').orderBy('postTime', 'desc').startAfter(lastVisiblePost).limit(limit).get() :
        await firestore().collection('posts').orderBy('postTime', 'desc').limit(limit).get()
    let records = (await firestore().collection('posts').get()).size
    let lastVisibleItem = querySnapshot.docs[querySnapshot.docs.length - 1]
    if (querySnapshot) {
        let postsSnapShot: {}[] = [];
        querySnapshot.forEach(documentSnapshot => {
            let id = documentSnapshot.id
            let { userId, userImg, post, postTime, postImg, userName } = documentSnapshot.data()
            postsSnapShot.push({ id, userId, userImg, post, postTime, postImg, userName })
        });
        return {
            payloadPosts: postsSnapShot,
            records,
            lastVisibleItem
        }
    }
})

export const pagtinatePosts = createAsyncThunk('PAGEINATE_POSTS', (_, { dispatch }) => {
    dispatch(FetchPosts())
})

export const refreshPosts = createAsyncThunk('REFRESH_POSTS', (_, { dispatch }) => {
    dispatch(FetchPosts())
})

export const FetchPostsByUserID = createAsyncThunk('FETCH_POSTS_BY_USERID', async (payload?: string) => {
    let User = await currentUser.getCurrentUser()
    let ID = payload ? payload : User.userId
    let querySnapshot = await firestore().collection('posts').where('userId', '==', ID).orderBy('postTime', 'desc').get()
    if (querySnapshot) {
        let postsSnapShot: {}[] = [];
        querySnapshot.forEach(documentSnapshot => {
            let id = documentSnapshot.id
            let { userId, userImg, post, postTime, postImg, userName } = documentSnapshot.data()
            postsSnapShot.push({ id, userId, userImg, post, postTime, postImg, userName })
        });
        return postsSnapShot
    }
})

export const AddPost = createAsyncThunk('ADD_POST', async (payload: { imgUrl: string, postText: string, componentId: string }, { dispatch, getState }: any) => {
    let User = await currentUser.getCurrentUser()
    let { userName, userImg } = getState().UsersSlice.userProfileData._data
    let { imgUrl, postText, componentId } = payload
    firestore().collection('posts')
        .add({
            userId: User.userId,
            userName,
            userImg,
            postTime: firestore.Timestamp.fromDate(new Date()),
            postImg: imgUrl,
            post: postText,
        })
        .then(() => {
            Navigation.pop(componentId)
            dispatch(FetchPosts())
        }).catch((error) => {
            console.log({ error })
        })
})


export const updatePostInfoAfterUpdateProfile = createAsyncThunk('UPDATE_POST_INFO_AFTER_UPDATE_PROFILE', async (payload: { userID: any, userImg: string, userName: string }, { dispatch }: any) => {
    let { userID, userImg, userName } = payload
    firestore().collection('posts').where('userId', '==', userID).get()
        .then((userDoc) => {
            userDoc.forEach(async (doc) => {
                await firestore().collection('posts').doc(doc.id).update({ userImg, userName })
                dispatch(FetchPosts())
            })
        })
})

export const deletePost = createAsyncThunk('DELETE_POST', async (payload: { postId: string }, { dispatch }) => {
    dispatch(changePostsProps({ prop: 'isDeletePostLoading', value: true }))
    const { postId } = payload
    // علشان لو البوست فيه صوره لازم امسحها من الفايربيز استورج الاول لو معملتش كدا مش هيمسح البوست
    firestore().collection('posts').doc(postId).get()
        .then(async (querySnapshot) => {

            if (querySnapshot.exists) {
                let { postImg }: any = querySnapshot.data()

                if (postImg !== '') {
                    let storageRef = storage().refFromURL(postImg)
                    let imageRef = storage().ref(storageRef.fullPath)

                    await imageRef.delete().then(async () => {
                        await firestore().collection('posts').doc(postId).delete().then(() => {
                            dispatch(FetchPosts())
                            dispatch(FetchPostsByUserID(''))
                        })
                    }).catch((error) => console.log({ error }))
                } else {
                    await firestore().collection('posts').doc(postId).delete().then(() => {
                        dispatch(FetchPosts())
                        dispatch(FetchPostsByUserID(''))
                    }).catch((error) => console.log({ error }))
                }
            }

        }).finally(() => {
            dispatch(changePostsProps({ prop: 'isDeleteModalVisible', value: false }))
            dispatch(changePostsProps({ prop: 'isDeletePostLoading', value: false }))
        })

})

