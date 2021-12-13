import { createAsyncThunk } from '@reduxjs/toolkit'
import database from '@react-native-firebase/database';
import { CurrentUser } from '../../services/current-user.service';
import { changeChatProps } from '../slices/ChatSlice';
import moment from 'moment';

let currentUser = new CurrentUser()

export const getChatMessages = createAsyncThunk('GET_CHAT_MESSAGES', async (SelectedChatUserId: string, { dispatch }: any) => {
    dispatch(changeChatProps({ prop: 'chatMessages', value: [] }))
    let { userId: currentUserId, userImg } = await currentUser.getCurrentUser()
    let customSelectedChatUserId = SelectedChatUserId.replace(/[^a-zA-Z0-9 ]/g, "")
    let customCurrentUserID = currentUserId.replace(/[^a-zA-Z0-9 ]/g, "")
    database().ref(`chatList/${customCurrentUserID}/${customSelectedChatUserId}`).on('value', (snapShot) => {
        let messages: any[] = [];
        // @ts-ignore
        snapShot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            if (childData.userId === currentUserId) {
                messages.push({ ...childData, userImg });
            } else {
                messages.push({ ...childData });
            }

        });
        dispatch(changeChatProps({ prop: 'chatMessages', value: messages.reverse() }))
    })


})


export const sendMessage = createAsyncThunk('SEND_MESSAGES', async (payload: { SelectedChatUserId: string, message: string | any }) => {
    let { SelectedChatUserId, message } = payload
    let { userId: currentUserId, userName, userImg }: any = await currentUser.getCurrentUser()
    if (message) {
        let chatMessage = {
            userId: currentUserId,
            userName: userName || 'unknown',
            userImg: userImg || '',
            lastMsg: message,
            createdAt: moment(new Date()).format('LT')
        }
        let customSelectedChatUserId = SelectedChatUserId.replace(/[^a-zA-Z0-9 ]/g, "")
        let customCurrentUserId = currentUserId.replace(/[^a-zA-Z0-9 ]/g, "")
        database().ref(`/chatList/${customCurrentUserId}/${customSelectedChatUserId}`).push(chatMessage)
        database().ref(`/chatList/${customSelectedChatUserId}/${customCurrentUserId}`).push(chatMessage)
    }
})

