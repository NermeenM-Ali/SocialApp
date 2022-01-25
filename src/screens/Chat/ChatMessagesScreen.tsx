import React, { useEffect, useRef, useState } from 'react'
import { FlatList, ImageBackground, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import ChatUISkeleton from '../../components/ChatUISkeleton'
import { sendMessage } from '../../redux/actions/ChatAction'
import { chatMsgsLoaderSelectorFunc, getChatMsgsSelectorFunc } from '../../redux/slices/ChatSlice'
import { CurrentUser } from '../../services/current-user.service'
import { scale, verticalScale } from '../../utils/Scaling'
import ChatHeader from './ChatComponents/ChatHeader'
import ChatInput from './ChatComponents/ChatInput'
import { IChatItem } from './ChatComponents/ChatItem'
import MessageItem from './ChatComponents/MessageItem'

interface ChatMessagesScreenProps {
    SelectedChatItem: IChatItem
    componentId: string
}

let currentUser = new CurrentUser()
const ChatMessagesScreen = (props: ChatMessagesScreenProps) => {
    const scrollRef = useRef<any>(null)
    const dispatch = useDispatch()
    const chatMessages = useSelector(getChatMsgsSelectorFunc)
    const isChatMsgsLoading = useSelector(chatMsgsLoaderSelectorFunc)
    const [currentUserId, setCurrentUserId] = useState<string>('')
    const [message, setMessage] = useState('')
    let { SelectedChatItem, componentId } = props

    useEffect(() => {
        currentUser.getCurrentUser().then(({ userId }) => setCurrentUserId(userId))
    }, [])



    const handleSendMsgBtn = () => {
        dispatch(sendMessage({ SelectedChatUserId: SelectedChatItem.userId, message }))
        setMessage('')
    }

    const renderChatMessages = () => {
        return (
            <FlatList
                ref={scrollRef}
                data={chatMessages}
                style={styles.chatList}
                alwaysBounceVertical
                // @ts-ignore
                inverted={-1}
                keyExtractor={(_, idx) => idx.toString()}
                contentContainerStyle={{ paddingBottom: verticalScale(10) }}
                renderItem={({ item }) => <MessageItem item={item} currentUserID={currentUserId} />}
            />
        )
    }

    // const handleChangeText = (msg) => setMessage(msg)
    return (
        <ImageBackground source={require('../../assets/images/chatBgImg.png')} style={styles.container} resizeMode='cover'>
            <ChatHeader headerData={SelectedChatItem} componentId={componentId} />
            {isChatMsgsLoading ? <ChatUISkeleton /> : renderChatMessages()}
            <ChatInput
                value={message}
                onChangeText={(msg) => setMessage(msg)}
                onSendMsgBtnPressed={handleSendMsgBtn} />
        </ImageBackground>
    )
}

export default ChatMessagesScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    chatList: {
        flexGrow: 1,
        marginBottom: verticalScale(50),
        paddingTop: verticalScale(25),
        paddingHorizontal: scale(10),
    },
    img: {
        width: '100%',
        height: '100%'
    },
})
