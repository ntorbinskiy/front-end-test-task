import { configureStore } from '@reduxjs/toolkit';
import { catsApi } from '../services/cats-service';
import authReducer from './slices/auth-slice.tsx';
import { useDispatch, useSelector } from 'react-redux';

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [catsApi.reducerPath]: catsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(catsApi.middleware),
});

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector = <T, >(selector: (state: RootState) => T): T =>
  useSelector(selector);