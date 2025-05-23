import { configureStore } from '@reduxjs/toolkit'
import  configureFields  from './features/configure/configureSlice'
import { useDispatch, useSelector,TypedUseSelectorHook } from 'react-redux';

export const store = configureStore({
  reducer: {
    configure: configureFields
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector