import { ICidade } from '@/models/Cidade';
import { CidadesService } from '@/shared/api/cidades';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '..';

export const fetchCidades = createAsyncThunk<ICidade[],void,{state:RootState}>(
	'cidades/fetchCidades',
	async () => await CidadesService.getAll({}),
	{
		condition: (_,{getState}) => {
			const {status} = getState().cidades;
			if(status === 'loading')
				return false;
		
			return true;
		}
	}
);

interface IFilterCidadesFulfilled {	
	response: ICidade[]
	filter?:string
}

export const filterCidades = 
	createAsyncThunk<IFilterCidadesFulfilled,string,{state:RootState}>(
		'cidades/filterCidades',
		async (filter:string) => ({			
			response: await CidadesService.getAll({filter,page:1}),
			filter: filter ? filter : undefined
		}),
		{
			condition: (_,{getState}) => {
				const {status} = getState().cidades;
				if(status === 'loading')
					return false;
		
				return true;
			}
		}
	);

export const fetchNextPage = createAsyncThunk<ICidade[],void,{state:RootState}>(
	'cidades/fetchNextPage',
	async (_,{getState}) => {
		const {page,filter} = getState().cidades;		
		return await CidadesService.getAll({page:page + 1,filter});		
	},
	{
		condition: (_,{getState}) => {
			const {status} = getState().cidades;
			if(status === 'loading')
				return false;
		
			return true;
		}
	}
);

export const deleteCidade = createAsyncThunk<number,number,{state:RootState}>(
	'cidades/deleteCidade',
	async (id:number) => {
		await CidadesService.deleteById(id);
		return id;
	}
);

export const updateCidade = createAsyncThunk<ICidade,ICidade,{state:RootState}>(
	'cidades/updateCidade',
	async (cidade:ICidade) => {
		await CidadesService.updateById(cidade);
		return cidade;
	}
);

type TOmitICidade = Omit<ICidade, 'id'>

export const createCidade = createAsyncThunk<ICidade, TOmitICidade, {state:RootState}>(
	'cidades/createCidade',
	async (cidade:TOmitICidade) => {
		return await CidadesService.create(cidade);
	}
);
