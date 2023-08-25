import { IPessoa } from '@/models/Pessoa';
import { PessoasService } from '@/shared/api/pessoas';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '..';

export const fetchPessoas = createAsyncThunk<IPessoa[],void,{state:RootState}>(
	'pessoas/fetchPessoas',
	async () => await PessoasService.getAll({}),
	{
		condition: (_,{getState}) => {
			const {status} = getState().pessoas;
			if(status === 'loading')
				return false;
		
			return true;
		}
	}
);

export const fetchNextPage = createAsyncThunk<IPessoa[],void,{state:RootState}>(
	'pessoas/fetchNextPage',
	async (_,{getState}) => {
		const {page} = getState().pessoas;
		return await PessoasService.getAll({page:page + 1});
	},
	{
		condition: (_,{getState}) => {
			const {status} = getState().pessoas;
			if(status === 'loading')
				return false;
		
			return true;
		}
	}
);

interface IFilterPessoasFulfilled {	
	response: IPessoa[]
	filter?:string
}

export const filterPessoas = 
	createAsyncThunk<IFilterPessoasFulfilled,string,{state:RootState}>(
		'pessoas/filterPessoas',
		async (filter:string) => ({			
			response: await PessoasService.getAll({filter,page:1}),
			filter: filter ? filter : undefined
		}),
		{
			condition: (_,{getState}) => {
				const {status} = getState().pessoas;
				if(status === 'loading')
					return false;
		
				return true;
			}
		}
	);

export const deletePessoa = createAsyncThunk<number,number,{state:RootState}>(
	'pessoas/deletePessoa',
	async (id:number) => {
		await PessoasService.deleteById(id);
		return id;
	}
);

export const updatePessoa = createAsyncThunk<IPessoa,IPessoa,{state:RootState}>(
	'pessoas/updatePessoa',
	async (pessoa:IPessoa) => {
		await PessoasService.updateById(pessoa);
		return pessoa;
	}
);

type TOmitIPessoa = Omit<IPessoa, 'id'>

export const createPessoa = createAsyncThunk<IPessoa, TOmitIPessoa, {state:RootState}>(
	'pessoas/createPessoa',
	async (pessoa:TOmitIPessoa) => {
		return await PessoasService.create(pessoa);
	}
);