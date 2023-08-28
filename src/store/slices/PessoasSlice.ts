import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { createPessoa, deletePessoa, fetchPessoas, fetchNextPage, updatePessoa, filterPessoas } from '../thunks/PessoasThunks';
import { IPessoa } from '@/models';

interface IInitialState {
	pessoas: IPessoa[]
	filter?:string
	totalCount:number
	page:number
	status: 'idle' | 'loading' | 'succeeded' | 'failed'
	error?: string
}

const initialState:IInitialState = {
	pessoas:[],
	totalCount:0,
	page:1,
	status:'idle',	
};

const isAPendingAction = isPending(
	fetchPessoas, fetchNextPage, deletePessoa, updatePessoa, createPessoa, filterPessoas
);
const isAFulfilledAction = isFulfilled(
	fetchPessoas, fetchNextPage, deletePessoa, updatePessoa, createPessoa, filterPessoas
);
const isARejectAction = isRejected(
	fetchPessoas, fetchNextPage, deletePessoa, updatePessoa, createPessoa, filterPessoas
);

const pessoasSlice = createSlice({
	name:'pessoas',
	initialState,
	reducers:{
		refreshPessoas(state) {
			state.page = 1;
			state.filter = undefined;
			state.totalCount = 0;
			state.pessoas = [];
			state.status = 'idle';
		},
		cleanPessoasError(state) {
			state.error = undefined;			
		}
	},
	extraReducers(builder) {
		builder			
			.addCase(fetchPessoas.fulfilled, (state,action) => {
				state.pessoas = action.payload.pessoas;							
				state.totalCount = action.payload.xTotalCount;
			})			
			.addCase(fetchNextPage.fulfilled, (state,action) => {
				state.pessoas = state.pessoas.concat(action.payload);
				state.page += 1;						
			})
			.addCase(filterPessoas.fulfilled, (state,action) => {
				state.pessoas = action.payload.pessoas;
				state.filter = action.payload.filter;
				state.page = 1;										
			})		
			.addCase(deletePessoa.fulfilled, (state,action) => {
				state.pessoas = state.pessoas.filter(pessoa => pessoa.id !== action.payload);
				state.totalCount = state.totalCount - 1;
			})
			.addCase(createPessoa.fulfilled, (state,action) => {
				state.pessoas.unshift(action.payload);
				state.totalCount = state.totalCount + 1;
			})
			.addCase(updatePessoa.fulfilled, (state,action) => {
				state.pessoas = state.pessoas.map(prevPessoa => (
					prevPessoa.id === action.payload.id 
						? action.payload
						: prevPessoa
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
	cleanPessoasError, 
	refreshPessoas 
} = pessoasSlice.actions;

export default pessoasSlice.reducer;