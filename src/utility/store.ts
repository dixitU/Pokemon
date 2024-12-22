import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import { teamSlice } from '../reducers/teamSlice';
import { authSlice } from '../reducers/authSlice';
import { settingSlice } from '../reducers/settingSlice';

const combineReducer = combineReducers({
  team: teamSlice.reducer,
  auth: authSlice.reducer,
  setting: settingSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blocklist: [],
};

const persistedReducer = persistReducer(persistConfig, combineReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: false,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const persistor = persistStore(store);
export default store;
