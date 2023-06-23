import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import EventsState from './types/EventsState';
import * as api from './api';

const initialState: EventsState = {
    events: [],
    error: undefined,
};

// eslint-disable-next-line import/prefer-default-export
export const getAllEvents = createAsyncThunk('events/getAllEvents', () =>
  api.getAll()
);

const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
      resetError: (state) => {
        state.error = undefined;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getAllEvents.fulfilled, (state, action) => {
          state.events = action.payload.events;
        });
    },
  });

export const { resetError } = eventsSlice.actions;

export default eventsSlice.reducer;
