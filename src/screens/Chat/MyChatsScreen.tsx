import React, { useEffect } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Navigation, NavigationComponentProps } from 'react-native-navigation'
import { useDispatch, useSelector } from 'react-redux'
import colors from '../../assets/colors'
import Strings from '../../assets/strings'
import ChatUISkeleton from '../../components/ChatUISkeleton'
import CustomAddButton from '../../components/CustomAddButton'
import EmptyPage from '../../components/EmptyPage'
import Header from '../../components/Header'
import { fetchUsersIChatWithThem } from '../../redux/actions/UsersAction'
import { allUsersIChatWithSelectorFunc, checkFetchingAllUsersIChatWithLoading } from '../../redux/slices/UsersSlice'
import { verticalScale } from '../../utils/Scaling'
import ChatItem from './ChatComponents/ChatItem'

const MyChatsScreen = (props: NavigationComponentProps) => {
    const dispatch = useDispatch()
    const isFetchingAllUsersIChatWithLoading = useSelector(checkFetchingAllUsersIChatWithLoading)
    const allUsersIChatWith = useSelector(allUsersIChatWithSelectorFunc)

    useEffect(() => {
        dispatch(fetchUsersIChatWithThem())
    }, [])

    const renderUsersList = () => {
        return (
            <FlatList
                data={allUsersIChatWith}
                keyExtractor={(_, idx) => idx.toString()}
                renderItem={({ item }) => <ChatItem item={item} componentId={props.componentId} />}
                style={{ marginTop: verticalScale(10) }} />
        )
    }


    return (
        <View style={styles.container}>
            <Header headerTitle='Chats' />
            {isFetchingAllUsersIChatWithLoading && !allUsersIChatWith?.length ? (<ChatUISkeleton />) :
                !allUsersIChatWith?.length && !isFetchingAllUsersIChatWithLoading ? (<EmptyPage iconName='chatbubble-ellipses-outline' text={Strings.noChatsYet} withReloadBtn={false} />) :
                    renderUsersList()
            }
            <CustomAddButton btnTxt={Strings.addChat} isForPosts={false}
                onPress={() => Navigation.push(props.componentId, { component: { name: 'UsersToChatWithScreen' } })} />
        </View>
    )
}

export default MyChatsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE_COLOR
    },
})
