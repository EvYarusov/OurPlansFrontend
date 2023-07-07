import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import PlacesState from './types/PlacesState';
import * as api from './api';

const initialState: PlacesState = {
    places: [],
};

export const getAllPlaces = createAsyncThunk('places/getAllPlaces', () =>
    api.getAllPlaces()
);

const placesSlice = createSlice({
    name: 'places',
    initialState,
    reducers: {
        resetError: (state) => {
            state.error = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllPlaces.fulfilled, (state, action) => {
                state.places = action.payload.strings;
            })
            .addCase(getAllPlaces.rejected, (state, action) => {
                state.error = action.error.message;
            });
    },
});

export const { resetError } = placesSlice.actions;

export default placesSlice.reducer;
