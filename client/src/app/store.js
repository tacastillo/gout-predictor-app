import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import smartReducer from '../features/smartSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    smart: smartReducer
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['smart/setClient']
    }
  })
});
