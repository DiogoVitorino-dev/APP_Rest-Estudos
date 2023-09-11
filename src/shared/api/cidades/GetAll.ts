import { getValueSafety } from '@/shared/services/secureStorage';
import { AxiosAPI } from '../axios/config';
import { GenericEnum } from '@/constants/GenericEnum';
import { ICidade } from '@/models';

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
		params:{page,filter,limit:process.env.LIMIT_GET_ITEMS}
	});
	

	if (data && headers['x-total-count']) {
		return {data,xTotalCount:headers['x-total-count']};
	}

	return Promise.reject(new Error('Error ao consultar as cidades'));
};