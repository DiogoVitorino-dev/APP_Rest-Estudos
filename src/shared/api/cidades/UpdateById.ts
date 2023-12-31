import { getValueSafety } from '@/shared/services/secureStorage';
import { AxiosAPI } from '../axios/config';
import { GenericEnum } from '@/constants/GenericEnum';
import { ICidade } from '@/models';
import { StatusCodes } from 'http-status-codes';

export const updateById = async ({id,nome}:ICidade):Promise<void> => {	
	const {status} = await AxiosAPI.put(`/cidades/${id}`,{nome},{
		headers:{
			Authorization:`Bearer ${await getValueSafety(GenericEnum.secureKeyToken)}`
		},			
	});

	if (status === StatusCodes.NO_CONTENT) return;

	return Promise.reject(new Error('Error ao atualizar a cidade'));
};