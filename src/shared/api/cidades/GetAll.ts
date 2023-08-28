import { getValueSafety } from '@/shared/services/secureStorage';
import { AxiosAPI } from '../axios/config';
import { GenericEnum } from '@/constants/GenericEnum';
import { ICidade } from '@/models/Cidade';

interface IGetProps {
	page?:number
	filter?:string
}

interface IGetResponse {
	data:ICidade[]
	xTotalCount:number
}

export const getAll = async ({page,filter}:IGetProps):Promise<IGetResponse> => {			
	const {data,headers} = await AxiosAPI.get('/cidades',{
		headers:{
			Authorization:`Bearer ${await getValueSafety(GenericEnum.secureKeyToken)}`
		},
		params:{page,filter}
	});
	

	if (data && headers['x-total-count']) {
		return {data,xTotalCount:headers['x-total-count']};
	}

	throw 'Error ao consultar as cidades';
};