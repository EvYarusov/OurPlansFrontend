import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import CategoriesState from './types/CategoriesState';
import * as api from './api';

const initialState: CategoriesState = {
    categories: [],
};

export const getAllCategories = createAsyncThunk('categories/getAllCategories', () =>
    api.getAllCategories()
);

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        resetError: (state) => {
            state.error = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.categories = action.payload.strings;
            })
            .addCase(getAllCategories.rejected, (state, action) => {
                state.error = action.error.message;
            });
    },
});

export const { resetError } = categoriesSlice.actions;

export default categoriesSlice.reducer;
