import { createSlice } from '@reduxjs/toolkit'
import { getChatMessages, sendMessage } from '../actions/ChatAction';
import { RootState } from '../Configration';

const initialState = {
    chatMessages: [],
    isChatMessagesLoading: false,
    isSendingMsgLoading: false
}


let ChatSlice = createSlice({
    name: 'Chat',
    initialState,
    reducers: {
        changeChatProps: (state: any, { payload: { prop, value } }) => {
            state[prop] = value
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getChatMessages.pending, (state) => {
            state.isChatMessagesLoading = true
        })
        builder.addCase(getChatMessages.fulfilled, (state: any) => {
            state.isChatMessagesLoading = false
        })
        builder.addCase(getChatMessages.rejected, (state: any) => {
            state.isChatMessagesLoading = false
        })

        builder.addCase(sendMessage.pending, (state) => {
            state.isSendingMsgLoading = true
        })
        builder.addCase(sendMessage.fulfilled, (state: any) => {
            state.isSendingMsgLoading = false
        })
        builder.addCase(sendMessage.rejected, (state) => {
            state.isSendingMsgLoading = false
        })

    }

});

export const { changeChatProps } = ChatSlice.actions

export default ChatSlice.reducer

export const getChatMsgsSelectorFunc = (state: RootState) => state.ChatSlice.chatMessages
export const chatMsgsLoaderSelectorFunc = (state: RootState) => state.ChatSlice.isChatMessagesLoading
export const sendMsgLoaderSelectorFunc = (state: RootState) => state.ChatSlice.isSendingMsgLoading



