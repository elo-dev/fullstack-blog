import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '@services/index'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
