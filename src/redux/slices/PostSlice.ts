import { createSlice } from '@reduxjs/toolkit'
import { FetchPosts, FetchPostsByUserID, AddPost, pagtinatePosts, refreshPosts } from '../actions/PostsAction';


const initialState = {
    posts: [],
    postsByUserId: [],
    isFetchPostsByUserIDLoading: false,
    isFetchPostsByUserIDError: false,
    isFetchPostsLoading: false,
    isFetchPostsError: false,
    isAddPostloading: false,
    isDeleteModalVisible: false,
    isDeletePostLoading: false,
    isPostsRefresh: false,
    isPostsPaginate: false,
    moreData: true,
    lastVisiblePost: null
}

const PostSlice = createSlice({
    name: 'Posts',
    initialState,
    reducers: {
        changePostsProps: (state: any, { payload: { prop, value } }) => {
            state[prop] = value
        }
    },
    extraReducers: (builder) => {
        builder.addCase(FetchPosts.pending, (state) => {
            state.isFetchPostsLoading = !state.isPostsPaginate
        })
        builder.addCase(FetchPosts.fulfilled, (state, action: any) => {
            state.posts = state.isPostsRefresh ? action.payload.payloadPosts : state.posts.concat(action.payload.payloadPosts)
            state.lastVisiblePost = action.payload.lastVisibleItem
            state.isFetchPostsError = false
            state.isFetchPostsLoading = false
            state.isPostsRefresh = false,
                state.isPostsPaginate = false,
                state.moreData = (state.posts?.length + action.payload.payloadPosts.length) >= action.payload.records ? false : true

        }),
            builder.addCase(FetchPosts.rejected, (state, _) => {
                state.isFetchPostsLoading = false
                state.isFetchPostsError = true
            })

        builder.addCase(pagtinatePosts.pending, (state) => {
            state.isPostsPaginate = true
        })
        builder.addCase(refreshPosts.pending, (state) => {
            state.isPostsRefresh = true,
                state.isFetchPostsError = false,
                state.lastVisiblePost = null
        })
        builder.addCase(FetchPostsByUserID.pending, (state, _) => {
            state.isFetchPostsByUserIDLoading = true
        }),
            builder.addCase(FetchPostsByUserID.fulfilled, (state, action: any) => {
                state.postsByUserId = action.payload
                state.isFetchPostsByUserIDLoading = false
            }),
            builder.addCase(FetchPostsByUserID.rejected, (state, _) => {
                state.isFetchPostsByUserIDLoading = false
                state.isFetchPostsByUserIDError = true
            })

        builder.addCase(AddPost.pending, (state, _) => {
            state.isAddPostloading = true
        }),
            builder.addCase(AddPost.fulfilled, (state) => {
                state.isAddPostloading = false
            }),
            builder.addCase(AddPost.rejected, (state, _) => {
                state.isAddPostloading = false
            })
    }
})

export const { changePostsProps } = PostSlice.actions
export default PostSlice.reducer