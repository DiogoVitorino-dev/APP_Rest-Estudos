import { getValueSafety } from '@/shared/services/secureStorage';
import { AxiosAPI } from '../axios/config';
import { GenericEnum } from '@/constants/GenericEnum';
import { IPessoa } from '@/models';

interface IGetProps {
	page?:number
	filter?:string
}

export const getAll = async ({page,filter}:IGetProps):Promise<IPessoa[]> => {			
	const {data} = await AxiosAPI.get('/pessoas',{
		headers:{
			Authorization:`Bearer ${await getValueSafety(GenericEnum.secureKeyToken)}`
		},
		params:{page,filter}
	});
	

	if (data) return data as IPessoa[];

	throw 'Error ao consultar os registros';
};