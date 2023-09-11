import { IPessoa } from '@/models';
import { getValueSafety } from '@/shared/services/secureStorage';
import { AxiosAPI } from '../axios/config';
import { GenericEnum } from '@/constants/GenericEnum';
import { StatusCodes } from 'http-status-codes';

export const updateById = async (pessoa:IPessoa):Promise<void> => {	
	const {status} = await AxiosAPI.put(`/pessoas/${pessoa.id}`,{...pessoa},{
		headers:{
			Authorization:`Bearer ${await getValueSafety(GenericEnum.secureKeyToken)}`
		},			
	});

	if (status === StatusCodes.NO_CONTENT) return;

	return Promise.reject(new Error('Error ao atualizar o registro'));
};