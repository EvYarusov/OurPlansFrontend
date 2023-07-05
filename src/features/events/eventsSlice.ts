import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import EventsState from './types/EventsState';
import * as api from './api';
import { EventId } from './types/Event';

const initialState: EventsState = {
  events: [],
  event: undefined,
  error: undefined,
};

export const addEvent = createAsyncThunk('events/addEvent',
  async ({ title, description, startAt, finishAt, place, category }: {
    title: string,
    description: string,
    startAt: string,
    finishAt: string,
    place: string,
    category: string
  }) => {
    if (!title.trim() || !description.trim() || !startAt.toString || !finishAt.toString ||
      !place.trim() || !category.trim()) {
      throw new Error('Заголовок, описание, даты начала и окончания, место и категория не должны быть пустыми');
    }
    return api.addEvent(title, description, startAt, finishAt, place, category);
  }
);

export const getAllEvents = createAsyncThunk('events/getAllEvents', () =>
  api.getAll()
);

export const getAllMyEvents = createAsyncThunk('events/getAllMyEvents', () =>
  api.getAllMyEvents()
);

export const getAllWithMe = createAsyncThunk('events/getAllWithMe', () =>
  api.getAllWithMe()
);

export const getEventById = createAsyncThunk('events/getEventById', (id: EventId) =>
  api.getEventById(id)
);

export const getAllByAuthor = createAsyncThunk('events/getAllByAuthor', (id: number) =>
  api.getAllByAuthor(id)
);

export const deleteEvent = createAsyncThunk('events/deleteEvent', (id: number) =>
  api.deleteEvent(id)
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
      .addCase(addEvent.fulfilled, (state, action) => {
        state.event = action.payload;
      })
      .addCase(addEvent.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getAllEvents.fulfilled, (state, action) => {
        state.events = action.payload.events;
      })
      .addCase(getAllEvents.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getEventById.fulfilled, (state, action) => {
        state.event = action.payload;
      })
      .addCase(getEventById.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getAllByAuthor.fulfilled, (state, action) => {
        state.events = action.payload.events;
      })
      .addCase(getAllByAuthor.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.filter((event) => event.id !== action.payload.id);
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { resetError } = eventsSlice.actions;

export default eventsSlice.reducer;
