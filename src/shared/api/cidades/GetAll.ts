import { getValueSafety } from '@/shared/services/secureStorage';
import { AxiosAPI } from '../axios/config';
import { GenericEnum } from '@/constants/GenericEnum';
import { ICidade } from '@/models/Cidade';

interface IGetProps {
	page?:number
	filter?:string
}

export const getAll = async ({page,filter}:IGetProps):Promise<ICidade[]> => {			
	const {data} = await AxiosAPI.get('/cidades',{
		headers:{
			Authorization:`Bearer ${await getValueSafety(GenericEnum.secureKeyToken)}`
		},
		params:{page,filter}
	});

	if (data) return data as ICidade[];

	throw 'Error ao consultar as cidades';
};