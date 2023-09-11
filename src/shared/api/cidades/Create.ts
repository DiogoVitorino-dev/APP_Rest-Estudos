import { getValueSafety } from '@/shared/services/secureStorage';
import { AxiosAPI } from '../axios/config';
import { GenericEnum } from '@/constants/GenericEnum';
import { ICidade } from '@/models';

export const create = async (cidade:Omit<ICidade, 'id'>):Promise<ICidade> => {
	const {data} = await AxiosAPI.post('/cidades',{nome:cidade.nome},{
		headers:{
			Authorization:`Bearer ${await getValueSafety(GenericEnum.secureKeyToken)}`
		},			
	});

	if (data) return {id:data,nome:cidade.nome};
	
	return Promise.reject(new Error('Error ao criar a cidade'));
};