import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice.js';
import storage from 'redux-persist/lib/storage';
// save the data inside the browser

import { persistReducer, persistStore } from 'redux-persist';

//
const rootReducer = combineReducers({ user: userReducer });
//
const persistConfig = {
  key: 'root',
  // "root can be replaced any name"
  version: 1,
  // defualt -1 if we dont defined
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
//
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
// save inside the local storage
