import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import colors from '../../assets/colors'
import Strings from '../../assets/strings'
import Header from '../../components/Header'
import PostUISkeleton from '../../components/PostUISkeleton'
import { BottomTabStacks } from '../../navigation/navConfigrations'
import { RootState } from '../../redux/Configration'
import PostItem from './PostsComponents/PostItem';
import { CurrentUser } from '../../services/current-user.service';
import DeleteModal from '../../components/DeleteModal';
import { FetchPosts, deletePost, pagtinatePosts, refreshPosts } from '../../redux/actions/PostsAction'
import { changePostsProps } from '../../redux/slices/PostSlice'
import CustomAddButton from '../../components/CustomAddButton'
import EmptyPage from '../../components/EmptyPage'
import Spinner from '../../components/Spinner'
import { verticalScale } from '../../utils/Scaling'

const PostSelectorFunc = (state: RootState) => state.PostSlice

const PostScreen = () => {
  const [postId, setPostId] = useState<string>('')
  const [currentUserID, setCurrentUserID] = useState<string>('')
  let { posts, isFetchPostsLoading, isDeleteModalVisible, isDeletePostLoading, isPostsPaginate, isPostsRefresh, moreData } = useSelector(PostSelectorFunc, shallowEqual)
  const dispatch = useDispatch()
  let currentUser = new CurrentUser()

  useEffect(() => {
    dispatch(FetchPosts())
    getUserID()
  }, [dispatch])

  const getUserID = () => {
    currentUser.getCurrentUser().then(({ userId }) => setCurrentUserID(userId))
  }

  const renderFooter = () => {
    return (
      <>
        {isPostsPaginate && (<View style={{ paddingVertical: verticalScale(10) }}>
          <Spinner color={colors.MAIN_COLOR} />
        </View>)}
      </>
    )
  }

  const renderPosts = () => {
    return (
      <FlatList
        data={posts}
        keyExtractor={(_, idx) => idx.toString()}
        style={styles.listStyle}
        showsVerticalScrollIndicator={false}
        refreshing={isPostsRefresh}
        onRefresh={() => { !isFetchPostsLoading && dispatch(refreshPosts()) }}
        onEndReachedThreshold={0.1}
        onEndReached={() => !isPostsPaginate && moreData && dispatch(pagtinatePosts())}
        ListFooterComponent={() => renderFooter()}
        renderItem={({ item }) => <PostItem item={item} currentUserID={currentUserID} getPostId={getPostId} />} />
    )
  }

  const getPostId = (postID: string) => {
    setPostId(prevId => {
      if (prevId !== postID) return postID
      else return prevId
    })
    dispatch(changePostsProps({ prop: 'isDeleteModalVisible', value: true }))
  }

  const renderConfirmationModel = () => {
    return (
      <DeleteModal
        isDeleteModalVisible={isDeleteModalVisible}
        isDeletePostLoading={isDeletePostLoading}
        closeModal={() => dispatch(changePostsProps({ prop: 'isDeleteModalVisible', value: false }))}
        pressToDelete={() => dispatch(deletePost({ postId }))} />)
  }


  return (
    <View style={styles.container}>
      <Header headerTitle={Strings.socialApp} />
      {isFetchPostsLoading ? (<PostUISkeleton />) : !posts.length ?
        <EmptyPage iconName='md-reader-outline' text={Strings.noPostsYet} withReloadBtn={false} /> :
        renderPosts()}
      <CustomAddButton btnTxt={Strings.addPost}
        onPress={() => Navigation.push(BottomTabStacks.POSTS_STACK, { component: { name: 'AddPostScreen' } })} />
      {renderConfirmationModel()}
    </View>
  )
}

export default PostScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE_COLOR,
  },
  listStyle: {
    flexGrow: 1,
  },

})
