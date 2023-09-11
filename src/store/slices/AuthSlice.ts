import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { IUsuario } from '@/models';
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
		cleanAuthError(state) {
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

export const { cleanAuthError } = AuthSlice.actions;

export default AuthSlice.reducer;