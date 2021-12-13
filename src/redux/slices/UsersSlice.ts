import { createSlice } from '@reduxjs/toolkit'
import { refreshAllUsers, fetchUsersIChatWithThem, paginateAllUsers, fetchAllUsers } from '../actions/UsersAction'
import { RootState } from '../Configration'

const UsersSlice = createSlice({
    name: 'Users',
    initialState: {
        userProfileData: { _data: {} },
        isUserProfileLoading: false,
        allUsersIChatWith: [],
        isfetchingUsersIChatWithLoading: false,
        allUsers: [],
        isfetchingUsersLoading: false,
        isFetchUsersError: false,
        isUsersPaginate: false,
        isUsersRefresh: false,
        lastVisibleUser: null,
        moreData: true
    },
    reducers: {
        setUserProfileData: (state, action) => {
            state.userProfileData._data = action.payload
        },
        changeUsersSliceProps: (state: any, { payload: { prop, value } }) => {
            state[prop] = value
        },
        addUserIChatWith: (state: any, action: any) => {
            state.allUsersIChatWith = [...state.allUsersIChatWith, action.payload]
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllUsers.pending, (state) => {
            state.isfetchingUsersLoading = !state.isUsersPaginate
        })
        builder.addCase(fetchAllUsers.fulfilled, (state: any, action) => {
            state.isfetchingUsersLoading = false
            state.allUsers = state.isUsersRefresh ? action.payload.payloadUsers : state.allUsers.concat(action.payload.payloadUsers)
            state.lastVisibleUser = action.payload.lastVisibleUserObj
            state.isFetchUsersError = false
            state.isUsersRefresh = false,
                state.isUsersPaginate = false,
                state.moreData = (state.allUsers.length + action.payload.payloadUsers.length) >= action.payload.records ? false : true
        })
        builder.addCase(fetchAllUsers.rejected, (state) => {
            state.isFetchUsersError = true
            state.isfetchingUsersLoading = false
        })

        builder.addCase(paginateAllUsers.pending, (state) => {
            state.isUsersPaginate = true
        })
        builder.addCase(refreshAllUsers.pending, (state) => {
            state.isUsersRefresh = true,
                state.isFetchUsersError = false,
                state.lastVisibleUser = null
        })

        builder.addCase(fetchUsersIChatWithThem.pending, (state) => {
            state.isfetchingUsersIChatWithLoading = true
        })
        builder.addCase(fetchUsersIChatWithThem.fulfilled, (state) => {
            state.isfetchingUsersIChatWithLoading = false
        })
        builder.addCase(fetchUsersIChatWithThem.rejected, (state) => {
            state.isfetchingUsersIChatWithLoading = false
        })
    }
})


export const { setUserProfileData, changeUsersSliceProps, addUserIChatWith } = UsersSlice.actions
export default UsersSlice.reducer

export const PostSelectorFunc = (state: RootState) => state.PostSlice
export const userSelectorFunc = (state: RootState) => state.UsersSlice.userProfileData._data
export const userProfileLoadingFunc = (state: RootState) => state.UsersSlice.isUserProfileLoading
export const allUsersSelectorFunc = (state: RootState) => state.UsersSlice
export const checkFetchingAllUsersLoading = (state: RootState) => state.UsersSlice.isfetchingUsersLoading
export const checkFetchingAllUsersIChatWithLoading = (state: RootState) => state.UsersSlice.isfetchingUsersIChatWithLoading
export const allUsersIChatWithSelectorFunc = (state: RootState) => state.UsersSlice.allUsersIChatWith



