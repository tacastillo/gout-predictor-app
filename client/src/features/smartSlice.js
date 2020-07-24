import { createSlice } from '@reduxjs/toolkit';
import { oauth2 as SMART } from 'fhirclient';

export const smartSlice = createSlice({
  name: 'smart',
  initialState: {
    client: null
  },
  reducers: {
    setClient: (state, action) => {
      state.client = action.payload;
    }
  }
});

export const { setClient } = smartSlice.actions;

export const initializeSmart = () => dispatch => {
  SMART.ready((client) => {
    dispatch(setClient(client));
  });
};

export const selectClient = state => state.smart.client;

export default smartSlice.reducer;