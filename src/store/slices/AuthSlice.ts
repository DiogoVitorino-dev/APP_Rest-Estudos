import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { RootState } from '..';
import { IUsuario } from '@/models/Usuario';
import { recoverySaved, signIn, signOut, signUp } from '../thunks/AuthThunks';

interface IInitialState {
	usuario?: IUsuario
	status: 'idle' | 'loading' | 'succeeded' | 'failed'
	error?: string
}

const initialState:IInitialState = {
	status:'idle',	
};

const isAPendingAction = isPending(signIn, signUp, recoverySaved, signOut);
const isAFulfilledAction = isFulfilled(signIn, signUp, recoverySaved, signOut);
const isARejectAction = isRejected(signIn, signUp, recoverySaved, signOut);

const AuthSlice = createSlice({
	name:'auth',
	initialState,
	reducers:{		
		cleanError(state) {
			state.error = undefined;
		}
	},
	extraReducers(builder) {
		builder			
			.addCase(signIn.fulfilled, (state,action) => {
				state.usuario = action.payload;								
			})
			.addCase(recoverySaved.fulfilled, (state,action) => {
				state.usuario = action.payload;								
			})						
			.addCase(signOut.fulfilled, (state) => {
				state.usuario = undefined;							
			})						
			.addMatcher(isAPendingAction, (state) => {
				state.status = 'loading';
			})
			.addMatcher(isAFulfilledAction, (state) => {
				state.status = 'succeeded';	
			})
			.addMatcher(isARejectAction, (state,action) => {
				state.error = action.error.message;
				state.status = 'failed';
			});
	},
});

export const selectUsuario = (state: RootState) => state.auth.usuario;
export const selectStatus = (state: RootState) => state.auth.status;
export const selectError = (state: RootState) => state.auth.error;

export const { cleanError } = AuthSlice.actions;

export default AuthSlice.reducer;