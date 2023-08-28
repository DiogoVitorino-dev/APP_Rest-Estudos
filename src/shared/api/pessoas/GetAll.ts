import { getValueSafety } from '@/shared/services/secureStorage';
import { AxiosAPI } from '../axios/config';
import { GenericEnum } from '@/constants/GenericEnum';
import { IPessoa } from '@/models';

interface IGetProps {
	page?:number
	filter?:string
}

interface IGetResponse {
	data:IPessoa[]
	xTotalCount:number
}

export const getAll = async ({page,filter}:IGetProps):Promise<IGetResponse> => {			
	const {data,headers} = await AxiosAPI.get('/pessoas',{
		headers:{
			Authorization:`Bearer ${await getValueSafety(GenericEnum.secureKeyToken)}`
		},
		params:{page,filter}
	});
	

	if (data && headers['x-total-count']) {
		return {data,xTotalCount:headers['x-total-count']};
	}

	throw 'Error ao consultar os registros';
};