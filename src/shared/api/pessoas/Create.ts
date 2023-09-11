import { getValueSafety } from '@/shared/services/secureStorage';
import { AxiosAPI } from '../axios/config';
import { GenericEnum } from '@/constants/GenericEnum';
import { IPessoa } from '@/models';

export const create = async (pessoa:Omit<IPessoa, 'id'>):Promise<IPessoa> => {
	const {data} = await AxiosAPI.post('/pessoas',{...pessoa},{
		headers:{
			Authorization:`Bearer ${await getValueSafety(GenericEnum.secureKeyToken)}`
		},			
	});

	if (data) return {...pessoa,id:data};

	return Promise.reject(new Error('Error ao criar o registro'));
};