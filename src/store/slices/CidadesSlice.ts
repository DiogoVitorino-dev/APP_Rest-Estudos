import { ICidade } from '@/models/Cidade';
import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { createCidade, deleteCidade, fetchCidades, fetchNextPage, filterCidades, updateCidade } from '../thunks/CidadesThunks';

interface IInitialState {
	cidades: ICidade[]
	totalCount: number
	page:number
	filter?:string
	status: 'idle' | 'loading' | 'succeeded' | 'failed'
	error?: string
}

const initialState:IInitialState = {
	cidades:[],
	page:1,
	totalCount:0,
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
		refreshCidades(state) {
			state.page = 1;
			state.totalCount = 0;
			state.filter = undefined;
			state.cidades = [];
			state.status = 'idle';			
		},
		cleanCidadesError(state) {
			state.error = undefined;
		}
	},
	extraReducers(builder) {
		builder			
			.addCase(fetchCidades.fulfilled, (state,action) => {
				state.cidades = action.payload.cidades;
				state.totalCount = action.payload.xTotalCount;						
			})
			.addCase(filterCidades.fulfilled, (state,action) => {
				state.cidades = action.payload.cidades;
				state.filter = action.payload.filter;
				state.page = 1;										
			})			
			.addCase(fetchNextPage.fulfilled, (state,action) => {
				state.cidades = state.cidades.concat(action.payload);
				state.page += 1;						
			})	
			.addCase(deleteCidade.fulfilled, (state,action) => {
				state.cidades = state.cidades.filter(cidade => cidade.id !== action.payload);
				state.totalCount = state.totalCount - 1;
			})
			.addCase(createCidade.fulfilled, (state,action) => {
				state.cidades.unshift(action.payload);
				state.totalCount = state.totalCount + 1;
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

export const { 
	cleanCidadesError, 
	refreshCidades 
} = cidadesSlice.actions;

export default cidadesSlice.reducer;