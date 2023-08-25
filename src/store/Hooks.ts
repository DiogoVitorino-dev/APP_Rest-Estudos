import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '.';

type DispatchFn = () => AppDispatch
export const useAppDispatch: DispatchFn = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;