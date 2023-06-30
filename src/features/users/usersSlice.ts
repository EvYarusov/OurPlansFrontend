import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import UsersState from './types/UsersState';
import * as api from './api';
import { UserId } from './types/User';

const initialState: UsersState = {
    users: [],
    error: undefined,
};

export const getAllUsers = createAsyncThunk('users/getAllUsers', () =>
    api.getAllUsers()
);

export const getUserById = createAsyncThunk('users/getUserById', (id: UserId) =>
    api.getUserById(id)
);

export const blockUser = createAsyncThunk('users/blockUser', (id: UserId) =>
    api.blockUser(id)
);

export const unblockUser = createAsyncThunk('users/unblockUser', (id: UserId) =>
    api.unblockUser(id)
);

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        resetError: (state) => {
            state.error = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.users = action.payload.users;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(getUserById.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(getUserById.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(blockUser.fulfilled, (state, action) => {
                state.users.forEach((user) => {
                    if (user.id === action.payload.id) {
                        user.blocked = true;
                    }
                });
            })
            .addCase(blockUser.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(unblockUser.fulfilled, (state, action) => {
                state.users.forEach((user) => {
                    if (user.id === action.payload.id) {
                        user.blocked = false;
                    }
                });
            })
            .addCase(unblockUser.rejected, (state, action) => {
                state.error = action.error.message;
            });
    },
});

export const { resetError } = usersSlice.actions;

export default usersSlice.reducer;
