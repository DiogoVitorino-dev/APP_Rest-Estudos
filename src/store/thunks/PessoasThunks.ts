import { IPessoa } from '@/models/Pessoa';
import { PessoasService } from '@/shared/api/pessoas';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '..';

interface IFetchPessoasFulfilled {
	pessoas:IPessoa[]
	xTotalCount:number
}

export const fetchPessoas = createAsyncThunk<IFetchPessoasFulfilled,void,{state:RootState}>(
	'pessoas/fetchPessoas',
	async () => {
		const {data,xTotalCount} = await PessoasService.getAll({});
		return {pessoas:data,xTotalCount};
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

export const fetchNextPage = createAsyncThunk<IPessoa[],void,{state:RootState}>(
	'pessoas/fetchNextPage',
	async (_,{getState}) => {
		const {page} = getState().pessoas;
		const {data} = await PessoasService.getAll({page:page + 1});
		return data;
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
	pessoas: IPessoa[]
	filter?:string
}

export const filterPessoas = 
	createAsyncThunk<IFilterPessoasFulfilled,string,{state:RootState}>(
		'pessoas/filterPessoas',
		async (filter:string) => {
			const {data} = await PessoasService.getAll({filter,page:1});
			
			return {
				pessoas:data,
				filter:filter ? filter : undefined
			};
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