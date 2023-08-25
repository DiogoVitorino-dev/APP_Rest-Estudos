import { ICidade } from '@/models/Cidade';
import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { RootState } from '..';
import { createCidade, deleteCidade, fetchCidades, fetchNextPage, filterCidades, updateCidade } from '../thunks/CidadesThunks';

interface IInitialState {
	cidades: ICidade[]	
	page:number
	filter?:string
	status: 'idle' | 'loading' | 'succeeded' | 'failed'
	error?: string
}

const initialState:IInitialState = {
	cidades:[],
	page:1,
	status:'idle',	
};

const isAPendingAction = isPending(
	fetchCidades, fetchNextPage, deleteCidade, updateCidade, createCidade, filterCidades
);
const isAFulfilledAction = isFulfilled(
	fetchCidades, fetchNextPage, deleteCidade, updateCidade, createCidade, filterCidades
);
const isARejectAction = isRejected(
	fetchCidades, fetchNextPage, deleteCidade, updateCidade, createCidade, filterCidades
);

const cidadesSlice = createSlice({
	name:'cidades',
	initialState,
	reducers:{
		refresh(state) {
			state.page = 1;
			state.filter = undefined;
			state.cidades = [];
			state.status = 'idle';			
		},
		cleanError(state) {
			state.error = undefined;
		}
	},
	extraReducers(builder) {
		builder			
			.addCase(fetchCidades.fulfilled, (state,action) => {
				state.cidades = action.payload;								
			})
			.addCase(filterCidades.fulfilled, (state,action) => {
				state.cidades = action.payload.response;
				state.filter = action.payload.filter;
				state.page = 1;										
			})			
			.addCase(fetchNextPage.fulfilled, (state,action) => {
				state.cidades = state.cidades.concat(action.payload);
				state.page += 1;						
			})	
			.addCase(deleteCidade.fulfilled, (state,action) => {
				state.cidades = state.cidades.filter(cidade => cidade.id !== action.payload);	
			})
			.addCase(createCidade.fulfilled, (state,action) => {
				state.cidades.unshift(action.payload);
			})			
			.addCase(updateCidade.fulfilled, (state,action) => {
				state.cidades = state.cidades.map(prevCidade => (
					prevCidade.id === action.payload.id 
						? action.payload
						: prevCidade
				));	
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

export const selectCidades = (state: RootState) => state.cidades.cidades;
export const selectStatus = (state: RootState) => state.cidades.status;
export const selectFilter = (state: RootState) => state.cidades.filter;
export const selectError = (state: RootState) => state.cidades.error;

export const { cleanError, refresh } = cidadesSlice.actions;

export default cidadesSlice.reducer;