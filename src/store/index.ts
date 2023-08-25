import { configureStore } from '@reduxjs/toolkit';
import CidadesSlice from './slices/CidadesSlice';
import PessoasSlice from './slices/PessoasSlice';
import AuthSlice from './slices/AuthSlice';

export const store = configureStore({
	reducer: {
		cidades: CidadesSlice,
		pessoas: PessoasSlice,		
		auth: AuthSlice,		
	}
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
