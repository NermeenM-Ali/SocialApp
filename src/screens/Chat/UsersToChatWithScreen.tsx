import React, { useEffect } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import colors from '../../assets/colors'
import Strings from '../../assets/strings'
import ChatUISkeleton from '../../components/ChatUISkeleton'
import EmptyPage from '../../components/EmptyPage'
import Header from '../../components/Header'
import Spinner from '../../components/Spinner'
import { fetchAllUsers, paginateAllUsers, refreshAllUsers } from '../../redux/actions/UsersAction'
import { allUsersSelectorFunc } from '../../redux/slices/UsersSlice'
import { verticalScale } from '../../utils/Scaling'
import ChatItem from './ChatComponents/ChatItem'

interface UsersToChatWithScreenProps {
    componentId: string
}
const UsersToChatWithScreen = (props: UsersToChatWithScreenProps) => {
    let { componentId } = props
    const dispatch = useDispatch()
    const { allUsers, isfetchingUsersLoading, moreData, isUsersPaginate, isUsersRefresh, } = useSelector(allUsersSelectorFunc)

    useEffect(() => {
        dispatch(fetchAllUsers())
    }, [])

    const renderFooter = () => (
        <>
            {isUsersPaginate && (<View style={{ paddingVertical: verticalScale(10) }}>
                <Spinner color={colors.MAIN_COLOR} />
            </View>)}
        </>
    )

    const renderUsersList = () => {
        return (
            <FlatList
                data={allUsers}
                keyExtractor={(_, idx) => idx.toString()}
                refreshing={isUsersRefresh}
                showsVerticalScrollIndicator={false}
                onRefresh={() => { !isfetchingUsersLoading && dispatch(refreshAllUsers()) }}
                onEndReachedThreshold={0.01}
                onEndReached={() => !isUsersPaginate && moreData && dispatch(paginateAllUsers())}
                ListFooterComponent={() => renderFooter()}
                renderItem={({ item }) => <ChatItem item={item} componentId={props.componentId} />}
                style={{ marginTop: verticalScale(15) }} />
        )
    }

    return (
        <View style={styles.container}>
            <Header hasBackButton headerTitle={Strings.startChat} componentId={componentId} />
            {isfetchingUsersLoading && !allUsers?.length ? <ChatUISkeleton /> :
                !isfetchingUsersLoading && !allUsers?.length ? <EmptyPage iconName='chatbubble-ellipses-outline' text={Strings.noChatsYet} withReloadBtn={false} /> :
                    renderUsersList()}
        </View>
    )
}

export default UsersToChatWithScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE_COLOR
    }
})
